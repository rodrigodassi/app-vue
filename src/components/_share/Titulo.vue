<template>
    <div>
        <h4>{{texto}}</h4>
    </div>
</template>

<script>
    export default {
        props: {
            texto: String
        }
    }
</script>

<style scoped>
    h4 {
        font-size: 30px;
        font-style: oblique;
        margin-bottom: 20px;
        font-weight: bold;
    }
</style>