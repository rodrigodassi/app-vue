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
        v-model="lavoura"
        label="Safra"
        placeholder="2020 / 21"
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
      <IntInput
        v-model="quantidade"
        label="Quantidade (em kg)"
        placeholder="0,0 kg"
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
      <div
        class="form-data__item--size-bottom"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.rg"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="RG do cônjuge"
          placeholder="000.000.000-00"
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
          placeholder="000.000.000-00"
        />
      </div>
      <div
        class="form-data__item--size-bottom"
        v-if="emitentes[index].estadoCivil === 'married'"
      >
        <IntInput
          v-model="emitentes[index].conjuge.email"
          v-if="emitentes[index].estadoCivil === 'married'"
          label="Email do cônjuge"
          placeholder="Email do cônjuge"
        />
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
import { mapState, mapMutations } from 'vuex';
import api from '../../../../services/api';

import IntModal from '../../../../components/Modal.vue';
import IconEllipse from '../../../../assets/svgs/icon-ellipse.svg';
import IntInput from '../../../../components/Input.vue';
import IconDelete from '../../../../assets/svgs/icon-delete.svg';
import IconPlus from '../../../../assets/svgs/icon-plus.svg';

export default {
  name: 'FormFirstStep',
  mounted() {
    this.getStep1Options();
  },
  components: {
    IntInput,
    IconDelete,
    IconPlus,
    IntModal,
    IconEllipse,
  },
  data: () => ({
    user: 1,
    products: [],
    harvests: [],
    showModalRemoveIssuer: false,
    tempIssuerIndex: null,
  }),
  methods: {
    async getStep1Options() {
      await api.get('/products')
        .then((res) => {
          this.products = res.data;
        });
      await api.get('/harvests')
        .then((res) => {
          this.harvests = res.data;
        });
    },
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
      let { tempIssuerIndex } = this;
      return `Emitente ${tempIssuerIndex += 1}?`;
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
