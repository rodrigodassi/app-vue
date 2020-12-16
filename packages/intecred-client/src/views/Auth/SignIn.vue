<script>
// import { mapActions, mapMutations } from 'vuex';
import * as Yup from 'yup';
// import api from '../../services/api';
import IntInput from '../../components/Input.vue';

const schema = {
  email: Yup.string()
    .required('Por favor, digite seu e-mail')
    .email('Por favor, digite um e-mail válido'),
  password: Yup.string()
    .required('Por favor, digite sua senha'),
};

export default {
  components: {
    IntInput,
  },

  data: () => ({
    authToken: null,

    form: {
      email: '',
      password: '',
    },

    errors: {
      email: '',
      submit: '',
      password: '',
    },
  }),

  methods: {

    // ...mapActions('auth', [
    //   'autenticacao',
    //   'destroyToken',
    // ]),

    // ...mapMutations('auth', [
    //   'SET_AUTHTOKEN',
    //   'DESTROY_TOKEN',
    //   'SET_EMPRESA_ID_USUARIO',
    // ]),

    auth() {
      const { form } = this;

      Yup.object().shape({ ...schema })
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          // await api.post('http://localhost:64932/api/auth/', {
          //   email: form.email,
          //   password: form.password,
          // })
          this.$store.dispatch('autenticacao', form)
            .then(() => {
              this.$router.push('/dashboard');
            })
            .catch(() => {
              this.errors.submit = 'Desculpe, os dados estão incorretos.';
            });
        })
        .catch((err) => {
          err.inner.forEach((error) => {
            this.errors = { ...this.errors, [error.path]: error.message };
          });
        });
    },

    logout() {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('empresa_Id');
      this.$router.push('/auth/login');
    },
  },
};
</script>

<template>
  <div class="auth__box">
    <h1>Entrar</h1>

    <form
      class="auth__box-form"
      @submit.prevent="auth"
    >
      <int-input
        v-model="form.email"
        placeholder="E-mail"
        :error="errors.email"
      />

      <int-input
        placeholder="Senha"
        v-model="form.password"
        show-password
        :error="errors.password"
      />

      <span
        class="p2 auth__box-form-error"
        v-if="!! errors.submit"
        v-text="errors.submit"
      />

      <div class="auth__box-footer">
        <RouterLink
          to="/auth/recovery"
          class="l2"
        >Esqueci a senha</RouterLink>

        <el-button
          type="primary"
          native-type="submit"
        >Entrar</el-button>
      </div>
    </form>
  </div>
</template>
