<template>
    <div>
    <el-col :span="22" :offset="1">
      <el-card class="box-card">
        <el-tabs type="card">
            <el-tab-pane label="Permissões">
                <permissoes>                    
                </permissoes>
            </el-tab-pane>
            <el-tab-pane label="Usuários">
                <usuarios></usuarios>
            </el-tab-pane>
        </el-tabs>
     </el-card>
    </el-col>
    </div>
</template>

<script>
import Permissoes from './Permissoes'
import Usuarios from './Usuarios'
export default {
    components: {
        Permissoes, Usuarios
    }
}
</script>

<style>

</style>