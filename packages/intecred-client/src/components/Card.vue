<script>
import Tag from './Tag.vue';
import IconDocument from '../assets/svgs/icon-document.svg';

export default {
  components: {
    Tag,
    IconDocument,
  },

  props: {
    status: {
      type: Number,
      required: false,
      default: 1,
    },

    nome: {
      type: String,
      required: false,
      default: null,
    },

    cpf: {
      type: String,
      required: false,
      default: null,
    },

    cnpj: {
      type: String,
      required: false,
      default: null,
    },

    valor: {
      type: [String, Number],
      required: false,
      default: null,
    },

    quantidade: {
      type: [String, Number],
      required: false,
      default: null,
    },

    tipo: {
      type: String,
      required: false,
      default: null,
    },

    municipio: {
      type: String,
      required: false,
      default: null,
    },

    pontuacao: {
      type: Number,
      required: false,
      default: null,
    },

    redirectLink: {
      type: Function,
      required: false,
    },
  },

  computed: {
    document() {
      const {
        cpf,
        tipo,
        cnpj,
      } = this;

      return tipo === 'Física' || tipo === 'fisica' || tipo === 'Fisica' ? cpf : cnpj;
    },
  },
  methods: {
    redirect() {
      if (!this.redirectLink) {
        return;
      }
      this.redirectLink();
    },
  },
};
</script>

<template>
  <div @click="redirect">
    <el-card
      class="card"
    >
      <div
        class="card__top"
      >
        <Tag
          :status="status"
        />
      </div>

      <div
        class="card__body"
      >
        <span
          v-text="nome"
          class="card__label"
        />

        <span
          v-text="document"
          class="card__register"
        />

        <div
          class="card__type"
        >
          <IconDocument
            class="card__svg"
          />

          CPR {{ tipo }} - {{ municipio }}
        </div>

        <span v-if="tipo !== 'Fisica'"
          class="card__value"
        > R$ {{ valor }} </span>

         <span v-else
          class="card__value"
        >{{ quantidade }} Kg</span>

      </div>
    </el-card>
  </div>
</template>

<style lang="scss">
  .card {
    width: 336px;
    min-height: 226px;

    &__top {
      margin-bottom: 20px;
    }

    &__body {
      display: flex;
      flex-flow: column nowrap;
    }

    &__label {
      display: block;
      font-size: 20px;
      line-height: 32px;
      margin-bottom: 4px;
      color: $--color-gray-7;
      font-family: $font_primary;
    }

    &__register {
      display: block;
      font-size: 16px;
      line-height: 28px;
      margin-bottom: 4px;
      color: $--color-gray-6;
      font-family: $font_secondary;
    }

    &__type {
      display: flex;
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 12px;
      align-items: flex-start;
      color: $--color-gray-6;
      font-family: $font_secondary;
    }

    &__svg {
      margin-left: -4px;

      * {
        fill: $--color-gray-6;
      }
    }

    &__value {
      display: block;
      font-size: 16px;
      line-height: 32px;
      font-weight: bold;
      color: $--color-gray-7;
      font-family: $font_secondary;
    }
  }
</style>
