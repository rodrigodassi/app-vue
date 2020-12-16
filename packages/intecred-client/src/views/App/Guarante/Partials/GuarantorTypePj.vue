<template>
  <div>
    <div class="container__form-data__size-top container__form-data__size-bottom">
      <IntInput
        v-model="pessoa_juridica_cnpj"
        label="CNPJ"
        placeholder="000.000.000-00"
      />
    </div>
    <div class="container__form-data__size-bottom">
      <IntInput
        v-model="pessoa_juridica_razao_social"
        label="Razão social"
        placeholder="Nome / Razão social"
      />
    </div>
    <div class="container__form-data__size-bottom">
      <IntInput
        v-model="pessoa_juridica_email"
        label="Email"
        placeholder="email@email.com.br"
      />
    </div>
    <div class="container__form-data__size-bottom">
      <IntInput
        v-model="pessoa_juridica_cep"
        label="CEP"
        placeholder="Defina o CEP"
      />
    </div>
    <div class="container__form-data__size-bottom">
      <IntInput
        v-model="pessoa_juridica_endereco"
        label="Endereço"
        placeholder="Endereço completo"
      />
    </div>
    <div class="container__form-data__item--two-items container__form-data__size-bottom">
      <span class="container__form-data__item--two-items__item">
        <IntInput
          v-model="pessoa_juridica_uf"
          label="UF"
          placeholder="Selecione o estado"
          isSelect
        >
          <el-option
            v-for="(item, index) in guarantorUf"
            :key="index"
            :label="item"
            :value="item"
          >
            <span class="el-select__option-child">{{ item }}</span>
            <span class="el-select__option-child">{{ item }}</span>
          </el-option>
        </IntInput>
      </span>
      <span class="container__form-data__item--two-items__item">
        <IntInput
          v-model="pessoa_juridica_cidade"
          label="Município"
          placeholder="Selecione a cidade"
          isSelect
        >
          <el-option
            v-for="(item, index) in guarantorCity"
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
        @input="UPDATE_FILES_GUARANTOR_PJ"
        :is-multiple="true"
        v-model="file_pj"
        title="Importar arquivos"
        description="Referentes à propriedade, como imagens ou arquivos de mapa em *kml.">
      </Upload>
    </div>
    <IntInput
      v-model="pessoa_juridica_obs"
      class="container__form-data__item"
      label="Obervações"
      placeholder="Observações"
    />
  </div>
</template>

<script>

import { mapMutations, mapState } from 'vuex';
import IntInput from '../../../../components/Input.vue';
import Upload from '../../../../components/Upload.vue';

export default {
  name: 'GuarantorTypePj',
  methods: {
    ...mapMutations('guarantee', [
      'UPDATE_PARTIALS_GUARANTEE_PJ_GUARANTOR',
      'UPDATE_FILES_GUARANTOR_PJ',
    ]),
  },
  computed: {
    ...mapState('guarantee', ['guarantee']),
    file_pj: {
      get() {
        return this.guarantee.avalista.pessoaJuridica.file || [];
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PJ_GUARANTOR({
          key: 'file',
          value,
        });
      },
    },
    pessoa_juridica_obs: {
      get() {
        return this.guarantee.avalista.pessoaJuridica.obs;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PJ_GUARANTOR({
          key: 'obs',
          value,
        });
      },
    },
    pessoa_juridica_cidade: {
      get() {
        return this.guarantee.avalista.pessoaJuridica.cidade;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PJ_GUARANTOR({
          key: 'cidade',
          value,
        });
      },
    },
    pessoa_juridica_uf: {
      get() {
        return this.guarantee.avalista.pessoaJuridica.uf;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PJ_GUARANTOR({
          key: 'uf',
          value,
        });
      },
    },
    pessoa_juridica_endereco: {
      get() {
        return this.guarantee.avalista.pessoaJuridica.endereco;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PJ_GUARANTOR({
          key: 'endereco',
          value,
        });
      },
    },
    pessoa_juridica_cep: {
      get() {
        return this.guarantee.avalista.pessoaJuridica.cep;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PJ_GUARANTOR({
          key: 'cep',
          value,
        });
      },
    },
    pessoa_juridica_email: {
      get() {
        return this.guarantee.avalista.pessoaJuridica.email;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PJ_GUARANTOR({
          key: 'email',
          value,
        });
      },
    },
    pessoa_juridica_razao_social: {
      get() {
        return this.guarantee.avalista.pessoaJuridica.razaoSocial;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PJ_GUARANTOR({
          key: 'razaoSocial',
          value,
        });
      },
    },
    pessoa_juridica_cnpj: {
      get() {
        return this.guarantee.avalista.pessoaJuridica.cnpj;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PJ_GUARANTOR({
          key: 'cnpj',
          value,
        });
      },
    },
  },
  components: {
    IntInput,
    Upload,
  },
  props: {
    guarantorUf: {
      type: Array,
      required: true,
    },
    guarantorCity: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss" src="../styles/style.scss"/>
