<script>
export default {
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
    left: 0,
  }),

  computed: {
    border() {
      return {
        left: `${this.left}px`,
        width: `${this.width}px`,
      };
    },
  },

  mounted() {
    const {
      items,
      value,
      handleInput,
    } = this;

    const current = items.findIndex((item) => item.value === value);

    handleInput(current);
  },

  methods: {
    handleInput(index) {
      const {
        value,
        disabled,
      } = this.items[index] || {};

      if (disabled) {
        return;
      }

      const el = this.$refs.item[index];

      this.left = el.offsetLeft;

      /**
       * Evento chamado com o valor do item clicado.
       */
      this.$emit('input', value);
    },
  },
};
</script>

<template>
  <header
    class="tab"
  >
    <nav
      class="tab__nav"
    >
      <ul
        class="tab__list"
      >
        <li
          ref="item"
          class="tab__item"
          :key="`${tab.value}${index}`"
          v-for="(tab, index) in items"
          :class="{
            'tab__item--active': tab.value == value,
           }"
        >
          <a
            href="#"
            v-text="tab.label"
            class="tab__item-link"
            @click.prevent="handleInput(index)"
          />
        </li>
      </ul>

      <span
        :style="border"
        class="tab__border"
      />
    </nav>
  </header>
</template>

<style lang="scss">
  .tab {

    &__nav {
      flex: 1;
      position: relative;
    }

    &__list {
      margin: 0;
      padding: 0;
      display: flex;
    }

    &__item {
      list-style: none;
      margin-right: 40px;
      width: max-content;

      &-link {
        width: 100%;
        display: flex;
        position: relative;
        text-decoration: none;
        color: $--color-gray-6;
        justify-content: flex-start;
        font-family: $font_secondary;
        transition: all 400ms ease-in-out;
      }

      &--active &-link {
        color: $--color-primary-dark-1;
        text-shadow: .7px 0 0 $--color-primary-dark-1;
      }
    }

    &__border {
      width: 11px;
      height: 1px;
      bottom: -4px;
      transition: 250ms;
      position: absolute;
      border-radius: 1px;
      background-color: $--color-primary-dark-1;
    }
  }
</style>
