<template>
  <div :class="[{'content': true}, { 'content--grey-bg': greyBg}]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'InfoHeaderCard',
  props: {
    greyBg: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  display: flex;
  align-items: center;
  height: 34px;
  width: 540px;
  padding-left: 15px;

  &--grey-bg {
    background-color: $--color-gray-4;
  }

  &__p1 {
    font-family: $font_secondary;
    font-size: 16px;
    font-weight: 700;
    line-height: 28px;
  }
}
</style>
