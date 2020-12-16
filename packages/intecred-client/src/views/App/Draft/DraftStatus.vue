<template>
  <p>{{ dateTime }}</p>
</template>

<script>
import { dateTime } from '../../../helpers';

export default {
  name: 'DraftStatus',
  computed: {
    dateTime() {
      return dateTime();
    },
  },
};
</script>

<style scoped lang="scss">

</style>
