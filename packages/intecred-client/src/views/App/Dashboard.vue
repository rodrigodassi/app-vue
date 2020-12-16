<script>
import axios from 'axios';
// import api from '../../services/api';
import { unformat } from '../../helpers';
import Tabs from '../../components/Tabs.vue';
import MiniCard from '../../components/MiniCard.vue';
import PieChart from '../../components/PieChart.vue';
// import BarChart from '../../components/BarChart.vue';
// import LineChart from '../../components/LineChart.vue';
import ContentWrapper from '../../components/ContentWrapper.vue';

export default {
  name: 'Dashboard',

  components: {
    Tabs,
    // BarChart,
    MiniCard,
    PieChart,
    // LineChart,
    ContentWrapper,
  },

  data: () => ({
    active: 'all',

    titles: [
      //
    ],

    clients: [
      //
    ],

    guarantee: [
      //
    ],
  }),

  computed: {
    cards() {
      const {
        titles,
        clients,
      } = this;

      const dataTitles = titles.reduce((obj, item) => {
        const {
          tipo = '',
          valor = '',
          produto = '',
          quantidade = '',
        } = item;

        const type = ['Física', 'física'].includes(tipo) ? 'fisica' : tipo.toLowerCase();

        if (type) {
          obj[type] += 1;
        }
        // todo
        if (produto === 'Soja') {
          obj.soja += parseInt(quantidade, 10);
        }
        // todo
        if (produto === 'Boi') {
          obj.boi += parseInt(quantidade, 10);
        }

        if (valor) {
          const key = valor.indexOf('R$') >= 0 ? 'real' : 'dolar';

          const value = unformat(valor);

          obj[key] += value;
        }

        return obj;
      }, {
        boi: 0,
        real: 0,
        soja: 0,
        dolar: 0,
        fisica: 0,
        duplicata: 0,
        financeira: 0,
      });

      return {
        ...dataTitles,
        clients: clients.length,
      };
    },

    keysCards() {
      return [
        {
          key: 'financeira',
          label: "CPRF's",
        },
        {
          key: 'duplicata',
          label: 'Duplicatas',
        },
        {
          key: 'fisica',
          label: "CPR'S",
        },
        {
          key: 'clients',
          label: 'Clientes cadastrados',
        },
        {
          key: 'real',
          label: 'Total em reais',
        },
        {
          key: 'dolar',
          label: 'Total em dólares',
        },
        {
          key: 'soja',
          label: 'Sacas de soja',
        },
        {
          key: 'boi',
          label: 'Arrobas de boi',
        },
      ];
    },

    items() {
      return [
        // {
        //   value: 'all',
        //   label: 'Todos',
        // },
        // {
        //   value: 'fisica',
        //   label: "CPR's físicas",
        // },
        // {
        //   value: 'financeira',
        //   label: "CPR's financeiras",
        // },
        // {
        //   value: 'duplicata',
        //   label: 'Duplicatas',
        // },
      ];
    },

    current() {
      const {
        active,
      } = this;

      return active === 'all' ? 'all' : 'charts';
    },

    statusKeys() {
      return [
        'making',
        'current',
        'paid',
      ];
    },

    monthsKeys() {
      return [
        'jan',
        'fev',
        'mar',
        'abr',
        'mai',
        'jun',
        'jul',
        'ago',
        'set',
        'out',
        'nov',
        'dez',
      ];
    },

    productKeys() {
      return [
        'Café',
        'Soja',
        'Milho',
        'Algodão',
      ];
    },

    producLowerKeys() {
      return [
        'cafe',
        'soja',
        'milho',
        'algodao',
      ];
    },

    charts() {
      const {
        cards,
        titles,
        active,
        statusKeys,
        monthsKeys,
        productKeys,
        producLowerKeys,
      } = this;

      const {
        uf: {
          sp,
          go,
          rj,
          mt,
        },
        score: {
          first,
          third,
          second,
          fourth,
        },
        titles: {
          date,
          paid,
          making,
          current,
        },
        product: {
          cafe,
          soja,
          milho,
          algodao,
        },
        guarantee: {
          penhor,
          avalista,
          hipoteca,
        },
      } = titles.reduce((obj, item) => {
        const {
          id = 0,
          uf = '',
          tipo = '',
          score = 0,
          status = 0,
          created = '',
          produto = '',
        } = item;

        const type = ['Física', 'física'].includes(tipo) ? 'fisica' : tipo.toLowerCase();

        if (type !== active && active !== 'all') {
          return obj;
        }

        /**
         * Status
         */
        if (status) {
          obj.titles[statusKeys[status - 1]] += 1;
        }

        /**
         * Date
         */
        if (created) {
          const [
            month,
            day,
            year,
          ] = created.split('/');

          const key = new Date(year, month - 1, day).getMonth();

          obj.titles.date[monthsKeys[key]] += 1;
        }

        /**
         * Product
         */
        const index = productKeys.findIndex((label) => label === produto);

        if (produto && index >= 0) {
          obj.product[producLowerKeys[index]] += 1;
        }

        /**
         * UF
         */
        if (uf) {
          const key = uf.toLowerCase();

          obj.uf[key] += 1;
        }

        /**
         * Guarantees
         */
        const guarantees = this.guarantee.filter(({ titulo }) => titulo === id);

        if (guarantees.length > 0) {
          guarantees.forEach((guarantee) => {
            const lowerType = guarantee.tipo.toLowerCase();

            obj.guarantee[lowerType] += 1;
          });
        }

        /**
         * Score
         */
        if (!typeof score === 'number') {
          return obj;
        }

        if (score >= 0 && score < 30) {
          obj.score.first += 1;
        }

        if (score >= 30 && score < 60) {
          obj.score.second += 1;
        }

        if (score >= 60 && score < 90) {
          obj.score.third += 1;
        }

        if (score >= 90) {
          obj.score.fourth += 1;
        }

        return obj;
      }, {
        titles: {
          paid: 0,
          making: 0,
          current: 0,
          date: {
            jan: 0,
            fev: 0,
            mar: 0,
            abr: 0,
            mai: 0,
            jun: 0,
            jul: 0,
            ago: 0,
            set: 0,
            out: 0,
            nov: 0,
            dez: 0,
          },
        },
        guarantee: {
          penhor: 0,
          avalista: 0,
          hipoteca: 0,
        },
        product: {
          cafe: 0,
          soja: 0,
          milho: 0,
          algodao: 0,
        },
        score: {
          first: 0,
          third: 0,
          second: 0,
          fourth: 0,
        },
        uf: {
          sp: 0,
          go: 0,
          rj: 0,
          mt: 0,
        },
      });

      return {
        chartTitles: [
          making,
          current,
          paid,
        ],

        chartTypes: [
          cards.fisica,
          cards.duplicata,
          cards.financeira,
        ],

        chartProduct: [
          soja,
          cafe,
          milho,
          algodao,
        ],

        chartUf: [
          {
            data: [
              sp,
              go,
              rj,
              mt,
            ],
          },
        ],

        chartLine: [
          {
            data: [
              date.jan,
              date.fev,
              date.mar,
              date.abr,
              date.mai,
              date.jun,
              date.jul,
              date.ago,
              date.set,
              date.out,
              date.nov,
              date.dez,
            ],
          },
        ],

        chartScore: [
          {
            data: [
              first,
              second,
              third,
              fourth,
            ],
          },
        ],

        chartGuarantee: [
          {
            data: [
              penhor,
              avalista,
              hipoteca,
            ],
          },
        ],
      };
    },
  },

  methods: {
    async handleData() {
      // await api.get('/titulos').then(({ data }) => this.titles = data);

      // await api.get('/clients').then(({ data }) => this.clients = data);

      // await api.get('/garantias').then(({ data }) => this.guarantee = data);

      await axios.get(`${this.$url}/cliente/ObterTodosClientes`,
        {
          headers:
          {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            empresaId: localStorage.getItem('empresa_Id').toString(),
          },
        })
        .then((res) => {
          this.clients = res.data;
        });

      await axios.get(`${this.$url}/titulo`,
        {
          headers:
          {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            empresaId: localStorage.getItem('empresa_Id').toString(),
          },
        })
        .then((res) => {
          this.titles = res.data;
        });
    },
  },

  mounted() {
    this.handleData();
  },
};
</script>

