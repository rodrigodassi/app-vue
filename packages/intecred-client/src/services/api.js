import axios from 'axios';

// ----------------------------- DESENVOLVIMENTO -----------------------------
//
// const url = 'http://localhost:60937/api'.toString();
// const AllowOrigin = '';
// const AllowMethods = '';
//
// --------------------------------- HOMOLOGAÇÃO --------------------------------
//
const url = 'https://hml-intecred.azurewebsites.net/api'.toString();
const AllowOrigin = 'https://hml-front-intecred.azurewebsites.net';
const AllowMethods = 'GET,HEAD,OPTIONS,POST,PUT';
//
// --------------------------------- PRODUCAO --------------------------------
//
// const url = 'https://app1.intecred.com.br/api'.toString();
// const AllowOrigin = 'https://app.intecred.com.br';
// const AllowMethods = 'GET,HEAD,OPTIONS,POST,PUT';
//
// ------------------------------- Teste -------------------------------
//
// const url = 'https://int-teste.azurewebsites.net/api'.toString();
// const AllowOrigin = 'https://testefront.z15.web.core.windows.net';
// const AllowMethods = 'GET,HEAD,OPTIONS,POST,PUT,PATCH';
// ***************************************************************************

let localEmpresaId = localStorage.getItem('empresa_Id');
if (localEmpresaId !== null) {
  localEmpresaId = localStorage.getItem('empresa_Id').toString();
}

let localToken = localStorage.getItem('auth_token');
if (localToken !== null) {
  localToken = localStorage.getItem('auth_token').toString();
}

const api = axios.create({
  baseURL: url,
  headers: {
    // Authorization: `Bearer ${localToken}`,
    empresaId: localEmpresaId,
    'Content-Type': 'application/json',
  },
});

api.defaults.headers.common.Authorization = `Bearer ${localToken}`;
api.defaults.headers.common['Access-Control-Allow-Origin'] = AllowOrigin;
api.defaults.headers.common['Access-Control-Allow-Methods'] = AllowMethods;

export default api;
