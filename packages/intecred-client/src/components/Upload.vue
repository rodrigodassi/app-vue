<script>
import IconPlus from '../assets/svgs/icon-plus.svg';
import IconTrash from '../assets/svgs/icon-delete.svg';
import { date } from '../helpers';

export default {
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: '',
      required: false,
    },
    value: {
      type: Array,
      default: () => [],
      required: false,
    },
    description: {
      type: String,
      default: '',
      required: false,
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      required: false,
    },
    customRemoveFile: {
      type: Function,
      required: false,
    },
  },
  components: {
    IconPlus,
    IconTrash,
  },

  inject: {
    onCreateTeam: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data: () => ({
    images: [],
    actionType: null,
  }),

  mounted() {
    if (this.onCreateTeam) {
      this.images = [...this.images, ...this.value];
    }
  },
  computed: {
    classes() {
      const {
        value,
      } = this;

      const classes = [
        'upload__image',
      ];

      if (value.length > 0 && value.length <= 4) {
        classes.push('has-images');
      }

      if (value.length === 5) {
        classes.push('is-disabled');
      }

      return classes;
    },
  },
  methods: {
    add(file) {
      this.actionType = 'add';
      if (this.images && this.images.length && this.isMultiple) {
        this.images.push({
          url: file.url,
          date: date(),
          name: file.name,
        });
      } else {
        this.images = [{
          url: file.url,
          date: date(),
          name: file.name,
        }];
      }
      // update index parent
      if (this.$vnode.key !== undefined) {
        this.$emit('update-temp-index', this.$vnode.key);
      }
      if (this.isMultiple) {
        this.$emit('input', this.images);
      } else {
        this.$emit('input', [{ ...file }]);
      }
      this.actionType = null;
    },

    remove(index) {
      if (this.$attrs.disabled) {
        return;
      }

      if (!this.isMultiple) {
        this.images = [];
      } else {
        this.images = this.images.filter((item, i) => i !== index);
      }

      if (this.onCreateTeam) {
        this.$emit('input', this.images);

        return;
      }

      this.actionType = 'remove';

      if (this.$vnode.key !== undefined) {
        this.$emit('update-temp-index', this.$vnode.key);
        this.$emit('delete', this.images, this.$vnode.key);
        return;
      }
      if (!this.isMultiple) {
        this.$emit('input', [...this.images.filter((item, i) => i !== index)]);
      } else {
        this.$emit('input', []);
      }
      this.actionType = null;
    },
  },
  watch: {
    value(newVal, oldVal) {
      if (oldVal.length || this.actionType === 'remove') {
        return;
      }
      this.images = newVal;
    },
  },
};
</script>

<template>
  <div class="upload">
    <div class="upload__title">
      <h4 v-text="title"/>

      <p
        class="p3"
        v-text="description"
      />
    </div>
    <div :class="classes">
      <div
        v-if="value.length > 0"
        class="upload__image-images"
      >
        <div
          v-for="(item, index) in images"
          :key="index"
        >
          <span
            :title="item.name"
            class="p3"
          >
            {{ item.name }}
            <p v-show="item.date" v-text="`Enviado: ${item.date}`"/>
          </span>

          <IconTrash
            @click.prevent="customRemoveFile ? customRemoveFile() : remove(index)"
          />
        </div>
      </div>

      <el-upload
        drag
        v-bind="$attrs"
        :http-request="add"
        action="#"
        :limit="5"
        :multiple="isMultiple"
        :accept="this.accept"
        list-type="picture-card"
        :on-change="add"
        :auto-upload="false"
      >
        <span class="upload__image-action p2">
          <IconPlus/>
          Enviar arquivos
        </span>
      </el-upload>

    </div>
  </div>
</template>

<style lang="scss">
.upload {
  padding: 16px;
  display: flex;
  box-shadow: $--box-shadow-base;
  align-items: center;
  border-radius: 4px;
  justify-content: space-between;
  background-color: $--color-gray-1;

  &__title {
    width: 100%;
    max-width: 290px;

    h4 {
      color: $--color-gray-7;
    }

    .p3 {
      color: $--color-gray-6;
      margin-top: 8px;
    }
  }

  &__image {
    width: 302px;
    position: relative;
    min-height: 104px;
    border-radius: 4px;
    background-color: $--color-gray-3;

    &-action {
      color: $--color-primary;
      display: flex;
      transition: all 0.3s ease-in-out;
      align-items: center;

      svg {
        width: 12px;
        height: 12px;
        margin-right: 8px;

        path {
          fill: $--color-primary;
          transition: all 0.3s ease-in-out;
        }
      }
    }

    &:hover &-action {
      color: $--color-primary-dark-1;

      svg path {
        fill: $--color-primary-dark-1;
      }
    }

    &-images {
      display: flex;
      padding: 12px;
      flex-direction: column;

      & > div {
        display: flex;
        padding: 4px 12px;
        align-items: center;
        border-radius: 4px;
        justify-content: space-between;
        background-color: $--color-gray-1;

        span {
          color: $--color-gray-7;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;

          p {
            color: $--color-gray-6;
            margin-top: 2px;
          }
        }

        svg {
          cursor: pointer;
          margin-left: 8px;

          path {
            transition: all 0.3s ease-in-out;
          }

          &:hover path {
            fill: $--color-primary;
          }
        }

        &:not(:first-child) {
          margin-top: 8px;
        }
      }
    }

    &.has-images .el-upload {
      height: 22px;
      position: relative;
      margin-bottom: 12px;
    }

    &.has-images &-action {
      color: $--color-gray-6;

      svg path {
        fill: $--color-gray-6;
      }

      &:hover {
        color: $--color-primary;

        svg path {
          fill: $--color-primary;
        }
      }
    }

    &.is-disabled .el-upload {
      display: none;
    }
  }

  .el-upload {
    &-dragger {
      width: 100%;
      height: 100%;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $--color-gray-3;

      &.is-dragover {
        background-color: $--color-gray-3;
      }
    }

    &--picture-card {
      left: 0;
      width: 100%;
      border: none;
      height: 104px;
      z-index: 1;
      position: absolute;
      line-height: 104px;
    }

    &-list__item {
      display: none !important;
    }
  }
}
</style>
