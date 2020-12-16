<script>
import Logo from '../assets/svgs/logo-dark.svg';
import Chart from '../components/SimpleChart.vue';
import IconCloseCircle from '../assets/svgs/icon-rounded-close.svg';

export default {
  components: {
    Logo,
    Chart,
    IconCloseCircle,
  },
};
</script>

<template>
  <div>
    <div class="create-title__sidebar">
      <Logo class="create-title__sidebar-logo" />

      <Chart />

      <!-- Rest menu -->
    </div>

    <div class="create-title__body">
      <div class="create-title__body-head">
        <h3>Yuri Martins</h3>

        <span class="p2 is-bold">
          Em criação
        </span>

        <button>
          Sair e continuar depois
          <IconCloseCircle />
        </button>
      </div>

      <div class="create-title__body-body">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.create-title {
  display: flex;
  position: relative;
  flex-direction: column;

  &__sidebar {
    top: 0;
    left: 0;
    width: 300px;
    height: 100vh;
    display: flex;
    padding: 16px 32px 16px 20px;
    position: fixed;
    flex-direction: column;
    background-color: $--color-gray-1;
  }

  &__body {
    width: 100%;
    max-width: 938px;
    margin-left: 364px;

    &-head {
      display: flex;
      padding: 20px 0 24px 0;
      align-items: center;
      border-bottom: 1px solid $--color-gray-5;

      h3 {
        color: $--color-gray-7;
        font-weight: 400;
      }

      span {
        padding: 2px 12px;
        margin-left: 20px;
        border-radius: 4px;
      }

      button {
        color: $--color-gray-7;
        display: flex;
        margin-left: auto;
        align-items: center;

        svg {
          margin-left: 4px;
        }
      }
    }

    &-body {
      margin: 36px auto 124px auto;
      max-width: 540px;
    }
  }
}
</style>
