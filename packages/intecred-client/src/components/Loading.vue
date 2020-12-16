<script>
export default {

};
</script>

<template>
  <div class="loading" />
</template>

<style lang="scss">
.loading {
  padding: 50px;
  position: relative;
  text-align: center;

  &::before {
    content: '';
    height: 60px;
    width: 60px;
    margin: 0 auto;
    position: absolute;
    border-width: 8px;
    border-style: solid;
    border-color: $--color-primary $--color-gray-4 $--color-gray-4;
    border-radius: 100%;
    animation: rotation 0.7s infinite linear;
    stroke-linecap: round;
  }
}
</style>
