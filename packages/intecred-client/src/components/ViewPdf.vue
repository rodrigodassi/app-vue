<script>
import pdf from 'vue-pdf';
import Chevron from '../assets/svgs/icon-arrow-right.svg';

export default {
  props: {
    src: {
      type: String,
      required: true,
    },
  },

  components: {
    pdf,
    Chevron,
  },

  data: () => ({
    page: 1,
    count: 0,
    current: 0,
  }),

  methods: {
    back() {
      const {
        current,
      } = this;

      if (current > 1) {
        this.page -= 1;
        this.current -= 1;
      }
    },

    next() {
      const {
        count,
        current,
      } = this;

      if (current <= count - 1) {
        this.page += 1;
        this.current += 1;
      }
    },
  },
};
</script>

<template>
  <div class="view-pdf">
    <pdf
      :src="src"
      :page="page"
      @num-pages="count = $event"
      @page-loaded="current = $event"
    ></pdf>

    <div class="view-pdf__actions">
      <button @click="back">
        <Chevron />
      </button>

      <p
        class="p2"
        v-text="`${current} / ${count}`"
      />

      <button @click="next">
        <Chevron />
      </button>
    </div>
  </div>
</template>
<style lang="scss">
  .view-pdf {
    width: 100%;
    margin: 0 auto;
    max-width: 936px;
    box-shadow: 0 16px 16px rgba($--color-gray-6, .1);
    border-radius: 4px;

    canvas {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }

    &__actions {
      display: flex;
      padding: 8px 16px;
      min-height: 36px;
      align-items: center;
      justify-content: space-between;
      background-color: $--color-gray-7;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;

      button {
        display: flex;
        padding: 0;

        svg path {
          fill: $--color-gray-4;
          stroke: $--color-gray-4;
          transition: all .3s ease-in-out;
        }

        &:first-of-type {
          transform: rotate(-180deg);
        }

        &:hover svg path {
          fill: $--color-gray-1;
          stroke: $--color-gray-1;
        }
      }

      .p2 {
        color: $--color-gray-4;
      }
    }
  }
</style>
