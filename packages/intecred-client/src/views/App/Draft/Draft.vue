<template>
  <div>
    <IntHeader
      url-name-redirect="Titles"
      cpr-type="CPR Fisica"
      :status="title.status"
      :client="title.nome"
      :clientDocument="title.cpf"
    />
    <div class="container">
      <div class="container__title-page">
        <h2>Minuta</h2>
        <button
          v-if="lastStatusDraft === 'Rejeitada' || !loadedDraft"
          @click="clearDrafts"
          :class="[
            {'container__title-page__button': true,
            'container__title-page__button--selected-mode': isSelectedMode
            }]">
          Bibilioteca de Minutas
        </button>
      </div>
      <div
        v-if="selectedDraft || loadedDraft && lastStatusDraft === 'Rejeitada'"
        :class="[
          {'container__title-page': true, 'container__title-page--column' : selectedDraft !== ''}
          ]"
      >
        <DraftStatusCheck
          :status-list="loadedDraft.status"
          v-if="loadedDraft && loadedDraft.status && loadedDraft.status.length"
        />
      </div>
      <div v-if="isSelectedMode || loadedDraft && lastStatusDraft === 'Rejeitada'"
           class="container__draft_options">
        <div class="container__draft_options__header">
          <h5 class="container__draft_options__header__item">Selecione um modelo:</h5>
          <IconClose @click="isSelectedMode = !isSelectedMode"/>
        </div>
        <el-radio-group v-model="selectedDraft">
          <div class="container__draft_options__group">
            <div class="container__draft_options__group__item">
              <el-radio
                v-for="item in this.optionsBlock1"
                :key="item.id"
                :label="item.id">{{ item.name }}
              </el-radio>
            </div>
            <div class="container__draft_options__group__item">
              <el-radio
                v-for="item in this.optionsBlock2"
                :key="item.id"
                :label="item.id">{{ item.name }}
              </el-radio>
            </div>
            <div class="container__draft_options__group__item">
              <el-radio
                v-for="item in this.optionsBlock3"
                :key="item.id"
                :label="item.id">{{ item.name }}
              </el-radio>
            </div>
          </div>
        </el-radio-group>
      </div>
      <div v-if="!selectedDraft" class="container__draft_model">
        <div class="container__draft_model--no-selected">
          <div class="container__draft_model--no-selected__icon">
            <IconFile/>
          </div>
          <h3>Selecione o modelo de minuta de CPR</h3>
        </div>
      </div>
      <div v-show="selectedDraft" class="container__draft_selected">
        <h4>Minuta modelo {{ selectedDraft }}</h4>
        <ViewPdf :src="loadedDraft ? loadedDraft.file : selectedPdf"/>
      </div>
    </div>
    <div v-if="selectedDraft || loadedDraft" class="footer">
      <div class="footer__btn-actions">
        <el-button
          @click.prevent="back"
          type="terciary"
        >
          Voltar
        </el-button>

        <a
          download
          :href="loadedDraft ? loadedDraft.file : selectedPdf"
          target="_blank"
          class="footer__btn-actions__group-download"
        >
          <IconDownload
            v-if="lastStatusDraft"
          />
        </a>
        <!-- <IconDownload
          v-if="lastStatusDraft"
          @click="prepareDownloadDraft"
        /> -->

        <el-button
          v-if="lastStatusDraft === 'Rejeitada' || !loadedDraft"
          @click="prepareSendDraft"
          type="primary"
        >Enviar para aprovação
        </el-button>
        <el-button
          v-if="lastStatusDraft === 'Aprovada'"
          @click="goToCompleteCPR"
          type="primary"
        >CPR Completa
        </el-button>
      </div>
    </div>
    <IntModal
      :success="false"
      :draft-options-wrapper='true'
      :close-function="() => this.showPopUpSend = false"
      title="Enviar para aprovação"
      :show="showPopUpSend">
      <div class="modal__box-content">
        <div
          class="modal__box-content__p2">
          Selecione o responsável pela aprovação da minuta de CPR.
        </div>
        <IntInput
          v-model="client"
          label="Selecione o responsável"
          placeholder="Selecione o usuário"
          isSelect
        >
          <el-option
            v-for="(item, index) in clients"
            :key="index"
            :label="item.user.name"
            :value="item.id"
          >
            <span class="el-select__option-child">{{ item.user.name }}</span>
            <span class="el-select__option-child">{{ item.user.document }}</span>
          </el-option>
        </IntInput>
        <div class="modal__box-content__actions">
          <el-button
            type="default"
            @click.prevent="cancelSend"
          >
            Cancelar
          </el-button>

          <el-button
            type="primary"
            @click.prevent="confirmSend"
          >
            Enviar
          </el-button>
        </div>
      </div>
    </IntModal>
    <IntModal
      :show="this.storedDraft"
      :success="true"
      :close-function="() => this.storedDraft = false"
      title="Minuta enviada com sucesso"
    >
      <template v-slot:subtitle>
        <span
          class="modal__text-muted">Aguarde a aprovação de </span>
        <span
          class="modal__text__p2">{{ clientName }}
        </span>
      </template>
      <div class="modal__box-content__actions modal__box-content__actions--success">
        <el-button
          type="primary"
          @click.prevent="showUpdatedDraft"
        >
          Visualizar minuta
        </el-button>
      </div>
    </IntModal>
  </div>
