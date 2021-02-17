<script>
import { onlyNumbers } from '../helpers';
import IconAlert from '../assets/svgs/ic-alert.svg';

export default {
  inheritAttrs: false,

  components: {
    IconAlert,
  },

  props: {
    label: {
      type: [Boolean, String],
      default: false,
      required: false,
    },

    value: {
      type: [String, Array, Date, Number],
      required: false,
    },
  },

  data: () => ({
    error: '',
  }),

  methods: {
    handleInput(value) {
      this.$emit('input', value);
    },

    handleBlur() {
      this.error = !this.handleValidate() ? 'CPF Invalido' : '';
    },

    handleValidate() {
      let soma = 0;
      let resto = 0;

      const strCPF = onlyNumbers(this.value);

      if (strCPF === '00000000000' || strCPF === '11111111111') {
        return false;
      }

      for (let i = 1; i <= 9; i += 1) {
        soma += parseInt(strCPF.substring(i - 1, i), 10) * (11 - i);
      }

      resto = (soma * 10) % 11;

      if ((resto === 10) || (resto === 11)) {
        resto = 0;
      }

      if (resto !== parseInt(strCPF.substring(9, 10), 10)) {
        return false;
      }

      soma = 0;

      for (let c = 1; c <= 10; c += 1) {
        soma += parseInt(strCPF.substring(c - 1, c), 10) * (12 - c);
      }

      resto = (soma * 10) % 11;

      if ((resto === 10) || (resto === 11)) {
        resto = 0;
      }

      if (resto !== parseInt(strCPF.substring(10, 11), 10)) {
        return false;
      }

      return true;
    },
  },
};
</script>

<template>
  <div :class="['input', !! error && 'is-error']">
    <label
      v-if="label"
      v-text="label"
    />

    <div class="input__target input__cpf">
      <el-input
        v-bind="$attrs"
        :value="value"
        @input="handleInput"
        @blur="handleBlur"
      >
        <template
          #suffix
          v-if="!! error"
        >
          <i class="input__icon-alert">
            <IconAlert/>
          </i>
        </template>
      </el-input>
      <slot name="action" />
    </div>

    <p
      v-if="!! error"
      class="input__error p3"
      v-text="error"
    />
  </div>
</template>

<style lang="scss">
input {
  width: 200px;
}

.input {
  width: 100%;
  display: flex;
  flex-direction: column;

  label {
    color: $--color-gray-7;
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 2px;
  }

  &__icon {
    margin-left: 16px;
    background-color: $--color-gray-1;

    &-alert {
      margin-top: 10px;
    }
  }

  &__cpf {
    .el-input__suffix {
      display: flex;
      padding-right: 4px;
      align-items: center;
    }
  }

  &__target {
    display: flex;
    align-items: center;

    .el-input, .el-input-number {
      width: 100%;
      .el-input__clear {
        font-size: 16px;
        margin-right: 14px;
      }

      &__inner {
        color: $--color-gray-7;
        padding: 0 16px;
      }

      &--suffix &__inner {
        padding-right: 48px;
        width: 100%;
      }
    }

    .el-date-editor.el-input {
      width: 100%;
    }
  }

  &__number {
    .el-input {
      input {
        text-align: left;
      }
    }
  }

  &__error {
    color: $--color-danger;
    margin-top: 4px;
  }

  &.is-error .el-input {
    &__inner {
      border-color: $--color-danger;
    }

    &__suffix-inner {
      color: $--color-danger;
    }
  }
}
</style>
