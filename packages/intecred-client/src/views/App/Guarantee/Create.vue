<template>
  <div>
    <IntHeader url-name-redirect="Titles" :client="nome" :cprType="handlecpr"/>
    <div class="container">
      <div class="container__title-page">
        <h2>Garantias</h2>
      </div>
      <Alert :show-alert="showAlert">
        Nessa tela, você deve cadastrar as garantias reais e pessoais vinculadas a essa CPR.
        Podem ser cadastradas uma ou mais garantias.
      </Alert>
      <div class="container__list-guarantees">
        <Card
          :key="index"
          :item="item"
          :index="index"
          @edit="prepareModalEdit"
          v-for="(item, index) in guaranteeList"
          @remove="prepareRemoveGuarantee($event, index)"
          class="container__list-guarantees__item"
        />
      </div>
      <div>
        <button
          @click.prevent="prepareAddGuarantee"
          class="container__form-data__add-guarantee">
          <IconPlus/>
          Adicionar garantia
        </button>
      </div>
      <IntSideBar
        title="Nova garantia"
        :show="true"
        v-if="modal"
        :onshow="show"
        isGuarantee
        :key="key"
      >
        <template #body>
          <div class="titles__modal">
            <div class="titles__modal__type">
              <div class="titles__modal__type__guarantee">Qual o tipo de <br>garantia?</div>
              <el-radio-group :key="`${key}1`" v-model="type">
                <component
                  :key="`${key}2`"
                  :is="radioButton"
                  :class="{ 'titles__modal__type__item--is-active': type === 'penhor'}"
                  label="penhor">Penhor
                </component>
                <component
                  :key="`${key}3`"
                  :is="radioButton"
                  :class="{ 'titles__modal__type__item--is-active': type === 'hipoteca'}"
                  label="hipoteca">Hipoteca
                </component>
                <component
                  :key="`${key}4`"
                  :is="radioButton"
                  :class="{ 'titles__modal__type__item--is-active': type === 'avalista'}"
                  label="avalista">Avalista
                </component>
              </el-radio-group>
            </div>
            <component :key="`${key}5`" :is="getComponent(type)"></component>
          </div>
        </template>

        <template #footer>
          <el-button @click="dispatchGuarantee" type="primary" class="titles__modal-footer">
            {{ buttonText }}
          </el-button>
        </template>
      </IntSideBar>
      <ActionsFooter
        :step="4"
        :back="() => this.forceSaveForm('decrement')"
        :next="() => this.forceSaveForm('increment')"
      />
    </div>
    <IntModal :closeFunction="closeModal" :show="showModalRemoveGuarantee">
      <div class="modal-feedback">
        <div class="modal-feedback__message">
          <span class="modal-feedback__message__icon">
            <span>
              <IconEllipse/>
              <IconDelete/>
            </span>
          </span>
          <span>
            <h2>Deseja excluir:</h2>
            <p>{{ modalInfo }}</p>
          </span>
        </div>

        <div class="modal-feedback__actions">
          <el-button
            type="terciary"
            @click.prevent="cancelRemoveGuarantee"
          >
            Cancelar
          </el-button>
          <el-button
            type="danger"
            @click.prevent="removeGuarantee"
          >
            Excluir
          </el-button>
        </div>
      </div>
    </IntModal>
  </div>
</template>

<script>
import {
  mapState, mapMutations, mapActions, mapGetters,
} from 'vuex';
import Alert from '../../../components/Alert.vue';
import IconEllipse from '../../../assets/svgs/icon-ellipse.svg';
import IconPlus from '../../../assets/svgs/icon-plus.svg';
import IconPencil from '../../../assets/svgs/icon-pencil.svg';
import IconDelete from '../../../assets/svgs/icon-delete.svg';
import ActionsFooter from '../Title/Physical/Partials/ActionsFooter.vue';
import IntHeader from '../../../layouts/IntHeader.vue';
import IntSideBar from '../../../components/Sidebar.vue';
import Pledge from './Partials/Pledge.vue';
import Mortgage from './Partials/Mortgage.vue';
import Guarantor from './Partials/Guarantor.vue';
import IntModal from '../../../components/Modal.vue';
import Card from './Partials/Card.vue';
import { api } from '../../../services';

