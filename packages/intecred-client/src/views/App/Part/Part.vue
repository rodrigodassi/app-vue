<template>
  <div>
    <IntHeader
      url-name-redirect="Titles"
      :client="titulo.nome"
      :clientDocument="titulo.cpf"
      :cprType="cprType"
      :currentStep="titulo.currentStep"
    />
    <div class="container">
      <div class="container__title-page">
        <h2>Partes</h2>
        <p>
          Caso alguma das partes não esteja incluída abaixo, verifique o seu cadastramento
          nas etapas anteriores.
        </p>
      </div>
      <div v-for="(issuer, index) in partes.emitentes"
           class="container__cards"
           :key="`i-${index}`"
      >
        <InfoHeaderCard
          :grey-bg="true">
          <span class="container__cards__title">Emitente {{ index + 1 }}</span>
        </InfoHeaderCard>
        <CardPart
          class="container__cards__card"
          v-model="issuer.tipoAssinatura"
          @change-signature="changeSignature"
          part="emitentes"
          :key="`i-${index}`"
          :name="issuer.nome"
          :email="issuer.email">
        </CardPart>
        <div class="container__cards__card__spouse" v-if="issuer.estadoCivil === 'married'">
          <InfoHeaderCard>
            <span class="container__cards__title">Cônjuge do emitente {{ index + 1 }}</span>
          </InfoHeaderCard>
          <CardPart
            class="container__cards__card"
            v-model="issuer.conjuge.tipoAssinatura"
            @change-signature="changeSignature"
            :key="`i-${index}`"
            part="emitentes"
            :is-spouse="true"
            :name="issuer.conjuge.nome"
            :email="issuer.conjuge.email">
          </CardPart>
        </div>
      </div>
      <div>
      <InfoHeaderCard
        :grey-bg="true">
        <span class="container__cards__title"
        v-if="partes.depositario.nome !== null">Fiel Depositário</span>
      </InfoHeaderCard>
      <CardPart
        class="container__cards__card"
        v-model="partes.depositario.tipoAssinatura"
        @change-signature="changeSignature"
        part="depositario"
        :name="partes.depositario.nome"
        :email="partes.depositario.email">
      </CardPart>
      </div>
      <div>
      <InfoHeaderCard
        :grey-bg="true">
        <span class="container__cards__title">Emitente</span>
      </InfoHeaderCard>
      <CardPart
        class="container__cards__card"
        part="cliente"
        :name="partes.cliente.nome"
        :email="partes.cliente.cpf">
      </CardPart>
      </div>
      <div v-for="(guarantor, index) in partes.avalistas"
           class="container__cards"
           :key="`g-${index}`"
      >
        <InfoHeaderCard
          :grey-bg="true">
          <span class="container__cards__title">Avalista {{ index + 1 }}</span>
        </InfoHeaderCard>
        <CardPart
          class="container__cards__card"
          v-model="guarantor.tipoAssinatura"
          @change-signature="changeSignature"
          part="avalistas"
          :key="`g-${index}`"
          :name="guarantor.nome"
          :email="guarantor.email">
        </CardPart>
        <div class="container__cards__card__spouse" v-if="guarantor.estadoCivil === 'married'">
          <InfoHeaderCard>
            <span class="container__cards__title">Cônjuge do avalista{{ index + 1 }}</span>
          </InfoHeaderCard>
          <CardPart
            class="container__cards__card"
            v-model="guarantor.conjuge.tipoAssinatura"
            @change-signature="changeSignature"
            :key="`g-${index}`"
            part="avalistas"
            :is-spouse="true"
            :name="guarantor.conjuge.nome"
            :email="guarantor.conjuge.email">
          </CardPart>
        </div>
      </div>
      <ActionsFooter
        :back="() => this.forceSaveFormBack('decrement')"
        :next="() => this.forceSaveForm('increment')"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import IntHeader from '../../../layouts/IntHeader.vue';
