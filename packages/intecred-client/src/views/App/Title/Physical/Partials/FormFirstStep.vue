<template>
  <div>
    <div class="form-data__item--size-bottom">
      <IntInput
        v-model="cpr"
        label="Número da CPR"
        placeholder="Insira o número da CPR"
        maxlength="15"
      />
    </div>
    <div class="form-data__item--size-bottom">
        <IntInput
          v-model="produto"
          label="Produto"
          placeholder="Selecione o Produto"
          isSelect
        >
          <el-option
            v-for="item in produtos"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </IntInput>
    </div>
    <div class="form-data__item--size-bottom">
        <IntInput
          v-model="lavoura"
          label="Safra"
          placeholder="Selecione o Ano/Safra"
          isSelect
        >
          <el-option
            v-for="item in lavouras"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </IntInput>
    </div>
    <div class="form-data__item--size-bottom">
      <IntInput
        v-model="quantidade"
        v-currency="pluginOptions"
        label="Quantidade (em kg)"
        placeholder="0,0 kg"
      />
    </div>
    <div class="form-data__item--size-bottom">
      <IntInput
        v-model="quantidadeSacas"
        label="Quantidade (em sacas)"
        placeholder="0"
      />
    </div>
    <div class="form-data__item--size-bottom">
      <IntInput
        v-model="expiracao"
        label="Data de vencimento"
        placeholder="Selecione a data para vencimento"
        isDate
      />
    </div>
    <div class="form-data__item--size-bottom">
      <div class="form-data__checkbox">
        <span class="form-data__checkbox__info">
          <p class="form-data__item--size-bottom__p1">Emitente da CPR:</p>
        </span>
        <div class="el-checkbox-group">
          <el-checkbox
            :checked="proprioEmitente"
            v-model="proprioEmitente">Próprio cliente
          </el-checkbox>
          <el-checkbox
            v-model="hasIssuer"
            @change="ADD_NEW_ISSUER(emitentes.length)">
            Novo emitente
          </el-checkbox>
        </div>
      </div>
    </div>
    <div
      :key="index"
      v-for="(item, index) in emitentes"
      class="form-data__wrapper-inputs"
    >
      <div class="form-data__item--size-bottom">
        <span class="form-data__wrapper-inputs__badge">
          <span>Emitente {{ index + 1 }}</span>
          <span>
            <IconDelete @click="prepareModalRemoveIssuer(index)"/>
          </span>
        </span>
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-model="emitentes[index].cpf"
          label="CPF"
          v-mask="'###.###.###-##'"
          placeholder="000.000.000-00"
        />
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-model="emitentes[index].nome"
          label="Nome"
          placeholder="Defina o nome completo"
          maxlength="100"
        />
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-model="emitentes[index].rg"
          label="RG"
          placeholder="000.000.000-00"
        />
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-model="emitentes[index].inscricaoestadual"
          label="Inscrição Estadual"
          placeholder="Inscrição Estadual"
          maxlength="15"
        />
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-model="emitentes[index].email"
          label="Email"
          placeholder="email@email.com"
        />
      </div>
       <div class="form-data__item--size-bottom">
        <IntInput
          v-model="emitentes[index].nacionalidade"
          label="Nacionalidade"
          placeholder="Nacionalidade"
          maxlength="50"
        />
      </div>
       <div class="form-data__item--size-bottom">
        <IntInput
          v-model="emitentes[index].profissao"
          label="Profissão"
          placeholder="Profissão"
          maxlength="50"
        />
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-model="emitentes[index].cep"
          label="Cep"
          placeholder="Cep"
          maxlength="9"
          v-mask="'########'"
        />
      </div>
       <div class="form-data__item--size-bottom">
        <IntInput
          v-model="emitentes[index].rua"
          label="Rua"
          placeholder="Rua"
          maxlength="100"
        />
      </div>
       <div class="form-data__item--size-bottom">
        <IntInput
          v-model="emitentes[index].numero"
          label="Número"
          placeholder="Número"
          maxlength="5"
        />
      </div>
       <div class="form-data__item--size-bottom">
        <IntInput
          v-model="emitentes[index].complemento"
          label="Complemento"
          placeholder="Complemento"
          maxlength="30"
        />
      </div>
       <div class="form-data__item--size-bottom">
        <IntInput
          v-model="emitentes[index].bairro"
          label="Bairro"
          placeholder="Bairro"
          maxlength="50"
        />
      </div>
       <div class="form-data__item--size-bottom">
        <IntInput
          v-model="emitentes[index].cidade"
          label="Cidade"
          placeholder="Cidade"
          maxlength="50"
        />
      </div>
       <div class="form-data__item--size-bottom">
        <IntInput
          v-model="emitentes[index].uf"
          label="UF"
          placeholder="UF"
          maxlength="2"
        />
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-model="emitentes[index].estadoCivil"
          label="Estado civil"
          placeholder="Selecione o estado civil"
          isSelect
        >
          <el-option
            v-for="item in civilStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </IntInput>
      </div>
      <div
        class="form-data__item--size-bottom"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.rg"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="RG do cônjuge"
          placeholder="RG"
        />
      </div>
      <div
        class="form-data__item--size-bottom"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.cpf"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="CPF do cônjuge"
          v-mask="'###.###.###-##'"
          placeholder="000.000.000-00"
        />
      </div>
      <!-- <div
        class="form-data__item--size-bottom"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.email"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="Estado Civil do cônjuge"
          placeholder="Estado Civil do cônjuge"
          maxlength="60"
        />
      </div> -->
      <!-- <div
        class="form-data__item--size-bottom
         form-data__item--size-bottom--no-margin"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.nome"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="Nome do cônjuge"
          placeholder="Defina o nome completo"
          maxlength="100"
        />
      </div> -->
       <div
        class="form-data__item--size-bottom"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.nome"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="Nome do cônjuge"
          placeholder="Defina o nome completo"
        />
      </div>
       <div
        class="form-data__item--size-bottom"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.profissao"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="Profissão do cônjuge"
          placeholder="Profissão do cônjuge"
        />
      </div>
      <!-- <div
        class="form-data__item--size-bottom
         form-data__item--size-bottom--no-margin"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.profissao"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="Profissão do cônjuge"
          placeholder="Profissão do Cônjuge"
          maxlength="60"
        />
      </div> -->
      <div
        class="form-data__item--size-bottom"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.nacionalidade"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="Nacionalidade do cônjuge"
          placeholder="Nacionalidade do cônjuge"
        />
      </div>
      <!-- <div
        class="form-data__item--size-bottom
         form-data__item--size-bottom--no-margin"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.nacionalidade"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="Nacionalidade do cônjuge"
          placeholder="Nacionalidade do Cônjuge"
          maxlength="60"
        />
      </div> -->
      <div
        class="form-data__item--size-bottom"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.cep"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="CEP do Cônjuge"
          placeholder="CEP"
          v-mask="'########'"
          maxlength="9"
        />
      </div>
      <!-- <div
        class="form-data__item--size-bottom
         form-data__item--size-bottom--no-margin"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.cep"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="CEP"
          placeholder="CEP"
          v-mask="'########'"
          maxlength="9"
        />
      </div> -->
      <div
        class="form-data__item--size-bottom"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.rua"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="Rua do Cônjuge"
          placeholder="Rua"
        />
      </div>
      <!-- <div
        class="form-data__item--size-bottom
         form-data__item--size-bottom--no-margin"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.rua"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="Rua"
          placeholder="Rua"
          maxlength="100"
        />
      </div> -->
      <div
        class="form-data__item--size-bottom"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.numero"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="Número"
          placeholder="Número"
          maxlength="5"
        />
      </div>
      <!-- <div
        class="form-data__item--size-bottom
         form-data__item--size-bottom--no-margin"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.numero"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="Numero"
          placeholder="Numero"
          maxlength="5"
        />
      </div> -->
      <div
        class="form-data__item--size-bottom"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.complemento"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="Complemento"
          placeholder="Complemento"
          maxlength="25"
        />
      </div>
      <!-- <div
        class="form-data__item--size-bottom
         form-data__item--size-bottom--no-margin"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.complemento"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="Complemento"
          placeholder="Complemento"
          maxlength="20"
        />
      </div> -->
      <div
        class="form-data__item--size-bottom"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.bairro"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="Bairro"
          placeholder="Bairro"
        />
      </div>
      <!-- <div
        class="form-data__item--size-bottom
         form-data__item--size-bottom--no-margin"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.bairro"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="Bairro"
          placeholder="Bairro"
          maxlength="60"
        />
      </div> -->
      <div
        class="form-data__item--size-bottom"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.cidade"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="Cidade"
          placeholder="Cidade"
        />
      </div>
      <!-- <div
        class="form-data__item--size-bottom
         form-data__item--size-bottom--no-margin"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.cidade"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="Cidade"
          placeholder="Cidade"
          maxlength="60"
        />
      </div> -->
      <div
        class="form-data__item--size-bottom"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.uf"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="UF"
          placeholder="UF"
          maxlength="2"
        />
      </div>
      <!-- <div
        class="form-data__item--size-bottom
         form-data__item--size-bottom--no-margin"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.uf"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="UF"
          placeholder="UF"
          maxlength="2"
        />
      </div> -->
    </div>
    <div>
      <button
        class="form-data__add-issuer"
        v-if="emitentes.length" @click.stop.prevent="ADD_NEW_ISSUER">
        <IconPlus/>
        Adicionar emitente
      </button>
    </div>
    <IntModal :closeFunction="closeModal" :show="showModalRemoveIssuer">
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
            @click.prevent="cancelRemoveIssuer"
          >
            Cancelar
          </el-button>

          <el-button
            type="danger"
            @click.prevent="removeIssuer"
          >
            Excluir
          </el-button>
        </div>
      </div>
    </IntModal>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';
