<script>
const tags = [
  {
    value: 'making',
    label: 'Em criação',
  },
  {
    label: 'Vigente',
    value: 'current',
  },
  {
    value: 'paid',
    label: 'Baixa',
  },
];

export default {
  props: {
    status: {
      type: Number,
      required: false,
      default: 1,
    },
  },

  computed: {
    tag() {
      return tags[this.status - 1];
    },
  },
};
</script>

<template>
  <div
    class="tag"
    v-text="tag.label"
    :class="`is-${tag.value}`"
  />
</template>

<style lang="scss">
  .tag {
    height: 26px;
    font-size: 14px;
    padding: 0 8px;
    font-weight: bold;
    line-height: 22px;
    border-radius: 4px;
    align-items: center;
    display: inline-flex;
    box-sizing: border-box;
    justify-content: center;
    font-family: $font_secondary;

    &.is-making {
      color: $--color-warning;
      background-color: rgba($--color-warning, 0.1);
    }

    &.is-current {
      color: $--color-support-blue-dark;
      background-color: $--color-support-blue-20;
    }

    &.is-paid {
      color: $--color-gray-6;
      background-color: $--color-gray-3;
    }
  }
</style>
