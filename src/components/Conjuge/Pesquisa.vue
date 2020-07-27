<template>
<div>
   <el-col :span="22" :offset="1">
      <el-card class="box-card">
        <el-form ref="form" :model="conjugeForm" label-width="170px">
          <el-form-item label="Nome">
            <el-col :span="10">
            <el-input size="small" v-model="conjugeForm.nome" name="nome"></el-input>
            </el-col>                
          </el-form-item>

          <el-form-item label="RG">
            <el-col :span="10">
            <el-input size="small" v-model="conjugeForm.rg" name="rg"></el-input>
            </el-col>                
          </el-form-item>

          <el-form-item label="CPF">
            <el-col :span="10">
            <el-input size="small" v-model="conjugeForm.cpf" name="cpf"></el-input>
            </el-col>                
          </el-form-item>
               
          <el-form-item size="small">
            <el-button type="primary" @click="dialogAdicionar = true">Adicionar</el-button>                  
            <el-button type="success" @click="Pesquisar">Pesquisar</el-button>
            <el-button type="info" @click="Limpar">Limpar</el-button>
          </el-form-item>
        </el-form>
     </el-card>
    </el-col>

    <el-dialog title="Adicionar Conjuge" :visible.sync="dialogAdicionar" width="30%">
  <el-form :model="adicionarForm">
    <el-form-item label="Nome" :label-width="formLabelWidth">
      <el-input size="small" v-model="adicionarForm.nome" autocomplete="off"></el-input>
    </el-form-item>  
     <el-form-item label="RG" :label-width="formLabelWidth">
      <el-input size="small" v-model="adicionarForm.rg" autocomplete="off"></el-input>
    </el-form-item>  
     <el-form-item label="CPF" :label-width="formLabelWidth">
      <el-input size="small" v-model="adicionarForm.cpf" autocomplete="off"></el-input>
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
        conjugeForm: {          
          nome: '',
          rg: '',
          cpf: ''
         
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
            getConjuges: 'getConjuges'
        }),    
      Limpar() {
          this.getConjuges();
          this.conjugeForm.nome = "";
          this.conjugeForm.rg = "";
          this.conjugeForm.cpf = ""
         
      },

      Adicionar(){
        let _conjuge = {          
            nome: this.adicionarForm.nome,
            rg: this.adicionarForm.rg,
            cpf: this.adicionarForm.cpf
                     
        }
        //alert(_conjuge.rg)
     this.$store.dispatch('adicionarConjuge', _conjuge)
     .then(() =>
        {
            this.$message({            
            type: 'success',
            message: 'Conjuge ' + _conjuge.nome + ' cadastrado.'                                               
          });
        }).catch(() => {
          this.$message({
            type: 'error',
            message: 'Erro no cadastro.'
          });          
         });    
                
        this.dialogAdicionar = false;
        this.adicionarForm.nome = "";
        this.adicionarForm.rg = "";
        this.adicionarForm.cpf = ""
         }, 
      
       Pesquisar(){        
        if(this.conjugeForm.nome === "" && this.conjugeForm.rg === "" && this.conjugeForm.cpf === "" ){
             this.$message({
            type: 'warning',
            message: 'Preencha um dos campos para pesquisar.'
          });     
        }
           let _conjuge = {
            nome: this.conjugeForm.nome,            
            rg: this.conjugeForm.rg,
            cpf: this.conjugeForm.cpf

        }
        this.$store.dispatch('getPesquisaConjuge', _conjuge) 
    }
    },
   
    computed: 
    {
        ...mapState({
            conjuges: 'conjuges'
        }),

        ...mapGetters({
            conjuges: 'conjuges'
        }),

    },
                               
     mounted: function () {
         this.getConjuges()      
     },
    

}
  
</script>

<style>

</style>