import IntModal from '../../../../../components/Modal.vue';
import IconEllipse from '../../../../../assets/svgs/icon-ellipse.svg';
import IntInput from '../../../../../components/Input.vue';
import IconDelete from '../../../../../assets/svgs/icon-delete.svg';
import IconPlus from '../../../../../assets/svgs/icon-plus.svg';

export default {
  name: 'FormFirstStep',
  mounted() {
    // this.getStep1Options();
  },
  components: {
    IntInput,
    IconDelete,
    IconPlus,
    IntModal,
    IconEllipse,
  },
  watch: {
    quantidade(newValue) {
      if (!this.quantidade) {
        const value = 0.00;
        this.UPDATE_PARTIALS_FORM({
          key: 'quantidadeSacas',
          value,
        });
        return;
      }
      const value = parseFloat(newValue) / 60;
      console.log('Value 60 ->', value);
      this.UPDATE_PARTIALS_FORM({
        key: 'quantidadeSacas',
        value,
      });
      const newValuesp = newValue.replace('.', '');
      const valueF = newValuesp.replace('.', '');
      console.log('newValuesp ->', newValuesp);
      const x = parseFloat(valueF) / 60;
      const x2 = x.toFixed(2);
      console.log('X ->', x);
      // const xconcat = x.toString().slice(-2);
      // const yconcat = x.toString().slice(0, -2);
      // const xformated = `${yconcat}.${xconcat}`;
      // const yformated = parseFloat(xformated).toLocaleString('pt-BR');
      this.UPDATE_PARTIALS_FORM({
        key: 'quantidadeSacas',
        value: x2,
      });
    },
  },
  data: () => ({
    user: 1,
    pluginOptions: '',
    // products: [],
    // harvests: [],
    showModalRemoveIssuer: false,
    tempIssuerIndex: null,
  }),
  methods: {
    load_cep_conjuge_emitente() {
      // const url_cep;
      this.emitentes.conjuge.cep = this.emitentes.conjuge.cep.trim().replace(/[^0-9]/g, '');
      // this.cep = 'https://viacep.com.br/ws/' + this.cep + '/json';
      // clear all headers axios to viacep
      // axios.defaults.headers.common = null;
      axios.get(`https://cors-anywhere.herokuapp.com/https://viacep.com.br/ws/${this.emitentes.conjuge.cep}/json`).then((response) => {
        this.emitentes.conjuge.rua = response.data.logradouro;
        this.emitentes.conjuge.bairro = response.data.bairro;
        this.emitentes.conjuge.uf = response.data.uf;
        this.emitentes.conjuge.cidade = response.data.localidade;
      }).catch((error) => {
        console.log(error.statusText);
      });
    },

    load_cep_emitente() {
      // const url_cep;
      this.emitentes.cep = this.emitentes.cep.trim().replace(/[^0-9]/g, '');
      console.log(this.emitentes.cep);
      // this.cep = 'https://viacep.com.br/ws/' + this.cep + '/json';
      // clear all headers axios to viacep
      // axios.defaults.headers.common = null;
      axios.get(`https://cors-anywhere.herokuapp.com/https://viacep.com.br/ws/${this.emitentes.cep}/json`).then((response) => {
        this.emitentes.rua = response.data.logradouro;
        this.emitentes.bairro = response.data.bairro;
        this.emitentes.uf = response.data.uf;
        this.emitentes.cidade = response.data.localidade;
      }).catch((error) => {
        console.log(error.statusText);
      });
    },

    // async getStep1Options() {
    //   await api.get('/products')
    //     .then((res) => {
    //       this.products = res.data;
    //     });
    //   await api.get('/harvests')
    //     .then((res) => {
    //       this.harvests = res.data;
    //     });
    // },
    ...mapMutations(
      'title', [
        'UPDATE_TITLE',
        'UPDATE_TITLE',
        'UPDATE_PARTIALS_FORM',
        'ADD_NEW_ISSUER',
        'REMOVE_ISSUER',
      ],
    ),

    closeModal() {
      this.showModalRemoveIssuer = false;
    },
    prepareModalRemoveIssuer(index) {
      this.showModalRemoveIssuer = true;
      this.tempIssuerIndex = index;
    },
    removeIssuer() {
      this.REMOVE_ISSUER(this.tempIssuerIndex);
      this.showModalRemoveIssuer = false;
      this.tempIssuerIndex = null;
    },
    cancelRemoveIssuer() {
      this.showModalRemoveIssuer = false;
      this.tempOwnerIndex = null;
    },
  },
  computed: {
    ...mapState('title', ['title']),

    hasIssuer() {
      return this.title.emitentes.length !== 0;
    },

    issuerType() {
      return this.emitentes.length;
    },
    cpr: {
      get() {
        return this.title.cpr;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'cpr',
          value,
        });
      },
    },
    proprioEmitente: {
      get() {
        return this.title.proprioEmitente !== false;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'proprioEmitente',
          value,
        });
      },
    },
    tipo: {
      get() {
        return this.title.tipo || 'cliente';
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'tipo',
          value,
        });
      },
    },
    produto: {
      get() {
        return this.title.produto;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'produto',
          value,
        });
      },
    },
    lavoura: {
      get() {
        return this.title.lavoura;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'lavoura',
          value,
        });
      },
    },
    produtos: () => [
      {
        value: 'algodao',
        label: 'Algodão em pluma',
      },
      {
        value: 'boigordo',
        label: 'Boi Gordo',
      },
      {
        value: 'cafegraos',
        label: 'Café cru em grãos',
      },
      {
        value: 'gergelim',
        label: 'Gergelim',
      },
      {
        value: 'milhotipo1',
        label: 'Milho Tipo 1, em grãos',
      },
      {
        value: 'soja',
        label: 'Soja',
      },
    ],
    lavouras: () => [
      {
        value: '2020/21',
        label: '2020/21',
      },
      {
        value: '2021/22',
        label: '2021/22',
      },
    ],
    quantidade: {
      get() {
        return this.title.quantidade;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'quantidade',
          value,
        });
      },
    },
    quantidadeSacas: {
      get() {
        return this.title.quantidadeSacas;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'quantidadeSacas',
          value,
        });
      },
    },
    expiracao: {
      get() {
        return this.title.expiracao;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'expiracao',
          value,
        });
      },
    },
    emitentes: {
      get() {
        return this.title.emitentes;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'emitentes',
          value,
        });
      },
    },
    civilStatus: () => [
      {
        value: 'single',
        label: 'Solteiro',
      },
      {
        value: 'married',
        label: 'Casado',
      },
      {
        value: 'divorced',
        label: 'Divorciado',
      },
    ],
    modalInfo() {
      const { tempIssuerIndex } = this;
      const updateIndex = tempIssuerIndex + 1;
      return `Emitente ${updateIndex}?`;
    },
  },
};
</script>