import api from '../../../services/api';
import InfoHeaderCard from '../../../components/InfoHeaderCard.vue';
import CardPart from '../../../components/CardPart.vue';
import ActionsFooter from '../Title/Physical/Partials/ActionsFooter.vue';

export default {
  name: 'Part',
  mounted() {
    this.getParts();
  },
  data: () => ({
    partes: {
      emitentes: [],
      avalistas: [],
      depositario: {
        nome: '',
        email: '',
        tipoAssinatura: '',
      },
      cliente: {
        nome: '',
        cpf: '',
      },
    },
    titulo: '',
    titleIsStored: false,
    guaranteeIsStored: false,
  }),
  computed: {
    title() {
      return parseInt(this.$route.params.titulo, 10);
    },
  },
  methods: {
    async getParts() {
      await axios.get(`${this.$url}/titulo/obterPartes?tituloId=${this.title}`,
        {
          headers:
          {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            empresaId: localStorage.getItem('empresa_Id').toString(),
          },
        }).then((res) => {
        console.log('partes', res);
        const { data } = res;
        this.titulo = data;
        console.log('Data -->', data);
        if (data.depositarioEmitente !== false || data.tipo === 'Financeira') {
          if (this.partes.depositario !== '' || this.partes.depositario !== null) {
            this.partes.depositario = {
              nome: data.nome,
              email: data.email || 'email não cadastrado',
              razaoSocial: data.razaoSocial,
              tipoAssinatura: this.partes.depositario.tipoAssinatura,
            };
          }
        } else {
          this.partes.depositario = data.depositario;
        }
        this.partes.emitentes = data.emitentes;
        console.log('Partes 2021 -> ', this.partes);
        if (this.partes.cliente !== '') {
          this.partes.cliente = {
            nome: data.cliente.nome,
            cpf: data.cliente.cpf,
          };
        }
      })
        .then(() => {
          api.get('garantia/obterGarantiaAvalista', { params: { titulo: this.titulo.id } })
            .then(({ data }) => {
              console.log('avalis', data);
              if (!data.length) {
                return;
              }
              this.setGuarantors(data);
            });
        });
    },
    async setGuarantors(data) {
      const guarantors = await data.filter((el) => el.tipo === 'avalista');
      this.partes.avalistas = await guarantors.map((el) => {
        if (el.avalista.tipo === 'pf') {
          const spouse = el.avalista.pessoaFisica.conjuge
            && el.avalista.pessoaFisica.conjuge.nome ? {
              id: el.id,
              nome: el.avalista.pessoaFisica.conjuge.nome,
              email: el.avalista.pessoaFisica.conjuge.email,
              tipoAssinatura: el.avalista.pessoaFisica.conjuge.tipoAssinatura,
            } : null;
          const part = {
            id: el.id,
            nome: el.avalista.pessoaFisica.nome,
            email: el.avalista.pessoaFisica.email,
            tipoAssinatura: el.avalista.tipoAssinatura,
          };
          if (spouse) {
            part.conjuge = spouse;
          }
          return part;
        }
        return {
          id: el.id,
          nome: el.avalista.pessoaJuridica.razaoSocial,
          email: el.avalista.pessoaJuridica.email,
          tipoAssinatura: el.avalista.tipoAssinatura,
        };
      });
    },
    changeSignature(value, part, index, isSpouse) {
      if (part === 'depositario') {
        this.partes.depositario.tipoAssinatura = value;
        return;
      }
      if (isSpouse === undefined) {
        this.partes[part][index.slice(2, index.length)].tipoAssinatura = value;
        return;
      }
      this.partes[part][index.slice(2, index.length)].conjuge.tipoAssinatura = value;
    },
    async forceSaveFormBack(action) {
      if (this.partes.emitentes.length > 0) {
        this.titulo.emitentes = this.partes.emitentes;
      }
      if (this.partes.cliente.nome !== '') {
        this.titulo.cliente = this.partes.cliente;
      }
      // this.titulo.emitentes = this.partes.emitentes;
      if (this.partes.depositario.nome !== '') {
        this.titulo.depositario = this.partes.depositario;
      }
      // this.titulo.depositario = this.partes.depositario;
      if (this.partes.avalistas.length > 0) {
        this.titulo.avalistas = this.partes.avalistas;
      }
      console.log('Aciton -> ', this.titulo.currentStep);
      if (this.titulo.currentStep !== '') {
        this.titulo.currentStep = action === 'increment' ? 7 : 5;
      }
      if (this.titulo.tipo === 'Financeira') {
        this.titulo.currentStep = action === 'increment' ? 6 : 4;
      }
      console.log('Titulo State Parte -> ', this.titulo);
      // await api.post(`dadosCpr/back?id=${this.title}&currentStep=${this.titulo.currentStep}`,
      // this.titulo)
      // .then(() => this.redirect(action));
      this.redirect(action);
    },
    async forceSaveForm(action) {
      console.log('Emitentes ->', this.partes.emitentes);
      if (this.partes.emitentes.length > 0) {
        this.titulo.emitentes = this.partes.emitentes;
      }
      // this.titulo.emitentes = this.partes.emitentes;
      console.log('Depositario2 ->', this.partes.depositario);
      if (this.partes.depositario.nome !== null || this.partes.depositario.nome !== '') {
        console.log('Partes -> ', this.partes);
        console.log('depositarioEmitente -> ', this.depositarioEmitente);
        console.log('Fiel Depositario -> ', this.partes.depositario);
        this.titulo.depositario = this.partes.depositario;
      }
      if (this.partes.cliente.nome !== '') {
        this.titulo.cliente = this.partes.cliente;
      }
      // this.titulo.depositario = this.partes.depositario;
      console.log('Avalista2 ->', this.partes.avalistas);
      if (this.partes.avalistas.length > 0) {
        this.titulo.avalistas = this.partes.avalistas;
      }
      console.log('Step: ->', this.titulo.currentStep);
      // if (this.titulo.currentStep !== '' || this.titulo.currentStep !== undefined) {
      //   this.titulo.currentStep = action === 'increment' ? 7 : 5;
      // }
      if (this.titulo.tipo === 'Financeira') {
        this.titulo.currentStep = action === 'increment' ? 6 : 4;
      }
      await axios.post(`${this.$url}/titulo/tipoAssinatura?tituloId=${this.title}`, this.titulo,
        {
          headers:
          {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            empresaId: localStorage.getItem('empresa_Id').toString(),
          },
        }).then(() => this.redirect(action));
    },
    redirect(action) {
      if (action === 'decrement') {
        this.$router.push({
          name: 'Document',
          params: { titulo: this.$route.params.titulo },
        });
      } else {
        this.$router.push({
          name: 'Draft',
          params: { titulo: this.$route.params.titulo },
        });
      }
    },
  },
  components: {
    ActionsFooter,
    CardPart,
    InfoHeaderCard,
    IntHeader,
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  width: 100%;
  flex-direction: column;
  max-width: 540px;
  margin: 0 auto;

  &__title-page {
    margin-bottom: 20px;

    h2 {
      font-family: $font_primary;
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 32px;
      letter-spacing: -0.005em;
      color: $--color-primary;
      padding-bottom: 10px;
    }

    p {
      font-family: $font_secondary;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: -0.004em;
      color: $--color-gray-6;
    }
  }

  &__cards {
    margin: 16px 0;

    &__card {
      margin-top: 16px;

      &__spouse {
        margin-top: 28px;

        .container__cards__card {
          margin-top: 0;
        }
      }
    }

    &__title {
      font-family: $font_secondary;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 28px;
      color: $--color-gray-7;
    }
  }
}
</style>
