<script>
import { mapGetters } from 'vuex';
import api from '../../../services/api';
import IntTag from '../../../components/Tag.vue';
import IntCell from '../../../components/Cell.vue';
import IntTabs from '../../../components/Tabs.vue';
import IntCard from '../../../components/Card.vue';
import IntInput from '../../../components/Input.vue';
import IntSidebar from '../../../components/Sidebar.vue';
import IconPlus from '../../../assets/svgs/icon-plus.svg';
import Accordion from '../../../components/Accordion.vue';
import IconSearch from '../../../assets/svgs/icon-search.svg';
import ContentWrapper from '../../../components/ContentWrapper.vue';
import IconArrow from '../../../assets/svgs/icon-arrow-left.svg';

export default {
  components: {
    IntTag,
    IntCell,
    IntCard,
    IntTabs,
    IconPlus,
    IntInput,
    IconArrow,
    Accordion,
    IconSearch,
    IntSidebar,
    ContentWrapper,
  },

  data: () => ({
    modal: false,
    tipo: 'Fisica',
    cpr: 'Intecred',
    active: 'cards',
    client: '',
    clients: [],
    titles: [],
    page: {
      paid: 1,
      making: 1,
      current: 1,
      all: 1,
    },
  }),

  computed: {
    ...mapGetters('title', ['titleBase']),
    items() {
      return this.titles.reduce((grouped, item) => {
        const types = ['making', 'current', 'paid'];

        const group = types[item.status - 1];

        grouped[group].push(item);

        return grouped;
      },
      {
        making: [],
        current: [],
        paid: [],
      });
    },

    tabs() {
      const {
        titles,
        items: {
          paid,
          making,
          current,
        },
      } = this;

      return [
        {
          label: 'Resumo',
          value: 'cards',
        },
        {
          label: `Em criação (${making.length})`,
          value: 'making',
        },
        {
          label: `Vigente (${current.length})`,
          value: 'current',
        },
        {
          label: `Baixa (${paid.length})`,
          value: 'paid',
        },
        {
          label: `Todos (${titles.length})`,
          value: 'all',
        },
      ];
    },

    currentTab() {
      return this.active === 'cards' ? 'cards' : 'tables';
    },

    currentPage() {
      return this.page[this.active];
    },

    head() {
      return [
        {
          width: 204,
          prop: 'nome',
          sortable: true,
          label: 'Nome / Razão social',
        },
        {
          width: 165,
          sortable: true,
          prop: 'documento',
          label: 'CPF / CNPJ',
        },
        {
          width: 91,
          label: 'UF',
          sortable: true,
          prop: 'uf',
        },
        {
          width: 149,
          sortable: true,
          label: 'Cidade',
          prop: 'municipio',
        },
        {
          width: 124,
          prop: 'data',
          sortable: true,
          label: 'Criação',
        },
        {
          width: 144,
          prop: 'valor',
          label: 'Valor',
          sortable: true,
        },
        {
          width: 116,
          prop: 'tipo',
          label: 'Tipo',
          sortable: true,
        },
      ];
    },

    currentTitles() {
      const {
        items,
        titles,
        active,
      } = this;

      if (active === 'all') {
        return titles;
      }

      return items[active];
    },

    tags() {
      return [
        {
          value: 'making',
          label: 'Em criação',
        },
        {
          label: 'Vigente',
          value: 'current',
        },
        {
          value: 'paid',
          label: 'Baixa',
        },
      ];
    },
  },

  methods: {
    show() {
      this.modal = !this.modal;
    },

    handlePage(page) {
      this.page[this.active] = page;
    },

    handleGoPage(value) {
      const newPage = Number(value);

      const rest = this.currentTitles.length % 20 === 0 ? 0 : 1;

      const totalPages = Math.trunc(this.currentTitles.length / 20) + rest;

      if (newPage < 1) {
        this.handlePage(1);

        return;
      }

      if (newPage > totalPages) {
        this.handlePage(totalPages);

        return;
      }

      this.handlePage(newPage);
    },
    async storeNewTitle() {
      this.titleBase.tipo = this.tipo;
      this.titleBase.clienteId = this.client.id;
      this.titleBase.cpr = this.client.cpr;
      await api.post('/titulos', this.titleBase)
        .then((res) => () => {
          this.feedback = false;
          this.$router.push({
            name: 'CreateTitle',
            params: {
              titulo: res.data.id,
              step: 3,
            },
          });
        });
    },
  },

  async mounted() {
    await api.get('/clients')
      .then((res) => {
        this.clients = res.data;
      });

    await api.get('/titulos')
      .then((res) => {
        this.titles = res.data;
      });
  },
  watch: {
    active: {
      immediate: true,

      handler() {
        this.page = {
          paid: 1,
          making: 1,
          current: 1,
          all: 1,
        };
      },
    },
    async getClients() {
      await api.get('/clients')
        .then((res) => {
          this.clients = res.data;
        });
    },
  },
};
</script>

