<template>
    <div>
    <el-col :span="22" :offset="1">
      <el-card class="box-card">
        <el-tabs type="card">
            <el-tab-pane label="Dados Gerais">                                
                <dados-gerais-editar v-bind:id="id">                   
                </dados-gerais-editar>
            </el-tab-pane>
            <el-tab-pane label="Acesso Master">
                <acesso-master-editar></acesso-master-editar>
            </el-tab-pane>
            <el-tab-pane label="Dados Contratuais">
                <dados-contratuais-editar></dados-contratuais-editar>
            </el-tab-pane>
            <el-tab-pane label="Prestador de Serviços">
                <prestador-servicos-editar></prestador-servicos-editar>
            </el-tab-pane>
        </el-tabs>
     </el-card>
    </el-col>
    </div>
</template>

<script>


import DadosGeraisEditar from './DadosGerais/DadosGeraisEditar'
import AcessoMasterEditar from './AcessoMaster/AcessoMasterEditar'
import DadosContratuaisEditar from './DadosContratuais/DadosContratuaisEditar'
import PrestadorServicosEditar from './PrestadorServicos/PrestadorServicosEditar'

export default {

    props: ["id"],

     data() {
      return {           
        
      }
      
    },
    

    components: {
        DadosGeraisEditar, AcessoMasterEditar, DadosContratuaisEditar, PrestadorServicosEditar
    },

     methods: {
      
     },

     computed: { 
        
     
    },   

     
}



</script>

<style>

</style>