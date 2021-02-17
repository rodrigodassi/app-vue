<template>
  <div>
    <div class="container__form-data__size-top container__form-data__size-bottom">
      <InputCpf
        v-model="pessoa_fisica_cpf"
        label="CPF"
        v-mask="'###.###.###-##'"
        placeholder="000.000.000-00"
      />
    </div>
    <div class="container__form-data__size-bottom">
      <IntInput
        v-model="pessoa_fisica_nome"
        label="Nome"
        placeholder="Nome Completo"
      />
    </div>
    <div class="container__form-data__size-bottom">
      <IntInput
        v-model="pessoa_fisica_rg"
        label="RG"
        v-mask="'##.###.###-#'"
        placeholder="00.000.000-0"
      />
    </div>
    <div class="container__form-data__size-bottom">
      <IntInput
        v-model="pessoa_fisica_email"
        label="Email"
        placeholder="email@email.com.br"
      />
    </div>
    <div class="container__form-data__size-bottom">
      <IntInput
        v-model="pessoa_fisica_ocupacao"
        label="Profissão"
        placeholder="Profissão"
      />
    </div>
    <div class="container__form-data__size-top container__form-data__size-bottom">
      <IntInput
        filterable
        v-model="pessoa_fisica_nacionalidade"
        label="Nacionalidade"
        placeholder="Escolha a nacionalidade"
        isSelect
      >
        <el-option
          v-for="(item, index) in guarantorNationality"
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
        v-model="pessoa_fisica_cep"
        label="CEP"
        v-mask="'#####-###'"
        placeholder="Defina o CEP"
      />
    </div>
    <div class="container__form-data__size-bottom">
      <IntInput
        v-model="pessoa_fisica_endereco"
        label="Endereço"
        placeholder="Endereço completo"
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
          v-model="pessoa_fisica_uf"
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
      </div>
      <span class="container__form-data__item--two-items__item">
        <IntInput
          filterable
          v-model="pessoa_fisica_municipio"
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
      <IntInput
        filterable
        v-model="pessoa_fisica_estado_civil"
        label="Estado civil"
        placeholder="Selecione o estado civil"
        isSelect
      >
        <el-option
          v-for="(item, index) in guarantorCivilStatus"
          :key="index"
          :label="item"
          :value="item"
        >
          <span class="el-select__option-child">{{ item }}</span>
          <span class="el-select__option-child">{{ item }}</span>
        </el-option>
      </IntInput>
    </div>
    <div v-show="pessoa_fisica_estado_civil === 'Casado'"
         class="container__form-data__size-top container__form-data__size-bottom">
      <div class="container__form-data__size-bottom">
        <IntInput
          v-model="nome_conjuge"
          label="Nome do cônjuge"
          placeholder="Nome completo do cônjuge"
        />
      </div>
      <div class="container__form-data__item--two-items container__form-data__size-bottom">
        <span class="container__form-data__item--two-items__item">
          <InputCpf
            v-model="cpf_conjuge"
            label="CPF do cônjuge"
            v-mask="'###.###.###-##'"
            placeholder="000.000.000-00"
          />
        </span>
        <span class="container__form-data__item--two-items__item">
          <IntInput
            v-model="rg_conjuge"
            label="RG do cônjuge"
            v-mask="'##.###.###-#'"
            placeholder="00.000.000-0"
          />
        </span>
      </div>
      <div class="container__form-data__size-bottom">
        <IntInput
          v-model="email_conjuge"
          label="E-mail do cônjuge"
          placeholder="Nome completo do cônjuge"
        />
      </div>
    </div>
    <div class="container__form-data__size-bottom">
      <Upload
        @input="UPDATE_FILES_GUARANTOR_PF"
        :is-multiple="true"
        v-model="file_pf"
        title="Importar arquivos"
        description="Referentes à propriedade, como imagens ou arquivos de mapa em *kml.">
      </Upload>
    </div>
    <IntInput
      v-model="pessoa_fisica_obs"
      class="container__form-data__item"
      label="Obervações"
      placeholder="Observações sobre a hipoteca"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import IntInput from '../../../../components/Input.vue';
import InputCpf from '../../../../components/InputCpf.vue';
import Upload from '../../../../components/Upload.vue';

