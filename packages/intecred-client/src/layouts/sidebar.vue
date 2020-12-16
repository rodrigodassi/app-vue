<script>
import ApexChart from 'vue-apexcharts';
import { mapGetters } from 'vuex';
import api from '../services/api';
import Logo from '../assets/svgs/logo-dark.svg';
import IconTree from '../assets/svgs/icon-tree.svg';
import IconArrowRight from '../assets/svgs/icon-arrow-right.svg';
import IconCloseCircle from '../assets/svgs/icon-close-circle.svg';

export default {
  props: [
    'finish',
  ],

  components: {
    Logo,
    IconTree,
    ApexChart,
    IconArrowRight,
    IconCloseCircle,
  },

  data: () => ({
    cliente: {},
    score: [15],
  }),

  async created() {
    const dado = {
      id: this.$route.params.id,
    };

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        empresaId: localStorage.getItem('empresa_Id').toString(),
      },
    };

    console.log('---> ', dado.id, axiosConfig);
    await api.get(`/Cliente/ObterClientePorId?clienteId=${dado.id}`)
      .then((res) => {
        this.cliente = res.data;
      });
  },

  computed: {
    options() {
      return {
        chart: {
          type: 'radialBar',
          fontFamily: '"Muli", sans-serif',

          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 4000,
            animateGradually: {
              enabled: true,
              delay: 150,
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350,
            },
          },
        },

        labels: ['Score:'],

        stroke: {
          lineCap: 'round',
        },

        colors: ['#02bf88'],

        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: '60%',
            },

            dataLabels: {
              name: {
                color: '#8f9bb3',
                offsetY: -10,
                fontSize: '14px',
                fontWeight: '400',
              },
              value: {
                color: '#2e3a59',
                offsetY: 8,
                fontSize: '28px',
                fontWeight: '700',
                formatter(val) {
                  return val;
                },
              },
            },
          },
        },
      };
    },
    ...mapGetters({
      empresaIdUsuario: 'empresaIdUsuario',
    }),
  },
};
</script>

<template>
  <div class="create-title">
    <div class="create-title__sidebar">
      <Logo class="create-title__sidebar-logo" />

      <div class="create-title__sidebar-score">
        <ApexChart
          class="apexcharts"
          width="100%"
          height="156px"
          :series="score"
          :options="options"
        />

        <div>
          <ul>
            <li v-for="n in 12" :key="n">
              <IconTree />
            </li>
          </ul>

          <RouterLink to="#" class="p3">
            Mais detalhes
            <IconArrowRight />
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="create-title__body">
      <div class="create-title__body-head">
        <h3 v-text="cliente.nome" />

        <span
          :class="['p2 is-bold', `${finish ? 'is-success' : 'is-progress'}`]"
          v-text="`${finish ? 'Finalizado' : 'Em criação'}`"
        />

        <button class="l2">
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

<style lang="scss">
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

    &-score {
      display: flex;
      position: relative;
      margin-top: 36px;
      align-items: center;

      .apexcharts {
        left: -90px;
        z-index: 1;
        position: absolute;
      }

      div:nth-child(2) {
        display: flex;
        z-index: 2;
        position: relative;
        margin-left: 140px;
        flex-direction: column;
        justify-content: flex-start;

        ul {
          display: grid;
          grid-template-columns: repeat(4, 1fr);

          li {
            display: flex;
            padding: 4px;
          }
        }

        a {
          color: $--color-gray-6;
          display: flex;
          margin-top: 14px;
          align-items: center;

          svg {
            width: 10px;
            height: 10px;
            margin-left: 4px;

            path {
              stroke: $--color-gray-6;
            }
          }
        }
      }
    }
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

        &.is-progress {
          color: $--color-success;
          background-color: $--color-success-light;
        }
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
