<template>
  <div>
    <div class="form-data__item--size-bottom">
      <div class="form-data__item--size-bottom__banner">
        <span>{{ produto }}</span>
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
          type="numeric"
          label="Tamanho da área de produção"
          placeholder="Defina o tamanho da área (ha)"
        />
      </span>
    </div>
    <div class="form-data--divisor"/>
    <div class="form-data__item--size-bottom">
      <IntInput
        v-model="nomeFazenda"
        label="Nome da fazenda"
        placeholder="Escolha o nome da fazenda"
      />
    </div>
    <div class="form-data__item--size-bottom
      form-data--two-items">
      <div class="form-data--two-items__item">
        <IntInput
          v-model="uf"
          label="UF"
          placeholder="Selecione o estado"
          isSelect
        >
          <el-option
            v-for="(item, index) in ufOptions"
            :key="index"
            :label="item"
            :value="item"
          >
            <span class="el-select__option-child">{{ item }}</span>
            <span class="el-select__option-child">{{ item }}</span>
          </el-option>
        </IntInput>
      </div>
      <div class="form-data--two-items__item">
        <IntInput
          class="form-data--two-items__item"
          v-model="cidade"
          label="Município"
          placeholder="Selecione a cidade"
          isSelect
        >
          <el-option
            v-for="(item, index) in cityOptions"
            :key="index"
            :label="item"
            :value="item"
          >
            <span class="el-select__option-child">{{ item }}</span>
            <span class="el-select__option-child">{{ item }}</span>
          </el-option>
        </IntInput>
      </div>
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
      <div class="form-data--two-items__item">
        <IntInput
          v-model="ufComarcaRegistro"
          label="UF da comarca de registro:"
          placeholder="Selecione o estado"
          isSelect
        >
          <el-option
            v-for="(item, index) in ufRegistrationDistrictOptions"
            :key="index"
            :label="item"
            :value="item"
          >
            <span class="el-select__option-child">{{ item }}</span>
            <span class="el-select__option-child">{{ item }}</span>
          </el-option>
        </IntInput>
      </div>
      <div class="form-data--two-items__item">
        <IntInput
          v-model="cidadeComarcaRegistro"
          label="Município da comarca de registro:"
          placeholder="Selecione a cidade"
          isSelect
        >
          <el-option
            v-for="(item, index) in cityRegistrationDistrictOptions"
            :key="index"
            :label="item"
            :value="item"
          >
            <span class="el-select__option-child">{{ item }}</span>
            <span class="el-select__option-child">{{ item }}</span>
          </el-option>
        </IntInput>
      </div>
    </div>
    <div class="form-data__item--size-bottom">
      <IntInput
        v-model="areaReservaLegal"
        type="numeric"
        label="Área de reserva legal (hectares)"
        placeholder="Qtd de hectares"
      />
    </div>
    <div class="form-data__item--size-bottom">
      <IntInput
        type="numeric"
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
        @input="UPDATE_FILES_FINANCIAL"
        :is-multiple="true"
        v-model="file"
        title="Importar arquivos"
        description="Referentes à propriedade, como imagens ou arquivos de mapa em *kml.">
      </Upload>
    </div>
    <div class="form-data__item--size-bottom">
      <div class="form-data__radio">
        <span class="form-data__radio__info">
          <p class="form-data__item--size-bottom__p1  ">Área própria ou de terceiros?</p>
        </span>
        <el-radio-group v-model="areaPropriaOuTerceiros">
          <el-radio @change="CLEAR_OWNERS_FINANCIAL" label="own">Própria</el-radio>
          <el-radio @change="ADD_NEW_OWNER_FINANCIAL" label="others">Terceiros</el-radio>
        </el-radio-group>
      </div>
      <div
        :key="index"
        v-for="(_, index) in proprietarios"
        class="form-data__wrapper-inputs"
      >
        <div class="form-data__item--size-bottom">
          <div class="form-data__wrapper-inputs__badge">
            <div>Proprietário {{ index + 1 }}</div>
            <span>
              <IconDelete @click="prepareModalRemoveOwner(index)"/>
            </span>
          </div>
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
          v-if="areaPropriaOuTerceiros === 'others'" @click.stop.prevent="ADD_NEW_OWNER_FINANCIAL">
          <IconPlus/>
          Adicionar proprietários
        </button>
      </div>
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
import { mapMutations, mapState } from 'vuex';
import IntInput from '../../../../../components/Input.vue';
import api from '../../../../../services/api';
import Upload from '../../../../../components/Upload.vue';
import IconDelete from '../../../../../assets/svgs/icon-delete.svg';
import IconEllipse from '../../../../../assets/svgs/icon-ellipse.svg';
import IconPlus from '../../../../../assets/svgs/icon-plus.svg';
import IntModal from '../../../../../components/Modal.vue';

