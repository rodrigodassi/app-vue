<template>
  <div
    class="draft-analyse"
  >
    <nav class="draft-analyse__top-bar">
      <RouterLink
        class="draft-analyse__logo"
        to="/"
      >
        <Logo />
      </RouterLink>
    </nav>

    <span
      v-if="empty"
      class="container__empty"
    >
      Minuta inexistente
    </span>
    <template
      v-else
    >
      <IntHeader v-if="nome !== undefined && clientDocument !== undefined"
        statusless
        :closeable="false"
        url-name-redirect="Titles"
        :client="nome"
        :clientDocument="clientDocument"
      />
      <div class="container">
        <div class="container__title-page">
          <h2>Minuta</h2>
        </div>
        <DraftStatusCheck
          :status-list="drafts"
        />
        <ViewPdf v-if="selectedDraft" v-model="selectedDraft.file" :src="getPatchPdf"/>
      </div>

      <div class="footer">
        <div class="footer__btn-actions">
          <div class="footer__btn-actions__group">
            <!-- <IconPrint
              @click.prevent="handlePrint()"
            /> -->
            <a
              download
              :href="getPatchPdf"
              class="footer__btn-actions__group-download"
            >
              <IconDownload/>
            </a>
          <!-- <IconSendEmail/> -->
          </div>
          <div>
            <el-button
              @click="prepareRejectDraft"
              type="danger"
            >Rejeitar
            </el-button>
            <el-button
              @click="prepareApproveDraft"
              type="success"
            >Aprovar
            </el-button>
          </div>
        </div>
      </div>
    </template>

    <IntModal
      :show="modalApproveShow"
      :close-function="closeApproveModal"
      :draft-analyse="true">
      <template v-slot:head>
        <div class="modal__custom-head">
          <IconSuccess/>
          <h2 class="modal__custom-head__success">Aprovar minuta</h2>
        </div>
      </template>
      <template v-slot:body>
        <div class="modal__custom-body">
          <p class="modal__custom-body__p2">Observações</p>
          <el-input
            type="textarea"
            :rows="4"
            placeholder="Observações"
            v-model="obsApprove">
          </el-input>
        </div>
      </template>
      <template v-slot:footer>
        <div class="modal__custom-footer">
          <el-button
            @click="closeApproveModal"
            type="default"
          >Cancelar
          </el-button>
          <el-button
            @click="dispatchDraft('approve')"
            type="success"
          >Aprovar
          </el-button>
        </div>
      </template>
    </IntModal>
    <IntModal
      :show="modalRejectShow"
      :close-function="closeRejectModal"
      :draft-analyse="true">
      <template v-slot:head>
        <div class="modal__custom-head">
          <IconDanger/>
          <h2 class="modal__custom-head__danger">Rejeitar minuta</h2>
        </div>
      </template>
      <template v-slot:body>
        <div class="modal__custom-body">
          <p class="modal__custom-body__p2">Observações</p>
          <el-input
            type="textarea"
            :rows="4"
            placeholder="Observações"
            v-model="obsReject">
          </el-input>
        </div>
      </template>
      <template v-slot:footer>
        <div class="modal__custom-footer">
          <el-button
            @click="closeRejectModal"
            type="default"
          >Cancelar
          </el-button>
          <el-button
            @click="dispatchDraft('reject')"
            type="danger"
          >Rejeitar
          </el-button>
        </div>
      </template>
    </IntModal>
  </div>
</template>

<script>
import { Printd } from 'printd';
import api from '../../../services/api';
import Logo from '../../../assets/svgs/logo.svg';
import IntHeader from '../../../layouts/IntHeader.vue';
import IntModal from '../../../components/Modal.vue';
import DraftStatusCheck from './DraftStatusCheck.vue';
import ViewPdf from '../../../components/ViewPdf.vue';
// import IconPrint from '../../../assets/svgs/icon-print.svg';
import IconSuccess from '../../../assets/svgs/icon-draft-approved.svg';
import IconDanger from '../../../assets/svgs/icon-draft-reject.svg';
import IconDownload from '../../../assets/svgs/icon-download.svg';
import { dateTime } from '../../../helpers';

