<template>
  <div>
    <div class="form-data__item--size-bottom">
      <div class="form-data__size-bottom__banner">
        <span>Soja</span>
      </div>
    </div>
    <div class="form-data__item--size-bottom
     form-data--two-items">
      <span class="form-data--two-items__item">
        <IntInput
          v-model="produtividade"
          label="Produtividade"
          placeholder="Defina produtividade (kg/ha)"
        />
      </span>
      <span class="form-data--two-items__item">
        <IntInput
          v-model="areaProducao"
          label="Defina produtividade (kg/ha)"
          placeholder="Defina produtividade (kg/ha)"
        />
      </span>
    </div>
    <div class="form-data__item--size-bottom">
      <IntInput
        v-model="nomeFazenda"
        label="Nome da fazenda"
        placeholder="Escolha o nome da fazenda"
      />
    </div>
    <div class="form-data__item--size-bottom
      form-data--two-items">
      <span class="form-data--two-items__item">
        <IntInput
          class="form-data--two-items__item"
          v-model="uf"
          label="UF"
          placeholder="Selecione o estado"
          isSelect
          @input="ObterMunicipios(uf)"
        >
          <el-option
            v-for="(item, index) in ufOptions"
            :key="index"
            :label="item.uf"
            :value="item.estadoId"
          >
            <span class="el-select__option-child">{{ item.uf }}</span>
            <span class="el-select__option-child">{{ item.uf }}</span>
          </el-option>
        </IntInput>
      </span>
      <span class="form-data--two-items__item">
        <IntInput
          class="form-data--two-items__item"
          v-model="municipio"
          label="Município"
          placeholder="Selecione a cidade"
          isSelect
        >
          <el-option
            v-for="(item, index) in cityOptions"
            :key="index"
            :label="item.nome"
            :value="item.municipioId"
          >
            <span class="el-select__option-child">{{ item.nome }}</span>
            <span class="el-select__option-child">{{ item.nome }}</span>
          </el-option>
        </IntInput>
      </span>
    </div>
    <div class="form-data__item--size-bottom">
      <IntInput
        v-model="numeroMatricula"
        label="Número da matrícula"
        placeholder="Insira o número da matrícula "
      />
    </div>
    <div class="form-data__item--size-bottom
      form-data--two-items">
      <span class="form-data--two-items__item">
        <IntInput
          v-model="ufRegistro"
          label="UF da comarca de registro:"
          placeholder="Selecione o estado"
          isSelect
          @input="ObterMunicipiosComarca(ufRegistro)"
        >
          <el-option
            v-for="(item, index) in ufRegistrationDistrictOptions"
            :key="index"
            :label="item.uf"
            :value="item.estadoId"
          >
            <span class="el-select__option-child">{{ item.uf }}</span>
            <span class="el-select__option-child">{{ item.uf }}</span>
          </el-option>
        </IntInput>
      </span>
      <span class="form-data--two-items__item">
        <IntInput
          v-model="municipioRegistro"
          label="Município da comarca de registro:"
          placeholder="Selecione a cidade"
          isSelect
        >
          <el-option
            v-for="(item, index) in cityRegistrationDistrictOptions"
            :key="index"
            :label="item.nome"
            :value="item.municipioId"
          >
            <span class="el-select__option-child">{{ item.nome }}</span>
            <span class="el-select__option-child">{{ item.nome }}</span>
          </el-option>
        </IntInput>
      </span>
    </div>
    <div class="form-data__item--size-bottom">
      <IntInput
        v-model="areaReservaLegal"
        label="Área de reserva legal (hectares)"
        placeholder="Qtd de hectares"
      />
    </div>
    <div class="form-data__item--size-bottom">
      <IntInput
        v-model="areaReservaTotal"
        label="Área total (hectares)"
        placeholder="Qtd de hectares"
      />
    </div>
    <div class="form-data__item--size-bottom
     form-data--two-items">
      <span class="form-data--two-items__item">
        <IntInput
          v-model="latitude"
          label="Latitude"
          placeholder="000000000"
        />
      </span>
      <span class="form-data--two-items__item">
        <IntInput
          v-model="longitude"
          label="Longitude"
          placeholder="000000000"
        />
      </span>
    </div>
    <div class="form-data__item--size-bottom">
      <Upload
        :update-before="true"
        :file-list="files"
        @input="UPDATE_FILES"
        :is-multiple="true"
        v-model="files"
        title="Importar arquivos"
        description="Referentes à propriedade, como imagens ou arquivos de mapa em *kml.">
      </Upload>
    </div>
    <div class="form-data__item--size-bottom">
      <div class="form-data__radio">
        <span class="form-data__radio__info">
          <p class="form-data__item--size-bottom__p1  ">Área própria ou de terceiros?</p>
        </span>
        <el-radio-group v-model="tipoArea">
          <el-radio @change="CLEAR_OWNERS" label="own">Própria</el-radio>
          <el-radio @change="ADD_NEW_OWNER" label="others">Terceiros</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div
      :key="index"
      v-for="(_, index) in proprietarios"
      class="form-data__wrapper-inputs"
    >
      <div class="form-data__item--size-bottom">
        <span class="form-data__wrapper-inputs__badge">
          <span>Proprietário {{ index + 1 }}</span>
          <span>
            <IconDelete @click="prepareModalRemoveOwner(index)"/>
          </span>
        </span>
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-model="proprietarios[index].cpf"
          label="CPF"
          placeholder="000.000.000-00"
        />
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-model="proprietarios[index].nome"
          label="Nome"
          placeholder="Defina o nome completo"
        />
      </div>
      <div class="form-data__item--size-bottom">
        <IntInput
          v-model="proprietarios[index].rg"
          label="RG"
          placeholder="000.000.000-00"
        />
      </div>
    </div>
    <div>
      <button
        class="form-data__add-proprietary"
        v-if="tipoArea === 'others'" @click.stop.prevent="ADD_NEW_OWNER">
        <IconPlus/>
        Adicionar proprietários
      </button>
    </div>
    <IntModal :close-function="closeModal" :show="showBtnRemoveOwner">
      <div class="modal-feedback">
        <div class="modal-feedback__message">
          <span class="modal-feedback__message__icon">
            <span>
              <IconEllipse/>
              <IconDelete/>
            </span>
          </span>
          <span>
            <h2>Deseja excluir:</h2>
            <p>{{ modalInfo }}</p>
          </span>
        </div>

        <div class="modal-feedback__actions">
          <el-button
            type="terciary"
            @click.prevent="cancelRemoveOwner"
          >
            Cancelar
          </el-button>

          <el-button
            type="danger"
            @click.prevent="removeOwner"
          >
            Excluir
          </el-button>
        </div>
      </div>
    </IntModal>
  </div>