export default {
  async mounted() {
    await api.get('/cities')
      .then((res) => {
        this.cityOptions = res.data;
        this.cityRegistrationDistrictOptions = res.data;
      });
    await api.get('/states')
      .then((res) => {
        this.ufOptions = res.data;
        this.ufRegistrationDistrictOptions = res.data;
      });
  },
  name: 'FinancialSecondStep',
  data: () => ({
    cityOptions: [],
    ufOptions: [],
    ufRegistrationDistrictOptions: [],
    cityRegistrationDistrictOptions: [],
    showBtnRemoveOwner: false,
    tempOwnerIndex: '',
  }),
  components: {
    IntInput,
    Upload,
    IconDelete,
    IconPlus,
    IntModal,
    IconEllipse,
  },
  watch: {
    proprietarios(newValue) {
      if (!newValue.length) {
        this.areaPropriaOuTerceiros = 'own';
      }
    },
    areaProducao(newValue) {
      if (!this.areaReservaLegal || this.areaReservaLegal === 0.00) {
        this.areaReservaTotal = parseFloat(newValue);
        return;
      }
      if (!this.areaReservaLegal && !this.areaReservaLegal) {
        this.areaReservaTotal = 0.00;
        return;
      }
      this.areaReservaTotal = parseFloat(newValue) + parseFloat(this.areaReservaLegal);
    },
    areaReservaLegal(newValue) {
      if (!this.areaProducao) {
        this.areaReservaTotal = parseFloat(newValue);
        return;
      }
      if (!this.areaReservaLegal && !this.areaReservaLegal) {
        this.areaReservaTotal = 0.00;
        return;
      }
      this.areaReservaTotal = parseFloat(newValue) + parseFloat(this.areaProducao);
    },
  },
  methods: {
    ...mapMutations('title', [
      'UPDATE_PARTIALS_FINANCIAL',
      'UPDATE_FILES_FINANCIAL',
      'CLEAR_OWNERS_FINANCIAL',
      'ADD_NEW_OWNER_FINANCIAL',
      'REMOVE_OWNER_FINANCIAL',
      'CLEAR_OWNERS_FINANCIAL',
    ]),
    closeModal() {
      this.showBtnRemoveOwner = false;
    },
    prepareModalRemoveOwner(index) {
      this.showBtnRemoveOwner = true;
      this.tempOwnerIndex = index;
    },
    removeOwner() {
      this.REMOVE_OWNER_FINANCIAL(this.tempOwnerIndex);
      this.showBtnRemoveOwner = false;
      this.tempOwnerIndex = null;
    },
    cancelRemoveOwner() {
      this.showBtnRemoveOwner = false;
      this.tempOwnerIndex = null;
    },
  },
  computed: {
    ...mapState('title', ['financialTitle']),
    produto: {
      get() {
        return this.financialTitle.produto;
      },
      set(value) {
        this.UPDATE_PARTIALS_FINANCIAL({
          key: 'produto',
          value,
        });
      },
    },
    produtividade: {
      get() {
        return this.financialTitle.produtividade;
      },
      set(value) {
        this.UPDATE_PARTIALS_FINANCIAL({
          key: 'produtividade',
          value,
        });
      },
    },
    areaProducao: {
      get() {
        return this.financialTitle.areaProducao;
      },
      set(value) {
        this.UPDATE_PARTIALS_FINANCIAL({
          key: 'areaProducao',
          value,
        });
      },
    },
    areaPropriaOuTerceiros: {
      get() {
        return this.financialTitle.areaPropriaOuTerceiros || 'own';
      },
      set(value) {
        this.UPDATE_PARTIALS_FINANCIAL({
          key: 'areaPropriaOuTerceiros',
          value,
        });
      },
    },
    file: {
      get() {
        return this.financialTitle.file;
      },
      set(value) {
        this.UPDATE_PARTIALS_FINANCIAL({
          key: 'file',
          value,
        });
      },
    },
    longitude: {
      get() {
        return this.financialTitle.longitude;
      },
      set(value) {
        this.UPDATE_PARTIALS_FINANCIAL({
          key: 'longitude',
          value,
        });
      },
    },
    latitude: {
      get() {
        return this.financialTitle.latitude;
      },
      set(value) {
        this.UPDATE_PARTIALS_FINANCIAL({
          key: 'latitude',
          value,
        });
      },
    },
    areaReservaTotal: {
      get() {
        return this.financialTitle.areaReservaTotal;
      },
      set(value) {
        this.UPDATE_PARTIALS_FINANCIAL({
          key: 'areaReservaTotal',
          value,
        });
      },
    },
    areaReservaLegal: {
      get() {
        return this.financialTitle.areaReservaLegal;
      },
      set(value) {
        this.UPDATE_PARTIALS_FINANCIAL({
          key: 'areaReservaLegal',
          value,
        });
      },
    },
    cidadeComarcaRegistro: {
      get() {
        return this.financialTitle.cidadeComarcaRegistro;
      },
      set(value) {
        this.UPDATE_PARTIALS_FINANCIAL({
          key: 'cidadeComarcaRegistro',
          value,
        });
      },
    },
    ufComarcaRegistro: {
      get() {
        return this.financialTitle.ufComarcaRegistro;
      },
      set(value) {
        this.UPDATE_PARTIALS_FINANCIAL({
          key: 'ufComarcaRegistro',
          value,
        });
      },
    },
    numeroMatricula: {
      get() {
        return this.financialTitle.numeroMatricula;
      },
      set(value) {
        this.UPDATE_PARTIALS_FINANCIAL({
          key: 'numeroMatricula',
          value,
        });
      },
    },
    cidade: {
      get() {
        return this.financialTitle.cidade;
      },
      set(value) {
        this.UPDATE_PARTIALS_FINANCIAL({
          key: 'cidade',
          value,
        });
      },
    },
    nomeFazenda: {
      get() {
        return this.financialTitle.nomeFazenda;
      },
      set(value) {
        this.UPDATE_PARTIALS_FINANCIAL({
          key: 'nomeFazenda',
          value,
        });
      },
    },
    uf: {
      get() {
        return this.financialTitle.uf;
      },
      set(value) {
        this.UPDATE_PARTIALS_FINANCIAL({
          key: 'uf',
          value,
        });
      },
    },
    proprietarios: {
      get() {
        return this.financialTitle.proprietarios;
      },
      set(value) {
        this.UPDATE_PARTIALS_FINANCIAL({
          key: 'proprietarios',
          value,
        });
      },
    },
    modalInfo() {
      let { tempOwnerIndex } = this;
      return `Proprietário ${tempOwnerIndex += 1}?`;
    },
  },
};
</script>

<style scoped lang="scss">
.form-data {

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
    margin-top: 20px;

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

      span {
        cursor: pointer;
      }
    }
  }

  &__radio {
    display: flex;
    align-items: center;

    &__info {
      font-family: $font_secondary;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: $--color-gray-6;
      margin-right: 20px;
    }
  }

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

  &--divisor {
    border: 1px solid $--color-gray-5;
    margin: 14px 0;
  }

  &__item--size-bottom {
    margin-bottom: 27px;

    &--no-margin {
      margin-bottom: 0;
    }

    &__banner {
      background-color: $--color-gray-4;
      color: $--color-gray-7;
      padding: 3px 0 3px 16px;
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

  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
