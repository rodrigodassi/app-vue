<template>
  <div class="create-title" :key="key">
    <IntHeader url-name-redirect="Titles"/>
    <div class="container">
      <!-- Step 1 dados da CPR -->
      <span v-show="step == 1">
        <h2 class="container__title-alert">Dados da CPR</h2>
        <Alert step-title="step1">
          Aqui nessa tela você deve inserir os dados básicos para iniciar a criação da CPR
        </Alert>
      </span>
      <span v-show="step == 2">
        <h2 class="container__title-alert">Local de formação da lavoura</h2>
        <Alert step-title="step2">
          Aqui você precisa preencher os dados do produto da CPR e da propriedade de cultivo.
        </Alert>
      </span>
      <span v-show="step == 3">
        <h2 class="container__title-alert">Condições de entrega</h2>
        <Alert step-title="step3">
          Agora, você deve preencher as condições e locais da entrega do produto da CPR
        </Alert>
      </span>
      <div class="container__form-data">
        <form>
          <component :is="currentComponentStep"/>
          <ActionsFooter
            :step="step"
            :back="() => this.back()"
            :next="() => this.forceSaveForm()"/>
        </form>
      </div>
    </div>
    <IntModal
      :show="alertDepositaryData"
      :close-function="closeAlertModal"
      :draft-analyse="true">
      <template v-slot:head>
        <div class="modal__custom-head">
          <IconDanger/>
          <h2 class="modal__custom-head__danger">Atenção!</h2>
        </div>
      </template>
      <template v-slot:body>
        <div class="modal__custom-body">
          <p class="modal__custom-body__p2">Favor preencher todos campos do fiel depositário</p>
        </div>
      </template>
      <template v-slot:footer>
        <div class="modal__custom-footer">
          <el-button
            @click="closeAlertModal"
            type="danger"
          >Retornar
          </el-button>
        </div>
      </template>
    </IntModal>
  </div>
</template>

<script>

import { mapState, mapActions, mapGetters } from 'vuex';
import Alert from '../../../components/Alert.vue';
import FormFirstStep from './Partials/FormFirstStep.vue';
import FormThirdStep from './Partials/FormThirdStep.vue';
import FormSecondStep from './Partials/FormSecondStep.vue';
import ActionsFooter from './Partials/ActionsFooter.vue';
import IntHeader from '../../../layouts/IntHeader.vue';
import IntModal from '../../../components/Modal.vue';
import IconDanger from '../../../assets/svgs/icon-draft-reject.svg';

export default {
  name: 'CreateTitle',
  async mounted() {
    console.log('red1', this.$route.params.titulo, this.title.currentStep);
    await this.getTitle(parseInt(this.$route.params.titulo, 10)).then(() => {
      console.log('red2', this.title.currentStep);
      if (this.title.currentStep && this.title.currentStep
        !== parseInt(this.$route.params.step, 10)) {
        console.log('red3', this.title.currentStep);
        this.$router.push({
          name: 'CreateTitle',
          params: {
            titulo: this.title.id,
            step: this.title.currentStep,
          },
        });
      }
    });
  },
  data: () => ({
    key: 0,
    user: 1,
    routeName: '',
    lastAction: '',
    feedback: false,
    alertDepositaryData: false,
  }),
  computed: {
    ...mapState('title', ['title']),
    ...mapGetters('title', ['pfRequiredFields', 'pjRequiredFields']),
    step: {
      get() {
        return parseInt(this.$route.params.step, 10) || 1;
      },
      set(value) {
        return value;
      },
    },
    currentComponentStep() {
      switch (this.step) {
        case 1:
        default:
          return 'FormFirstStep';
        case 2:
          return 'FormSecondStep';
        case 3:
          return 'FormThirdStep';
      }
    },
  },
  methods: {
    ...mapActions('title', ['submit', 'getTitle', 'submitBack']),
    back() {
      alert('id', this.title.id);
      this.submitBack({
        title: {
          id: this.title.id,
        },
        step: 0,
        nextStep: this.step -= 1,
      });
      if (this.step > 1) {
        this.$router.push({
          name: 'CreateTitle',
          params: { step: this.step -= 1 },
        });
      } else {
        this.$router.push({
          name: 'Titles',
        });
      }
    },
    forceSaveForm() {
      console.log('Titleee: ', this.title);
      this.submit({
        title: this.title,
        step: this.step,
        nextStep: this.step += 1,
      });
      let step = parseInt(this.step, 10);
      if (this.step === 3) {
        this.feedback = false;
        if (this.hasPendingDepositaryInput()) {
          this.alertDepositaryData = true;
        } else {
          this.$router.push({
            name: 'Guarantee',
            params: { titulo: this.title.id },
          });
        }
      } else {
        this.$router.push({
          name: 'CreateTitle',
          params: { step: step += 1 },
        });
      }
    },
    hasPendingDepositaryInput() {
      let hasPendency = false;

      if (this.title.depositarioEmitente === false) {
        const requiredFields = this.title.depositario.tipoPessoaDepositario === 'pf'
      || this.title.depositario.tipoPessoaDepositario === ''
          ? this.pfRequiredFields
          : this.pjRequiredFields;
        Object.entries(this.title.depositario)
          .forEach(([key, value]) => {
            if (!requiredFields.includes(key)) {
              return;
            }
            if (value === '') {
              hasPendency = true;
            }
          });
      }

      return hasPendency;
    },
    closeAlertModal() {
      this.alertDepositaryData = false;
    },
  },
  components: {
    IntHeader,
    FormFirstStep,
    FormSecondStep,
    FormThirdStep,
    ActionsFooter,
    Alert,
    IntModal,
    IconDanger,
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  flex-direction: column;
  max-width: 540px;
  margin: 0 auto;

  &__title-alert {
    font-family: $font_primary;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;
    color: $--color-primary;
    margin-bottom: 20px;
  }
}

.modal-feedback {
  &__message {
    display: flex;
    justify-content: space-between;
    align-items: start;

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        svg:nth-child(1) > circle {
          position: absolute;
          fill: $--color-danger;
        }

        svg:nth-child(2) {
          position: absolute;
          fill: $--color-danger;
        }
      }
    }

    h2 {
      font-family: $font_primary;
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 32px;
      color: $--color-danger;
      margin-bottom: 5px;
    }
  }

  &__actions {
    margin-top: 10px;
  }
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
  }

  &__custom-footer {
    text-align: center;
    justify-content: center;
    margin-top: 40px;
  }
}
</style>