</template>

<script>
// import axios from 'axios';
import { mapMutations, mapState } from 'vuex';
import IntInput from '../../../../components/Input.vue';
import Upload from '../../../../components/Upload.vue';
import api from '../../../../services/api';
import IconPlus from '../../../../assets/svgs/icon-plus.svg';
import IconEllipse from '../../../../assets/svgs/icon-ellipse.svg';
import IconDelete from '../../../../assets/svgs/icon-delete.svg';
import IntModal from '../../../../components/Modal.vue';

export default {
  mounted() {
    this.getStep2Options();
  },
  name: 'FormSecondStep',
  data: () => ({
    user: 1,
    ufOptions: [],
    cityOptions: [],
    ufRegistrationDistrictOptions: [],
    cityRegistrationDistrictOptions: [],
    showBtnRemoveOwner: false,
    tempOwnerIndex: null,
  }),
  computed: {
    ...mapState('title', ['title']),
    proprietarios: {
      get() {
        return this.title.proprietarios;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'proprietarios',
          value,
        });
      },
    },
    files: {
      get() {
        return this.title.files;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'files',
          value,
        });
      },
    },
    longitude: {
      get() {
        return this.title.longitude;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'longitude',
          value,
        });
      },
    },
    latitude: {
      get() {
        return this.title.latitude;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'latitude',
          value,
        });
      },
    },
    areaReservaTotal: {
      get() {
        return this.title.areaReservaTotal;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'areaReservaTotal',
          value,
        });
      },
    },
    areaReservaLegal: {
      get() {
        return this.title.areaReservaLegal;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'areaReservaLegal',
          value,
        });
      },
    },
    municipioRegistro: {
      get() {
        return this.title.municipioRegistro;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'municipioRegistro',
          value,
        });
      },
    },
    ufRegistro: {
      get() {
        return this.title.ufRegistro;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'ufRegistro',
          value,
        });
      },
    },
    numeroMatricula: {
      get() {
        return this.title.numeroMatricula;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'numeroMatricula',
          value,
        });
      },
    },
    municipio: {
      get() {
        return this.title.municipio;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'municipio',
          value,
        });
      },
    },
    uf: {
      get() {
        return this.title.uf;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'uf',
          value,
        });
      },
    },
    nomeFazenda: {
      get() {
        return this.title.nomeFazenda;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'nomeFazenda',
          value,
        });
      },
    },
    areaProducao: {
      get() {
        return this.title.areaProducao;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'areaProducao',
          value,
        });
      },
    },
    produtividade: {
      get() {
        return this.title.produtividade;
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'produtividade',
          value,
        });
      },
    },
    tipoArea: {
      get() {
        return this.title.tipoArea || 'own';
      },
      set(value) {
        this.UPDATE_PARTIALS_FORM({
          key: 'tipoArea',
          value,
        });
      },
    },
    modalInfo() {
      const { tempOwnerIndex } = this;
      const updateIndex = tempOwnerIndex + 1;
      return `Proprietário ${updateIndex}?`;
    },
  },
  components: {
    IntInput,
    IconPlus,
    IconDelete,
    Upload,
    IntModal,
    IconEllipse,
  },
  methods: {
    async getStep2Options() {
      await api.get('/formacaoLavoura/ObterEstados',
        {
          headers:
          {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            empresaId: localStorage.getItem('empresa_Id').toString(),
          },
        })
        .then((res) => {
          this.ufOptions = res.data;
          this.ufRegistrationDistrictOptions = res.data;
        });
    },
    async ObterMunicipios(ufEstadoId) {
      await api.get(`/formacaoLavoura/ObterMunicipiosPorUF?ufEstadoId=${ufEstadoId}`,
        {
          headers:
          {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            empresaId: localStorage.getItem('empresa_Id').toString(),
          },
        })
        .then((res) => {
          this.cityOptions = res.data;
        });
    },
    async ObterMunicipiosComarca(ufEstadoComarcaId) {
      await api.get(`/formacaoLavoura/ObterMunicipiosPorUF?ufEstadoId=${ufEstadoComarcaId}`,
        {
          headers:
          {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            empresaId: localStorage.getItem('empresa_Id').toString(),
          },
        })
        .then((res) => {
          this.cityRegistrationDistrictOptions = res.data;
        });
    },
    ...mapMutations('title', [
      'UPDATE_TITLE',
      'UPDATE_PARTIALS_FORM',
      'ADD_NEW_OWNER',
      'REMOVE_OWNER',
      'CLEAR_OWNERS',
      'UPDATE_FILES',
    ]),
    closeModal() {
      this.showBtnRemoveOwner = false;
    },
    prepareModalRemoveOwner(index) {
      this.showBtnRemoveOwner = true;
      this.tempOwnerIndex = index;
    },
    removeOwner() {
      this.REMOVE_OWNER(this.tempOwnerIndex);
      this.showBtnRemoveOwner = false;
      this.tempOwnerIndex = null;
    },
    cancelRemoveOwner() {
      this.showBtnRemoveOwner = false;
      this.tempOwnerIndex = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.form-data {
  &__upload {
    display: flex;
    justify-content: space-between;
    width: 540px;
    height: 152px;
    background: $--color-gray-1;
    box-shadow: 0px 3px 4px rgba(13, 54, 133, 0.15);
    border-radius: 4px;
    padding: 24px;

    &__info {
      height: 104px;
      width: 212px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        color: $--color-gray-7;
      }

      h5 {
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 20px;
        color: $--color-gray-6;
        align-self: flex-start;
      }
    }

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      background: $--color-gray-3;
      border-radius: 4px;

      button {
        position: relative;
        display: block;
        width: 180px;
        height: 120px;
        color: $--color-primary;

        :nth-child(1) {
          display: flex;
          align-items: center;
          justify-content: center;

          :nth-child(2) {
            margin-left: 9px;
          }
        }

        span {
          color: $--color-primary;
        }

        svg path {
          fill: $--color-primary;
        }
      }
    }
  }

  &__add-proprietary {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    width: 540px;
    height: 56px;
    background: $--color-gray-1;
    box-shadow: 0px 3px 4px rgba(13, 54, 133, 0.15);
    border-radius: 4px;
    color: $--color-primary;

    :nth-child(1) {
      margin-right: 10px;
      fill: $--color-primary;
    }

    :nth-child(2) {
      fill: $--color-primary;
    }
  }

  &__wrapper-inputs {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 32px 32px 8px 32px;
    width: 540px;
    background: $--color-gray-1;
    box-shadow: 0px 3px 4px rgba(13, 54, 133, 0.15);
    border-radius: 4px;
    margin-bottom: 10px;

    &__badge {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      background: #E4E9F2;
      height: 40px;
      width: 476px;
      font-weight: bold;
      font-size: 16px;
      line-height: 28px;
      color: #2E3A59;
    }
  }

  &--two-items {
    display: flex;
    justify-content: space-between;
    width: 540px;

    &__item {
      width: 260px
    }
  }

  &--two-items-wrapped {
    display: flex;
    justify-content: space-between;

    &__item {
      width: 230px
    }
  }

  &__item--size-bottom {
    margin-bottom: 27px;

    &--no-margin {
      margin-bottom: 0;
    }
  }

  &__radio {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: start;

    &__info {
      margin-right: 15px;
      max-width: 230px;

      p {
        font-size: 16px;
        line-height: 28px;
        display: flex;
        align-items: center;
        color: #2E3A59;
        margin-right: 8px;

      }
    }

    &__p-bold {
      font-weight: bold;
      font-size: 16px;
      line-height: 28px;
      display: flex;
      align-items: center;
      margin-left: 8px;
    }

    &__group-checkbox {
      display: flex;
      align-items: center;
      margin-left: 30px;
    }
  }
}

</style>
