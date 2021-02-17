<template>
  <div class="container__form-data">
    <div class="container__form-data__radio-group">
      <el-radio-group v-model="tipo">
        <el-radio label="penhor">Penhor</el-radio>
        <el-radio label="alienacao">Alienação</el-radio>
        <el-radio label="penhorEAlientacao">Penhor com alienação</el-radio>
      </el-radio-group>
    </div>
    <div class="container__form-data__size-top container__form-data__size-bottom">
      <IntInput
        filterable
        v-model="tipoPenhor"
        label="Tipo do penhor"
        placeholder="Defina o tipo do penhor"
        isSelect
      >
        <el-option
          v-for="(item, index) in pledgeType"
          :key="index"
          :label="item"
          :value="item"
        >
          <span class="el-select__option-child">{{ item }}</span>
          <span class="el-select__option-child">{{ item }}</span>
        </el-option>
      </IntInput>
    </div>
    <div class="container__form-data__item--two-items container__form-data__size-bottom">
      <div
        class="container__form-data__item--two-items__item
         container__form-data__item--two-items__item--first"
      >
        <IntInput
          filterable
          v-model="produto"
          label="Produto"
          placeholder="Defina o tipo do penhor"
          isSelect
        >
          <el-option
            v-for="(item, index) in pledgeProduct"
            :key="index"
            :label="item"
            :value="item"
          >
            <span class="el-select__option-child">{{ item }}</span>
            <span class="el-select__option-child">{{ item }}</span>
          </el-option>
        </IntInput>
      </div>
      <div class="container__form-data__item--two-items__item">
        <IntInput
          filterable
          v-model="grauPenhor"
          label="Grau do penhor"
          placeholder="Selecione o grau"
          isSelect
        >
          <el-option
            v-for="(item, index) in pledgeGrade"
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
    <div class="container__form-data__item--two-items container__form-data__size-bottom">
      <div
        class="container__form-data__item--two-items__item
         container__form-data__item--two-items__item--first"
      >
        <IntInput
          filterable
          v-model="quantidade"
          label="Quantidade (kg)"
          placeholder="Selecione o produto para CPR"
          isSelect
        >
          <el-option
            v-for="(item, index) in pledgeQuantity"
            :key="index"
            :label="item"
            :value="item"
          >
            <span class="el-select__option-child">{{ item }}</span>
            <span class="el-select__option-child">{{ item }}</span>
          </el-option>
        </IntInput>
      </div>
      <div class="container__form-data__item--two-items__item">
        <IntInput
          filterable
          v-model="safra"
          label="Safra"
          placeholder="Selecione a safra"
          isSelect
        >
          <el-option
            v-for="(item, index) in pledgeHarvest"
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
    <div class="container__form-data__size-bottom">
      <div class="form-data__checkbox">
        <div class="el-checkbox-group">
          <el-checkbox
            v-model="mesmoLocalLavoura">
            <div class="form-data__checkbox__info">Mesmo local de formação da lavoura
            </div>
          </el-checkbox>
        </div>
      </div>
    </div>
    <div class="container__form-data__size-bottom">
      <IntInput
        v-model="nomeFazenda"
        label="Nome da fazenda"
        placeholder="Defina o nome da fazenda"
      />
    </div>
    <div class="container__form-data__size-bottom">
      <IntInput
        type="numeric"
        v-model="areaPlantio"
        label="Área de plantio (hectares)"
        placeholder="Defina a área de plantio (em hectares)"
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
          v-model="uf"
          label="UF"
          placeholder="Selecione o estado"
          isSelect
        >
          <el-option
            v-for="(item, index) in pledgeUf"
            :key="index"
            :label="item"
            :value="item"
          >
            <span class="el-select__option-child">{{ item }}</span>
            <span class="el-select__option-child">{{ item }}</span>
          </el-option>
        </IntInput>
      </div>
      <div class="container__form-data__item--two-items__item">
        <IntInput
          filterable
          v-model="city"
          label="Município"
          placeholder="Selecione a cidade"
          isSelect
        >
          <el-option
            v-for="(item, index) in pledgeCity"
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
    <div class="container__form-data__size-bottom">
      <IntInput
        v-model="numeroMatricula"
        label="Número da matrícula"
        placeholder="Número da matrícula"
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
            v-for="(item, index) in pledgeUf"
            :key="index"
            :label="item"
            :value="item"
          >
            <span class="el-select__option-child">{{ item }}</span>
            <span class="el-select__option-child">{{ item }}</span>
          </el-option>
        </IntInput>
      </div>
      <div class="container__form-data__item--two-items__item">
        <IntInput
          filterable
          v-model="cidadeComarcaRegistro"
          label="Município da Comarca de registro"
          placeholder="Selecione a cidade"
          isSelect
        >
          <el-option
            v-for="(item, index) in pledgeCity"
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
    <div class="container__form-data__radio-group container__form-data__size-bottom">
      <div class="container__form-data__p2">Área própria ou de terceiros?</div>
      <el-radio-group v-model="areaPropriaOuTerceiros">
        <el-radio label="propria">Própria</el-radio>
        <el-radio label="terceiros">Terceiros</el-radio>
      </el-radio-group>
    </div>
    <div class="container__form-data__size-bottom">
      <Upload
        @input="UPDATE_FILES_PLEDGE"
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
      placeholder="Obervações sobre a garantia"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import IntInput from '../../../../components/Input.vue';
