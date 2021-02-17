import './styles/index.scss';
import Vue from 'vue';
import ElementUI from 'element-ui';
import VueTheMask from 'vue-the-mask';
import axios from 'axios';
import locale from 'element-ui/lib/locale/lang/pt-br';
import App from './App.vue';
import store from './store';
// import storeAuth from './store/auth';
import router from './router';// import api from './services';

Vue.use(ElementUI, { locale });
Vue.use(VueTheMask);

Vue.config.productionTip = false;
// Vue.prototype.$url = 'https://intecred.azurewebsites.net/api';
// Vue.prototype.$url = 'http://localhost:60937/api';
// Vue.prototype.$url = 'https://int-teste.azurewebsites.net/api';

// Production:
// Vue.prototype.$url = 'https://prod-intecred.azurewebsites.net/api';

// Homolog:
Vue.prototype.$url = 'https://hml-intecred.azurewebsites.net/api';

// Production SSL:
// Vue.prototype.$url = 'https://app1.intecred.com.br/api';

const authtoken = localStorage.getItem('auth_token');
if (authtoken) {
  axios.defaults.headers.common.Authorization = authtoken;
  // alert('-->>>> ', store.getters.empresaIdUsuario);
  // this.$store.replaceState('empresaIdUsuario', store.getters.empresaIdUsuario);
}

router.beforeEach((to, from, next) => {
  // const token = storeAuth.getters.loggedIn;
  const token = store.getters.loggedIn;
  console.log(token);

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (to.name === 'External') {
      next({
        name: 'External',
      });
    } else
    if (!token) {
      next({
        name: 'Login',
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    if (token) {
      next({
        name: 'Dashboard',
      });
    } else {
      next();
    }
  }
});

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
