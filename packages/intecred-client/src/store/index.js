import Vue from 'vue';
import Vuex from 'vuex';

import title from './title';
import guarantee from './guarantee';
// import auth from './auth';
import state from './state';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    title,
    guarantee,
  },
  getters,
  mutations,
  actions,
  state,
});
