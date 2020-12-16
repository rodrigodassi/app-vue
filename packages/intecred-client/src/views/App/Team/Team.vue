<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import axios from 'axios';
// import store from '../../../store';
// import api from '../../../services';
import IconTeam from '../../../assets/svgs/icon-team.svg';
import IconArrow from '../../../assets/svgs/icon-arrow-right.svg';
import IconSearch from '../../../assets/svgs/icon-search.svg';
// import { getClientes } from '../../../store/actions';
// import { getClientes } from '../../../store/actions';

export default {
  components: {
    IconTeam,
    IconArrow,
    IconSearch,
  },

  data: () => ({
    show: false,
    teams: [],
    todos_clientes: [],
    search: '',
    current: 1,
    size_page: 10,
    total_pages: 0,
  }),

  watch: {
    current: {
      immediate: true,
      handler() {
        this.data();
      },
    },
  },

  async created() {
    await axios.get(`${this.$url}/cliente/ObterTodosClientes`,
      {
        headers:
        {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          empresaId: localStorage.getItem('empresa_Id').toString(),
        },
      }).then((res) => {
        this.todos_clientes = res;
      });

    await axios.get(`${this.$url}/cliente/ObterQtdClientes`,
      {
        headers:
        {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          empresaId: localStorage.getItem('empresa_Id').toString(),
        },
      }).then((res) => {
        this.total_pages = res.data;
      });
  },

  computed: {
    head() {
      return [
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
      const { teams, todos_clientes, search } = this;

      const lowered = search.toLowerCase();
      const items = todos_clientes.data?.filter(({
        nome, documento, datacadastro, uf, cidade,
      }) => (
          (nome && nome.toLowerCase().indexOf(lowered) !== -1)
          || (documento && documento.toLowerCase().indexOf(lowered) !== -1)
          || (datacadastro && datacadastro.toLowerCase().indexOf(lowered) !== -1)
          || (uf && uf.toLowerCase().indexOf(lowered) !== -1)
          || (cidade && cidade.toLowerCase().indexOf(lowered) !== -1)
        ));

      if (!search) return teams.data;

      return items;
    },

    ...mapState({
      empresaIdUsuario: 'empresaIdUsuario',
    }),
    ...mapGetters({
      empresaIdUsuario: 'empresaIdUsuario',
    }),
  },

  methods: {
    toggle() {
      this.show = !this.show;
    },

    ...mapActions({
      // getClientes: 'getClientes',
    }),

    async data() {
      // const instance = axios.create({
      //   baseURL: 'http://localhost:60937/api/',
      //   timeout: 1000,
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      //     empresaId: localStorage.getItem('empresa_Id').toString(),
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      // });
      // const axiosConfig = {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      //     empresaId: localStorage.getItem('empresa_Id').toString(),
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      // };

      await axios.get(`${this.$url}/cliente/Paginacao?_page=${this.current}&_limit=${this.size_page}`,
        {
          headers:
          {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            empresaId: localStorage.getItem('empresa_Id').toString(),
          },
        }).then((res) => {
          this.teams = res;
        });
    },
    // async data() {
    //   await api.get(`/clients?_page=${this.current}&_limit=${this.size_page}`).then((res) => {
    //     this.teams = res.data;
    //   });
    // },

    change_page(val) {
      this.current = val;
      // this.getClientes();
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
        <IconSearch />
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
        @click="$router.push('/clientes/novo#identificacao')"
      >Novo cliente</el-button>
    </div>

    <div class="team__body">
      <div
        class="team__body-empty"
        v-if="teams.length <= 0"
      >
        <span>
          <IconTeam />
        </span>
        <h3>Nenhum cliente cadastrado</h3>
        <p class="p1">Nesta seção você poderá visualizar todos os clientes</p>
      </div>

      <div
        class="table"
        v-else
      >
        <el-table :data="filtered">
          <el-table-column
            fixed
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
            <IconArrow />
          </el-table-column>

          <template #empty>
            <div class="team__body-empty">
              <span>
                <IconSearch />
              </span>
              <h3>Nenhum cliente encontrado</h3>
              <p class="p1">Confira a grafia e busque outra vez, ou realize um novo cadastro.</p>
            </div>
          </template>
        </el-table>

        <el-pagination
          @current-change="change_page"
          :current-page="current"
          :page-size="size_page"
          layout="prev, pager, next, jumper"
          :total="total_pages"
        />
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

    .el-pagination {
      margin-top: 54px;
      display: flex;
      justify-content: center;
    }

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
}
</style>
