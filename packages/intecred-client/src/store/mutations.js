  export const ADD_CLIENTE = (state, form) => {
    state.form = form;
  };
  export const SET_CLIENTES = (state, clientes) => {
    state.clientes = clientes;
  };
  export const SET_AUTHTOKEN = (state, authToken) => {
    state.authToken = authToken;
  };
  export const SET_EMPRESA_ID_USUARIO = (state, empresaId) => {
    state.empresaIdUsuario = empresaId;
  };
  export const DESTROY_TOKEN = (state) => {
    state.authToken = null;
    state.empresaIdUsuario = null;
  };
