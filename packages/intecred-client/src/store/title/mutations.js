const resetDepositary = (state) => state.title.depositario = {
  uf: '',
  cidade: '',
  cep: '',
  endereco: '',
  nacionalidade: '',
  estadoCivil: '',
  ocupacao: '',
  email: '',
  rg: '',
  nome: '',
  cpf: '',
  obs: '',
  cnpj: '',
  razaoSocial: '',
  tipoAssinatura: 'eletronic',
};
const UPDATE_FILES = (state, list) => {
  state.title.files = list;
};
const UPDATE_PARTIALS_FORM = (state, partial) => {
  const { key, value } = partial;
  state.title[key] = value;
};
const UPDATE_PARTIALS_SUB_KEY = (state, partial) => {
  const { key, subKey, value } = partial;
  state.title[key][subKey] = value;
};
const UPDATE_TITLE = (state, data) => {
  state.title = data;
};
const ADD_NEW_ISSUER = (state, count = false) => {
  if (count && count > 0) {
    state.title.emitentes = [];
    return;
  }
  state.title.emitentes.push({
    id: '',
    expiracao: '',
    nome: '',
    rg: '',
    email: '',
    estadoCivil: '',
    tipoAssinatura: 'eletronic',
    inscricaoestadual: '',
    profissao: '',
    nacionalidade: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    cep: '',
    conjuge: {
      rg: '',
      cpf: '',
      email: '',
      nome: '',
      tipoAssinatura: 'eletronic',
      profissao: '',
      nacionalidade: '',
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: '',
    },
  });
};
const CLEAR_OWNERS = (state) => {
  state.title.proprietarios = [];
};
const ADD_NEW_OWNER = (state) => {
  state.title.proprietarios.push({
    id: '',
    cpf: '',
    nome: '',
    rg: '',
  });
};
const REMOVE_OWNER = (state, index) => {
  state.title.proprietarios = state.title.proprietarios.filter((_, key) => key !== index);
};
const REMOVE_ISSUER = (state, index) => {
  state.title.emitentes = state.title.emitentes.filter((_, key) => key !== index);
};
const CLEAR_ISSUER = (state) => {
  state.title.emitentes = [];
};
const CHANGE_DEPOSITARY = (state, option) => {
  if (option === true) {
    state.title.depositario = {};
  } else {
    resetDepositary(state);
  }
  state.title.depositarioEmitente = option;
};
const CHANGE_PERSON_TYPE = (state, option) => {
  state.title.tipoPessoaDepositario = option;

  resetDepositary(state);
};
const UPDATE_PARTIALS_FINANCIAL = (state, { key, value }) => {
  state.financialTitle[key] = value;
};
const CLEAR_STORE = (state) => {
  state.title = {
    cpr: '',
    tipo: '',
    produto: '',
    lavoura: '',
    quantidade: '',
    expiracao: '',
    emitentes: [],
    produtividade: '',
    areaProducao: '',
    nomeFazenda: '',
    uf: '',
    municipio: '',
    ufRegistro: '',
    numeroMatricula: '',
    municipioRegistro: '',
    areaReservaLegal: '',
    areaReservaTotal: '',
    latitude: '',
    longitude: '',
    files: [],
    estadoCivil: '',
    ocupacao: '',
    email: '',
    rg: '',
    nome: '',
    cpf: '',
    tipoArea: '',
    proprietarios: [],
    localEntrega: '',
    cepEntrega: '',
    enderecoEntrega: '',
    ufEntrega: '',
    cidadeEntrega: '',
    periodoEntrega: '',
    depositarioEmitente: '',
    tipoPessoaDepositario: '',
    created: '25/09/2020',
    depositario: {
      // tipoPessoaDepositario: '',
      uf: '',
      cidade: '',
      cep: '',
      endereco: '',
      nacionalidade: '',
      estadoCivil: '',
      ocupacao: '',
      email: '',
      rg: '',
      nome: '',
      cpf: '',
      obs: '',
      cnpj: '',
      razao_social: '',
    },
  };
};
const ADD_NEW_ISSUER_FINANCIAL = (state, count = false) => {
  if (count && count > 0) {
    state.financialTitle.emitentes = [];
    return;
  }
  state.financialTitle.emitentes.push({
    id: '',
    expiracao: '',
    nome: '',
    rg: '',
    email: '',
    estadoCivil: '',
    tipoAssinatura: '',
    conjuge: {
      rg: '',
      cpf: '',
      email: '',
      nome: '',
      tipoAssinatura: '',
    },
  });
};
const REMOVE_ISSUER_FINANCIAL = (state, index) => {
  state.financialTitle.emitentes = state.financialTitle.emitentes.filter((_, key) => key !== index);
};
const UPDATE_TITLE_FINANCIAL = (state, data) => {
  state.financialTitle = data;
};
const UPDATE_FILES_FINANCIAL = (state, list) => {
  state.financialTitle.file = list;
};
const CLEAR_OWNERS_FINANCIAL = (state) => {
  state.financialTitle.proprietarios = [];
};
const ADD_NEW_OWNER_FINANCIAL = (state) => {
  state.financialTitle.proprietarios.push({
    id: '',
    cpf: '',
    nome: '',
    rg: '',
  });
};
const REMOVE_OWNER_FINANCIAL = (state, index) => {
  state.financialTitle.proprietarios = state.financialTitle.proprietarios.filter(
    (_, key) => key !== index,
  );
};
export {
  // eslint-disable-next-line import/prefer-default-export
  CLEAR_STORE,
  UPDATE_TITLE,
  UPDATE_PARTIALS_FORM,
  ADD_NEW_ISSUER,
  ADD_NEW_OWNER,
  CLEAR_OWNERS,
  REMOVE_OWNER,
  REMOVE_ISSUER,
  CLEAR_ISSUER,
  CHANGE_DEPOSITARY,
  CHANGE_PERSON_TYPE,
  UPDATE_PARTIALS_SUB_KEY,
  UPDATE_FILES,
  UPDATE_PARTIALS_FINANCIAL,
  ADD_NEW_ISSUER_FINANCIAL,
  REMOVE_ISSUER_FINANCIAL,
  UPDATE_TITLE_FINANCIAL,
  UPDATE_FILES_FINANCIAL,
  CLEAR_OWNERS_FINANCIAL,
  ADD_NEW_OWNER_FINANCIAL,
  REMOVE_OWNER_FINANCIAL,
};
