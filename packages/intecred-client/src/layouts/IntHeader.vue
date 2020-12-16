<template>
  <div class="int-header">
    <!-- <h3 class="int-header__client">
      Darlene Robertson
    </h3> -->
<!--    <template-->
<!--      v-if="!statusless"-->
<!--    >-->
<!--      <p class="int-header__cpr p2">-->
<!--        CPF Física:-->
<!--      </p>-->
<!--      <div class="int-header__status-cpr">-->
<!--        <p class="p2 int-header__status-cpr__status-cpr&#45;&#45;p2-bold">Em criação</p>-->
<!--      </div>-->
<!--    </template>-->
  <template v-if="!statusless">
    <p class="int-header__cpr p2" v-text="cprType" />
    <div class="int-header__status-cpr">
      <p class="p2 int-header__status-cpr__status-cpr--p2-bold" v-text="statusText"/>
    </div>
  </template>
    <span v-if="closeable"  class="int-header__exit int-header__exit--last-item">
      <span class="int-header__exit__text">Sair e continuar depois
      </span>
      <span>
        <i class="int-header__exit--last-item__cursor-icon"
           @click="forceSaveForm()">
          <IconClose/>
        </i>
      </span>
    </span>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import IconClose from '../assets/svgs/icon-rounded-close.svg';

export default {
  name: 'IntHeader',
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
  },
  components: {
    IconClose,
  },
  computed: {
    ...mapGetters('title', ['step', 'title', 'financialTitle', 'duplicateTitle']),
    statusText() {
      if (this.status === 1) {
        return 'Em criação';
      }
      return 'Aberta';
    },
  },
  methods: {
    ...mapActions('title', ['submit']),
    ...mapMutations('title', ['UPDATE_STEP_FORM']),
    forceSaveForm() {
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
        default: throw new Error('Invalid CPR type');
      }
      this.submit({
        title,
        key: this.$route.params.id || null,
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
  align-items: center;
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
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: -0.004em;
    text-align: left;
    width: 98px;
    height: 26px;
    left: 80px;
    top: 0;
    display: flex;
    flex-direction: row;
    padding: 2px 12px;
    background: rgba(234, 112, 0, 0.1);
    border-radius: 4px;
    flex: none;
    align-self: center;
    margin: 8px 0;

    &__status-cpr--p2-bold {
      color: #EA7000;
      flex: none;
      order: 0;
      align-self: center;
      margin: 10px 0;
      font-weight: 700;
    }
  }

  &__exit {
    display: flex;
    align-items: start;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0;
    text-align: left;
    color: #2E3A59;

    &__text {
      margin-right: 5px;
    }
  }

  &__exit--last-item {
    margin-left: auto;

    &__cursor-icon {
      cursor: pointer;
    }
  }
}
</style>
