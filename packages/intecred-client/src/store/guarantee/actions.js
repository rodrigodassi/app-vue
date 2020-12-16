import api from '../../services/api';

const getGuarantee = async ({ commit }, id) => {
  await api.get(`/garantias/${id}`)
    .then((response) => {
      const { data } = response;
      commit('UPDATE_CURRENT_EDITABLE_GUARANTEE', data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const destroyGuarantee = async ({ commit }, data) => {
  console.log('delete', data);
  await api.delete('/garantia', { params: { id: data.id, tipo: data.tipo } })
    .then(() => {
      commit('REMOVE_GUARANTEE', data.id);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getGuarantees = async ({ commit }, titulo) => {
  await api.get(`/garantia/obterGarantia?titulo=${titulo}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        empresaId: localStorage.getItem('empresa_Id').toString(),
      },
    })
    .then((response) => {
      console.log('gara', response);
      commit('SET_GUARANTEE', response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const storeGuarantee = async ({ commit, getters }, data) => {
  const { guaranteeBase } = getters;
  const { penhor, avalista, hipoteca } = guaranteeBase;
  switch (data.tipo) {
    case 'penhor':
      data.avalista = avalista;
      data.hipoteca = hipoteca;
      break;
    case 'hipoteca':
      data.penhor = penhor;
      data.avalista = avalista;
      break;
    case 'avalista':
      data.penhor = penhor;
      data.hipoteca = hipoteca;
      break;
    default:
      break;
  }
  console.log('garantia', data);
  const newData = {
    id: data.id,
    tipo: data.tipo,
    titulo: data.titulo,

    // -------- Avalista
    avalista_pf_cep: data.avalista.pessoaFisica.cep,
    avalista_pf_cidade: data.avalista.pessoaFisica.cidade,
    avalista_pf_cpf: data.avalista.pessoaFisica.cpf,
    avalista_pf_email: data.avalista.pessoaFisica.email,
    avalista_pf_endereco: data.avalista.pessoaFisica.endereco,
    avalista_pf_estadoCivil: data.avalista.pessoaFisica.estadoCivil,
    avalista_pf_nacionalidade: data.avalista.pessoaFisica.nacionalidade,
    avalista_pf_obs: data.avalista.pessoaFisica.obs,
    avalista_pf_ocupacao: data.avalista.pessoaFisica.ocupacao,
    avalista_pf_razaoSocial: data.avalista.pessoaFisica.razaoSocial,
    avalista_pf_rg: data.avalista.pessoaFisica.rg,
    avalista_pf_uf: data.avalista.pessoaFisica.uf,
    avalista_pf_conjuge_cpf: data.avalista.pessoaFisica.conjuge.cpf,
    avalista_pf_conjuge_email: data.avalista.pessoaFisica.conjuge.email,
    avalista_pf_conjuge_nome: data.avalista.pessoaFisica.conjuge.nome,
    avalista_pf_conjuge_rg: data.avalista.pessoaFisica.conjuge.rg,

    avalista_pj_cep: data.avalista.pessoaJuridica.cep,
    avalista_pj_cidade: data.avalista.pessoaJuridica.cidade,
    avalista_pj_cnpj: data.avalista.pessoaJuridica.cnpj,
    avalista_pj_email: data.avalista.pessoaJuridica.email,
    avalista_pj_endereco: data.avalista.pessoaJuridica.endereco,
    avalista_pj_obs: data.avalista.pessoaJuridica.obs,
    avalista_pj_razaoSocial: data.avalista.pessoaJuridica.razaoSocial,
    avalista_pj_uf: data.avalista.pessoaJuridica.uf,

    avalista_tipo: data.avalista.tipo,
    avalista_tipoAssinatura: data.avalista.tipoAssinatura,
    avalista_tipoAvalista: data.avalista.tipo_avalista,

    // -------- Hipoteca
    hipoteca_cidadeComarcaRegistro: data.hipoteca.cidadeComarcaRegistro,
    hipoteca_descricaoImovel: data.hipoteca.descricaoImovel,
    hipoteca_grauHipoteca: data.hipoteca.grauHipoteca,
    hipoteca_numeroMatricula: data.hipoteca.numeroMatricula,
    hipoteca_obs: data.hipoteca.obs,
    hipoteca_tipo: data.hipoteca.tipo,
    hipoteca_tipoHipoteca: data.hipoteca.tipo_hipoteca,
    hipoteca_ufComarcaRegistro: data.hipoteca.ufComarcaRegistro,

    // -------- Penhor
    penhor_areaPlantio: data.penhor.areaPlantio,
    penhor_areaPropriaOuTerceiros: data.penhor.areaPropriaOuTerceiros,
    penhor_cidade: data.penhor.cidade,
    penhor_cidadeComarcaRegistro: data.penhor.cidadeComarcaRegistro,
    penhor_grauPenhor: data.penhor.grauPenhor,
    penhor_mesmoLocalLavoura: data.penhor.mesmoLocalLavoura,
    penhor_nomeFazenda: data.penhor.nomeFazenda,
    penhor_numeroMatricula: data.penhor.numeroMatricula,
    penhor_obs: data.penhor.obs,
    penhor_produto: data.penhor.produto,
    penhor_quantidade: data.penhor.quantidade,
    penhor_safra: data.penhor.safra,
    penhor_tipo: data.penhor.tipo,
    penhor_tipo_penhor: data.penhor.tipo_penhor,
    penhor_uf: data.penhor.uf,
    penhor_ufComarcaRegistro: data.penhor.ufComarcaRegistro,
  };
  console.log('garantia', newData);
  await api.post('/garantia/incluir', data,
    {
      headers:
      {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        empresaId: localStorage.getItem('empresa_Id').toString(),
      },
    })
    .then((res) => {
      commit('UPDATE_CURRENT_EDITABLE_GUARANTEE', guaranteeBase);
      let files = [];
      console.log('tipo', res.data.tipo);
      switch (res.data.tipo) {
        case 'penhor':
          data.avalista = avalista;
          data.hipoteca = hipoteca;
          files = data.penhor.file;
          break;
        case 'hipoteca':
          data.penhor = penhor;
          data.avalista = avalista;
          files = data.hipoteca.file;
          break;
        case 'avalista':
          data.penhor = penhor;
          data.hipoteca = hipoteca;
          files = data.avalista.tipo === 'pf' ? data.avalista.pessoaFisica.file : data.avalista.pessoaJuridica.file;
          break;
        default:
          break;
      }
      console.log('id', res.data.id);
      const form = new FormData();
      files.forEach((file, index) => {
        const json = JSON.stringify(file);
        const blob = new Blob([json], {
          type: 'application/json',
        });
        form.append(`file[garantia][${res.data.id}][${index}]`, blob);
      });
      // console.log('formData', form.length);
      if (files.length > 0) {
        api.post(`/garantia/upload?garantiaId=${res.data.id}&tipo=${res.data.tipo}`, form,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
              'Content-Type': 'multipart/form-data',
            },
          }).then(() => {
          console.log(res.data);
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateGuarantee = async ({ getters }, data) => {
  const { guaranteeBase } = getters;
  const { penhor, avalista, hipoteca } = guaranteeBase;
  const { id } = data;
  let files = [];
  switch (data.tipo) {
    case 'penhor':
      data.avalista = avalista;
      data.hipoteca = hipoteca;
      files = data.penhor.file;
      break;
    case 'hipoteca':
      data.penhor = penhor;
      data.avalista = avalista;
      files = data.hipoteca.file;
      break;
    case 'avalista':
      data.penhor = penhor;
      data.hipoteca = hipoteca;
      files = data.avalista.tipo === 'pf' ? data.avalista.pessoaFisica.file : data.avalista.pessoaJuridica.file;
      break;
    default:
      break;
  }
  const form = new FormData();
  files.forEach((file, index) => {
    const json = JSON.stringify(file);
    const blob = new Blob([json], {
      type: 'application/json',
    });
    form.append(`file[garantia][${id}][${index}]`, blob);
  });
  const updateFiles = () => api.post('images', form);
  const updateGuarantees = () => api.put(`/garantias/${id}`, data)
    .then()
    .catch((error) => {
      console.log(error);
    });
  await Promise.all([updateGuarantees(), updateFiles()]);
};
export {
  // eslint-disable-next-line import/prefer-default-export
  getGuarantee,
  getGuarantees,
  storeGuarantee,
  updateGuarantee,
  destroyGuarantee,
  // updateGuaranteeList,
};
