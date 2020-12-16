<script>
import * as Yup from 'yup';
// import axios from 'axios';
import api from '../../services/api';
import IntInput from '../../components/Input.vue';
import IconArrow from '../../assets/svgs/icon-arrow-left.svg';
import IconCheck from '../../assets/svgs/icon-checked.svg';

const schema = {
  email: Yup.string()
    .required('Por favor, digite seu e-mail')
    .email('Por favor, digite um e-mail válido'),
};

export default {
  components: {
    IntInput,
    IconCheck,
    IconArrow,
  },

  data: () => ({
    step: 1,

    form: {
      email: '',
    },

    errors: {
      email: '',
      submit: '',
    },
  }),

  methods: {
    submit() {
      const { form, errors } = this;

      Yup.object().shape({ ...schema })
        .validate(form, { abortEarly: false })
        .then(async () => {
          await api.put(`/conta/RedefinirSenha?email=${form.email}`)
            .then(() => {
              this.step = 2;
            })
            .catch(() => {
              errors.submit = 'Desculpe, esse e-mail não está cadastrado.';
            });
        })
        .catch((err) => {
          err.inner.forEach((error) => {
            this.errors = { ...this.errors, [error.path]: error.message };
          });
        });
    },
  },
};
</script>

<template>
  <div class="auth__box is-recovery">
    <RouterLink
      class="auth__box-go-back l2"
      to="/auth/login"
    >
      <IconArrow />Voltar
    </RouterLink>
    <h1>Esqueci a senha</h1>
    <p class="p1">Por favor, preencha o e-mail cadastrado para enviarmos uma nova senha.</p>

    <form
      class="auth__box-form"
      @submit.prevent="submit"
    >
      <int-input
        v-if="step === 1"
        placeholder="E-mail cadastrado"
        v-model="form.email"
        :error="errors.email"
      />

      <div
        v-else
        class="auth__box-feedback"
      >
        <span>
          <IconCheck />
        </span>

        <p class="p2">
          Uma nova senha foi enviada para:
          <span>{{ form.email }}</span>
        </p>
      </div>

      <span
        class="p2 auth__box-form-error"
        v-if="!! errors.submit"
        v-text="errors.submit"
      />

      <div class="auth__box-footer">
        <el-button
          type="primary"
          @click="step === 2 && $router.go(-1)"
          :native-type="step === 1 ? 'submit' : 'button'"
        >{{ step === 1 ? 'Enviar' : 'Ir para a tela de login' }}</el-button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
.auth__box.is-recovery {
  & > .p1 {
    color: $--color-gray-6;
    margin-top: 12px;
  }

  .auth__box {
    &-form {
      margin-top: 28px;
    }

    &-footer {
      margin-top: 12px;

      button {
        margin-left: auto;
      }
    }

    &-go-back {
      color: $--color-gray-6;
      cursor: pointer;
      display: flex;
      align-items: center;
      margin-bottom: 16px;

      svg {
        margin-right: 8px;
      }
    }

    &-feedback {
      display: flex;
      align-items: center;
      margin-bottom: 40px;

      & > span {
        display: flex;
        min-width: 44px;
        min-height: 44px;
        align-items: center;
        border-radius: 50%;
        justify-content: center;
        background-color: $--color-success-light-2;
      }

      p {
        color: $--color-success;
        display: flex;
        margin-left: 12px;
        flex-direction: column;

        span {
          color: $--color-gray-7;
          margin-top: 4px;
        }
      }
    }
  }
}
</style>