import Upload from '../../../../components/Upload.vue';
import api from '../../../../services/api';

export default {
  name: 'Pledge',
  mounted() {
    this.getPledgeOptions();
  },
  data: () => ({
    pledgeType: [],
    pledgeProduct: [],
    pledgeGrade: [],
    pledgeQuantity: [],
    pledgeHarvest: [],
    pledgeUf: [],
    pledgeCity: [],
  }),
  computed: {
    ...mapState('guarantee', ['guarantee']),
    tipo: {
      get() {
        return this.guarantee.penhor.tipo;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PLEDGE({
          key: 'tipo',
          value,
        });
      },
    },
    tipoPenhor: {
      get() {
        return this.guarantee.penhor.tipoPenhor;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PLEDGE({
          key: 'tipoPenhor',
          value,
        });
      },
    },
    areaPropriaOuTerceiros: {
      get() {
        return this.guarantee.penhor.areaPropriaOuTerceiros;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PLEDGE({
          key: 'areaPropriaOuTerceiros',
          value,
        });
      },
    },
    produto: {
      get() {
        return this.guarantee.penhor.produto;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PLEDGE({
          key: 'produto',
          value,
        });
      },
    },
    grauPenhor: {
      get() {
        return this.guarantee.penhor.grauPenhor;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PLEDGE({
          key: 'grauPenhor',
          value,
        });
      },
    },
    quantidade: {
      get() {
        return this.guarantee.penhor.quantidade;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PLEDGE({
          key: 'quantidade',
          value,
        });
      },
    },
    safra: {
      get() {
        return this.guarantee.penhor.safra;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PLEDGE({
          key: 'safra',
          value,
        });
      },
    },
    mesmoLocalLavoura: {
      get() {
        return this.guarantee.penhor.mesmoLocalLavoura !== false;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PLEDGE({
          key: 'mesmoLocalLavoura',
          value,
        });
      },
    },
    nomeFazenda: {
      get() {
        return this.guarantee.penhor.nomeFazenda;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PLEDGE({
          key: 'nomeFazenda',
          value,
        });
      },
    },
    areaPlantio: {
      get() {
        return this.guarantee.penhor.areaPlantio;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PLEDGE({
          key: 'areaPlantio',
          value,
        });
      },
    },
    uf: {
      get() {
        return this.guarantee.penhor.uf;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PLEDGE({
          key: 'uf',
          value,
        });
      },
    },
    city: {
      get() {
        return this.guarantee.penhor.municipio;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PLEDGE({
          key: 'municipio',
          value,
        });
      },
    },
    numeroMatricula: {
      get() {
        return this.guarantee.penhor.numeroMatricula;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PLEDGE({
          key: 'numeroMatricula',
          value,
        });
      },
    },
    ufComarcaRegistro: {
      get() {
        return this.guarantee.penhor.ufComarcaRegistro;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PLEDGE({
          key: 'ufComarcaRegistro',
          value,
        });
      },
    },
    cidadeComarcaRegistro: {
      get() {
        return this.guarantee.penhor.cidadeComarcaRegistro;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PLEDGE({
          key: 'cidadeComarcaRegistro',
          value,
        });
      },
    },
    file: {
      get() {
        return this.guarantee.penhor.file;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PLEDGE({
          key: 'file',
          value,
        });
      },
    },
    obs: {
      get() {
        return this.guarantee.penhor.obs;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PLEDGE({
          key: 'obs',
          value,
        });
      },
    },
  },
  methods: {
    ...mapMutations('guarantee', ['UPDATE_PARTIALS_GUARANTEE_PLEDGE', 'UPDATE_FILES_PLEDGE']),

    async getPledgeOptions() {
      await api.get('/pledge_options')
        .then((res) => {
          const {
            pledge_type: pledgeType,
            pledge_product: pledgeProduct,
            pledge_grade: pledgeGrade,
            pledge_quantity: pledgeQuantity,
            pledge_harvest: pledgeHarvest,
            pledge_uf: pledgeUf,
            pledge_city: pledgeCity,
          } = res.data;
          this.pledgeType = pledgeType;
          this.pledgeProduct = pledgeProduct;
          this.pledgeGrade = pledgeGrade;
          this.pledgeQuantity = pledgeQuantity;
          this.pledgeHarvest = pledgeHarvest;
          this.pledgeUf = pledgeUf;
          this.pledgeCity = pledgeCity;
        });
    },
  },
  components: {
    IntInput,
    Upload,
  },
};
</script>

<style scoped lang="scss" src="../styles/style.scss"/>
