<template>
  <div>
    <div class="int-header">
      <h3 class="int-header__client" v-text="name + ' ('+ cpf +')' "/>
      <template v-if="!statusless">
        <div class="cpr-info">
          <p class="int-header__cpr p2" v-text="cprType"/>
          <div :class="['int-header__status-cpr', statusCprCurrent]">
            <p :class="[ 'p2', inCreation, statusCprCurrent ]" v-text="statusText"/>
          </div>
        </div>
      </template>
      <div v-if="closeable" class="int-header__exit" @click="forceSaveForm()">
        <div class="int-header__exit__text" v-text="closeText"/>
        <div title="Sair e continuar depois">
          <i class="int-header__exit--last-item__cursor-icon">
            <IconClose/>
          </i>
        </div>
      </div>
    </div>
    <div v-if="closeable" class="int-header__exit--responsive">
      <div class="int-header__exit__text" v-text="closeText"/>
      <div title="Sair e continuar depois">
        <i class="int-header__exit--last-item__cursor-icon"
           @click="forceSaveForm()">
          <IconClose/>
        </i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import IconClose from '../assets/svgs/icon-rounded-close.svg';

export default {
  name: 'IntHeader',
  cpf: 'IntHeader',
  mounted() {
    // this.loggedUserName = api.get()
  },
  props: {
    urlNameRedirect: {
      type: String,
      required: false,
    },

    closeable: {
      type: Boolean,
      required: false,
      default: true,
    },

    statusless: {
      type: Boolean,
      required: false,
      default: false,
    },
    cprType: {
      type: String,
      default: 'CPR Física',
    },
    status: {
      type: Number,
      default: 1,
    },

    client: {
      type: String,
      required: false,
      default: '',
    },
    clientDocument: {
      type: String,
      required: false,
      default: '',
    },

    currentStep: {
      type: Number,
      required: false,
      default: null,
    },

    onDischarge: {
      type: Boolean,
      required: false,
      default: false,
    },

    save: {
      type: Function,
      required: false,
      default: null,
    },
  },
  components: {
    IconClose,
  },
  data: () => ({
    loggedUserName: 'Usuário não informado',
  }),
  computed: {
    ...mapGetters('title', ['step', 'title', 'financialTitle', 'duplicateTitle']),
    statusText() {
      if (this.status === 1) {
        return 'Em criação';
      }
      return 'Aberta';
    },
    statusCprCurrent() {
      return this.status === 2 ? 'int-header__status-cpr--current' : '';
    },
    inCreation() {
      return this.status === 1 ? 'int-header__status-cpr__status-cpr--p2-bold' : '';
    },
    closeText() {
      return window.innerWidth > 600 ? 'Sair e continuar depois' : 'Sair';
    },
    name() {
      return this.client || 'Cliente não informado';
    },
    cpf() {
      console.log('gggg', this.clientDocument);
      return this.clientDocument || 'Cpf não informado';
    },
  },
  methods: {
    ...mapActions('title', ['submit']),
    ...mapMutations('title', ['UPDATE_STEP_FORM']),
    forceSaveForm() {
      if (this.onDischarge) {
        this.$router.push({ name: this.urlNameRedirect });

        if (this.save) {
          this.save();
        }

        return;
      }

      let title;
      switch (this.cprType) {
        case 'CPR Física':
          title = this.title;
          break;
        case 'CPR Fisica':
          title = this.title;
          break;
        case 'CPR Financeira':
          title = this.financialTitle;
          break;
        case 'Duplicata':
          title = this.duplicateTitle;
          break;
        default:
          throw new Error('Invalid CPR type');
      }

      title.currentStep = this.currentStep || title.currentStep;

      this.submit({
        title,
        step: title.currentStep,
        nextStep: title.currentStep,
      });

      this.$router.push({ name: this.urlNameRedirect });
    },
  },
};
</script>

<style scoped lang="scss">
.int-header {
  display: flex;
  justify-content: start;
  align-items: baseline;
  align-self: center;
  border-bottom: 1px solid #C5CEE0;
  margin-bottom: 36px;
  padding: 0 20px 20px 20px !important;

  &__client {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 32px;
    color: #2E3A59;
    margin-right: 25px;
  }

  &__cpr {
    font-size: 14px;
    line-height: 22px;
    color: #8F9BB3;
    margin-right: 8px;
    position: static;
    left: 0%;
    right: 59.55%;
    top: 7.69%;
    bottom: 7.69%;
  }

  &__status-cpr {
    display: flex;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: -0.004em;
    text-align: center;
    width: 98px;
    height: 26px;
    left: 80px;
    top: 0;
    padding: 2px 12px;
    background: rgba(234, 112, 0, 0.1);
    border-radius: 4px;
    align-self: center;
    margin: 8px 0;
    justify-content: center;

    &--current {
      background: rgba(111, 212, 255, 0.2);;
      color: $--color-support-blue-dark;
    }

    &__status-cpr--p2-bold {
      color: #EA7000;
      flex: none;
      order: 0;
      align-self: center;
      margin: 10px 0;
      font-weight: 700;

      &--current {
        background: rgba(111, 212, 255, 0.2);;
        color: $--color-support-blue-dark;
      }
    }
  }

  &__exit {
    display: flex;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0;
    text-align: left;
    cursor: pointer;
    color: $--color-gray-7;
    flex: 1 0 auto;
    justify-content: flex-end;

    &--responsive {
      display: none;
    }

    &__text {
      margin-right: 5px;
    }
  }
}

.cpr-info {
  display: flex;
  align-items: center;
}
@media (max-width: 600px) {
  .cpr-info {
    flex-direction: column;
    display: flex;
    align-items: start;
    justify-content: start;
  }
  .int-header {
    flex-direction: column;
  }
  .int-header {
    &__cpr, &__client {
      margin-right: 0;
      padding: 2px 12px;
    }
  }
  .int-header__exit {
    display: none;

    &--responsive {
      display: flex;
      position: absolute;
      top: 90px;
      right: 30px;
    }
  }
}
</style>
