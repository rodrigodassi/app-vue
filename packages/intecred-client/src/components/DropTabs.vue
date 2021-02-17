<script>
import { useOutsideClick } from '../helpers';
import IconArrow from '../assets/svgs/icon-arrow-right.svg';

export default {
  components: {
    IconArrow,
  },

  props: {
    /**
     * Aba ativa.
     */
    value: {
      type: [String, Number],
      required: true,
    },
    /**
     * Lista de abas, com label e value e, se definido, disabled (boolean).
     */
    items: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    show: false,
  }),

  computed: {
    current() {
      const {
        value,
        items,
      } = this;

      const current = items.find((item) => item.value === value);

      return current;
    },

    filteredItems() {
      return this.items.filter((item) => item.value !== this.value);
    },
  },

  methods: {
    handleInput(value) {
      this.show = false;

      /**
       * Evento chamado com o valor do item clicado.
       */
      this.$emit('input', value);
    },
  },

  mounted() {
    useOutsideClick(this, 'drop', () => {
      if (this.show) {
        this.show = false;
      }
    });
  },
};
</script>

<template>
  <header
    ref="drop"
    class="drop-tabs"
  >
    <div
      class="drop-tabs__current"
      @click.prevent="show = ! show"
    >
      <span
        v-text="current.label"
        class="drop-tabs__active"
      />

      <IconArrow
        class="accordion__arrow"
        :class="{ 'is-active': show }"
      />
    </div>

    <Transition
      enter-class="drop-tabs__enter"
      leave-to-class="drop-tabs__leave"
      leave-active-class="drop-tabs__leave-active"
      enter-active-class="drop-tabs__enter-active"
    >
      <nav
        v-if="show"
        class="drop-tabs__nav"
      >
        <ul
          class="drop-tabs__list"
        >
          <li
            ref="item"
            class="drop-tabs__item"
            :key="`${tab.value}${index}`"
            v-for="(tab, index) in filteredItems"
          >
            <a
              href="#"
              v-text="tab.label"
              class="drop-tabs__item-link"
              @click.prevent="handleInput(tab.value)"
            />
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>

<style lang="scss">
  .drop-tabs {
    position: relative;

    &__current {
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: space-between;
    }

    &__active {
      margin-right: 10px;
      color: $--color-primary-dark-1;
      text-shadow: .7px 0 0 $--color-primary-dark-1;
    }

    &__arrow {
      fill: $--color-gray-6;
      transition: transform 240ms;

      &.is-active {
        transform: rotate(90deg);
      }
    }

    &__nav {
      flex: 1;
      display: flex;
      z-index: 999999;
      position: absolute;
      border-radius: 8px;
      top: calc(100% + 10px);
      padding: 20px 24px 0px;
      box-sizing: border-box;
      flex-flow: column nowrap;
      background-color: #ffffff;
      box-shadow: 0px 16px 16px rgba($--color-gray-6, 0.15);
    }

    &__list {
      margin: 0;
      padding: 0;
      display: flex;
      flex-flow: column nowrap;
    }

    &__item {
      list-style: none;
      margin-right: 40px;
      margin-bottom: 18px;
      width: max-content;

      &-link {
        width: 100%;
        display: flex;
        font-size: 16px;
        line-height: 28px;
        position: relative;
        text-decoration: none;
        color: $--color-gray-6;
        justify-content: flex-start;
        font-family: $font_secondary;
      }
    }

    &__enter,
    &__leave {
      transform: translateY(-4px);
      opacity: 0;

      &-active {
        transition: all 240ms;
      }
    }
  }
</style>