<template>
  <div
    class="dashboard"
  >
    <div
      class="dashboard__wrapper-cards"
    >
      <MiniCard
        :key="key"
        :tag="key"
        :label="label"
        :sum="cards[key]"
        class="dashboard__mini-card"
        v-for="({ label, key }) in keysCards"
      />
    </div>

    <div
      class="dashboard__body"
    >
      <Tabs
        :items="items"
        v-model="active"
      />

      <div
        class="dashboard__wrapper"
      >
        <ContentWrapper
          :current="current"
        >
          <template
            #all
          >
            <div
              class="dashboard__charts"
            >
              <!-- <div
                class="dashboard__chart is-titles"
              >
                <PieChart
                  :data="charts.chartTitles"
                  title="Status dos títulos"
                  :colors="['#EA7000', '#8F9BB3', '#6FD4FF']"
                  :labels="['Em criação', 'Baixa', 'Vigente']"
                />
              </div> -->

              <!-- <div
                class="dashboard__chart is-line"
              >
                <LineChart
                  :data="charts.chartLine"
                />
              </div> -->

              <!-- <div
                class="dashboard__chart is-guarantee"
              >
                <BarChart
                  :data="charts.chartGuarantee"
                  title="Garantias oferecidas"
                  :labels="['Penhor', 'Avalista', 'Hipoteca']"
                  :colors="['#EA7000', '#F09847', '#EA7000']"
                />
              </div> -->

              <!-- <div
                class="dashboard__chart is-product"
              >
                <PieChart
                  :data="charts.chartProduct"
                  title="Qtd. de títulos por produtos"
                  :labels="['Soja', 'Café', 'Milho', 'Algodão']"
                  :colors="['#CD75EF', '#EA7000', '#540075', '#6FD4FF']"
                />
              </div> -->

              <div
                class="dashboard__chart is-types"
              >
                <PieChart
                  :data="charts.chartTypes"
                  title="Tipos de títulos cadastrados"
                  :colors="['#6FD4FF', '#540075', '#CD75EF']"
                  :labels="['CPRs físicas', 'CPRs financeiras', 'Duplicatas']"
                />
              </div>

              <!-- <div
                class="dashboard__chart is-score"
              >
                <BarChart
                  :data="charts.chartScore"
                  title="Score dos títulos"
                  :labels="['0 a 30', '30 a 60', '60 a 90', '+90']"
                  :colors="['#540075', '#6FD4FF', '#540075', '#6FD4FF',]"
                />
              </div> -->

              <!-- <div
                class="dashboard__chart is-uf"
              >
                <BarChart
                  :data="charts.chartUf"
                  title="Títulos cadastrados por UF"
                  :labels="['SP', 'GO', 'RJ', 'MT']"
                  :colors="['#EA7000', '#F09847', '#EA7000', '#F09847']"
                />
              </div> -->
            </div>
          </template>

          <template
            #charts
          >
            <div
              class="dashboard__charts"
              :class="{ 'is-charts': current !== 'all' }"
            >
              <!-- <div
                class="dashboard__chart is-line"
              >
                <LineChart
                  :data="charts.chartLine"
                />
              </div> -->

              <!-- <div
                class="dashboard__chart is-guarantee"
              >
                <BarChart
                  :data="charts.chartGuarantee"
                  title="Garantias oferecidas"
                  :labels="['Penhor', 'Avalista', 'Hipoteca']"
                  :colors="['#EA7000', '#F09847', '#EA7000']"
                />
              </div> -->

              <!-- <div
                class="dashboard__chart is-titles"
              >
                <PieChart
                  :data="charts.chartTitles"
                  title="Status dos títulos"
                  :colors="['#EA7000', '#8F9BB3', '#6FD4FF']"
                  :labels="['Em criação', 'Baixa', 'Vigente']"
                />
              </div> -->

              <!-- <div
                class="dashboard__chart is-product"
              >
                <PieChart
                  :data="charts.chartProduct"
                  title="Qtd. de títulos por produtos"
                  :labels="['Soja', 'Café', 'Milho', 'Algodão']"
                  :colors="['#CD75EF', '#EA7000', '#540075', '#6FD4FF']"
                />
              </div> -->

              <!-- <div
                class="dashboard__chart is-score"
              >
                <BarChart
                  :data="charts.chartScore"
                  title="Score dos títulos"
                  :labels="['0 a 30', '30 a 60', '60 a 90', '+90']"
                  :colors="['#540075', '#6FD4FF', '#540075', '#6FD4FF',]"
                />
              </div> -->

              <!-- <div
                class="dashboard__chart is-uf"
              >
                <BarChart
                  :data="charts.chartUf"
                  title="Títulos cadastrados por UF"
                  :labels="['SP', 'GO', 'RJ', 'MT']"
                  :colors="['#EA7000', '#F09847', '#EA7000', '#F09847']"
                />
              </div> -->
            </div>
          </template>
        </ContentWrapper>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .dashboard {

    &__wrapper-cards {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;

      :nth-child(4n + 1) {
        margin-left: 0px;
      }
    }

    &__mini-card {
      flex: 1;
      margin-left: 16px;
      margin-bottom: 16px;
    }

    &__body {
      display: flex;
      margin-top: 10px;
      align-items: center;
      flex-flow: column nowrap;
    }

    &__wrapper {
      width: 100%;
      margin-top: 32px;
    }

    &__charts {
      width: 100%;
      display: grid;
      row-gap: 16px;
      grid-column-gap: 16px;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-areas:
        "titles line line line"
        "guarantee guarantee product types"
        "score score uf uf"
      ;

      &.is-charts {
        grid-template-areas:
          "line line line line"
          "guarantee guarantee product titles"
          "score score uf uf"
        ;
      }
    }

    &__chart {
      &.is-line {
        grid-area: line;
      }

      &.is-titles {
        grid-area: titles;
      }

      &.is-guarantee {
        grid-area: guarantee;
      }

      &.is-score {
        grid-area: score;
      }

      &.is-uf {
        grid-area: uf;
      }
    }
  }
</style>
