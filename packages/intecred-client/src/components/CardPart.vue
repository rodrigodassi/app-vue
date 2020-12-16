<template>
  <div class="box">
    <div class="box__info">
      <div class="box__info__icon">
        <IntUser/>
      </div>
      <div class="box__info__user-data">
        <span class="box__info__user-data__p1">{{ name }}</span>
        <span class="box__info__user-data__p3">{{ email }}</span>
      </div>
    </div>
    <div class="box__divisor"></div>
    <div class="box__actions">
      <span class="box__actions__muted">Tipo de assinatura:</span>
      <el-radio-group v-model="selected">
        <el-radio @change="changeSignature('electronic')"
                  label="electronic">Eletrônica
        </el-radio>
        <el-radio @change="changeSignature('physical')"
                  label="physical">Física
        </el-radio>
        <el-radio @change="changeSignature('certificate')"
                  label="certificate">Certificado
        </el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import IntUser from '../assets/svgs/icon-user.svg';

export default {
  name: 'CardPart',
  created() {
    this.selected = this.value || 'electronic';
    if (!this.value) {
      this.dispatchEvent('electronic');
    }
  },
  data: () => ({
    selected: '',
  }),
  methods: {
    changeSignature(value) {
      this.selected = value;
      this.dispatchEvent(value);
    },
    dispatchEvent(value) {
      if (this.$vnode.key) {
        this.$emit('change-signature', value, this.part, this.$vnode.key, this.isSpouse);
        return;
      }
      this.$emit('change-signature', value, this.part);
    },
  },
  props: ['name', 'email', 'value', 'part', 'isSpouse'],
  components: {
    IntUser,
  },
};
</script>

<style scoped lang="scss">
.box {
  background: $--color-gray-1;
  height: 192px;
  width: 540px;
  border-radius: 8px;
  padding: 32px 32px 24px 32px;
  box-shadow: 0px 3px 4px rgba(13, 54, 133, 0.15);

  &__info {
    display: flex;
    align-items: center;
    padding-left: 8px;

    &__icon {
      margin-right: 48px;
    }

    &__user-data {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-family: $font_secondary;
      font-style: normal;

      &__p1 {
        font-weight: bold;
        font-size: 16px;
        color: $--color-gray-7;
        padding-bottom: 4px;
      }

      &__p3 {
        font-weight: normal;
        font-size: 12px;
        line-height: 20px;
        color: $--color-gray-7;
      }
    }
  }

  &__divisor {
    border: 1px solid $--color-gray-4;
    margin: 20px 0 12px 0;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    margin-left: 88px;

    &__muted {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: $--color-gray-6;
    }
  }
}

.el-radio-group .el-radio:not(:first-child) {
  margin-left: 20px;
}
</style>
