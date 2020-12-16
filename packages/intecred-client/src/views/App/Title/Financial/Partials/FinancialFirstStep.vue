<template>
  <div>
    <div class="form-data__item--size-bottom">
      <IntInput
        v-model="cpr"
        label="Número da CPR"
        placeholder="Insira o número da CPR"
      />
    </div>
    <div class="form-data__item--size-bottom">
      <IntInput
        style="display: block"
        v-model="dataVencimento"
        label="Data do vencimento"
        placeholder="DD/MM/AAAA"
        isDate
      />
    </div>
    <div class="form-data__item--size-bottom">
      <div class="form-data__radio">
        <small>Moeda?</small>
        <el-radio-group v-model="moeda">
          <el-radio label="real">Real(BRL)</el-radio>
          <el-radio label="dolar">Dolar</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="form-data__item--size-bottom">
      <IntInput
        v-model="valor"
        label="Valor em reais"
        placeholder="R$ 0,00"
        type="numeric"
      />
    </div>
    <div class="form-data__item--size-bottom">
      <IntInput
        v-model="produto"
        label="Produto"
        placeholder="Selecione o produto para CPR"
        isSelect
      >
        <el-option
          v-for="(item, index) in products"
          :key="index"
          :label="item.product.name"
          :value="item.product.name"
        >
          <span class="el-select__option-child">{{ item.product.name }}</span>
          <span class="el-select__option-child">{{ item.product.id }}</span>
        </el-option>
      </IntInput>
    </div>
    <div class="form-data__item--size-bottom">
      <IntInput
        v-model="safra"
        label="Safra"
        placeholder="200/21"
        isSelect
      >
        <el-option
          v-for="(item, index) in harvests"
          :key="index"
          :label="item.harvest.name"
          :value="item.harvest.name"
        >
          <span class="el-select__option-child">{{ item.harvest.name }}</span>
          <span class="el-select__option-child">{{ item.harvest.id }}</span>
        </el-option>
      </IntInput>
    </div>
    <div class="form-data__item--size-bottom">
      <div class="form-data__checkbox">
        <span class="form-data__checkbox__info">
          <p class="form-data__item--size-bottom__p1">Emitente da CPR:</p>
        </span>
        <div class="el-checkbox-group">
          <el-checkbox
            :checked="clienteEmitente"
            v-model="clienteEmitente">Próprio cliente
          </el-checkbox>
          <el-checkbox
            v-model="hasIssuer"
            @change="ADD_NEW_ISSUER_FINANCIAL(emitentes.length)">
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
          v-model="emitentes[index].expiracao"
          label="CPF"
          placeholder="000.000.000-00"
        />
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-model="emitentes[index].nome"
          label="Nome"
          placeholder="Defina o nome completo"
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
          v-model="emitentes[index].email"
          label="Email"
          placeholder="email@email.com"
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
      <div class="form-data__item--condition"
           v-if="emitentes[index].estadoCivil === 'married'">
        <div
          class="form-data__item--size-bottom"
        >
          <IntInput
            v-model="emitentes[index].conjuge.rg"
            label="RG do cônjuge"
            placeholder="000.000.000-00"
          />
        </div>
        <div
          class="form-data__item--size-bottom"
        >
          <IntInput
            v-model="emitentes[index].conjuge.cpf"
            label="CPF do cônjuge"
            placeholder="000.000.000-00"
          />
        </div>
        <div
          class="form-data__item--size-bottom"
          v-if="emitentes[index].estadoCivil === 'married'"
        >
          <IntInput
            v-model="emitentes[index].conjuge.email"
            label="Email do cônjuge"
            placeholder="Email do cônjuge"
          />
        </div>
      </div>
      <div
        class="form-data__item--size-bottom
         form-data__item--size-bottom--no-margin"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.nome"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="Nome do cônjuge"
          placeholder="Defina o nome completo"
        />
      </div>
    </div>
    <div>
      <button
        class="form-data__add-issuer"
        v-if="emitentes.length" @click.stop.prevent="ADD_NEW_ISSUER_FINANCIAL">
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
          <div>
            <h2>Deseja excluir:</h2>
            <p>{{ modalInfo }}</p>
          </div>
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
import { mapState, mapMutations } from 'vuex';
import IntInput from '../../../../../components/Input.vue';
import IntModal from '../../../../../components/Modal.vue';
import IconDelete from '../../../../../assets/svgs/icon-delete.svg';
import IconPlus from '../../../../../assets/svgs/icon-plus.svg';
import IconEllipse from '../../../../../assets/svgs/icon-ellipse.svg';
import api from '../../../../../services/api';

