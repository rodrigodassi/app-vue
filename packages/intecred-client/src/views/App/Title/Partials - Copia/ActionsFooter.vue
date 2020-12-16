<template>
  <span>
    <div class="delimiter-footer"></div>
    <div class="btn-actions">
      <el-button
        @click.prevent="back"
        type="terciary"
      >{{ step === 1 ? 'Cancelar' : 'Voltar' }}
      </el-button>
      <el-button
        @click.prevent="next"
        type="primary"
      >Avançar
      </el-button>
    </div>
  </span>
</template>

<script>

export default {
  name: 'ActionsFooter',
  props: {
    back: {
      type: Function,
      required: true,
    },
    next: {
      type: Function,
      required: true,
    },
    step: {
      type: [Number, String],
      required: false,
    },
  },
};
</script>

<style lang="scss">
.delimiter-footer {
  margin: 32px 0;
  width: 540px;
  height: 0px;
  border: 1px solid #C5CEE0;
}

.btn-actions {
  display: flex;
  justify-content: flex-end;
}
</style>
