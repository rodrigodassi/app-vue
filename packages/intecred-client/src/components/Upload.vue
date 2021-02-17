<script>
import IconPlus from '../assets/svgs/icon-plus.svg';
import IconTrash from '../assets/svgs/icon-delete.svg';
import IconDownload from '../assets/svgs/download.svg';
import { date } from '../helpers';
import { api } from '../services';

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
    onTitles: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    IconPlus,
    IconTrash,
    IconDownload,
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
    } else this.images = this.value;
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
        /**
         * @todo
         * Estamos adicionando a propriedade "download" para demonstração
         * O link real deverá vir do backend, a propriedade "download" devera conter a URL correta.
         */
        this.images.push({
          id: file.id,
          date: date(),
          url: file.url,
          blob: file.blob,
          name: file.name,
          file,
          download: file.download,
        });
      } else {
        this.images = [{
          id: file.id,
          url: file.url,
          blob: file.blob,
          date: date(),
          name: file.name,
          file,
          download: file.download,
        }];
      }
      // update index parent
      if (this.$vnode.key !== undefined) {
        this.$emit('update-temp-index', this.$vnode.key);
      }
      if (this.isMultiple) {
        this.$emit('input', this.images);
      } else {
        this.$emit('input', this.images);
      }
      this.actionType = null;
    },

    remove(index, id, blob) {
      api.post(`/titulo/deleteArquivo?id=${String(id)}&blob=${String(blob)}`);

      if (this.$attrs.disabled) {
        return;
      }

      if (this.onCreateTeam) {
        this.$emit('input', [...this.images.filter((item, i) => i !== index)]);

        return;
      }

      this.$emit('input', [...this.images.filter((item, i) => i !== index)]);
    },
  },
  watch: {
    value(value) {
      this.images = value;
    },
  },
};
</script>

<template>
  <div class="upload" :class="{ 'on-titles': onTitles }">
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
            {{ item.name.length > 21 ? `${item.name.substring(0, 21)}...` : item.name }}
            <p v-show="item.date" v-text="`Enviado: ${item.date}`"/>
          </span>

          <div
            class="upload__wrapper"
          >
            <a
              download
              :href="item.download"
              class="upload__icon-download"
            >
              <IconDownload/>
            </a>

            <div
              class="upload__icon-trash"
            >
              <IconTrash
                @click.prevent="customRemoveFile ? customRemoveFile()
                : remove(index, item.id, item.blob)"
              />
            </div>
          </div>
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

  &.on-titles {
    margin-top: 12px;
    flex-flow: column nowrap;
    align-items: flex-start;

    .upload__image {
      width: 100%;
    }
  }

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

  &__icon-trash {
    flex-shrink: 0;
  }

  &__wrapper {
    display: flex;
    align-items: center;
  }

  &__image {
    width: 520px;
    max-width: 520px;
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
          width: 16px;
          height: 16px;
          cursor: pointer;
          margin-left: 8px;

          * {
            fill: $--color-gray-6;
          }

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
@media (max-width: 600px) {
  .upload {
    display: block;
    &__image {
      width: 100%;
    }
  }
}
</style>
