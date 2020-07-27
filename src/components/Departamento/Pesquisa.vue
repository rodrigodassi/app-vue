<template>
<div>
   <el-col :span="22" :offset="1">
      <el-card class="box-card">
        <el-form ref="form" :model="departamentoForm" label-width="170px">
          <el-form-item label="Nome do Departamento">
            <el-col :span="10">
            <el-input size="small" v-model="departamentoForm.nome" name="nome"></el-input>
            </el-col>                
          </el-form-item>

          <el-form-item label="Ativo">
            <el-select size="small" v-model="departamentoForm.ativo" name="ativo" placeholder="-- Selecione --">     
         
              <el-option label="Não" value="0" ></el-option>
              <el-option label="Sim" value="1" ></el-option>     
                     
            </el-select>
          </el-form-item>
               
          <el-form-item size="small">
            <el-button type="primary" @click="dialogAdicionar = true">Adicionar</el-button>                  
            <el-button type="success" @click="Pesquisar">Pesquisar</el-button>
            <el-button type="info" @click="Limpar">Limpar</el-button>
          </el-form-item>
        </el-form>
     </el-card>
    </el-col>

    <el-dialog title="Adicionar Departamento" :visible.sync="dialogAdicionar" width="30%">
  <el-form :model="adicionarForm">
    <el-form-item label="Nome" :label-width="formLabelWidth">
      <el-input size="small" v-model="adicionarForm.nome" autocomplete="off"></el-input>
    </el-form-item>    
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogAdicionar = false">Cancelar</el-button>
    <el-button type="primary" @click="Adicionar()">Adicionar</el-button>
  </span>
</el-dialog>
</div>
    
</template>

<script>

import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data() {
      return {
        departamentoForm: {
          nome: '',
          ativo: '',
        },        
        
        dialogAdicionar: false,

         adicionarForm: {
        //   nome: '',
        //   ativo: true         
        },
        formLabelWidth: '50px'
      }
  },
             
    methods: { 
        ...mapActions({
            getDepartamentos: 'getDepartamentos'
        }),    
      Limpar() {
          this.getDepartamentos();
          this.departamentoForm.nome = "";
          this.departamentoForm.ativo = "";
      },

      Adicionar(){
        let _departamento = {
            nome: this.adicionarForm.nome,
            ativo: 1
        }
     this.$store.dispatch('adicionarDepartamento', _departamento)
     .then(() =>
        {
            this.$message({            
            type: 'success',
            message: 'Departamento ' + _departamento.nome + ' cadastrado.'                                               
          });
        }).catch(() => {
          this.$message({
            type: 'error',
            message: 'Erro no cadastro.'
          });          
         });    
        
        this.dialogAdicionar = false;
        this.adicionarForm.nome = "";
         }, 
      
       Pesquisar(){        
        if(this.departamentoForm.nome === "" && this.departamentoForm.ativo === ""){
             this.$message({
            type: 'warning',
            message: 'Preencha um dos campos para pesquisar.'
          });     
        }
           let _departamento = {
            nome: this.departamentoForm.nome,            
            ativo: this.departamentoForm.ativo,

        }
        this.$store.dispatch('getPesquisaDepartamento', _departamento) 
    }
    },
   
    computed: 
    {
        ...mapState({
            departamentos: 'departamentos'
        }),

        ...mapGetters({
            departamentos: 'departamentos'
        }),

    },
                               
     mounted: function () {
         this.getDepartamentos()      
     },
    

}
  
</script>

<style>

</style>