<template>
  <div class="titles">
    <div
      class="titles__header"
    >
      <IntTabs
        :items="tabs"
        v-model="active"
      />

      <div class="titles__head">
        <button class="icon-button is-filled">
          <IconSearch/>
        </button>

        <el-button
          type="primary"
          @click.prevent="show"
        >
          Novo título
        </el-button>
      </div>
    </div>

    <div
      class="titles__body"
    >
      <ContentWrapper
        :current="currentTab"
      >
        <template
          #cards
        >
          <Accordion
            :key="value"
            :title="label"
            v-for="({label, value}) in tags"
          >
            <IntCard
              v-bind="item"
              :key="item.id"
              v-for="item in items[value].slice(-6)"
            />
          </Accordion>
        </template>

        <template
          #tables
        >
          <div
            class="titles__table-header"
          >
            <template
              v-if="active !== 'all'"
            >
              <span
                class="titles__title"
              >
                Títulos
              </span>

              <IntTag
                :status="currentTitles[0].status"
              />
            </template>

            <span
              v-else
              class="titles__title"
            >
              Todos os títulos
            </span>
          </div>

          <div
            class="table"
          >
            <el-table
              size="medium"
              cell-class-name="titles__cell"
              :data="currentTitles.slice((currentPage - 1) * 20, currentPage * 20)"
            >
              <el-table-column
                :key="label"
                :prop="prop"
                :label="label"
                :width="width"
                title="item.label"
                :sortable="sortable"
                v-for="({label, prop, width, sortable}) in head"
              >
                <template
                  v-slot="{row}"
                >
                  <IntCell
                    :row="row"
                    :prop="prop"
                  />
                </template>
              </el-table-column>

              <el-table-column
                align="left"
                width="49"
              >
                <IconArrow/>
              </el-table-column>
            </el-table>
          </div>

          <div
            class="titles__table-footer"
          >
            <el-pagination
              :page-size="20"
              hide-on-single-page
              :current-page="currentPage"
              @current-change="handlePage"
              :total="currentTitles.length"
              layout="prev, pager, next"
            />

            <span
              class="titles__label"
            >
              Ir para:
            </span>

            <el-input
              @input="handleGoPage"
              :value="currentPage"
              class="titles__input"
            />
          </div>
        </template>
      </ContentWrapper>
    </div>

    <int-sidebar
      title="Novo título"
      :show="modal"
      :onshow="show"
    >
      <template #body>
        <div class="titles__modal">
          <el-radio-group v-model="tipo">
            <el-radio-button label="Fisica">CPR Física</el-radio-button>
            <el-radio-button label="Financeira">CPR Financeira</el-radio-button>
            <el-radio-button label="Duplicata">Duplicata</el-radio-button>
          </el-radio-group>

          <int-input
            label="Cliente"
            placeholder="Selecione o cliente"
            v-model="client"
            isSelect
          >
            <RouterLink
              to="/clientes/novo#identificacao"
              class="el-select__option-link"
            >
              <IconPlus/>
              <span>Adicionar cliente</span>
            </RouterLink>
            <el-option
              v-for="(item, index) in clients"
              :key="index"
              :label="item.user.name"
              :value="item.id"
            >
              <span class="el-select__option-child">{{ item.user.name }}</span>
              <span class="el-select__option-child">{{ item.user.cpf }}</span>
            </el-option>
          </int-input>

          <div
            v-if="tipo !== 'Duplicata'"
            class="titles__modal-radio"
          >
            <el-radio-group v-model="cpr">
              <el-radio label="Intecred">CPR Intecred</el-radio>
              <el-radio label="Upload">Upload de CPR já assinada</el-radio>
            </el-radio-group>
          </div>
        </div>
      </template>

      <template #footer>
        <el-button type="primary" class="titles__modal-footer" @click.prevent="storeNewTitle">
          Avançar
        </el-button>
      </template>
    </int-sidebar>
  </div>
</template>

<style lang="scss" scoped>
.titles {
  &__header {
    display: flex;
  }

  &__head {
    width: fit-content;
    display: flex;
    margin-left: auto;

    button {
      margin-left: 24px;
    }
  }

  &__body {
    padding-top: 40px;
  }

  &__table-header {
    display: flex;
    align-items: center;
    margin-bottom: 32px;
  }

  &__title {
    font-size: 24px;
    line-height: 32px;
    font-weight: bold;
    margin-right: 16px;
    font-family: $font_primary;
    color: $--color-primary-dark-1;
  }

  &__table-footer {
    display: flex;
    margin-top: 50px;
    align-items: center;
    justify-content: center;
  }

  &__label {
    display: block;
    font-size: 12px;
    margin-right: 4px;
    line-height: 20px;
    color: $--color-gray-6;
    font-family: $font_secondary;
  }

  &__input {
    width: 45px !important;

    .el-input__inner {
      width: 45px;
      height: 24px;
      font-size: 12px;
      line-height: 20px;
      color: $--color-gray-7;
      font-family: $font_secondary;
    }
  }

  &__modal {
    .input {
      margin: 32px 0 28px 0;
    }

    &-footer {
      border-top: 1px dashed $--color-gray-5;
    }
  }

  &__cell {
    .cell {
      white-space: nowrap !important;

      > .cell {
        padding: 0 !important;
      }
    }
  }
}
</style>
