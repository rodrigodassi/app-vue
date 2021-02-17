<template>
  <div class="container__form-data">
    <div class="container__form-data__radio-group">
      <el-radio-group v-model="tipo">
        <el-radio label="hipoteca">Hipoteca</el-radio>
        <el-radio label="alienacao">Alienação</el-radio>
        <el-radio label="hipotecaEAlienacao">Hipoteca com alienação</el-radio>
      </el-radio-group>
    </div>
    <div class="container__form-data__size-top container__form-data__size-bottom">
      <IntInput
        filterable
        v-model="tipoHipoteca"
        label="Tipo da hipoteca"
        placeholder="Defina o tipo da hipoteca"
        isSelect
      >
        <el-option
          v-for="(item, index) in mortgageType"
          :key="index"
          :label="item"
          :value="item"
        >
          <span class="el-select__option-child">{{ item }}</span>
          <span class="el-select__option-child">{{ item }}</span>
        </el-option>
      </IntInput>
    </div>
    <div class="container__form-data__size-bottom">
      <IntInput
        v-model="descricaoImovel"
        label="Descrição do imóvel"
        placeholder="Descreva o imóvel"
      />
    </div>
    <div class="container__form-data__size-bottom">
      <IntInput
        v-model="grauHipoteca"
        label="Grau da hipoteca"
        placeholder="Selecione o grau"
      />
    </div>
    <div class="container__form-data__size-bottom">
      <IntInput
        v-model="numeroMatricula"
        label="Número da matrícula"
        placeholder="Número da matrícula "
      />
    </div>
    <div class="container__form-data__item--two-items
     container__form-data__size-bottom"
    >
      <div
        class="container__form-data__item--two-items__item
         container__form-data__item--two-items__item--first"
      >
        <IntInput
          filterable
          v-model="ufComarcaRegistro"
          label="UF da Comarca de registro"
          placeholder="Selecione o estado"
          isSelect
        >
          <el-option
            v-for="(item, index) in mortgageUf"
            :key="index"
            :label="item"
            :value="item"
          >
            <span class="el-select__option-child">{{ item }}</span>
            <span class="el-select__option-child">{{ item }}</span>
          </el-option>
        </IntInput>
      </div>
      <span class="container__form-data__item--two-items__item">
        <IntInput
          filterable
          v-model="cidadeComarcaRegistro"
          label="Município da Comarca de registro"
          placeholder="Selecione a cidade"
          isSelect
        >
          <el-option
            v-for="(item, index) in mortgageCity"
            :key="index"
            :label="item"
            :value="item"
          >
            <span class="el-select__option-child">{{ item }}</span>
            <span class="el-select__option-child">{{ item }}</span>
          </el-option>
        </IntInput>
      </span>
    </div>
    <div class="container__form-data__size-bottom">
      <Upload
        @input="UPDATE_FILES_MORTGAGE"
        :is-multiple="true"
        v-model="file"
        title="Importar arquivos"
        description="Referentes à propriedade, como imagens ou arquivos de mapa em *kml.">
      </Upload>
    </div>
    <IntInput
      v-model="obs"
      class="container__form-data__item"
      label="Obervações"
      placeholder="Observações sobre a hipoteca"
    />
  </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex';
import IntInput from '../../../../components/Input.vue';
import Upload from '../../../../components/Upload.vue';
import api from '../../../../services/api';

export default {
  name: 'Mortgage',
  mounted() {
    this.getMortgageOptions();
  },
  data: () => ({
    mortgageType: [],
    mortgageGrade: [],
    mortgageUf: [],
    mortgageCity: [],
  }),
  methods: {
    ...mapMutations('guarantee', ['UPDATE_PARTIALS_GUARANTEE_MORTGAGE', 'UPDATE_FILES_MORTGAGE']),

    async getMortgageOptions() {
      await api.get('/mortgage_options')
        .then((res) => {
          const {
            mortgage_type: mortgageType,
            mortgage_grade: mortgageGrade,
            mortgage_uf: mortgageUf,
            mortgage_city: mortgageCity,
          } = res.data;
          this.mortgageType = mortgageType;
          this.mortgageGrade = mortgageGrade;
          this.mortgageUf = mortgageUf;
          this.mortgageCity = mortgageCity;
        });
    },
  },
  components: {
    IntInput,
    Upload,
  },
  computed: {
    ...mapState('guarantee', ['guarantee']),
    file: {
      get() {
        return this.guarantee.hipoteca.file;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_MORTGAGE({
          key: 'file',
          value,
        });
      },
    },
    obs: {
      get() {
        return this.guarantee.hipoteca.obs;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_MORTGAGE({
          key: 'obs',
          value,
        });
      },
    },
    cidadeComarcaRegistro: {
      get() {
        return this.guarantee.hipoteca.cidadeComarcaRegistro;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_MORTGAGE({
          key: 'cidadeComarcaRegistro',
          value,
        });
      },
    },
    ufComarcaRegistro: {
      get() {
        return this.guarantee.hipoteca.ufComarcaRegistro;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_MORTGAGE({
          key: 'ufComarcaRegistro',
          value,
        });
      },
    },
    numeroMatricula: {
      get() {
        return this.guarantee.hipoteca.numeroMatricula;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_MORTGAGE({
          key: 'numeroMatricula',
          value,
        });
      },
    },
    grauHipoteca: {
      get() {
        return this.guarantee.hipoteca.grauHipoteca;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_MORTGAGE({
          key: 'grauHipoteca',
          value,
        });
      },
    },
    descricaoImovel: {
      get() {
        return this.guarantee.hipoteca.descricaoImovel;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_MORTGAGE({
          key: 'descricaoImovel',
          value,
        });
      },
    },
    tipo: {
      get() {
        return this.guarantee.hipoteca.tipo;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_MORTGAGE({
          key: 'tipo',
          value,
        });
      },
    },
    tipoHipoteca: {
      get() {
        return this.guarantee.hipoteca.tipoHipoteca;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_MORTGAGE({
          key: 'tipoHipoteca',
          value,
        });
      },
    },
  },
};
</script>
<style scoped lang="scss" src="../styles/style.scss"/>
