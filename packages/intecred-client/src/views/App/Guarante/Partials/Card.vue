<script>
import IconPencil from '../../../../assets/svgs/icon-pencil.svg';
import IconDelete from '../../../../assets/svgs/icon-delete.svg';

export default {
  components: {
    IconPencil,
    IconDelete,
  },

  props: {
    item: {
      type: Object,
      required: true,
    },

    index: {
      type: Number,
      required: false,
      default: 0,
    },
  },

  methods: {
    prepareModalEdit(key) {
      this.$emit('edit', key);
    },

    prepareRemoveGuarantee(key) {
      this.$emit('remove', key);
    },
  },
};
</script>

<template>
  <div
    class="container__list-guarantees__item"
  >
    <div class="container__list-guarantees__item__heading">
      <h4>Garantia {{ index + 1 }}</h4>
      <div @click="prepareModalEdit(item.id)"
            class="container__list-guarantees__item__heading--group">
        <IconPencil/>
        <span
          class="container__list-guarantees__item__heading__btn">Editar
        </span>
      </div>
      <div @click="prepareRemoveGuarantee(item.id)"
            class="container__list-guarantees__item__heading--group">
        <IconDelete/>
        <span
          class="container__list-guarantees__item__heading__btn">Deletar
        </span>
      </div>
    </div>

    <div class="container__list-guarantees__item__divisor"></div>

    <template
      v-if="item.tipo === 'penhor' || !item.tipo"
    >
      <div class="container__list-guarantees__item__info">
        <div class="container__list-guarantees__item__info--group">
          <span>Produto:&nbsp;</span>
          <span>{{ item.penhor.produto }}</span>
        </div>
        <div class="container__list-guarantees__item__info--group">
          <span>Grau:&nbsp;</span>
          <span>{{ item.penhor.grauPenhor }}kg</span>
        </div>
        <div class="container__list-guarantees__item__info--group">
          <span>Quantidade:&nbsp;</span>
          <span>{{ item.penhor.quantidade }}kg</span>
        </div>
        <div class="container__list-guarantees__item__info--group">
          <span>Tipo:&nbsp;</span>
          <span
            v-if="item.penhor.tipo === 'penhor'"
          >
            Penhor
          </span>

          <span
            v-else-if="item.penhor.tipo === 'alienacao'"
          >
            Alienação
          </span>

          <span
            v-else
          >
            Penhor com alienação
          </span>
        </div>
      </div>
    </template>

    <template
      v-else-if="item.tipo === 'hipoteca'"
    >
      <div
        class="container__list-guarantees__item__info
        container__list-guarantees__item__info--hipoteca"
      >
        <div
          class="container__list-guarantees__item__info--group
          container__list-guarantees__item__info--group-cond"
        >
          <span>
            Condição:&nbsp;
          </span>

          <span
            v-if="item.hipoteca.tipo === 'hipoteca'"
          >
            Hipoteca
          </span>

          <span
            v-else-if="item.hipoteca.tipo === 'alienacao'"
          >
            Alienação
          </span>

          <span
            v-else
          >
            Hipoteca com alienação
          </span>
        </div>

        <div
          class="container__list-guarantees__item__info--group
          container__list-guarantees__item__info--group-desc"
        >
          <span>
            Descrição:&nbsp;
          </span>

          <span
            v-text="item.hipoteca.descricaoImovel"
          />
        </div>

        <div
          class="container__list-guarantees__item__info--group
          container__list-guarantees__item__info--group-grau"
        >
          <span>
            Grau:&nbsp;
          </span>

          <span
            v-text="item.hipoteca.grauHipoteca"
          />
        </div>
      </div>
    </template>

    <template
      v-else-if="item.tipo === 'avalista'"
    >
      <div
        class="container__list-guarantees__item__info
        container__list-guarantees__item__info--avalista"
        :class="{
          'container__list-guarantees__item__info--avalista-pj': item.avalista.tipo === 'pj',
        }"
      >
        <template
          v-if="item.avalista.tipo === 'pf'"
        >
          <div
            class="container__list-guarantees__item__info--group
            container__list-guarantees__item__info--group-name"
          >
            <span>
              Nome:&nbsp;
            </span>

            <span
              v-text="item.avalista.pessoaFisica.nome"
            />
          </div>

          <div
            class="container__list-guarantees__item__info--group
            container__list-guarantees__item__info--group-cpf"
          >
            <span>
              CPF:&nbsp;
            </span>

            <span
              v-text="item.avalista.pessoaFisica.cpf"
            />
          </div>

          <div
            class="container__list-guarantees__item__info--group
            container__list-guarantees__item__info--group-civil"
          >
            <span>
              Estado civil:&nbsp;
            </span>

            <span
              v-text="item.avalista.pessoaFisica.estadoCivil"
            />
          </div>
        </template>

        <template
          v-else
        >
          <div
            class="container__list-guarantees__item__info--group
            container__list-guarantees__item__info--group-social"
          >
            <span>
              Razão social:&nbsp;
            </span>

            <span
              v-text="item.avalista.pessoaJuridica.razaoSocial"
            />
          </div>

          <div
            class="container__list-guarantees__item__info--group
            container__list-guarantees__item__info--group-cnpj"
          >
            <span>
              CNPJ:&nbsp;
            </span>

            <span
              v-text="item.avalista.pessoaJuridica.cnpj"
            />
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss" src="../styles/style.scss"/>
