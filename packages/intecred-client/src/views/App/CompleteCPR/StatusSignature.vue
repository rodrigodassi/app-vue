<template>
  <div class="box">
    <component :is="avatarType"/>
    <div class="box__info">
      <div class="box__info__p1-bold">
        {{ this.signature.nome || 'Nome não informado' }}
      </div>
      <div class="box__info__divisor"></div>
      <div class="box__info__footer">
        <span :class="[
          { 'box__info__footer__status': true },
          { 'box__info__footer__status--alert': this.signature.status === 'pending' }
          ]">
          {{ this.signature.tipoAssinatura }}
        </span>
        <span class="box__info__footer__info">
          {{ signatureInfo || 'Assinou em 13/05/20 às 13:30' }}
          <!-- todo verificar como vai ser recebido a data-->
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import IconUserAlert from '../../../assets/svgs/icon-user-signature-alert.svg';
import IconUserSuccess from '../../../assets/svgs/icon-user-signature-success.svg';

export default {
  name: 'StatusSignature',
  mounted() {
    console.log(this.signature);
  },
  computed: {
    avatarType() {
      return this.signature.type === 'electronic'
      && this.signature.status === 'pendente'
        ? 'IconUserAlert' : 'IconUserSuccess';
    },
    signatureInfo() {
      switch (this.signature.type) {
        case 'electronic':
          if (!this.signature || !this.signature.status === 'pending') {
            return '';
          }
          return `Assinou em ${this.signature.date}`;
        case 'physical':
          return 'Upload de CPR assinado';
        case 'certificate':
          return `Assinou em ${this.signature.date}`;
        default:
          return '';
      }
    },
  },
  components: {
    IconUserAlert,
    IconUserSuccess,
  },
  props: {
    signature: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.box {
  display: flex;
  padding: 25px 0;
  border-bottom: 1px solid $--color-gray-4;

  &__info {
    margin-left: 24px;

    &__divisor {
      padding: 2.5px;
    }

    &__footer {
      :first-child {
        margin-right: 25px;
      }

      &__status {
        padding: 1px 8px;
        background: rgba(28, 221, 151, 0.08);
        border-radius: 4px;
        font-family: $font_secondary;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 22px;
        letter-spacing: -0.004em;
        color: #028D64;

        &__alert {
          color: $--color-warning;
          background: rgba(234, 112, 0, 0.1);
        }
      }

      &__info {
        font-family: $font_secondary;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 20px;
        color: $--color-gray-7;
      }
    }
  }
}
</style>
