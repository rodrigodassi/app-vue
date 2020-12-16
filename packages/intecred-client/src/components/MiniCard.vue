<script>
import IconBoi from '../assets/svgs/icon-boi.svg';
import IconSoja from '../assets/svgs/icon-soja.svg';
import IconTeam from '../assets/svgs/icon-team.svg';
import IconDolar from '../assets/svgs/icon-dolar.svg';
import IconReais from '../assets/svgs/icon-reais.svg';
import IconDocument from '../assets/svgs/icon-document.svg';
import IconDuplicata from '../assets/svgs/icon-duplicata.svg';
import IconFinanceiro from '../assets/svgs/icon-financeiro.svg';

export default {
  components: {
    IconBoi,
    IconSoja,
    IconTeam,
    IconDolar,
    IconReais,
    IconDocument,
    IconDuplicata,
    IconFinanceiro,
  },

  props: {
    tag: {
      type: String,
      required: false,
      default: '',
    },

    label: {
      type: String,
      required: false,
      default: '',
    },

    sum: {
      type: [
        String, Number,
      ],
      required: false,
      default: '',
    },
  },

  computed: {
    icon() {
      return {
        boi: IconBoi,
        soja: IconSoja,
        real: IconReais,
        dolar: IconDolar,
        clients: IconTeam,
        fisica: IconFinanceiro,
        duplicata: IconDuplicata,
        financeira: IconDocument,
      };
    },

    data() {
      const {
        tag,
        sum,
      } = this;

      if (['real', 'dolar'].includes(tag)) {
        return new Intl.NumberFormat('pt-BR', {
          minimumFractionDigits: 2,
        }).format(sum);
      }

      return sum;
    },
  },
};
</script>

<template>
  <div
    class="mini-card"
  >
    <div
      class="mini-card__icon"
    >
      <component
        :is="icon[tag]"
        class="mini-card__svg"
      />
    </div>

    <div
      class="mini-card__wrapper"
    >
      <span
        v-text="data"
        class="mini-card__counter"
        :class="{ 'is-money': tag === 'dolar' || tag === 'real' }"
      />

      <span
        v-text="label"
        class="mini-card__title"
      />
    </div>
  </div>
</template>

<style lang="scss">
  .mini-card {
    min-width: 248px;
    height: 104px;
    display: flex;
    padding-left: 24px;
    border-radius: 4px;
    align-items: center;
    background-color: white;
    box-shadow: 0px 3px 4px rgba(13, 54, 133, 0.15);

    &__icon {
      width: 56px;
      height: 56px;
      display: flex;
      margin-right: 16px;
      border-radius: 50%;
      align-items: center;
      justify-content: center;
      background-color: rgba($color: $--color-secondary, $alpha: .2);
    }

    &__svg {
      width: 24px;
      height: 24px;

      * {
        fill: $--color-primary-dark-1;
      }
    }

    &__wrapper {
      display: flex;
      flex-flow: column nowrap;
    }

    &__counter {
      font-size: 28px;
      line-height: 32px;
      font-weight: bold;
      color: $--color-gray-7;
      font-family: $font_secondary;

      &.is-money {
        font-size: 16px;
      }
    }

    &__title {
      font-size: 14px;
      line-height: 22px;
      color: $--color-gray-7;
      font-family: $font_secondary;
    }
  }
</style>
