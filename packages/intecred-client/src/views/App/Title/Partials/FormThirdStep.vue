<template>
  <div class="form-data">
    <div class="form-data__item--size-bottom">
      <IntInput
        v-model="localEntrega"
        label="Local de entrega"
        placeholder="Local que será entregue"
      />
    </div>
    <div class="form-data__item--size-bottom">
      <IntInput
        v-model="cepEntrega"
        label="CEP:"
        placeholder="endereço de entrega"
      />
    </div>
    <div class="form-data__item--size-bottom">
      <IntInput
        v-model="enderecoEntrega"
        label="Endereço de entrega"
        placeholder="endereço de entrega"
      />
    </div>
    <div class="form-data__item--size-bottom">
      <div class="form-data--two-items-wrapped">
         <span class="form-data--two-items-wrapped__item">
            <IntInput
              v-model="ufEntrega"
              label="UF"
              placeholder="Estado"
            />
          </span>
        <span class="form-data--two-items-wrapped__item">
          <IntInput
            v-model="cidadeEntrega"
            label="Município"
            placeholder="Cidade"
          />
        </span>
      </div>
    </div>
    <div class="form-data__item--size-bottom">
      <IntInput
        style="display: block"
        v-model="periodoEntrega"
        label="Período de entrega"
        placeholder="Selecione a data para vencimento"
        isDate
        isBetweenDate
      />
    </div>
    <!-- TODO fix resize -->
    <div class="form-data__item--size-bottom">
      <div class="form-data__radio">
        <span class="form-data__radio__info">
          <p>
            O fiel depositário é o próprio emitente da CPR?
          </p>
        </span>
        <el-radio-group v-model="depositarioEmitente">
          <el-radio @change="CHANGE_DEPOSITARY(true)" :label="true">Sim</el-radio>
          <el-radio @change="CHANGE_DEPOSITARY(false)" :label="false">Não</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div
      v-if="depositarioEmitente === false"
      class="form-data__depositary"
    >
      <div class="form-data__item--size-bottom">
        <div class="form-data__wrapper-inputs__badge">
          <span>Dados do fiel depositário</span>
        </div>
      </div>
      <div class="form-data__item--size-bottom">
        <div class="form-data__radio">
          <span class="form-data__radio__info">
            <p
              class="form-data__item--size-bottom__p1">
              Tipo?
            </p>
          </span>
          <el-radio-group v-model="tipoPessoaDepositario">
            <el-radio @select="CHANGE_PERSON_TYPE('pf')" label="pf">PF</el-radio>
            <el-radio @select="CHANGE_PERSON_TYPE('pj')" label="pj">PJ</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-show="tipoPessoaDepositario === 'pf'"
          v-model="depositarioCpf"
          label="CPF"
          placeholder="000.000.000-00"
        />
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-show="tipoPessoaDepositario === 'pf'"
          v-model="depositarioNome"
          label="Nome"
          placeholder="Nome completo"
          maxlength="100"
        />
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-show="tipoPessoaDepositario === 'pf'"
          v-model="depositarioRg"
          label="RG"
          placeholder="000.000.000-00"
        />
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-show="tipoPessoaDepositario === 'pf'"
          v-model="depositarioEmail"
          label="Email"
          placeholder="email@email.com.br"
          maxlength="50"
        />
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-show="tipoPessoaDepositario === 'pf'"
          v-model="depositarioOcupacao"
          label="Profissão"
          placeholder="Defina a profissão"
          maxlength="50"
        />
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-show="tipoPessoaDepositario === 'pf'"
          v-model="depositarioEstadoCivil"
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
      <div class="form-data__item--size-bottom">
        <IntInput
          v-show="tipoPessoaDepositario === 'pf'"
          v-model="depositarioNacionalidade"
          label="Nacionalidade"
          placeholder="Nacionalidade do depositário"
          maxlength="50"
        />
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-show="tipoPessoaDepositario === 'pf'"
          v-model="depositarioCep"
          label="CEP"
          placeholder="Defina o CEP"
          v-on:input="load_cep_dep"
        />
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-show="tipoPessoaDepositario === 'pf'"
          v-model="enderecoDepositario"
          label="Endereço"
          placeholder="Endereço completo"
          maxlength="100"
        />
      </div>
      <div class="form-data__item--size-bottom">
        <div v-show="tipoPessoaDepositario === 'pf'"
             class="form-data--two-items-wrapped"
        >
          <span class="form-data--two-items-wrapped__item">
            <IntInput
              v-model="depositarioUf"
              label="UF"
              placeholder="Estado"
            />
          </span>
          <span class="form-data--two-items-wrapped__item">
            <IntInput
              v-model="depositarioCidade"
              label="Município"
              placeholder="Cidade"
            />
          </span>
        </div>
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-show="tipoPessoaDepositario === 'pf'"
          v-model="depositarioObs"
          label="Observações"
          placeholder="Observações"
          maxlength="500"
        />
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-show="tipoPessoaDepositario === 'pj'"
          v-model="depositarioCnpj"
          label="CNPJ"
          placeholder="00.000.000/0000-00"
        />
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-show="tipoPessoaDepositario === 'pj'"
          v-model="depositarioRazaoSocial"
          label="Razão social"
          placeholder="Razão social"
          maxlength="50"
        />
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-show="tipoPessoaDepositario === 'pj'"
          v-model="depositarioEmail"
          label="Email"
          placeholder="email@email.com.br"
        />
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-show="tipoPessoaDepositario === 'pj'"
          v-model="depositarioCep"
          label="CEP"
          placeholder="Defina o CEP "
        />
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-show="tipoPessoaDepositario === 'pj'"
          v-model="enderecoDepositario"
          label="Endereço"
          placeholder="Endereço completo"
        />
      </div>
      <div class="form-data__item--size-bottom">
        <div v-show="tipoPessoaDepositario === 'pj'"
             class="form-data--two-items-wrapped"
        >
          <span class="form-data--two-items-wrapped__item">
            <IntInput
              v-model="depositarioUf"
              label="UF"
              placeholder="Estado"
            />
          </span>
          <span class="form-data--two-items-wrapped__item">
            <IntInput
              v-model="depositarioCidade"
              label="Município"
              placeholder="Cidade"
            />
          </span>
        </div>
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-show="tipoPessoaDepositario === 'pj'"
          v-model="depositarioObs"
          label="Observações"
          placeholder="Observações"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations, mapState, mapGetters } from 'vuex';
