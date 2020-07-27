<template>
<div>
   <el-col :span="22" :offset="1">
      <el-card class="box-card">
        <el-form ref="reg" :model="regionalForm" label-width="140px">
          <el-form-item label="Nome da Regional">
            <el-col :span="10">
            <el-input size="small" v-model="regionalForm.nome" name="nome"></el-input>
            </el-col>                
          </el-form-item>

          <el-form-item label="Ativo">
            <el-select size="small" v-model="regionalForm.ativo" name="ativo" placeholder=" -- Selecione --">
              <el-option label="Não" value="0"></el-option>
              <el-option label="Sim" value="1"></el-option>
            </el-select>
          </el-form-item>
               
          <el-form-item size="small">
            <el-button type="primary" @click="dialogAdicionar  = true">Adicionar</el-button>                  
            <el-button type="success" @click="Pesquisar">Pesquisar</el-button>
            <el-button type="info" @click="Limpar">Limpar</el-button>
          </el-form-item>
        </el-form>
     </el-card>
    </el-col>

    
    <!--Dialog Adicionar-->    
    <el-dialog title="Adicionar Regional" :visible.sync="dialogAdicionar" width="30%">
      <el-form :model="adicionarForm">
        <el-form-item label="Nome"  :label-width="formLabelWidth">
          <el-input size="small" v-model="adicionarForm.nome" name="nome" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAdicionar = false">Cancel</el-button>
        <el-button type="primary" @click="Adicionar">Confirm</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data() {
      return {
         regionalForm : {
          nome: '',
          ativo: ''
        },
        dialogAdicionar: false,
        adicionarForm: {},
        formLabelWidth: '50px'
      }
  },
 
 
  computed: {
    ...mapState ({
        regionais: 'regionais'
     }),
     ...mapGetters({
          regionais: 'regionais'
          // showModal: 'showModal',
          // showEditModal: 'showEditModal'
        }), 
  },
     mounted: function () {
        this.getRegionais();
      },


    methods: {
      ...mapActions({
          getRegionais: 'getRegionais'
          // editArticle: 'editArticle',
          // deleteArticle: 'deleteArticle'
        }),
        
      Adicionar() {

        let _regional = {
          nome: this.adicionarForm.nome,
          ativo: 1
        }
        
        this.$store.dispatch('adicionarRegional', _regional)
        .then(() => {
              
              this.$message({
                type: 'success',
                message: 'Regional ' + _regional.nome + ' cadastrada.'
              });

            }).catch(() => {
              this.$message({
                type: 'error',
                message: 'Erro no cadastro.'
              });          
            });
        

        this.dialogAdicionar = false;
        this.adicionarForm.nome = '';
      },
      
      Pesquisar() {
        
        if (this.regionalForm.nome === '' && this.regionalForm.ativo === '') {
          this.$message({
                type: 'warning',
                message: 'Preencha um dos campos para pesquisar.'
              });
        }

        let _regional = {
          nome: this.regionalForm.nome,
          ativo: this.regionalForm.ativo
        }

        this.$store.dispatch('getPesquisaRegional', _regional);
         
      },

      Limpar()
      { 
          this.getRegionais();
          this.regionalForm.nome = '';
          this.regionalForm.ativo = '';
      }
    }
}
</script>

<style>


</style>