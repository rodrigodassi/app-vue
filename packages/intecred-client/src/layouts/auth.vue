<script>
import Logo from '../assets/svgs/logo.svg';
import IconCheck from '../assets/svgs/icon-check.svg';

export default {
  name: 'Auth',

  components: {
    Logo,
    IconCheck,
  },

  computed: {
    labels() {
      return [
        'Integrando investidores e compradores a produtores rurais por um crédito agrícola mais seguro, fácil e competitivo.',
        'Com a InteCred, investir na produção agrícola ou antecipar a compra de commodities será mais simples, seguro e lucrativo.',
      ];
    },
  },
};
</script>

<template>
  <div class="auth">
    <div class="auth__container">
      <div class="auth__card">
        <RouterView />
      </div>

      <div class="auth__content">
        <Logo />

        <span class="big-title is-bold">CPR segura do início ao fim</span>

        <ul>
          <li
            v-for="label in labels"
            :key="label"
          >
            <IconCheck />
            <span
              class="p1"
              v-text="label"
            />
          </li>
        </ul>
      </div>
    </div>

    <video
      muted
      loop
      autobuffer="true"
      autoplay
    >
      <source
        src="../assets/images/video-camp.mp4"
        type="video/mp4"
      />
    </video>
  </div>
</template>

<style lang="scss">
.auth {
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  align-items: center;

  &::before {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    z-index: 2;
    position: absolute;
    background-color: rgba(#290038, 0.85);
  }

  &__container {
    width: 100%;
    margin: 0 auto;
    display: flex;
    z-index: 3;
    position: relative;
    max-width: 1082px;
    align-items: center;
  }

  &__card {
    width: 100%;
    padding: 92px 78px;
    max-width: 472px;
    transition: all 0.3s ease-in-out;
    border-radius: 4px;
    background-color: $--color-gray-1;
  }

  &__content {
    display: flex;
    margin-left: 180px;
    flex-direction: column;

    .big-title {
      color: $--color-gray-1;
      margin-top: 40px;
    }

    ul {
      display: flex;
      margin-top: 20px;
      flex-direction: column;

      li {
        display: flex;
        margin-top: 32px;
        align-items: center;

        span {
          color: $--color-gray-1;
          max-width: 376px;
        }

        svg {
          display: flex;
          margin-right: 20px;
        }
      }
    }
  }

  &__box {
    h1 {
      color: $--color-primary-dark-1;
    }

    &-form {
      display: flex;
      flex-direction: column;
      margin-top: 36px;

      .input {
        margin-bottom: 24px;
      }

      &-error {
        color: $--color-danger;
        margin-bottom: 24px;
      }
    }

    &-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .l2 {
        color: $--color-gray-6;
      }
    }
  }

  video {
    width: 100%;
    height: 100vh;
    z-index: 1;
    position: absolute;
    object-fit: cover;
  }
}
</style>
