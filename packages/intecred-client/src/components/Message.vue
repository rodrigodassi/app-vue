<script>
import IconIdea from '../assets/svgs/icon-idea.svg';
import IconClose from '../assets/svgs/icon-close.svg';

export default {
  components: {
    IconIdea,
    IconClose,
  },

  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    close() {
      this.$emit('input', { this.value = false })
    },
  },
};
</script>

<template>
  <div class="message">
    <div class="message__content">
      <div class="message__icon">
        <IconIdea />
      </div>
      <p
        class="p1"
        v-text="label"
      />
    </div>
    <IconClose class="message__close" />
  </div>
</template>

<style lang="scss">
.message {
  background-color: $--color-secondary-dark-1;
  padding: 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;

  &__icon {
    background-color: rgba($--color-info, 0.2);
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 26px;
  }

  &__content {
    display: flex;
    align-items: center;
  }

  &__close {
    margin-left: auto;
    align-items: center;
    cursor: pointer;
  }

  .p1 {
    color: $--color-gray-1;
  }
}
</style>