export default {
  name: 'GuarantorTypePf',
  methods: {
    ...mapMutations('guarantee', [
      'UPDATE_PARTIALS_GUARANTEE_PF_GUARANTOR',
      'UPDATE_PARTIALS_GUARANTEE_PF_CONJUGE_GUARANTOR',
      'UPDATE_FILES_GUARANTOR_PF',
    ]),
  },
  computed: {
    ...mapState('guarantee', ['guarantee']),
    file_pf: {
      get() {
        return this.guarantee.avalista.pessoaFisica.file || [];
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PF_GUARANTOR({
          key: 'file',
          value,
        });
      },
    },
    pessoa_fisica_obs: {
      get() {
        return this.guarantee.avalista.pessoaFisica.obs;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PF_GUARANTOR({
          key: 'obs',
          value,
        });
      },
    },
    pessoa_fisica_estado_civil: {
      get() {
        return this.guarantee.avalista.pessoaFisica.estadoCivil;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PF_GUARANTOR({
          key: 'estadoCivil',
          value,
        });
      },
    },
    pessoa_fisica_municipio: {
      get() {
        return this.guarantee.avalista.pessoaFisica.municipio;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PF_GUARANTOR({
          key: 'municipio',
          value,
        });
      },
    },
    pessoa_fisica_uf: {
      get() {
        return this.guarantee.avalista.pessoaFisica.uf;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PF_GUARANTOR({
          key: 'uf',
          value,
        });
      },
    },
    pessoa_fisica_endereco: {
      get() {
        return this.guarantee.avalista.pessoaFisica.endereco;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PF_GUARANTOR({
          key: 'endereco',
          value,
        });
      },
    },
    pessoa_fisica_cep: {
      get() {
        return this.guarantee.avalista.pessoaFisica.cep;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PF_GUARANTOR({
          key: 'cep',
          value,
        });
      },
    },
    pessoa_fisica_nacionalidade: {
      get() {
        return this.guarantee.avalista.pessoaFisica.nacionalidade;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PF_GUARANTOR({
          key: 'nacionalidade',
          value,
        });
      },
    },
    pessoa_fisica_ocupacao: {
      get() {
        return this.guarantee.avalista.pessoaFisica.ocupacao;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PF_GUARANTOR({
          key: 'ocupacao',
          value,
        });
      },
    },
    pessoa_fisica_email: {
      get() {
        return this.guarantee.avalista.pessoaFisica.email;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PF_GUARANTOR({
          key: 'email',
          value,
        });
      },
    },
    pessoa_fisica_rg: {
      get() {
        return this.guarantee.avalista.pessoaFisica.rg;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PF_GUARANTOR({
          key: 'rg',
          value,
        });
      },
    },
    pessoa_fisica_nome: {
      get() {
        return this.guarantee.avalista.pessoaFisica.nome;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PF_GUARANTOR({
          key: 'nome',
          value,
        });
      },
    },
    pessoa_fisica_cpf: {
      get() {
        return this.guarantee.avalista.pessoaFisica.cpf;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PF_GUARANTOR({
          key: 'cpf',
          value,
        });
      },
    },
    cpf_conjuge: {
      get() {
        return this.guarantee.avalista.pessoaFisica.conjuge.cpf;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PF_CONJUGE_GUARANTOR({
          key: 'cpf',
          value,
        });
      },
    },
    rg_conjuge: {
      get() {
        return this.guarantee.avalista.pessoaFisica.conjuge.rg;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PF_CONJUGE_GUARANTOR({
          key: 'rg',
          value,
        });
      },
    },
    nome_conjuge: {
      get() {
        return this.guarantee.avalista.pessoaFisica.conjuge.nome;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PF_CONJUGE_GUARANTOR({
          key: 'nome',
          value,
        });
      },
    },
    email_conjuge: {
      get() {
        return this.guarantee.avalista.pessoaFisica.conjuge.email;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_PF_CONJUGE_GUARANTOR({
          key: 'email',
          value,
        });
      },
    },
  },
  components: {
    IntInput,
    Upload,
    InputCpf,
  },
  props: {
    guarantorNationality: {
      type: Array,
      required: true,
    },
    guarantorUf: {
      type: Array,
      required: true,
    },
    guarantorCity: {
      type: Array,
      required: true,
    },
    guarantorCivilStatus: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss" src="../styles/style.scss"/>