<style lang="scss" scoped>
.form-data {
  &__item--size-bottom {
    margin-bottom: 27px;

    &--no-margin {
      margin-bottom: 0;
    }
  }

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  &__add-issuer {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    width: 540px;
    height: 56px;
    background: $--color-gray-1;
    box-shadow: 0px 3px 4px rgba(13, 54, 133, 0.15);
    border-radius: 4px;
    color: $--color-primary;

    :nth-child(1) {
      margin-right: 10px;
      fill: $--color-primary;
    }

    :nth-child(2) {
      fill: $--color-primary;
    }
  }

  &__wrapper-inputs {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 32px;
    width: 540px;
    background: $--color-gray-1;
    box-shadow: 0px 3px 4px rgba(13, 54, 133, 0.15);
    border-radius: 4px;
    margin-bottom: 10px;

    &__badge {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      background: #E4E9F2;
      height: 40px;
      width: 476px;
      font-weight: bold;
      font-size: 16px;
      line-height: 28px;
      color: #2E3A59;
      cursor: pointer;
    }

    .form-data__item--size-bottom:last-child {
      margin-bottom: 0;
    }
  }

  &--two-items {
    display: flex;
    justify-content: space-between;
    width: 540px;

    &__item {
      width: 260px
    }
  }

  &--two-items-wrapped {
    display: flex;
    justify-content: space-between;

    &__item {
      width: 230px
    }
  }

  &__item--size-bottom {
    margin-bottom: 27px;

    &--no-margin {
      margin-bottom: 0;
    }
  }

  &__checkbox {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: start;

    &__info {
      margin-right: 15px;
      max-width: 230px;

      p {
        font-size: 16px;
        line-height: 28px;
        display: flex;
        align-items: center;
        color: #2E3A59;
        margin-right: 8px;
      }
    }

    &__p1 {
      font-size: 16px;
      line-height: 28px;
      display: flex;
      align-items: center;
      color: #2E3A59;
      margin-right: 8px;

      &--last {
        margin-left: 8px;
      }
    }

    &__p-bold {
      font-weight: bold;
      font-size: 16px;
      line-height: 28px;
      display: flex;
      align-items: center;
      margin-left: 8px;
    }

    &__group-checkbox {
      display: flex;
      align-items: center;
      margin-left: 30px;
    }
  }
}
</style>
