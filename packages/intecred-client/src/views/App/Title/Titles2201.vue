<template>
  <div class="titles">
    <div
      class="titles__header"
    >
      <IntTabs
        :items="tabs"
        v-model="active"
        @input="handleTab"
        class="titles__tabs"
      />

      <DropTabs
        :items="tabs"
        v-model="active"
        class="titles__drop-tabs"
      />

      <div class="titles__head">
        <button
          v-if="currentTab === 'tables'"
          class="icon-button is-filled"
          :class="{ 'titles__button': showFilter }"
          @click.prevent="showFilter = ! showFilter"
        >
          <IconFilter/>
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
      class="titles__filter"
      v-if="currentTab === 'tables' && showFilter"
    >
      <IntInput
        isSelect
        clearable
        filterable
        placeholder="Nome"
        v-model="form.name"
        label="Busca por nome"
        class="titles__filter-name"
      >
        <el-option
          v-for="(value, index) in nomes"
          :key="index"
          :label="value"
          :value="value"
        >
          <span class="el-select__option-child">{{ value }}</span>
          <span class="el-select__option-child"/>
        </el-option>
      </IntInput>

      <IntInput
        v-model="form.document"
        label="Busca CPF / CNPJ"
        placeholder="CPF / CNPJ"
        class="titles__filter-cpf"
      />

      <IntInput
        isSelect
        clearable
        filterable
        v-model="form.type"
        label="Tipo de título"
        placeholder="Típo de título"
        class="titles__filter-title"
      >
        <el-option
          v-for="(value, index) in titlesType"
          :key="index"
          :label="value"
          :value="value"
        >
          <span class="el-select__option-child">{{ value }}</span>
          <span class="el-select__option-child"/>
        </el-option>
      </IntInput>

      <IntInput
        isSelect
        clearable
        filterable
        label="Cidade"
        v-model="form.city"
        placeholder="Cidade"
        class="titles__filter-city"
      >
        <el-option
          v-for="(value, index) in cityOptions"
          :key="index"
          :label="value"
          :value="value"
        >
          <span class="el-select__option-child">{{ value }}</span>
          <span class="el-select__option-child"/>
        </el-option>
      </IntInput>

      <IntInput
        isSelect
        label="UF"
        clearable
        filterable
        v-model="form.uf"
        placeholder="Estado"
        class="titles__filter-uf"
      >
        <el-option
          v-for="({ uf, label }, index) in ufOptions"
          :key="index"
          :label="uf"
          :value="uf"
        >
          <span class="el-select__option-child">{{ uf }}</span>
          <span class="el-select__option-child">{{ label }}</span>
        </el-option>
      </IntInput>

      <IntInput
        isSelect
        clearable
        filterable
        label="Moeda"
        v-model="form.money"
        placeholder="Real (BRL)"
        class="titles__filter-moeda"
      >
        <el-option
          v-for="({ label, value }, index) in money"
          :key="index"
          :label="value"
          :value="value"
        >
          <span class="el-select__option-child">{{ value }}</span>
          <span class="el-select__option-child">{{ label }}</span>
        </el-option>
      </IntInput>

      <div
        class="titles__filter-close"
      >
        <IconClose
          @click.prevent="showFilter = false"
        />
      </div>

      <button
        @click.prevent="handleSave"
        class="titles__filter-save"
      >
        Buscar títulos
      </button>
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
              :redirect-link="() => editTitle(item)"
              :class="{ 'titles__body--cursor-pointer': item.status < 3 }"
              v-bind="item"
              :key="item.id"
              v-for="item in items[value].slice(-6)"
              class="titles__card"
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
              @row-click="handleClick"
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
                :class-name="prop === 'status' ? 'titles__cell--status' : '' "
              >
                <template
                  v-slot="{row}"
                >
                  <IntCell
                    :row="row"
                    :prop="prop"
                    v-if="prop !== 'status'"
                  />

                  <IntTag
                    v-else
                    :status="row[prop]"
                  />
                </template>
              </el-table-column>

              <el-table-column
                align="left"
                width="47"
              >
                <IconArrow/>
              </el-table-column>
            </el-table>
          </div>

          <div
            v-if="currentTitles.length > 20"
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

            <input
              :value="currentPage"
              @blur="handleGoPage($event.target.value)"
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
            <el-radio-button label="Fisica">CPR</el-radio-button>
            <el-radio-button label="Financeira">CPRF</el-radio-button>
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
              :label="item.nome"
              :value="item.id"
            >
              <span class="el-select__option-child">{{ item.nome }}</span>
              <span class="el-select__option-child">{{ item.documento }}</span>
            </el-option>
          </int-input>

          <div
            v-if="tipo !== 'Duplicata'"
            class="titles__modal-radio"
          >
            <el-radio-group v-model="tipoCpr">
              <el-radio label="Intecred">CPR Intecred</el-radio>
              <el-radio label="Upload">Upload de CPR já assinada</el-radio>
            </el-radio-group>
          </div>
          <div v-show="cpr === 'Upload' && tipo !== 'Duplicata'" class="titles__modal__upload">
            <Upload
              onTitles
              @input="updateFile"
              v-model="file"
              title="CPR já assinada"
              description="Upload de uma CPR que foi criada fora da Intecred e já está assinada.">
            </Upload>
          </div>
        </div>
      </template>

       <template #footer>
        <el-button
          :disabled="hasAnyPendency"
          type="primary"
          class="titles__modal-footer"
          @click.prevent="storeNewTitle"
        >
          Avançar
        </el-button>
      </template>
    </int-sidebar>
  </div>
