<template>
  <div class="create-title" :key="key">
    <IntHeader
      url-name-redirect="Titles"
      cpr-type="CPR Fisica"
      :status="title.status"
    />
    <div class="container">
      <!-- Step 1 dados da CPR -->
      <span v-show="step == 1">
        <h2 class="container__title-alert">Dados da CPR</h2>
        <Alert v-show="showAlertStep1">
          Aqui nessa tela você deve inserir os dados básicos para iniciar a criação da CPR
        </Alert>
      </span>
      <span v-show="step == 2">
        <h2 class="container__title-alert">Local de formação da lavoura</h2>
        <Alert v-show="showAlertStep2">
          Aqui você precisa preencher os dados do produto da CPR e da propriedade de cultivo.
        </Alert>
      </span>
      <span v-show="step == 3">
        <h2 class="container__title-alert">Condições de entrega</h2>
        <Alert v-show="showAlertStep3">
          Agora, você deve preencher as condições e locais da entrega do produto da CPR
        </Alert>
      </span>
      <div class="container__form-data">
        <form>
          <component :is="currentComponentStep"/>
          <ActionsFooter
            :step="step"
            :back="() => this.back()"
            :next="() => this.forceSaveForm()"/>
        </form>
      </div>
    </div>
    <IntModal
      :show="alertDepositaryData"
      :close-function="closeAlertModal"
      :draft-analyse="true">
      <template v-slot:head>
        <div class="modal__custom-head">
          <IconDanger/>
          <h2 class="modal__custom-head__danger">Atenção!</h2>
        </div>
      </template>
      <template v-slot:body>
        <div class="modal__custom-body">
          <p class="modal__custom-body__p2">Favor preencher todos campos do fiel depositário</p>
        </div>
      </template>
      <template v-slot:footer>
        <div class="modal__custom-footer">
          <el-button
            @click="closeAlertModal"
            type="danger"
          >Retornar
          </el-button>
        </div>
      </template>
    </IntModal>
  </div>
</template>

<script>

import { mapState, mapActions, mapGetters } from 'vuex';
import Alert from '../../../../components/Alert.vue';
import FormFirstStep from './Partials/FormFirstStep.vue';
import FormThirdStep from './Partials/FormThirdStep.vue';
import FormSecondStep from './Partials/FormSecondStep.vue';
import ActionsFooter from './Partials/ActionsFooter.vue';
import IntHeader from '../../../../layouts/IntHeader.vue';
import IntModal from '../../../../components/Modal.vue';
import IconDanger from '../../../../assets/svgs/icon-draft-reject.svg';

export default {
  name: 'CreatePhysicalTitle',
  async mounted() {
    await this.getTitle(parseInt(this.$route.params.titulo, 10))
      .then(() => {
        const step = parseInt(this.$route.params.step, 10);
        if (this.title.currentStep && this.title.currentStep > 3) {
          if (step) {
            this.$router.push({
              name: this.getRedirectComponent,
              params: {
                titulo: this.title.id,
                step: this.title.currentStep,
              },
            });
          } else {
            this.$router.push({
              name: this.getRedirectComponent,
              params: {
                titulo: this.title.id,
              },
            });
          }
        }
      });
  },
  data: () => ({
    key: 0,
    user: 1,
    routeName: '',
    lastAction: '',
    feedback: false,
    alertDepositaryData: false,
  }),
  computed: {
    ...mapState('title', ['title']),
    ...mapGetters('title', ['pfRequiredFields', 'pjRequiredFields']),
    getRedirectComponent() {
      console.log(this.title.currentStep);
      switch (this.title.currentStep) {
        case 1:
        case 2:
        case 3:
          return 'CreatePhysicalTitle';
        case 4:
          return 'Guarantee';
        case 5:
          return 'Document';
        case 6:
          return 'Part';
        case 7:
          return 'Draft';
        default: throw new Error('invalid CPR type');
      }
    },
    showAlertStep1: {
      get() {
        return parseInt(this.$route.params.step, 10) === 1;
      },
      set(value) {
        return value;
      },
    },
    showAlertStep2: {
      get() {
        return parseInt(this.$route.params.step, 10) === 2;
      },
      set(value) {
        return value;
      },
    },
    showAlertStep3: {
      get() {
        return parseInt(this.$route.params.step, 10) === 3;
      },
      set(value) {
        return value;
      },
    },
    step: {
      get() {
        return parseInt(this.$route.params.step, 10) || 1;
      },
      set(value) {
        return value;
      },
    },
    currentComponentStep() {
      switch (this.step) {
        case 1:
        default:
          return 'FormFirstStep';
        case 2:
          return 'FormSecondStep';
        case 3:
          return 'FormThirdStep';
      }
    },
  },
  methods: {
    ...mapActions('title', ['submit', 'submitBack', 'getTitle']),
    back() {
      this.submitBack({
        title: {
          id: this.title.id,
        },
        step: 0,
        nextStep: this.step -= 1,
      });
      if (this.step > 1) {
        this.$router.push({
          name: 'CreatePhysicalTitle',
          params: { step: this.step -= 1 },
        });
      } else {
        this.$router.push({
          name: 'Titles',
        });
      }
    },
    forceSaveForm() {
      this.submit({
        title: this.title,
        step: this.step,
        nextStep: this.step += 1,
      });
      let step = parseInt(this.step, 10);
      if (this.step === 3) {
        this.feedback = false;
        if (this.hasPendingDepositaryInput()) {
          this.alertDepositaryData = true;
        } else {
          this.$router.push({
            name: 'Guarantee',
            params: { titulo: this.title.id },
          });
        }
      } else {
        this.$router.push({
          name: 'CreatePhysicalTitle',
          params: { step: step += 1 },
        });
      }
    },
    hasPendingDepositaryInput() {
      let hasPendency = false;

      if (this.title.depositarioEmitente === false) {
        const requiredFields = this.title.tipoPessoaDepositario === 'pf'
        || this.title.tipoPessoaDepositario === ''
          ? this.pfRequiredFields
          : this.pjRequiredFields;
        Object.entries(this.title.depositario)
          .forEach(([key, value]) => {
            if (!requiredFields.includes(key)) {
              return;
            }
            if (value === '') {
              hasPendency = true;
            }
          });
      }

      return hasPendency;
    },
    closeAlertModal() {
      this.alertDepositaryData = false;
    },
  },
  components: {
    IntHeader,
    FormFirstStep,
    FormSecondStep,
    FormThirdStep,
    ActionsFooter,
    Alert,
    IntModal,
    IconDanger,
  },
};
</script>

<style lang="scss" scoped/>
