const UPDATE_PARTIALS_GUARANTEE_TYPE = (state, type) => {
  state.guarantee.tipo = type;
};
const UPDATE_PARTIALS_GUARANTEE_PLEDGE = (state, partial) => {
  const { key, value } = partial;
  state.guarantee.penhor[key] = value;
};
const UPDATE_PARTIALS_GUARANTEE_MORTGAGE = (state, partial) => {
  const { key, value } = partial;
  state.guarantee.hipoteca[key] = value;
};
const UPDATE_PARTIALS_GUARANTEE_GUARANTOR = (state, partial) => {
  const { key, value } = partial;
  state.guarantee.avalista[key] = value;
};
const UPDATE_PARTIALS_GUARANTEE_PF_GUARANTOR = (state, partial) => {
  const { key, value } = partial;
  state.guarantee.avalista.pessoaFisica[key] = value;
};
const UPDATE_PARTIALS_GUARANTEE_PF_CONJUGE_GUARANTOR = (state, partial) => {
  const { key, value } = partial;
  state.guarantee.avalista.pessoaFisica.conjuge[key] = value;
};
const UPDATE_PARTIALS_GUARANTEE_PJ_GUARANTOR = (state, partial) => {
  const { key, value } = partial;
  state.guarantee.avalista.pessoaJuridica[key] = value;
};
const UPDATE_PARTIALS_GUARANTEE_PARTIALS = (state, partial) => {
  const { key, subKey, value } = partial;
  state.guarantee[key][subKey] = value;
};
const UPDATE_CURRENT_EDITABLE_GUARANTEE = (state, editableGuarantee) => {
  state.guarantee = editableGuarantee;
};
const SET_GUARANTEE = (state, payload) => {
  state.guarantee_list = payload;
};
const REMOVE_GUARANTEE = (state, id) => {
  state.guarantee_list = state.guarantee_list.filter((el) => el.id !== id);
};

const UPDATE_FILES_PLEDGE = (state, list) => {
  state.guarantee.penhor.file = list;
};
const UPDATE_FILES_MORTGAGE = (state, list) => {
  state.guarantee.hipoteca.file = list;
};
const UPDATE_FILES_GUARANTOR_PF = (state, list) => {
  state.guarantee.avalista.pessoaFisica.file = list;
};
const UPDATE_FILES_GUARANTOR_PJ = (state, list) => {
  state.guarantee.avalista.pessoaJuridica.file = list;
};
const UPDATE_GUARANTOR_BASE = (state, getterTypeGuarantor) => {
  state.guarantee = getterTypeGuarantor;
};
const UPDATE_GUARANTOR_TYPE = (state, type) => {
  state.guarantee.avalista.tipo = type;
};
export {
  UPDATE_PARTIALS_GUARANTEE_TYPE,
  UPDATE_PARTIALS_GUARANTEE_PARTIALS,
  UPDATE_PARTIALS_GUARANTEE_PLEDGE,
  UPDATE_PARTIALS_GUARANTEE_MORTGAGE,
  UPDATE_PARTIALS_GUARANTEE_GUARANTOR,
  UPDATE_PARTIALS_GUARANTEE_PF_GUARANTOR,
  UPDATE_PARTIALS_GUARANTEE_PJ_GUARANTOR,
  UPDATE_PARTIALS_GUARANTEE_PF_CONJUGE_GUARANTOR,
  SET_GUARANTEE,
  UPDATE_CURRENT_EDITABLE_GUARANTEE,
  REMOVE_GUARANTEE,
  UPDATE_FILES_GUARANTOR_PF,
  UPDATE_FILES_GUARANTOR_PJ,
  UPDATE_FILES_PLEDGE,
  UPDATE_FILES_MORTGAGE,
  UPDATE_GUARANTOR_BASE,
  UPDATE_GUARANTOR_TYPE,
};
