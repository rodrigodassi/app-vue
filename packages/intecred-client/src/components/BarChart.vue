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
    config() {
      const {
        colors,
        labels,
      } = this;

      return {
        colors,

        labels,

        chart: {
          fontFamily: '"Muli", sans-serif',

          toolbar: {
            show: false,
          },

          zoom: {
            enabled: false,
          },
        },

        markers: {
          size: 0,
        },

        legend: {
          show: false,
        },

        dataLabels: {
          enabled: false,
        },

        yaxis: {
          labels: {
            style: {
              cssClass: 'bar-chart__label',
            },
          },

          axisBorder: {
            show: true,
            color: '#E4E9F2',
            offsetX: 0,
            offsetY: 0,
          },
        },

        xaxis: {
          labels: {
            style: {
              cssClass: 'bar-chart__label',
            },
          },

          axisBorder: {
            show: true,
            height: 1,
            offsetX: 0,
            offsetY: 0,
            width: '100%',
            color: '#E4E9F2',
          },

          axisTicks: {
            show: false,
          },

          crosshairs: {
            show: false,
          },

          tooltip: {
            enabled: false,
          },
        },

        plotOptions: {
          bar: {
            distributed: true,
            columnWidth: '20%',
            endingShape: 'rounded',
          },
        },

        tooltip: {
          custom: (item) => {
            const {
              series,
              dataPointIndex,
            } = item;

            return `
              <div
                class="bar-chart__tooltip"
              >
                <div
                  class="bar-chart__tooltip-header"
                >
                  <span
                    style="background: ${colors[dataPointIndex]}"
                    class="bar-chart__tooltip-color"
                  >
                  </span>

                  <span
                    class="bar-chart__tooltip-title"
                  >
                    ${labels[dataPointIndex]}
                  </span>
                </div>

                <span
                  class="bar-chart__tooltip-legend"
                >
                  ${series[0][dataPointIndex]} títulos
                </span>
              </div>
            `;
          },
        },
      };
    },
  },
};
</script>

<template>
  <div
    class="bar-chart"
  >
    <div
      class="bar-chart__title"
    >
      <span
        v-text="title"
        class="bar-chart__title-label"
      />
    </div>

    <VueApexCharts
      type="bar"
      width="100%"
      height="250px"
      :series="data"
      :options="config"
    />
  </div>
</template>

<style lang="scss">
  .bar-chart {
    width: 100%;
    height: 300px;
    border-radius: 4px;
    background-color: white;

    &__title {
      display: flex;
      margin-bottom: 16px;
      align-items: center;
      box-sizing: border-box;
      padding: 7px 20px 7px 24px;
      justify-content: space-between;
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
        margin-left: 20px !important;
        line-height: 28px !important;
        color: $--color-gray-6 !important;
        font-family: $font_secondary !important;
      }
    }
  }
</style>
