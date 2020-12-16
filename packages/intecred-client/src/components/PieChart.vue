<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  components: {
    VueApexCharts,
  },

  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },

    colors: {
      type: Array,
      required: false,
      default: () => ([
        //
      ]),
    },

    labels: {
      type: Array,
      required: false,
      default: () => ([
        //
      ]),
    },

    data: {
      type: Array,
      required: false,
      default: () => ([
        //
      ]),
    },
  },

  computed: {
    sum() {
      return this.data.reduce((sum, item) => sum + item, 0);
    },

    config() {
      const {
        labels,
        colors,
      } = this;

      return {
        colors,

        labels,

        expandOnClick: false,

        chart: {
          type: 'donut',

          fontFamily: '"Muli", sans-serif',

          zoom: {
            enabled: false,
          },
        },

        tooltip: {
          custom: (item) => {
            const {
              series,
              seriesIndex,
            } = item;

            return `
              <div
                class="pie-chart__tooltip"
              >
                <div
                  class="pie-chart__tooltip-header"
                >
                  <span
                    style="background: ${colors[seriesIndex]}"
                    class="pie-chart__tooltip-color"
                  >
                  </span>

                  <span
                    class="pie-chart__tooltip-title"
                  >
                    ${labels[seriesIndex]}
                  </span>
                </div>

                <span
                  class="pie-chart__tooltip-legend"
                >
                  ${this.handlePorcentage(series[seriesIndex])} - ${series[seriesIndex]} títulos
                </span>
              </div>
            `;
          },
        },

        markers: {
          size: 0,
        },

        dataLabels: {
          enabled: false,
        },

        legend: {
          position: 'bottom',
        },

        plotOptions: {
          pie: {
            donut: {
              size: '80%',
            },
          },
        },
      };
    },
  },

  methods: {
    handlePorcentage(value) {
      const porcentage = (100 * value) / this.sum;

      return `${porcentage.toFixed(2)}%`;
    },
  },
};
</script>

<template>
  <div
    class="pie-chart"
  >
    <div
      class="pie-chart__title"
    >
      <span
        v-text="title"
        class="pie-chart__title-label"
      />
    </div>

    <VueApexCharts
      type="donut"
      width="100%"
      height="250px"
      :series="data"
      :options="config"
    />
  </div>
</template>

<style lang="scss">
  .pie-chart {
    width: 100%;
    height: 300px;
    border-radius: 4px;
    background-color: white;

    &__title {
      display: flex;
      margin-bottom: 16px;
      align-items: center;
      box-sizing: border-box;
      justify-content: center;
      padding: 7px 0px;
      border-bottom: solid 1px $--color-gray-4;

      &-label {
        font-size: 16px;
        line-height: 22px;
        color: $--color-gray-6;
        font-family: $font_secondary;
      }
    }

    &__label {
      * {
        font-size: 12px !important;
        fill: $--color-gray-6 !important;
        font-family: $font_secondary !important;
      }
    }

    &__tooltip {
      width: 216px;
      height: 108px;
      padding: 24px;
      border-radius: 4px;
      box-sizing: border-box;
      background-color: #FFFFFF;
      border: solid 1px $--color-gray-2;
      box-shadow: 0px 16px 16px rgba($--color-gray-6, 0.15);

      &-header {
        display: flex !important;
        align-items: center !important;
      }

      &-title {
        display: block;
        font-size: 16px !important;
        font-weight: bold !important;
        line-height: 28px !important;
        color: $--color-gray-7 !important;
        font-family: $font_secondary !important;
      }

      &-color {
        width: 12px;
        height: 12px;
        margin-right: 8px;
        border-radius: 50%;
        display: inline-block;
      }

      &-legend {
        font-size: 16px !important;
        line-height: 28px !important;
        color: $--color-gray-6 !important;
        font-family: $font_secondary !important;
      }
    }
  }
</style>
