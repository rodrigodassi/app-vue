import api from '../../services/api';

const getTitle = async ({ commit }, id) => {
  await api.get(`/titulo/${id}`)
    .then((response) => {
      commit('UPDATE_TITLE', response.data);
    });
};

const submitBack = async ({ commit }, { title, step, nextStep }) => {
  const zeroFill = (n) => (`0${n}`).slice(-2);
  const now = new Date();
  const date = `${zeroFill(now.getUTCDate())}/${zeroFill((now.getMonth() + 1))}/${now.getFullYear()}`;
  title.created = date;
  if (nextStep && (nextStep > 0 && nextStep < 5)) {
    title.currentStep = nextStep;
  }
  const { id } = title;
  console.log('Backk ->', title);
  const updateTitle = () => api.post(`/dadoscpr/Back?id=${id}`, title,
    {
      headers:
      {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        empresaId: localStorage.getItem('empresa_Id').toString(),
      },
    })
    .then((response) => {
      console.log('data', response.data);
      commit('UPDATE_TITLE', response.data);
    });
  if (!step || step !== 2) {
    await Promise.all([updateTitle()]);
    // return;
  }
};

const submit = async ({ commit }, { title, step, nextStep }) => {
  const zeroFill = (n) => (`0${n}`).slice(-2);
  const now = new Date();
  const date = `${zeroFill(now.getUTCDate())}/${zeroFill((now.getMonth() + 1))}/${now.getFullYear()}`;
  title.created = date;
  if (nextStep && (nextStep > 0 && nextStep < 5)) {
    title.currentStep = nextStep;
  }
  const { id } = title;
  console.log('-->', title);
  const updateTitle = () => api.post(`/dadosCpr/tituloCompleto?id=${id}`, title,
    {
      headers:
      {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        empresaId: localStorage.getItem('empresa_Id').toString(),
      },
    })
    .then(async (response) => {
      // console.log('files', payload.files);

      // const formData = new FormData();
      // console.log('Title 1611 -> ', title);
      // for (let i = 0; i < title.files.length; i += 1) {
      //   const file = title.files[i].raw;
      //   formData.append('importararquivos', file);
      // }

      const formData = new FormData();
      title.files.forEach((file) => {
        const json = JSON.stringify(file);
        const blob = new Blob([json], {
          type: 'application/json',
        });
        // form.append(`file[titulo][${title.id}][${index}]`, blob);
        formData.append('importararquivos', blob, file.name);
      });
      console.log('-----> ', formData);
      console.log('formacaoLavouraId -> ', response.data.formacaoLavoura.formacaoLavouraId);
      await api.post(`/formacaoLavoura/upload?formacaoLavouraId=${response.data.formacaoLavoura.formacaoLavouraId.toString()}`, formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
        });
      commit('UPDATE_TITLE', response.data);
    });
  if (!step || step !== 2) {
    await Promise.all([updateTitle()]);
    return;
  }
  const form = new FormData();
  title.files.forEach((file) => {
    const json = JSON.stringify(file);
    const blob = new Blob([json], {
      type: 'application/json',
    });
    // form.append(`file[titulo][${title.id}][${index}]`, blob);
    form.append(`file[titulo][${title.id}]`, blob, file.name);
  });
  const updateFiles = () => api.post('images', form);
  await Promise.all([updateTitle(), updateFiles()]);
};

export {
  getTitle,
  submit,
  submitBack,
};