</template>

<script>
import axios from 'axios';
import { Loading } from 'element-ui';
import api from '../../../services/api';
import { date } from '../../../helpers';
import IntInput from '../../../components/Input.vue';
import IntHeader from '../../../layouts/IntHeader.vue';
import IconFile from '../../../assets/svgs/icon-file.svg';
import IconClose from '../../../assets/svgs/icon-close.svg';
import IconDownload from '../../../assets/svgs/icon-download.svg';
import ViewPdf from '../../../components/ViewPdf.vue';
import IntModal from '../../../components/Modal.vue';
import DraftStatusCheck from './DraftStatusCheck.vue';

export default {
  name: 'Draft',
  async mounted() {
    const titleId = parseInt(this.$route.params.titulo, 10);
    const title = () => axios.get(`${this.$url}/titulo/all-titulo?tituloId=${titleId}`,
      {
        headers:
          {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            empresaId: localStorage.getItem('empresa_Id').toString(),
          },
      })
      .then(({ data }) => {
        if (data.minuta !== null) {
          this.selectedDraft = data.minuta.id;
          this.loadedDraft = data.minuta;
        }
        this.title = data;
      });
    const models = () => axios.get(`${this.$url}/minuta/all-draft-models`,
      {
        headers:
          {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            empresaId: localStorage.getItem('empresa_Id').toString(),
          },
      })
      .then(({ data }) => {
        this.draftModels = data;
      });
    await Promise.all([title(), models()]);
  },
  components: {
    DraftStatusCheck,
    IntHeader,
    IconFile,
    IconClose,
    ViewPdf,
    IconDownload,
    IntModal,
    IntInput,
  },
  computed: {
    optionsBlock1() {
      return this.draftModels.slice(0, 5);
    },
    optionsBlock2() {
      return this.draftModels.slice(5, 10);
    },
    optionsBlock3() {
      return this.draftModels.slice(10, 15);
    },
    clientName() {
      if (!this.clients.length || !this.client) {
        return '';
      }
      return this.clients.find((el) => el.id === this.client).user.name;
    },
    lastStatusDraft() {
      if (!this.loadedDraft || !this.loadedDraft.status || !this.loadedDraft.status.length) {
        return null;
      }
      return this.loadedDraft.status[this.loadedDraft.status.length - 1].condition;
    },
  },
  data: () => ({
    draftModels: [],
    isSelectedMode: false,
    selectedPdf: '',
    selectedDraft: '',
    showPopUpSend: false,
    storedDraft: false,
    client: '',
    clients: [],
    loadedDraft: '',
    title: '',
  }),
  methods: {
    prepareSendDraft() {
      this.getClients();
    },
    prepareDownloadDraft() {
      console.log(this.showPopUpSend);
    },
    async getClients() {
      await axios.get(`${this.$url}/usuario/aprovador`,
        {
          headers:
          {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            empresaId: localStorage.getItem('empresa_Id').toString(),
          },
        })
        .then((res) => {
          this.clients = res.data;
          this.showPopUpSend = true;
        })
        .catch((e) => console.log(e));
    },
    cancelSend() {
      this.showPopUpSend = false;
    },
    back() {
      this.$router.push({
        name: 'Part',
        params: { titulo: this.title.id },
      });
    },
    async confirmSend() {
      const loadingInstance = Loading.service({ fullscreen: true });
      if (!this.client) {
        return;
      }

      if (!this.title.minuta) {
        const draft = this.draftModels.find((el) => el.id === this.selectedDraft);

        this.title.minuta = {
          ...draft,
          client: this.client,
          status: [],
        };
      }

      this.title.minuta.status.push({
        condition: 'Enviada',
        responsible: this.clientName,
        obs: 'Aguardando aprovação',
        dateTime: date(),
      });

      console.log('aprovado', this.title);
      axios.post(`${this.$url}/minuta/enviar-aprovacao?tituloId=${this.title.id.toString()}`, this.title,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            empresaId: localStorage.getItem('empresa_Id').toString(),
          },
        })
        .then(({ data }) => {
          this.showPopUpSend = false;
          this.storedDraft = true;
          this.isSelectedMode = false;
          this.title = data;
          // loadingInstance.close();
          /* emulate the spinner */
          setTimeout(() => loadingInstance.close(), 500);
        });
    },
    async showUpdatedDraft() {
      await axios.get(`${this.$url}/minuta/updated-draft?tituloId=${this.title.id}`,
        {
          headers:
          {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            empresaId: localStorage.getItem('empresa_Id').toString(),
          },
        })
        .then(({ data }) => {
          console.log('volta', data);
          this.selectedDraft = data.minuta.id;
          this.loadedDraft = data.minuta;
          this.storedDraft = false;
        });
    },
    clearDrafts() {
      this.isSelectedMode = !this.isSelectedMode;
      this.loadedDraft = '';
    },
    goToCompleteCPR() {
      this.$router.push({
        name: 'CompleteCPR',
        params: { titulo: parseInt(this.$route.params.titulo, 10) },
      });
    },
  },
  watch: {
    async selectedDraft(newValue) {
      if (this.title.minuta && (newValue === this.title.minuta.id)) {
        console.log('titulo', this.title.id);
        await api.get(`/titulo/${this.title.id}`)
          .then(({ data }) => {
            this.selectedDraft = data.minuta.id;
            this.loadedDraft = data.minuta;
            this.storedDraft = false;
          });
        return;
      }
      // this.title.minuta.status = [];
      this.isSelectedMode = true;

      if (newValue) {
        this.isSelectedMode = true;
        console.log('min', newValue);
        axios.get(`${this.$url}/minuta/draft-models?modeloId=${newValue}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
              empresaId: localStorage.getItem('empresa_Id').toString(),
            },
          })
          .then(({ data }) => {
            console.log('file', data);
            this.selectedDraft = newValue;
            this.selectedPdf = data.file;
          })
          .catch(() => {
            this.loadedDraft = '';
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  width: 100%;
  flex-direction: column;
  max-width: 610px;
  margin: 0 auto;

  &__title-page {
    margin-bottom: 28px;
    display: flex;
    justify-content: space-between;

    &--column {
      flex-direction: column;
    }

    h2 {
      font-family: $font_primary;
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 32px;
      letter-spacing: -0.005em;
      color: $--color-primary;
      padding-bottom: 10px;
    }

    &__button {
      font-family: $font_primary;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      display: flex;
      align-items: center;
      text-align: center;
      color: $--color-gray-7;
      border: 1px solid $--color-gray-7;
      border-radius: 4px;
      padding: 8px 15px;

      &--selected-mode {
        background: $--color-gray-7;
        color: $--color-gray-1;
      }
    }
  }

  &__draft_model {
    display: flex;
    width: 610px;
    height: 284px;
    background: $--color-gray-2;
    border-radius: 4px;

    &--no-selected {
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(111, 212, 255, 0.2);
        height: 60px;
        width: 60px;
        border-radius: 50%;
        margin-bottom: 24px;
        fill: $--color-info;

        svg path {
          fill: rgba(111, 212, 255, 1);
        }
      }

      h3 {
        font-family: $font_primary;
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        line-height: 32px;
        color: $--color-gray-7;
      }
    }

  }

  &__draft_options {
    width: 610px;
    height: 284px;
    background: $--color-gray-1;
    border-radius: 4px;
    margin-bottom: 24px;
    padding: 16px 16px 20px 20px;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 16px;

      &__item {
        font-family: $font_primary;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 28px;
        color: $--color-gray-7;
      }

      svg {
        cursor: pointer;
      }
    }

    &__group {
      display: flex;
      justify-content: space-between;
      width: 500px;

      &__item {
        display: flex;
        flex-direction: column;
        width: 160px;
      }
    }
  }
}

.el-radio-group .el-radio {
  margin-left: 0;
}

.el-radio {
  padding: 8px 0;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  height: 89px;
  border-top: 1px solid $--color-gray-5;
  background: $--color-background;

  &__btn-actions {
    display: flex;
    justify-content: flex-end;
    width: 610px;
    margin: 0 auto;

    & > * {
      margin-left: 20px;
      cursor: pointer;
    }
  }
}

.modal {
  &__box-content {
    &__p2 {
      font-family: $font_secondary;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: -0.004em;
      color: $--color-gray-6;
      margin-top: 24px;
      margin-bottom: 46px;
    }

    &__actions {
      margin-top: 25px;
      display: inline-block;
      float: right;

      &--success {
        float: none;
        margin-left: 60px;
      }
    }
  }

  &__p2 {
    font-family: $font_primary;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.004em;
    color: $--color-gray-7;
  }

  &__text-muted {
    font-family: $font_secondary;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;

    letter-spacing: -0.004em;
    color: $--color-gray-6;
  }
}
</style>