import IntInput from '../../../../components/Input.vue';

export default {
  name: 'FormThirdStep',
  mounted() {
    // this.getStep3Options();
  },
  data: () => ({
    // ufOptions: [],
    // cityOptions: [],
  }),
  methods: {
    // async getStep3Options() {
    //   await api.get('/states')
    //     .then((res) => {
    //       this.ufOptions = res.data;
    //     });
    //   await api.get('/cities')
    //     .then((res) => {
    //       this.cityOptions = res.data;
    //     });
    // },
    load_cep() {
      // const url_cep;
      this.title.cepEntrega = this.title.cepEntrega.trim().replace(/[^0-9]/g, '');
      // this.cep = 'https://viacep.com.br/ws/' + this.cep + '/json';
      // clear all headers axios to viacep
      // axios.defaults.headers.common = null;
      axios.get(`https://cors-anywhere.herokuapp.com/https://viacep.com.br/ws/${this.title.cepEntrega}/json`).then((response) => {
        this.title.enderecoEntrega = response.data.logradouro;
        this.title.ufEntrega = response.data.uf;
        this.title.cidadeEntrega = response.data.localidade;
      }).catch((error) => {
        console.log(error.statusText);
      });
    },
    load_cep_dep() {
      // const url_cep;
      this.title.depositario.cep = this.title.depositario.cep.trim().replace(/[^0-9]/g, '');
      // this.cep = 'https://viacep.com.br/ws/' + this.cep + '/json';
      // clear all headers axios to viacep
      // axios.defaults.headers.common = null;
      axios.get(`https://cors-anywhere.herokuapp.com/https://viacep.com.br/ws/${this.title.depositario.cep}/json`).then((response) => {
        this.title.depositario.endereco = response.data.logradouro;
        this.title.depositario.uf = response.data.uf;
        this.title.depositario.cidade = response.data.localidade;
      }).catch((error) => {
        console.log(error.statusText);
      });
    },
    ...mapMutations(
      'title', [
        'UPDATE_PARTIALS_FORM',
        'UPDATE_PARTIALS_SUB_KEY',
        'CHANGE_DEPOSITARY',
        'CHANGE_PERSON_TYPE',
      ],
    ),
  },
  components: {
    IntInput,
  },
  computed: {
    ...mapState('title', ['title']),
    ...mapGetters('title', ['getTypeDepositary']),
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
    localEntrega: {
      get() {
        return this.title.localEntrega;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'localEntrega',
          value,
        });
      },
    },
    cepEntrega: {
      get() {
        return this.title.cepEntrega;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'cepEntrega',
          value,
        });
      },
    },
    enderecoEntrega: {
      get() {
        return this.title.enderecoEntrega;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'enderecoEntrega',
          value,
        });
      },
    },
    ufEntrega: {
      get() {
        return this.title.ufEntrega;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'ufEntrega',
          value,
        });
      },
    },
    cidadeEntrega: {
      get() {
        return this.title.cidadeEntrega;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'cidadeEntrega',
          value,
        });
      },
    },
    periodoEntrega: {
      get() {
        return this.title.periodoEntrega;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'periodoEntrega',
          value,
        });
      },
    },
    depositarioEmitente: {
      get() {
        return this.title.depositarioEmitente !== false;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'depositarioEmitente',
          value,
        });
      },
    },
    tipoPessoaDepositario: {
      get() {
        return this.title.depositario.tipoPessoaDepositario || 'pf';
      },
      set(value) {
        this.UPDATE_PARTIALS_SUB_KEY({
          key: 'depositario',
          subKey: 'tipoPessoaDepositario',
          value,
        });
      },
    },
    enderecoDepositario: {
      get() {
        return this.title.depositario.endereco;
      },
      set(value) {
        this.UPDATE_PARTIALS_SUB_KEY({
          key: 'depositario',
          subKey: 'endereco',
          value,
        });
      },
    },
    depositarioEstadoCivil: {
      get() {
        return this.title.depositario.estadoCivil;
      },
      set(value) {
        this.UPDATE_PARTIALS_SUB_KEY({
          key: 'depositario',
          subKey: 'estadoCivil',
          value,
        });
      },
    },
    depositarioOcupacao: {
      get() {
        return this.title.depositario.ocupacao;
      },
      set(value) {
        this.UPDATE_PARTIALS_SUB_KEY({
          key: 'depositario',
          subKey: 'ocupacao',
          value,
        });
      },
    },
    depositarioEmail: {
      get() {
        return this.title.depositario.email;
      },
      set(value) {
        this.UPDATE_PARTIALS_SUB_KEY({
          key: 'depositario',
          subKey: 'email',
          value,
        });
      },
    },
    depositarioRg: {
      get() {
        return this.title.depositario.rg;
      },
      set(value) {
        this.UPDATE_PARTIALS_SUB_KEY({
          key: 'depositario',
          subKey: 'rg',
          value,
        });
      },
    },
    depositarioNome: {
      get() {
        return this.title.depositario.nome;
      },
      set(value) {
        this.UPDATE_PARTIALS_SUB_KEY({
          key: 'depositario',
          subKey: 'nome',
          value,
        });
      },
    },
    depositarioCpf: {     
      get() {
        return this.title.depositario.cpf;
      },
      set(value) {
        this.UPDATE_PARTIALS_SUB_KEY({
          key: 'depositario',
          subKey: 'cpf',
          value,
        });
      },
    },    
    depositarioCep: {
      get() {
        return this.title.depositario.cep;
      },
      set(value) {
        this.UPDATE_PARTIALS_SUB_KEY({
          key: 'depositario',
          subKey: 'cep',
          value,
        });
      },
    },
    depositarioUf: {
      get() {
        return this.title.depositario.uf;
      },
      set(value) {
        this.UPDATE_PARTIALS_SUB_KEY({
          key: 'depositario',
          subKey: 'uf',
          value,
        });
      },
    },
    depositarioNacionalidade: {
      get() {
        return this.title.depositario.nacionalidade;
      },
      set(value) {
        this.UPDATE_PARTIALS_SUB_KEY({
          key: 'depositario',
          subKey: 'nacionalidade',
          value,
        });
      },
    },
    depositarioCidade: {
      get() {
        return this.title.depositario.cidade;
      },
      set(value) {
        this.UPDATE_PARTIALS_SUB_KEY({
          key: 'depositario',
          subKey: 'cidade',
          value,
        });
      },
    },
    depositarioObs: {
      get() {
        return this.title.depositario.obs;
      },
      set(value) {
        this.UPDATE_PARTIALS_SUB_KEY({
          key: 'depositario',
          subKey: 'obs',
          value,
        });
      },
    },
    depositarioRazaoSocial: {
      get() {
        return this.title.depositario.razaoSocial;
      },
      set(value) {
        this.UPDATE_PARTIALS_SUB_KEY({
          key: 'depositario',
          subKey: 'razaoSocial',
          value,
        });
      },
    },
    depositarioCnpj: {
      get() {
        return this.title.depositario.cnpj;
      },
      set(value) {
        this.UPDATE_PARTIALS_SUB_KEY({
          key: 'depositario',
          subKey: 'cnpj',
          value,
        });
      },
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

  &__upload {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 32px;
    width: 540px;
    background: $--color-gray-1;
    box-shadow: 0px 3px 4px rgba(13, 54, 133, 0.15);
    margin-bottom: 10px;
    border-radius: 4px;
    height: 1257px;

    &--is_pj {
      height: 865px;
    }

    &__info {
      height: 104px;
      width: 212px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        color: $--color-gray-7;
      }

      h5 {
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 20px;
        color: $--color-gray-6;
        align-self: flex-start;
      }
    }

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      background: $--color-gray-3;
      border-radius: 4px;

      button {
        position: relative;
        display: block;
        width: 180px;
        height: 120px;
        color: $--color-primary;

        :nth-child(1) {
          display: flex;
          align-items: center;
          justify-content: center;

          :nth-child(2) {
            margin-left: 9px;
          }
        }

        span {
          color: $--color-primary;
        }

        svg path {
          fill: $--color-primary;
        }
      }
    }
  }

  &__depositary {
    padding: 32px;
    width: 540px;
    background: $--color-gray-1;
    box-shadow: 0px 3px 4px rgba(13, 54, 133, 0.15);
    margin-bottom: 10px;
    border-radius: 4px;
  }

  &__wrapper-inputs {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 32px 32px 8px 32px;
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

  &__radio {
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