export default {
  async mounted() {
    await api.get('/products')
      .then((res) => {
        this.products = res.data;
      });
    await api.get('/harvests')
      .then((res) => {
        this.harvests = res.data;
      });
    await api.get('/civil-status')
      .then((res) => {
        this.civilStatus = res.data;
      });
  },
  name: 'FinancialFirstStep',
  data: () => ({
    products: [],
    harvests: [],
    civilStatus: [],
    showModalRemoveIssuer: false,
    tempIssuerIndex: '',
  }),
  methods: {
    ...mapMutations('title', [
      'UPDATE_PARTIALS_FINANCIAL',
      'ADD_NEW_ISSUER_FINANCIAL',
      'REMOVE_ISSUER_FINANCIAL',
    ]),
    closeModal() {
      this.showModalRemoveIssuer = false;
    },
    prepareModalRemoveIssuer(index) {
      this.showModalRemoveIssuer = true;
      this.tempIssuerIndex = index;
    },
    removeIssuer() {
      this.REMOVE_ISSUER_FINANCIAL(this.tempIssuerIndex);
      this.showModalRemoveIssuer = false;
      this.tempIssuerIndex = null;
    },
    cancelRemoveIssuer() {
      this.showModalRemoveIssuer = false;
      this.tempOwnerIndex = null;
    },
  },
  computed: {
    ...mapState('title', ['financialTitle']),
    hasIssuer: {
      get() {
        return this.financialTitle.emitentes.length !== 0;
      },
      set() {
      },
    },
    modalInfo() {
      let { tempIssuerIndex } = this;
      return `Emitente ${tempIssuerIndex += 1}?`;
    },
    cpr: {
      get() {
        return this.financialTitle.cpr;
      },
      set(value) {
        this.UPDATE_PARTIALS_FINANCIAL({
          key: 'cpr',
          value,
        });
      },
    },
    dataVencimento: {
      get() {
        return this.financialTitle.dataVencimento;
      },
      set(value) {
        this.UPDATE_PARTIALS_FINANCIAL({
          key: 'dataVencimento',
          value,
        });
      },
    },
    moeda: {
      get() {
        return this.financialTitle.moeda || 'real';
      },
      set(value) {
        this.UPDATE_PARTIALS_FINANCIAL({
          key: 'moeda',
          value,
        });
      },
    },
    valor: {
      get() {
        return this.financialTitle.valor || 0.00;
      },
      set(value) {
        this.UPDATE_PARTIALS_FINANCIAL({
          key: 'valor',
          value,
        });
      },
    },
    produto: {
      get() {
        return this.financialTitle.produto;
      },
      set(value) {
        this.UPDATE_PARTIALS_FINANCIAL({
          key: 'produto',
          value,
        });
      },
    },
    safra: {
      get() {
        return this.financialTitle.safra;
      },
      set(value) {
        this.UPDATE_PARTIALS_FINANCIAL({
          key: 'safra',
          value,
        });
      },
    },
    clienteEmitente: {
      get() {
        return this.financialTitle.clienteEmitente !== false;
      },
      set(value) {
        this.UPDATE_PARTIALS_FINANCIAL({
          key: 'clienteEmitente',
          value,
        });
      },
    },
    emitentes: {
      get() {
        return this.financialTitle.emitentes;
      },
      set(value) {
        this.UPDATE_PARTIALS_FINANCIAL({
          key: 'emitentes',
          value,
        });
      },
    },
  },
  components: {
    IntInput,
    IntModal,
    IconDelete,
    IconPlus,
    IconEllipse,
  },
};
</script>

<style scoped lang="scss">
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

  &__radio {
    display: flex;
    align-items: center;

    small {
      font-family: $font_secondary;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      display: flex;
      align-items: center;
      color: $--color-gray-6;
      padding-right: 15px;
    }
  }

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
