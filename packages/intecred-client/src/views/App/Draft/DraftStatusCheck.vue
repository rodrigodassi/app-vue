<template>
  <div class="content">
    <h4>Status de aprovação da minuta</h4>
    <table cellspacing="0">
      <tr class="content__header">
        <th>Status</th>
        <th>Responsável</th>
        <th>Dara | hora</th>
        <th>Observações</th>
      </tr>
      <tr class="content__body"
          v-for="(item, index) in statusList"
          :key="index"
      >
        <td>
          <span
            :class="[contentTableBodyItem('condition', item.condition),
             contentTableBodyItemBg('condition', item.condition)]"
          >
            {{ item.condition }}
          </span>
        </td>
        <td>
          <span
            :class="contentTableBodyItem('responsible', item.condition)"
          >
            {{ item.responsible }}
          </span>
        </td>
        <td>
          <span
            :class="contentTableBodyItem('date-time', item.condition)"
          >
            {{ item.dateTime }}
          </span>
        </td>
        <td>
          <span
            :class="contentTableBodyItem('obs', item.condition)"
          >
            {{ composeStr(item.obs, 27) }}
            <IconRight
              @click="showModalInfo(item)"
              v-if="item.condition === 'Rejeitada'"
            />
          </span>
        </td>
      </tr>
    </table>
    <IntModal
      title="Observações"
      :draft-info="true"
      :draftData="tempInfoDraft && tempInfoDraft.obs ? tempInfoDraft : {}"
      :show="showModal !== false"
      :close-function="closeModal"
    />
  </div>
</template>

<script>
import { dateTime, strMaximumLetters } from '../../../helpers';
import IconRight from '../../../assets/svgs/icon-arrow-right.svg';
import IntModal from '../../../components/Modal.vue';

export default {
  name: 'DraftStatusCheck',
  components: {
    IconRight,
    IntModal,
  },
  data: () => ({
    showModal: false,
    tempInfoDraft: '',
  }),
  methods: {
    contentTableBodyItem(key, value) {
      switch (value) {
        case 'Enviada':
          return `content__body__${key}--sent`;
        case 'Rejeitada':
          return `content__body__${key}--rejected`;
        case 'Aprovada':
          return `content__body__${key}--approved`;
        default:
          return '';
      }
    },
    contentTableBodyItemBg(key, value) {
      switch (value) {
        case 'Enviada':
          return `content__body__${key}--sent__bg`;
        case 'Rejeitada':
          return `content__body__${key}--rejected__bg`;
        case 'Aprovada':
          return `content__body__${key}--approved__bg`;
        default:
          return '';
      }
    },
    composeStr(str, limit) {
      return strMaximumLetters(str, limit);
    },
    showModalInfo(item) {
      this.tempInfoDraft = item;
      this.tempInfoDraft.clientName = this.clientName;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.tempInfoDraft = '';
    },
  },
  computed: {
    dateTime() {
      return dateTime();
    },
  },
  props: {
    statusList: {
      type: Array,
      required: false,
    },
  },
};
</script>

<style scoped lang="scss">
.content {

  h4 {
    font-family: $font_secondary !important;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 32px;
    display: flex;
    align-items: center;
    color: #000000;
  }

  table {
    width: 610px;
  }

  &__header {
    height: 32px;
    width: 610px;
    border-radius: 4px;
    align-items: center;
    font-family: $font_secondary;
    margin-bottom: 8px;

    :nth-child(n) {
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 20px;
      color: $--color-gray-6;
    }

    :not(:first-child) {
      margin: 0 18px;
    }

    :nth-child(1) {
      margin-right: 18px;
      margin-left: 12px;
    }
  }

  &__body {
    height: 32px;
    width: 610px;
    background: $--color-gray-1;
    border-radius: 4px;
    align-items: center;

    &__condition--sent, &__responsible--sent, &__obs--sent, &__date-time--sent {
      font-family: $font_secondary !important;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 20px;
      align-items: center;
      color: $--color-warning;

      &__bg {
        background: rgba(234, 112, 0, 0.1);
        border-radius: 4px;
        padding: 4px;
        width: 45px;
        height: 20px;
      }
    }

    &__condition--rejected, &__responsible--rejected, &__obs--rejected, &__date-time--rejected {
      font-family: $font_secondary !important;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 20px;
      align-items: center;
      color: $--color-danger;
      display: flex;
      align-items: center;

      &__bg {
        background: rgba(253, 76, 76, 0.1);
        border-radius: 4px;
        padding: 4px;
        width: 45px;
        height: 20px;
      }

      svg {
        cursor: pointer;
      }
    }

    &__condition--approved, &__responsible--approved, &__obs--approved, &__date-time--approved {
      font-family: $font_secondary !important;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 20px;
      align-items: center;
      color: #028D64;

      &__bg {
        background: rgba(28, 221, 151, 0.08);
        border-radius: 4px;
        padding: 4px;
        width: 45px;
        height: 20px;
        font-weight: bold;
      }
    }
  }
}

td, th {
  text-align: left;
  padding: 8px;
}
</style>
