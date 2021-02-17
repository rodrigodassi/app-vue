<script>
import axios from 'axios';
// import api from '../../../services/api';
import IconTeam from '../../../assets/svgs/icon-team.svg';
import IconArrow from '../../../assets/svgs/icon-arrow-right.svg';
import IconSearch from '../../../assets/svgs/icon-search.svg';

export default {
  components: {
    IconTeam,
    IconArrow,
    IconSearch,
  },

  data: () => ({
    show: false,
    teams: [],
    search: '',
    page: 1,
  }),

  mounted() {
    this.clients();
  },

  computed: {
    head() {
      return [
        {
          prop: 'id',
          label: 'Código',
          width: 119,
          sortable: true,
        },
        {
          prop: 'nome',
          label: 'Nome / Razão social',
          width: 292,
          sortable: true,
        },
        {
          prop: 'documento',
          label: 'CPF / CNPJ',
          width: 200,
        },
        {
          prop: 'uf',
          label: 'UF',
          sortable: true,
        },
        {
          prop: 'cidade',
          label: 'Cidade',
          sortable: true,
        },
        {
          prop: 'datacadastro',
          label: 'Criação',
          sortable: true,
        },
      ];
    },

    filtered() {
      const { teams, search } = this;

      const lowered = search.toLowerCase();

      const items = teams?.filter(({
        nome, documento, datacadastro, uf, cidade,
      }) => (
        (nome && nome.toLowerCase().indexOf(lowered) !== -1)
        || (documento && documento.toLowerCase().indexOf(lowered) !== -1)
        || (datacadastro && datacadastro.toLowerCase().indexOf(lowered) !== -1)
        || (uf && uf.toLowerCase().indexOf(lowered) !== -1)
        || (cidade && cidade.toLowerCase().indexOf(lowered) !== -1)
      ));

      if (!search) return teams;

      return items;
    },
  },

  methods: {
    async clients() {
      await axios.get(`${this.$url}/cliente/ObterTodosClientes`,
        {
          headers:
          {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            empresaId: localStorage.getItem('empresa_Id').toString(),
          },
        }).then((res) => {
        console.log('Cliente ->', res);
        this.teams = res.data;
      });
    },

    toggle() {
      this.show = !this.show;
    },

    handleClick({ id }) {
      this.$router.push({
        params: { id },
        name: 'TeamEdit',
      });
    },

    handlePage(page) {
      this.page = page;
    },

    handleGoPage(value) {
      const newPage = Number(value);

      const rest = this.teams.length % 20 === 0 ? 0 : 1;

      const totalPages = Math.trunc(this.teams.length / 20) + rest;

      if (newPage < 1) {
        this.page = 1;

        return;
      }

      if (newPage > totalPages) {
        this.page = totalPages;

        return;
      }

      this.page = newPage;
    },
  },
};
</script>

<template>
  <div class="team">
    <div class="team__head">
      <button
        class="icon-button is-filled"
        v-if="! show"
        @click.prevent="toggle"
      >
        <IconSearch/>
      </button>

      <el-input
        v-model="search"
        v-else
        placeholder="Buscar"
      >
        <template #suffix>
          <i
            class="el-input__icon el-icon-close"
            style="cursor: pointer;"
            @click.prevent="toggle"
          />
        </template>
      </el-input>

      <el-button
        type="primary"
        @click="$router.push({ name: 'NewCreate' })"
      >Novo cliente</el-button>
    </div>

    <div class="team__body">
      <div
        class="team__body-empty"
        v-if="teams.length <= 0"
      >
        <span>
          <IconTeam/>
        </span>
        <h3>Aguarde...</h3>
        <p class="p1">Carregando os clientes</p>
      </div>

      <div
        class="table"
        v-else
      >
        <el-table
          @row-click="handleClick"
          header-cell-class-name="team__header"
          :data="filtered.slice((page - 1) * 20, page * 20)"
        >
          <el-table-column
            v-for="item in head"
            :key="item.label"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :sortable="item.sortable"
          />
          <el-table-column
            align="left"
            width="56"
          >
            <IconArrow/>
          </el-table-column>

          <template #empty>
            <div class="team__body-empty">
              <span>
                <IconSearch/>
              </span>
              <h3>Nenhum cliente encontrado</h3>
              <p class="p1">Confira a grafia e busque outra vez, ou realize um novo cadastro.</p>
            </div>
          </template>
        </el-table>

        <div
          v-if="teams.length > 20"
          class="team__table-footer"
        >
          <el-pagination
            :page-size="20"
            :current-page="page"
            hide-on-single-page
            :total="teams.length"
            layout="prev, pager, next"
            @current-change="handlePage"
          />

          <span
            class="titles__label"
          >
            Ir para:
          </span>

          <input
            :value="page"
            class="titles__input"
            @blur="handleGoPage($event.target.value)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.team {
  &__head {
    width: fit-content;
    display: flex;
    margin-left: auto;

    button {
      margin-left: 24px;
    }

    .el-input {
      min-width: 316px;
    }
  }

  &__body {
    margin-top: 32px;

    &-empty {
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 auto;
      text-align: center;
      background-color: $--color-gray-1;
      padding: 64px;
      align-items: center;

      span {
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        border-radius: 50%;
        margin-bottom: 16px;
        justify-content: center;
        background-color: rgba($--color-info, 0.2);

        svg path {
          fill: $--color-info;
        }
      }

      h3 {
        color: $--color-gray-7;
      }

      & p {
        margin-top: 8px;
        color: $--color-gray-6;
        max-width: 272px;
      }
    }
  }

  &__header {
    .cell {
      padding: 0px 0px 0px 10px !important;
    }
  }

  &__table-footer {
    display: flex;
    margin-top: 50px;
    align-items: center;
    justify-content: center;
  }
}

  @media screen and (max-width: 1080px) {
    .team {
      padding: 0px 20px;
      box-sizing: border-box;
    }
  }
</style>
