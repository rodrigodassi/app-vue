<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
      required: false,
    },
  },
};
</script>

<template>
  <div class="label">
    <span class="p1 is-bold" v-text="label" />
  </div>
</template>

<style lang="scss">
.label {
  width: 100%;
  display: flex;
  padding: 6px 16px;
  border-radius: 2px;
  background-color: $--color-gray-4;

  span {
    color: $--color-gray-7;
  }
}
</style>
