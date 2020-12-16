<script>
import ApexChart from 'vue-apexcharts';
import IconTree from '../assets/svgs/icon-tree.svg';
import IconArrowRight from '../assets/svgs/icon-arrow-right.svg';

export default {
  components: {
    IconTree,
    ApexChart,
    IconArrowRight,
  },

  data: () => ({
    score: [15],
  }),

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
  },
};
</script>

<template>
  <div class="sidebar-score">
    <ApexChart
      class="apexcharts"
      width="100%"
      height="156px"
      :series="score"
      :options="options"
    />

    <div class="sidebar-score__list">
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
</template>

<style lang="scss" scoped>
.sidebar-score {
  display: flex;
  position: relative;
  margin-top: 36px;
  align-items: center;

  .apexcharts {
    left: -90px;
    z-index: 1;
    position: absolute;
  }

  &__list {
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
          fill: $--color-gray-6;
          stroke: $--color-gray-6;
        }
      }
    }
  }
}
</style>
