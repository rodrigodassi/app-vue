<template>
<div> 
   <el-col :span="22" :offset="1">
      <el-card class="box-card">
        
        <el-form ref="form" :model="modelosForm" label-width="170px">     
                         

           <el-form-item label="Nome">
            <el-col :span="10">
            <el-input size="small" v-model="modelosForm.nome" name="nome"></el-input>
            </el-col>                
          </el-form-item>

           <el-form-item label="Modalidade de CPR">
            <el-select size="small" v-model="modelosForm.modalidade" name="modalidade" placeholder="-- Selecione --">     
              
              <el-option label="Física" value="Física" ></el-option>  
            <el-option label="Financeira" value="Fincanceira" ></el-option>       
     
            </el-select>
          </el-form-item>

           <el-form-item label="Categoria do Produto">
            <el-select size="small" v-model="modelosForm.categoria" name="categoria" placeholder="-- Selecione --">     
              
              <el-option label="Grãos" value="Grãos" ></el-option>  
              <el-option label="Pecuária" value="Pecuária" ></el-option>     
              <el-option label="Agrícola" value="Agrícola" ></el-option>                               
     
            </el-select>
          </el-form-item>

           <el-form-item label="Produto">
            <el-select size="small" v-model="modelosForm.produto" name="produto" placeholder="-- Selecione --">     
              
              <el-option label="Soja" value="Soja" ></el-option>  
              <el-option label="Milho" value="Milho" ></el-option>                                            
     
            </el-select>
          </el-form-item>

           <el-form-item label="Moeda">
            <el-select size="small" v-model="modelosForm.moeda" name="moeda" placeholder="-- Selecione --">     
              
              <el-option label="Real(R$)" value="Real"></el-option>  
              <el-option label="Dolar(U$$)" value="Dólar"></el-option>                                            
     
            </el-select>
          </el-form-item>

           <el-form-item label="Ativo">
            <el-select size="small" v-model="modelosForm.ativo" name="ativo" placeholder="-- Selecione --">     
         
              <el-option label="Não" value="0" ></el-option>
              <el-option label="Sim" value="1" ></el-option>     
                     
            </el-select>
          </el-form-item>
               
          <el-form-item size="small">
            
            <el-button type="primary" @click="Adicionar"><span>Adicionar</span></el-button>
            <el-button type="success" @click="Pesquisar">Pesquisar</el-button>
            <el-button type="info" @click="Limpar">Limpar</el-button>
          </el-form-item>
        </el-form>
     </el-card>
    </el-col>


</div>
    
</template>

<script>

import { mapState, mapActions,  mapGetters  } from 'vuex'

export default {

  data() {
      return {
        modelosForm: {
          nome: '',
          modalidade: '',
          categoria: '',
          produto: '',
          moeda: '',
          ativo: '',
        },        
        
        formLabelWidth: '50px'
      }
  },
             
    methods: { 

      ...mapActions({
          getModelos: 'getModelos'
      }),
       
      Limpar() {
          this.getModelos();
          this.modelosForm.nome = '';
          this.modelosForm.modalidade = '';
          this.modelosForm.categoria = '';
          this.modelosForm.produto = '';
          this.modelosForm.moeda = '';
          this.modelosForm.ativo = '';              
                                 
      },

      Adicionar(){
       
      }, 
        

   Pesquisar(){        
        if
        (
        this.modelosForm.nome === "" && this.modelosForm.modalidade === ""
        && this.modelosForm.categoria === "" && this.modelosForm.produto === ""
        && this.modelosForm.moeda === "" && this.modelosForm.ativo === ""         
        )
        {
            this.$message(
            {
            type: 'warning',
            message: 'Preencha um dos campos para pesquisar.'
            }
          );     
        }

        let _modelos = {
          
            tipo: this.modelosForm.nome,            
            segmento: this.modelosForm.modalidade,
            nome: this.modelosForm.categoria,       
            cnpj: this.modelosForm.produto,
            uf: this.modelosForm.moeda,            
            municipio: this.modelosForm.ativo,                                                                     

        }
        
        this.$store.dispatch('getPesquisaModelos', _modelos) 
    },

  },
  computed: 
     {
        ...mapState({
            modelos: 'modelos'
        }),

        ...mapGetters({
            modelos: 'modelos'
        }),
       
     },

      mounted: function () {
            this.getModelos();
     },
    

}
  
</script>

<style>

</style>