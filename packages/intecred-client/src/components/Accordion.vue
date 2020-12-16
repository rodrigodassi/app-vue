<script>
import IconArrow from '../assets/svgs/icon-arrow-right.svg';

export default {
  components: {
    IconArrow,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    show: true,
  }),
};
</script>

<template>
  <div
    class="accordion"
  >
    <div
      class="accordion__header"
      @click.prevent="show = ! show"
    >
      <span
        v-text="title"
        class="accordion__title"
      />

      <IconArrow
        class="accordion__arrow"
        :class="{ 'is-active': show }"
      />
    </div>

    <Transition
      enter-class="accordion__enter"
      leave-to-class="accordion__leave"
      leave-active-class="accordion__leave-active"
      enter-active-class="accordion__enter-active"
    >
      <div
        v-if="show"
        class="accordion__body"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
  .accordion {
    width: 100%;
    margin-bottom: 56px;

    &__header {
      display: flex;
      align-items: center;
      padding-bottom: 16px;
      justify-content: space-between;
      border-bottom: solid 1px $--color-gray-4;
    }

    &__title {
      font-size: 24px;
      font-weight: bold;
      line-height: 32px;
      font-family: $font_primary;
      color: $--color-primary-dark-1;
    }

    &__arrow {
      fill: $--color-gray-6;
      transform: rotate(-90deg);
      transition: transform 240ms;

      &.is-active {
        transform: rotate(90deg);
      }
    }

    &__body {
      display: flex;
      padding-top: 20px;
      flex-flow: row wrap;

      .card {
        margin-top: 22px;
        margin-left: 16px;
      }

      & > :nth-child(3n + 1) {
        margin-left: 0;
      }

      & > :nth-child(n):nth-child(-n + 3) {
        margin-top: 0;
      }
    }

    &__leave-active,
    &__enter-active {
      transition: all 240ms;
    }

    &__enter,
    &__leave {
      height: 0;
      padding: 0px 1px;
      overflow: hidden;
    }
  }
</style>
