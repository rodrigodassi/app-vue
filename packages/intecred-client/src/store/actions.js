import axios from 'axios';
import api from '../services/api';

const autenticacao = ({ commit }, form) => new Promise((resolve, reject) => {
  api.post('/autenticacao/login', {
    email: form.email,
    password: form.password,
  })
    .then((response) => {
      localStorage.setItem('auth_token', response.data.token);
      console.log('aaaa ', response.data.empresaId);
      localStorage.setItem('empresa_Id', response.data.empresaId);
      axios.defaults.headers.common.Authorization = response.data.token;
      commit('SET_AUTHTOKEN', response.data.token);
      commit('SET_EMPRESA_ID_USUARIO', response.data.empresaId);
      resolve(response);
    })
    .catch((error) => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('empresa_Id');
      commit('DESTROY_TOKEN');
      reject(error);
    });
});

const autenticacaoExterna = ({ commit }, form) => new Promise((resolve, reject) => {
  console.log('Email -> ', form.email);
  console.log('Senha ->', form.pass);
  api.post(`/autenticacao/external?email=${form.email}&pass=${form.pass}`)
    .then((response) => {
      localStorage.setItem('auth_token', response.data.token);
      console.log('aaaa ', response.data.empresaId);
      localStorage.setItem('empresa_Id', response.data.empresaId);
      axios.defaults.headers.common.Authorization = response.data.token;
      commit('SET_AUTHTOKEN', response.data.token);
      commit('SET_EMPRESA_ID_USUARIO', response.data.empresaId);
      resolve(response);
    })
    .catch((error) => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('empresa_Id');
      commit('DESTROY_TOKEN');
      reject(error);
    });
});

const destroyToken = ({ commit }) => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('empresa_Id');
  delete axios.defaults.headers.common.Authorization;
  commit('DESTROY_TOKEN');
};

export {
  autenticacao,
  destroyToken,
  autenticacaoExterna,
};
