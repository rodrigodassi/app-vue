<template>
  <div class="alert-box" v-if="show">
    <div class="alert-box__content">
      <div class="alert-box__icon">
        <span>
          <IconEllipse/>
          <IconIdea class="alert-box__icon--idea"/>
        </span>
      </div>
      <p class="alert-box__p2">
        <slot/>
      </p>
    </div>
    <div class="alert-box__btn-close">
      <span class="alert-box__btn-close">
        <button @click="closeBox">
          <IconClose/>
        </button>
      </span>
    </div>
  </div>
</template>

<script>
import IconEllipse from '../assets/svgs/icon-ellipse.svg';
import IconIdea from '../assets/svgs/icon-idea.svg';
import IconClose from '../assets/svgs/icon-close.svg';

export default {
  name: 'Alert',
  data: () => ({
    show: true,
  }),
  components: {
    IconClose,
    IconEllipse,
    IconIdea,
  },
  methods: {
    closeBox() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss">
.alert-box {
  display: flex;
  align-items: center;
  min-height: 76px;
  width: 540px;
  border-radius: 4px;
  background: #290038;
  box-shadow: 0px 3px 4px rgba(13, 54, 133, 0.15);
  margin-bottom: 35px;
  position: relative;
  color: white;
  padding: 30px 0;

  &__content {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: space-evenly;
    width: 90%;
  }

  &__btn-close {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    top: 5px;
    right: 3px;
  }

  &__img {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 43px;
    width: 43px;
  }

  &__p2 {
    color: $--color-gray-1;
    max-width: 389px;
  }

  &__icon {
    &--idea {
      position: absolute;
      top: 10px;
      left: 15px;
    }

    span {
      position: relative;
      display: block;
    }
  }
}
</style>
