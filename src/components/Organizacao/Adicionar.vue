<template>
    <div>
    <el-col :span="22" :offset="1">
      <el-card class="box-card">
        <el-tabs type="card">
            <el-tab-pane label="Dados Gerais">
                <dados-gerais>                    
                </dados-gerais>
            </el-tab-pane>
            <el-tab-pane label="Acesso Master">
                <acesso-master></acesso-master>
            </el-tab-pane>
            <el-tab-pane label="Dados Contratuais">
                <dados-contratuais></dados-contratuais>
            </el-tab-pane>
            <el-tab-pane label="Prestador de Serviços">
                <prestador-servicos></prestador-servicos>
            </el-tab-pane>
        </el-tabs>
     </el-card>
    </el-col>
    </div>
</template>

<script>
import DadosGerais from './DadosGerais/DadosGerais'
import AcessoMaster from './AcessoMaster/AcessoMaster'
import DadosContratuais from './DadosContratuais/DadosContratuais'
import PrestadorServicos from './PrestadorServicos/PrestadorServicos'
export default {
    components: {
        DadosGerais, AcessoMaster, DadosContratuais, PrestadorServicos
    }
}
</script>

<style>

</style>