export default {
  mounted() {
    /* TODO saber como vai ser buscado o id do gestor */
    this.getDrafts();
  },
  name: 'DraftAnalyse',
  components: {
    Logo,
    ViewPdf,
    DraftStatusCheck,
    IntHeader,
    // IconPrint,
    IconDownload,
    IntModal,
    IconSuccess,
    IconDanger,
  },
  data: () => ({
    drafts: [],
    empty: false,
    selectedDraft: {
      //
    },
    tmpTitle: '',
    modalApproveShow: false,
    modalRejectShow: false,
    obsApprove: '',
    obsReject: '',
    loggedUser: {
      id: 1,
      name: 'Escritório J.Ercílio',
    },
    nome: '',
    cprType: '',
    clientDocument: '',
  }),
  methods: {
    async getDrafts() {
      const {
        minuta = null,
        token = null,
      } = this.$route.query || {};

      if (!minuta && !token) {
        this.empty = true;

        return;
      }

      /**
       * @todo
       * Request de busca de minuta com o token para autorização
       */
      let tituloId = 0;
      await api.get(`/minuta/verifica-minuta?minutaId=${minuta}&token=${token}`)
        .then(({ data }) => {
          if (!data) {
            this.empty = true;
            this.drafts = [];
            this.selectedDraft = '';
            return;
          }
          tituloId = data.tituloId;
          console.log('Data tituloId ->', tituloId);
          this.drafts = data.status;

          this.selectedDraft = data;
        })
        .catch(() => {
          /**
           * @todo
           * Tela vazia caso a request possua algum erro
           */
          this.empty = true;
        });
      if (!this.empty) {
        api.get(`titulo/informacoes-header?tituloId=${tituloId}`)
          .then(({ data }) => {
            console.log('Data Info ->', data);
            this.nome = data.nome;
            this.cprType = data.tipo;
            this.clientDocument = data.cpf;
          });
      }
    },
    prepareApproveDraft(index) {
      this.modalApproveShow = true;
      this.tempIndex = index;
    },
    closeApproveModal() {
      this.modalApproveShow = false;
    },
    prepareRejectDraft(index) {
      this.modalRejectShow = true;
      this.tempIndex = index;
    },
    closeRejectModal() {
      this.modalRejectShow = false;
    },

    async dispatchDraft(action) {
      const {
        minuta = null,
        token = null,
      } = this.$route.query || {};

      if (!minuta && !token) {
        this.empty = true;

        return;
      }

      this.selectedDraft.status.push({
        dateTime: dateTime(),
        responsible: this.loggedUser.name,
        condition: action === 'approve' ? 'Aprovada' : 'Rejeitada',
        obs: action === 'approve' ? this.obsApprove : this.obsReject,
      });

      /**
       * @todo
       * Request de aprovação ou rejeição de minuta
       */
      await api.post(`minuta/aprovacao?minutaId=${minuta}&token=${token}`, this.selectedDraft.status)
        .then(() => {
          this.getDrafts();
        });

      this.modalRejectShow = false;

      this.modalApproveShow = false;
    },

    handlePrint() {
      const d = new Printd();

      if (this.getPatchPdf) {
        console.log('print', this.getPatchPdf);
        d.printURL(this.getPatchPdf);
      }
    },
  },
  computed: {
    getPatchPdf() {
      return this.selectedDraft && this.selectedDraft.file ? this.selectedDraft.file : '';
    },
  },
};
</script>

<style scoped lang="scss">
  .draft-analyse {
    width: 100%;
    max-width: 1080px;
    margin: 100px auto 100px auto;

    &__top-bar {
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      z-index: 999;
      position: fixed;
      padding: 14px 32px;
      align-items: center;
      box-sizing: border-box;
      justify-content: space-between;
      background-color: $--color-primary-dark-1;
    }

    &__logo svg {
      height: 40px;
      display: flex;
    }
  }

.container {
  display: flex;
  width: 100%;
  flex-direction: column;
  max-width: 610px;
  margin: 0 auto;

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

  &__empty {
    font-family: $font_primary;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;
    letter-spacing: -0.005em;
    color: $--color-primary;
    padding-bottom: 10px;
  }
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
    justify-content: space-between;
    width: 610px;
    margin: 0 auto;

    &__group {
      display: flex;
      width: 190px;
      justify-content: flex-start;
      align-items: center;

      :last-child {
        margin-left: 10px;
      }

      &-download {
        display: flex;
        align-items: flex-end;
      }
    }

    :nth-child(n) {
      cursor: pointer;
    }
  }
}

.view-pdf {
  margin-top: 30px;
}

.modal {
  &__custom-head {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    :nth-child(1) {
      margin-right: 15px;
    }

    h2 {
      font-family: $font_primary;
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 32px;
    }

    &__danger {
      color: $--color-danger;
    }

    &__success {
      color: #028D64;
    }
  }

  &__custom-body {
    margin-bottom: 24px;

    &__p2 {
      font-family: $font_secondary;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 22px;
      color: $--color-gray-7;
    }

    input[text-area] {
      height: 104px;
    }
  }

  &__custom-footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