export default {
  name: 'CreatePhysicalTitle',
  mounted() {
    api.get(`titulos/${this.getTitle}`)
      .then(({ data }) => {
        this.nome = data.nome;
        this.cprType = data.tipo;
      });

    this.getGuarantees(this.getTitle);
  },
  data: () => ({
    modal: false,
    futureActionFromSave: '',
    showModalRemoveGuarantee: false,
    tempGuaranteeIndex: '',
    tempGuaranteeToDestroy: '',
    showAlert: true,
    titulo: '',
    nome: '',
    cprType: '',
    key: 0,
    buttonText: 'Adicionar garantia',
  }),
  components: {
    Card,
    Guarantor,
    Mortgage,
    Pledge,
    IntHeader,
    ActionsFooter,
    Alert,
    IconPlus,
    IntSideBar,
    IconPencil,
    IconDelete,
    IntModal,
    IconEllipse,
  },
  computed: {
    ...mapState('guarantee', ['guarantee', 'guaranteeList']),
    ...mapGetters('guarantee', ['guaranteeBase']),
    radioButton() {
      return window.innerWidth > 600 ? 'el-radio-button' : 'el-radio';
    },
    modalInfo() {
      const { tempGuaranteeIndex } = this;
      return `Garantia ${tempGuaranteeIndex + 1}?`;
    },
    step() {
      return parseInt(this.$route.params.step, 10) || 1;
    },
    handlecpr() {
      if (this.cprType === 'Duplicata') {
        return 'Duplicata';
      }
      return `CPR ${this.cprType}`;
    },
    getTitle() {
      return parseInt(this.$route.params.titulo, 10);
    },
    type: {
      get() {
        return this.guarantee.tipo || 'penhor';
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_TYPE(value);
      },
    },
  },
  methods: {
    ...mapActions('guarantee', [
      'getGuarantees',
      'getGuarantee',
      'storeGuarantee',
      'updateGuarantee',
      'destroyGuarantee',
    ]),
    ...mapMutations('guarantee', [
      'UPDATE_PARTIALS_GUARANTEE_TYPE',
      'UPDATE_PARTIALS_GUARANTEE_PARTIALS',
      'UPDATE_CURRENT_EDITABLE_GUARANTEE',
    ]),
    getComponent(type) {
      switch (type) {
        case 'penhor':
          return 'Pledge';
        case 'hipoteca':
          return 'Mortgage';
        case 'avalista':
          return 'Guarantor';
        default:
          return '';
      }
    },
    changeGuarantorType(type) {
      this.UPDATE_PARTIALS_GUARANTEE_TYPE(type);
    },
    prepareAddGuarantee() {
      const base = {
        titulo: this.getTitle,
        tipo: 'penhor',
        penhor: {
          tipo: 'penhor',
          tipoPenhor: '',
          produto: '',
          grauPenhor: '',
          quantidade: '',
          safra: '',
          mesmoLocalLavoura: true,
          nomeFazenda: '',
          areaPlantio: '',
          uf: '',
          municipio: '',
          numeroMatricula: '',
          ufComarcaRegistro: '',
          cidadeComarcaRegistro: '',
          areaPropriaOuTerceiros: 'propria',
          file: [],
          obs: '',
        },
        hipoteca: {
          tipo: 'hipoteca',
          tipoHipoteca: '',
          descricaoImovel: '',
          grauHipoteca: '',
          numeroMatricula: '',
          ufComarcaRegistro: '',
          cidadeComarcaRegistro: '',
          file: [],
          obs: '',
        },
        avalista: {
          tipo: 'pf',
          tipoAssinatura: '',
          pessoaFisica: {
            cpf: '',
            nome: '',
            rg: '',
            email: '',
            ocupacao: '',
            nacionalidade: '',
            cep: '',
            endereco: '',
            uf: '',
            municipio: '',
            estadoCivil: '',
            file: [],
            obs: '',
            conjuge: {
              nome: '',
              cpf: '',
              email: '',
              rg: '',
            },
          },
          pessoaJuridica: {
            cnpj: '',
            razaoSocial: '',
            email: '',
            cep: '',
            endereco: '',
            uf: '',
            municipio: '',
            file: [],
            obs: '',
          },
        },
      };

      this.futureActionFromSave = 'store';

      this.UPDATE_CURRENT_EDITABLE_GUARANTEE(base);

      this.buttonText = 'Adicionar garantia';

      this.$nextTick(() => {
        this.show();
        this.key += 1;
      });
    },
    prepareModalEdit(id) {
      this.buttonText = 'Editar garantia';
      this.futureActionFromSave = 'update';
      this.getGuarantee(id);
      this.show();
    },
    async dispatchGuarantee() {
      const newGuarantee = { ...this.guarantee };
      newGuarantee.tipo = this.type;
      if (newGuarantee.tipo === 'avalista') {
        newGuarantee.avalista.tipo = newGuarantee.avalista.tipo || 'pf';
      }
      if (this.futureActionFromSave === 'store') {
        await this.storeGuarantee(newGuarantee);
      } else {
        await this.updateGuarantee(newGuarantee);
      }
      this.futureActionFromSave = '';
      await this.getGuarantees(this.getTitle);
      this.show();
    },
    async prepareRemoveGuarantee(id, index) {
      this.tempGuaranteeIndex = index;
      this.showModalRemoveGuarantee = true;
      this.tempGuaranteeToDestroy = this.guaranteeList.find((el) => el.id === id);
    },
    async removeGuarantee() {
      await this.destroyGuarantee(this.tempGuaranteeToDestroy.id);
      this.showModalRemoveGuarantee = false;
      this.tempGuaranteeIndex = null;
    },
    cancelRemoveGuarantee() {
      this.showModalRemoveGuarantee = false;
    },
    closeModal() {
      this.showModalRemoveGuarantee = false;
    },
    async forceSaveForm(action) {
      await api.get(`titulos/${this.getTitle}`)
        .then(({ data }) => this.titulo = data);
      const handledStep = this.getFutureStep(this.titulo, action);
      api.patch(`titulos/${this.getTitle}`, { currentStep: handledStep })
        .then(({ data }) => this.redirect(action, data));
    },
    show() {
      this.modal = !this.modal;
    },
    getFutureStep({ tipo }, action) {
      if (tipo === 'Fisica' || tipo === 'Duplicata') {
        return action === 'decrement' ? 3 : 5;
      }
      return action === 'decrement' ? 2 : 4;
    },
    redirect(action, title) {
      if (action === 'decrement') {
        const { currentStep } = title;
        switch (title.tipo) {
          case 'Fisica':
            this.$router.push({
              name: 'CreatePhysicalTitle',
              params: {
                titulo: title.id,
                step: currentStep,
              },
            });
            break;
          case 'Financeira':
            this.$router.push({
              name: 'CreateFinancialTitle',
              params: {
                titulo: title.id,
                step: currentStep,
              },
            });
            break;
          case 'Duplicata':
            break;
          default:
            throw new Error('invalid CPR type');
        }
      } else {
        this.$router.push({
          name: 'Document',
          params: { titulo: this.$route.params.titulo },
        });
      }
    },
  },
};
</script>
<style scoped lang="scss" src="./styles/style.scss"/>
