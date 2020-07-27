import Vue from 'vue'
import App from './App.vue'
import router from "./router"
//import VueRouter from "vue-router"
import store from "./store"

//import "bootstrap";
//import "bootstrap/dist/css/bootstrap.min.css";

import 'element-ui/lib/theme-chalk/reset.css'

//import Vue from 'vue';
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
//import App from './App.vue';
import VueResource from 'vue-resource';
import VueTheMask from 'vue-the-mask'

//Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(VueTheMask);

// const router = new VueRouter({
//    routes: routes,
//    mode: 'history'
// })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
