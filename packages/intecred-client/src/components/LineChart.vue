<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  components: {
    VueApexCharts,
  },

  props: {
    data: {
      type: Array,
      required: false,
      default: () => ([
        //
      ]),
    },
  },

  computed: {
    year() {
      return new Date().getFullYear();
    },

    currentYear() {
      return `Ano ${this.year}`;
    },

    monthLabels() {
      return [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ];
    },

    labels() {
      return [
        'JAN',
        'FEV',
        'MAR',
        'ABR',
        'MAI',
        'JUN',
        'JUL',
        'AGO',
        'SET',
        'OUT',
        'NOV',
        'DEZ',
      ];
    },

    config() {
      const {
        year,
        labels,
        monthLabels,
      } = this;

      return {
        colors: ['#540075'],

        labels,

        stroke: {
          curve: 'straight',
          width: 2,
        },

        markers: {
          size: 4,
          hover: {
            sizeOffset: 0,
          },
        },

        chart: {
          id: 'line-chart',

          width: '1080px',

          height: '325px',

          fontFamily: '"Muli", sans-serif',

          toolbar: {
            show: false,
          },

          zoom: {
            enabled: false,
          },
        },

        yaxis: {
          labels: {
            style: {
              cssClass: 'pie-chart__label',
            },
          },

          axisBorder: {
            show: true,
            color: '#E4E9F2',
            offsetX: -4,
            offsetY: 0,
          },
        },

        xaxis: {
          labels: {
            style: {
              fontSize: undefined,
              fontFamily: undefined,
              fontWeight: undefined,
              cssClass: 'pie-chart__label',
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

        tooltip: {
          custom: (item) => {
            const {
              series,
              dataPointIndex,
            } = item;

            return `
              <div
                class="line-chart__tooltip"
              >
                <div
                  class="line-chart__tooltip-header"
                >
                  <span
                    style="background: #540075"
                    class="line-chart__tooltip-color"
                  >
                  </span>

                  <span
                    class="line-chart__tooltip-title"
                  >
                    ${monthLabels[dataPointIndex]} - ${year}
                  </span>
                </div>

                <span
                  class="line-chart__tooltip-legend"
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
    class="line-chart"
  >
    <div
      class="line-chart__title"
    >
      <span
        class="line-chart__title-label"
      >
        Evolução da criação de títulos
      </span>

      <span
        v-text="currentYear"
        class="line-chart__title-label"
      />
    </div>

    <VueApexCharts
      type="line"
      width="100%"
      height="250px"
      :series="data"
      :options="config"
    />
  </div>
</template>

<style lang="scss">
  .line-chart {
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
