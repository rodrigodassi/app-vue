<template>
  <div class="container__form-data">
    <div class="container__form-data__radio-group">
      <el-radio-group v-model="tipo">
        <el-radio label="pf">PF</el-radio>
        <el-radio label="pj">PJ`</el-radio>
      </el-radio-group>
    </div>
    <component :is="selectedTypeGuarantor" v-bind=currentProperties></component>
  </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex';
import IntInput from '../../../../components/Input.vue';
import Upload from '../../../../components/Upload.vue';
import api from '../../../../services/api';
import GuarantorTypePf from './GuarantorTypePf.vue';
import GuarantorTypePj from './GuarantorTypePj.vue';

export default {
  name: 'Guarantor',
  components: {
    IntInput,
    Upload,
    GuarantorTypePf,
    GuarantorTypePj,
  },
  mounted() {
    this.getGuarantorOptions();
  },
  computed: {
    ...mapState('guarantee', ['guarantee']),
    tipo: {
      get() {
        return this.guarantee.avalista.tipo;
      },
      set(value) {
        this.UPDATE_PARTIALS_GUARANTEE_GUARANTOR({
          key: 'tipo',
          value,
        });
      },
    },
    selectedTypeGuarantor() {
      return this.tipo === 'pf' ? 'GuarantorTypePf' : 'GuarantorTypePj';
    },
    currentProperties() {
      if (this.tipo === 'pf') {
        return {
          guarantorNationality: this.guarantorNationality,
          guarantorUf: this.guarantorUf,
          guarantorCity: this.guarantorCity,
          guarantorCivilStatus: this.guarantorCivilStatus,
        };
      }
      if (this.tipo === 'pj') {
        return {
          guarantorUf: this.guarantorUf,
          guarantorCity: this.guarantorCity,
        };
      }
      return {};
    },
  },
  data: () => ({
    guarantorNationality: [],
    guarantorUf: [],
    guarantorCity: [],
    guarantorCivilStatus: [],
  }),
  methods: {
    ...mapMutations('guarantee', [
      'UPDATE_PARTIALS_GUARANTEE_GUARANTOR',
      'UPDATE_GUARANTOR_TYPE',
    ]),
    async getGuarantorOptions() {
      await api.get('/guarantor_options')
        .then((res) => {
          const {
            guarantor_nationality: guarantorNationality,
            guarantor_uf: guarantorUf,
            guarantor_city: guarantorCity,
            guarantor_civil_status: guarantorCivilStatus,
          } = res.data;
          this.guarantorNationality = guarantorNationality;
          this.guarantorUf = guarantorUf;
          this.guarantorCity = guarantorCity;
          this.guarantorCivilStatus = guarantorCivilStatus;
        });
    },
  },
};
</script>

<style scoped lang="scss" src="../styles/style.scss"/>
