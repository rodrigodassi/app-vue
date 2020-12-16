<template>
  <div>
    <IntHeader url-name-redirect="Titles"/>
    <div class="container">
      <div class="container__title-page">
        <h2>Documentos</h2>
      </div>
      <Alert :show-alert="showAlert">
        Aqui você deve anexar os documentos e certidões referentes a esse cliente e a esse título.
        Esses documentos são muito importantes para certificar e validar as informações cadastradas.
      </Alert>
      <div class="container__list-documents">
        <Upload
          v-for="(item, index) in documentos"
          class="container__list-documents__item"
          :key="index"
          @update-temp-index="updateTempIndex"
          :is-multiple="true"
          v-model="documentos[index].file"
          :title="item.name"
          :description="item.description">
        </Upload>
      </div>
      <ActionsFooter
        :back="returnToGuarantee"
        :next="saveForm"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import IntHeader from '../../../layouts/IntHeader.vue';
import Alert from '../../../components/Alert.vue';
import Upload from '../../../components/Upload.vue';
import ActionsFooter from '../Title/Physical/Partials/ActionsFooter.vue';
// import api from '../../../services/api';

export default {
  name: 'Document',
  mounted() {
    this.getDocuments();
  },
  data: () => ({
    tempIndex: null,
    showAlert: true,
    titulo: '',
    documentos: [
      {
        id: '',
        name: 'Matrícula do imóvel',
        description: 'Matrícula do imóvel de formação da lavoura.',
        alias: 'MatriculasImoveis',
        file: [],
      },
      {
        id: '',
        name: '(Cadastro Ambiental Rural) CAR',
        description: 'Referente ao imóvel rural.',
        alias: 'Cars',
        file: [],
      },
      {
        id: '',
        name: 'Documentos pessoais',
        description: 'RG, CPF, CNH.',
        alias: 'DocumentosPessoais',
        file: [],
      },
      {
        id: '',
        name: 'Contrato de arrendamento',
        description: 'Para áreas arrendadas.',
        alias: 'ContratosArrendamentos',
        file: [],
      },
      {
        id: '',
        name: 'Carta de anuência',
        description: 'Anexar carta de anuência, quando houver.',
        alias: 'CartasAnuencias',
        file: [],
      },
      {
        id: '',
        name: 'Certidão de penhor (livro 3)',
        description: 'Certidão obtida.',
        alias: 'CertidoesPenhor',
        file: [],
      },
      {
        id: '',
        name: 'Certidão de registro de alienação fiduciária',
        description: 'Anexar, quando houver.',
        alias: 'CertidoesFiduciaria',
        file: [],
      },
      {
        id: '',
        name: 'Certidão de embargo do IBAMA',
        description: 'Anexar, quando houver.',
        alias: 'CertidoesIbama',
        file: [],
      },
      {
        id: '',
        name: 'Outros',
        description: 'Anexar outros documentos.',
        alias: 'OutrosDocumentos',
        file: [],
      },
    ],
  }),
  methods: {
    updateTempIndex(index) {
      this.tempIndex = index;
    },
    async dispatchDocumentByAlias(form) {
      // 16.11.20
      // const updateTitle = () => api.patch(`/titulos/${this.title}`, this.titulo);
      // const updateImages = () => api.post('/images/', form, {
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      // const formDocumento = {
      //   documentoId: form.id,
      //   titulo: form.titulo,
      // };
      // await axios.post('/documento', formDocumento,
      //   {
      //     headers:
      // {
      //   Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      //   empresaId: localStorage.getItem('empresa_Id').toString(),
      // },
      //   })
      //   .then(async (response) => {
      //   // console.log('files', payload.files);

      //     const formData = new FormData();

      //     for (let i = 0; i < formDocumento.documentos.length; i += 1) {
      //       const file = formDocumento.documentos[i].raw;
      //       formData.append('documentos', file);
      //     }
      //     await axios.post(`${this.$url}/documento/upload?tituloId=
      // ${this.title.toString()}`, form, {
      //       headers: {
      //         Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      //         'Content-Type': 'multipart/form-data',
      //       },
      //     })
      //       .then(() => {
      //       });
      //     commit('UPDATE_TITLE', response.data);
      //   });
      // - Até aqui
      await axios.post(`${this.$url}/documento/upload?tituloId=${this.title.toString()}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      // await Promise.all([updateTitle(), updateImages()])
      //   .then(() => this.$router.push({
      //     name: 'Part',
      //     params: { titulo: this.title },
      //   }));
    },
    async getDocuments() {
      const title = parseInt(this.$route.params.titulo, 10);
      console.log('title ->', title);
      await axios.get(`${this.$url}/documento/getDocumentos?id=${title.toString()}`,
        {
          headers:
            {
              Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
              empresaId: localStorage.getItem('empresa_Id').toString(),
            },
        }).then(async ({ data }) => {
        console.log('Data ->', data);
        this.titulo = data;
        if (!data.documentos) {
          this.documentos.forEach(
            (el) => {
              el.titulo = title;
            },
          );
          return;
        }
        console.log('Docs2 ->', data.documentos);
        // alert('passou aqui votla doc');
        data.documentos.forEach(
          (el) => {
            const loadedDoc = this.documentos.find((document) => document.alias === el.alias);
            loadedDoc.id = el.id;
            loadedDoc.file = el.file;
            loadedDoc.titulo = title;
          },
        );
      })
        .catch((error) => console.log(error));
    },
    async returnToGuarantee() {
      await axios.get(`${this.$url}/titulo/recarrega-titulo?id=${this.title}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            empresaId: localStorage.getItem('empresa_Id').toString(),
          },
        })
        .then(({ data }) => {
          this.titulo = data;
        });
      await this.updateCurrentStep('decrement');
      await this.$router.push({
        name: 'Guarantee',
        params: { titulo: this.title },
      });
    },
    goToParts() {
      this.$router.push({
        name: 'Part',
        params: { titulo: this.title },
      });
    },
    composeForm() {
      const form = new FormData();
      console.log('Documentos -> ', this.documentos);
      if (this.documentos !== null) {
        this.titulo.documentos = this.documentos;
        this.documentos.forEach((document) => {
          document.file.forEach((file) => {
            const json = JSON.stringify(file);
            const blob = new Blob([json], {
              type: 'application/json',
            });
            // form.append(`file[${document.alias}][${index}]`, blob);
            form.append(`${document.alias}`, blob, file.name);
          });
        });
      }
      return form;
    },
    async updateCurrentStep(action) {
      const handledStep = this.getFutureStep(this.titulo, action);
      // await api.patch(`titulo/${this.titulo.id}`, { currentStep: handledStep })
      axios.post(`${this.$url}/dadosCpr/tituloCompleto-2?id=${this.titulo.id}&currentStep=${handledStep}`, this.titulo,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            empresaId: localStorage.getItem('empresa_Id').toString(),
          },
        })
        .then(() => {
        });
    },
    getFutureStep({ tipo }, action) {
      if (tipo === 'Fisica' || tipo === 'Duplicata') {
        return action === 'decrement' ? 4 : 6;
      }
      return action === 'decrement' ? 3 : 5;
    },
    saveForm() {
      this.dispatchDocumentByAlias(this.composeForm());
      this.goToParts(this.titulo);
    },
  },
  components: {
    ActionsFooter,
    IntHeader,
    Alert,
    Upload,
  },
  computed: {
    title() {
      return parseInt(this.$route.params.titulo, 10);
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  width: 100%;
  flex-direction: column;
  max-width: 540px;
  margin: 0 auto;

  &__title-page {
    margin-bottom: 20px;

    h2 {
      font-family: $font_primary;
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 32px;
      letter-spacing: -0.005em;
      color: $--color-primary;
    }
  }

  &__list-documents {
    .upload {
      margin: 10px 0;
    }
  }
}

.alert-box {
  padding: 50px 0;
}
</style>
