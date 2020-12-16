<script>
export default {
  props: {
    current: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>

<template>
  <div
    class="content-wrapper"
  >
    <slot
      :name="current"
    />
  </div>
</template>

<style lang="scss">
  .content-wrapper {
    width: 100%;
  }
</style>