</template>
<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import api from '../../../services/api';
import IntTag from '../../../components/Tag.vue';
import IntCell from '../../../components/Cell.vue';
import IntTabs from '../../../components/Tabs.vue';
import IntCard from '../../../components/Card.vue';
import IntInput from '../../../components/Input.vue';
import DropTabs from '../../../components/DropTabs.vue';
import IntSidebar from '../../../components/Sidebar.vue';
import IconPlus from '../../../assets/svgs/icon-plus.svg';
import Accordion from '../../../components/Accordion.vue';
import IconClose from '../../../assets/svgs/icon-close.svg';
import IconFilter from '../../../assets/svgs/icon-filter.svg';
import IconArrow from '../../../assets/svgs/icon-arrow-right.svg';
import ContentWrapper from '../../../components/ContentWrapper.vue';
import Upload from '../../../components/Upload.vue';
import { dateTime } from '../../../helpers';

export default {
  components: {
    IntTag,
    IntCell,
    IntCard,
    IntTabs,
    DropTabs,
    IconPlus,
    IntInput,
    IconArrow,
    Accordion,
    IconClose,
    IconFilter,
    IntSidebar,
    ContentWrapper,
    Upload,
  },

  data: () => ({
    modal: false,
    showFilter: false,
    tipo: 'Fisica',
    tipoCpr: 'Intecred',
    active: 'cards',
    client: '',
    clients: [],
    titles: [],
    file: [],
    page: {
      paid: 1,
      making: 1,
      current: 1,
      all: 1,
    },
    form: {
      uf: '',
      type: '',
      name: '',
      city: '',
      money: '',
      document: '',
    },
  }),

  // async created() {
  //   await api.get('/cliente/ObterTodosClientes').then((res) => {
  //     this.clients = res.data;
  //   });
  // },

  async created() {
    await axios.get(`${this.$url}/cliente/ObterTodosClientes`,
      {
        headers:
        {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          empresaId: localStorage.getItem('empresa_Id').toString(),
        },
      }).then((res) => {
      console.log('clients', res);
      this.clients = res.data;
    });
  },

  computed: {
    ...mapGetters('title', ['titlePhysicalBase', 'titleFinancialBase', 'titleDuplicateBase']),
    uploadHasPendency() {
      if (this.tipoCpr === 'Upload') {
        return !this.file.length || !this.client;
      }
      return false;
    },
    newStoreHasPendency() {
      console.log('hasAnyPendency', this.client);
      return !this.client;
    },
    hasAnyPendency() {
      return this.uploadHasPendency || this.newStoreHasPendency;
    },
    items() {
      return this.titles.reduce((grouped, item) => {
        const types = ['making', 'current', 'paid'];

        const group = types[item.status - 1];
        if (!grouped[group]) {
          return grouped;
        }
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
      if (this.active === 'all') {
        return [
          {
            width: 204,
            prop: 'nome',
            sortable: true,
            label: 'Nome / Razão social',
          },
          {
            width: 143,
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
            width: 119,
            sortable: true,
            label: 'Cidade',
            prop: 'municipio',
          },
          {
            width: 124,
            prop: 'created',
            sortable: true,
            label: 'Criação',
          },
          {
            width: 120,
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
          {
            width: 116,
            prop: 'status',
            label: 'Status',
            sortable: true,
          },
        ];
      }

      return [
        {
          width: 224,
          prop: 'nome',
          sortable: true,
          label: 'Nome / Razão social',
        },
        {
          width: 175,
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
          width: 155,
          sortable: true,
          label: 'Cidade',
          prop: 'municipio',
        },
        {
          width: 124,
          prop: 'created',
          sortable: true,
          label: 'Criação',
        },
        {
          width: 147,
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

    money() {
      return [
        {
          value: 'Real',
          label: 'BRL',
        },
        {
          label: 'USD',
          value: 'Dolar',
        },
      ];
    },

    nomes() {
      return new Set(this.titles.map(({ nome }) => nome));
    },

    titlesType() {
      return [
        'Fisica',
        'Financeira',
        'Duplicata',
      ];
    },
  },

  methods: {
    async handleSave() {
      const {
        uf = '',
        name = '',
        city = '',
        type = '',
        money = '',
        document = '',
      } = this.form;

      const validDocument = document.length === 14 || document.length === 18;

      const keyDocument = document.length === 14 ? 'cpf' : 'cnpj';

      await api.get(`/titulos?${uf ? `&uf=${uf}` : ''}${name ? `&nome=${name}` : ''}${type ? `&tipo=${type}` : ''}${money ? `&moeda=${money.toLowerCase()}` : ''}${city ? `&municipio=${city}` : ''}${document && validDocument ? `&${keyDocument}=${document}` : ''}`)
        .then(({ data }) => {
          this.titles = data;
        });
    },

    async handleTab(payload) {
      if (payload === 'cards') {
        this.form = {
          uf: '',
          type: '',
          name: '',
          city: '',
          money: '',
          document: '',
        };

        this.showFilter = false;
        console.log('Handle Tab ->');
        // await api.get('/titulos')
        //   .then(({ data }) => {
        //     this.titles = data;
        //   });
        await axios.get(`${this.$url}/cliente/ObterTodosClientes`,
          {
            headers:
        {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          empresaId: localStorage.getItem('empresa_Id').toString(),
        },
          }).then((res) => {
          this.clients = res.data;
        });

        // await axios.get('/titulo/dashboard')
        await axios.get(`${this.$url}/titulo/dashboard`,
          {
            headers:
        {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          empresaId: localStorage.getItem('empresa_Id').toString(),
        },
          }).then((res) => {
          this.titles = res.data;
        });
      }
    },

    handleClick(title) {
      this.editTitle(title);
    },

    updateFile(value) {
      this.file = value;
    },

    editTitle(title) {
      const {
        id,
        tipo,
        status,
        currentStep = 1,
      } = title;

      /**
       * @todo
       * Verificação do status do título para edição
       * (Pode ser livremente alterado)
       */
      if (!status || status > 2) {
        return;
      }

      if (status === 2) {
        api.get('quitacoes', {
          params: {
            titulo: title.id,
          },
        }).then(({ data }) => {
          const [discharge] = data;
          if (!discharge) {
            const base = {
              titulo: title.id,
              dataVencimento: '',
              dataLiquidacao: '',
              liquidacaoEmDia: '',
              client: title.client,
              file: [],
              obs: '',
            };
            api.post('quitacoes', base).then((res) => this.$router.push({
              name: 'DischargeData',
              params: {
                titulo: id,
                quitacao: res.data.id,
              },
            }));
            return;
          }

          this.$router.push({
            name: discharge.step || 'DischargeData',
            params: {
              titulo: id,
              quitacao: discharge.id,
            },
          });
        });
        return;
      }

      this.$router.push({
        name: this.getComponentTitle(tipo),
        params: {
          titulo: id,
          step: currentStep,
        },
      });
    },
    getComponentTitle(type) {
      if (this.tipoCpr === 'Upload') {
        return 'CompleteCPR';
      }
      if (type === 'Física') {
        return 'CreatePhysicalTitle';
      }
      if (type === 'Fisica') {
        return 'CreatePhysicalTitle';
      }
      if (type === 'Financeira') {
        return 'CreateFinancialTitle';
      }
      return 'CreateDuplicateTitle';
    },
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
      // if (this.uploadHasPendency) {
      //   return;
      // }
      // let data;
      // if (this.tipo === 'Fisica') {
      //   data = { ...this.titlePhysicalBase };
      // } else if (this.tipo === 'Financeira') {
      //   data = { ...this.titleFinancialBase };
      // } else {
      //   data = { ...this.titleDuplicateBase };
      // }

      // const {
      //   id,
      //   type,
      //   contact: {
      //     emails,
      //   },
      //   user: {
      //     name,
      //     document,
      //   },
      // } = this.clients.find((client) => client.id === this.client);

      // const documentType = type === 'CPF' || type === 'cpf' ? 'cpf' : 'cnpj';

      // data.client = id;

      // data.nome = name;

      // data.email = emails[0]?.email || '';

      // data.tipo = this.tipo;

      // data.cpr = this.client.cpr;

      // data[documentType] = document;

      // if (this.cpr === 'Upload') {
      //   await this.dispatchFile();
      //   /**
      //    * Adicionar a minuta no titulo que está sendo criado no backend.
      //    */
      //   const [
      //     minuta,
      //   ] = this.file;

      //   data.minuta = minuta;
      //   data.physicalSignatureFile = this.file;
      // }
      // Todo: Usando esses dados abaixo, testar com o 'data' de cima
      const titulo = {
        tipo: this.tipo,
        finalizado: false,
        status: 1,
        clienteId: this.client,
        tipoCpr: this.tipoCpr,
      };
      console.log('titulo', titulo);
      await axios.post(`${this.$url}/titulo`, titulo,
        {
          headers:
          {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            empresaId: localStorage.getItem('empresa_Id').toString(),
          },
        })
        .then((res) => {
          const params = { titulo: parseInt(res.data.id, 10) };
          if (this.tipoCpr !== 'Upload') {
            params.step = 1;
          }
          this.feedback = false;
          this.$router.push({
            name: this.getComponentTitle(res.data.tipo),
            params: {
              ...params,
            },
          });
        });
    },
  },
  async dispatchFile() {
    const [data] = this.file;
    if (!data) {
      throw new Error('file is required');
    }
    data.file = 'http://localhost:8080/static/adobe.pdf';
    data.date = dateTime();
    const form = new FormData();
    const json = JSON.stringify(data);
    const blob = new Blob([json], {
      type: 'application/json',
    });
    form.append('file[cpr-complete]', blob);
    await api.post('/images/', form, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async mounted() {
    await axios.get(`${this.$url}/cliente/ObterTodosClientes`,
      {
        headers:
        {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          empresaId: localStorage.getItem('empresa_Id').toString(),
        },
      }).then((res) => {
      this.clients = res.data;
    });

    // await axios.get('/titulo/dashboard')
    await axios.get(`${this.$url}/titulo/dashboard`,
      {
        headers:
        {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          empresaId: localStorage.getItem('empresa_Id').toString(),
        },
      }).then((res) => {
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
      await api.get('/cliente/ObterTodosClientes')
        .then((res) => {
          this.clients = res.data;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.titles {
  &__filter {
    width: 100%;
    padding: 24px;
    row-gap: 20px;
    display: grid;
    margin-top: 24px;
    border-radius: 4px;
    grid-column-gap: 20px;
    box-sizing: border-box;
    background-color: #ffffff;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas:
      "name name cpf cpf close"
      "title city uf moeda save"
    ;

    &-name {
      grid-area: name;
    }

    &-cpf {
      grid-area: cpf;
    }

    &-close {
      display: flex;
      grid-area: close;
      justify-content: flex-end;

      :nth-child(n) {
        cursor: pointer;
      }
    }

    &-title {
      grid-area: title;
    }

    &-uf {
      grid-area: uf;
    }

    &-moeda {
      grid-area: moeda;
    }

    &-save {
      height: 48px;
      display: flex;
      grid-area: save;
      color: #ffffff;
      margin-top: auto;
      font-weight: bold;
      line-height: 20px;
      border-radius: 4px;
      align-items: center;
      justify-content: center;
      font-family: $font_primary;
      background-color: $--color-gray-7;
    }
  }

  &__button {
    background-color: $--color-gray-7 !important;

    svg {
      & * {
        fill: #ffffff !important;
      }
    }
  }

  &__drop-tabs {
    display: none;
  }

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

    &--cursor-pointer {
      cursor: pointer;
    }
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
    height: 24px;
    font-size: 12px;
    padding: 2px 8px;
    line-height: 20px;
    border-radius: 4px;
    box-sizing: border-box;
    color: $--color-gray-7;
    font-family: $font_secondary;
    border: solid 1px $--color-gray-5;
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

    &--status {
      & > .cell {
        padding: 0px 0px 0px 10px !important;
      }
    }
  }
}

  @media screen and (min-width: 375px) and (max-width: 710px) {
    .titles {
      padding: 0px 20px;
      box-sizing: border-box;

      &__tabs {
        display: none;
      }

      &__drop-tabs {
        display: block;
      }

      &__card {
        margin-left: -16px;
      }

      &__header {
        align-items: center;
      }
    }
  }

  @media screen and (min-width: 710px) and (max-width: 768px) {
    .titles {
      padding: 0px 20px;
      box-sizing: border-box;

      &__drop-tabs {
        display: block;
      }

      &__tabs {
        display: none;
      }

      &__header {
        align-items: flex-start;
      }
    }
  }

  @media screen and (min-width: 768px) and (max-width: 860px) {
    .titles {
      padding: 0px 20px;
      box-sizing: border-box;

      &__header {
        flex-flow: column-reverse nowrap;
      }
    }
  }

  @media screen and (min-width: 860px) and (max-width: 1120px) {
    .titles {
      padding: 0px 20px;
      box-sizing: border-box;
    }
  }
</style>
