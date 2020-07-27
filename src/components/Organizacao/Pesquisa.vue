<template>
<div> 
   <el-col :span="22" :offset="1">
      <el-card class="box-card">
        
        <el-form ref="form" :model="organizacaoForm" label-width="170px">     
        
         
           <el-form-item label="Tipo">
            <el-select size="small" v-model="organizacaoForm.tipo" name="tipo" placeholder="-- Selecione --"> 
                            
              <el-option label="Credor" value="Credor" ></el-option>
              <el-option label="Serviços" value="Serviços" ></el-option>     
                   
            </el-select>
          </el-form-item>

          <el-form-item label="Segmento">
            <el-select size="small" v-model="organizacaoForm.segmento" name="segmento" placeholder="-- Selecione --">     
              
              <el-option label="Grãos" value="Grãos" ></el-option>
              <el-option label="Pecuária" value="Pecuária" ></el-option>
              <el-option label="Insumos" value="Insumos" ></el-option>  
              <el-option label="Outros" value="Outros" ></el-option> 
             
                   
            </el-select>
          </el-form-item>

           <el-form-item label="Nome/Organização">
            <el-col :span="10">
            <el-input size="small" v-model="organizacaoForm.nome" name="nome"></el-input>
            </el-col>                
          </el-form-item>

          <el-form-item label="CNPJ">
            <el-col :span="10">
              
            <el-input size="small" v-model="organizacaoForm.cnpj" name="cnpj" v-mask="'##.###.###/####-##'"></el-input> 
              
            
            </el-col>                
          </el-form-item>

           <el-form-item label="UF">
            <el-select size="small" v-model="organizacaoForm.uf" name="uf" placeholder="-- Selecione --">     
              
              <el-option label="AC" value="AC" ></el-option>
              <el-option label="AL" value="AL" ></el-option>
              <el-option label="AP" value="AP" ></el-option>  
              <el-option label="AM" value="AM" ></el-option> 
              <el-option label="BA" value="BA" ></el-option>
              <el-option label="CE" value="CE" ></el-option>
              <el-option label="DF" value="DF" ></el-option>  
              <el-option label="ES" value="ES" ></el-option> 
              <el-option label="DF" value="DF" ></el-option>
              <el-option label="GO" value="GO" ></el-option>
              <el-option label="MA" value="MA" ></el-option>  
              <el-option label="MT" value="MT" ></el-option> 
              <el-option label="MS" value="MS" ></el-option>
              <el-option label="MG" value="MG" ></el-option>
              <el-option label="PA" value="PA" ></el-option>  
              <el-option label="PB" value="PB" ></el-option> 
              <el-option label="PR" value="PR" ></el-option>  
              <el-option label="PE" value="PE" ></el-option> 
              <el-option label="PI" value="PI" ></el-option>
              <el-option label="RJ" value="RJ" ></el-option>
              <el-option label="RN" value="RN" ></el-option>  
              <el-option label="RS" value="RS" ></el-option> 
              <el-option label="RO" value="RO" ></el-option>
              <el-option label="RR" value="RR" ></el-option>
              <el-option label="SC" value="SC" ></el-option>  
              <el-option label="SP" value="SP" ></el-option> 
              <el-option label="SE" value="SE" ></el-option>  
              <el-option label="TO" value="TO" ></el-option>               
     
            </el-select>
          </el-form-item>

           <el-form-item label="Município">
            <el-col :span="10">
            <el-input size="small" v-model="organizacaoForm.municipio" name="municipio"></el-input>
            </el-col>                
          </el-form-item>

          <el-form-item label="Ativo">
            <el-select size="small" v-model="organizacaoForm.ativo" name="ativo" placeholder="-- Selecione --">     
         
              <el-option label="Não" value="0" ></el-option>
              <el-option label="Sim" value="1" ></el-option>     
                     
            </el-select>
          </el-form-item>
               
          <el-form-item size="small">
            
            <el-button type="primary" @click="$router.push('organizacao/adicionar')"><span>Adicionar</span></el-button>
            <el-button type="success" @click="Pesquisar">Pesquisar</el-button>
            <el-button type="info" @click="Limpar">Limpar</el-button>
          </el-form-item>
        </el-form>
     </el-card>
    </el-col>


</div>
     
</template>

<script>

import { mask } from 'vue-the-mask'
import { mapState, mapActions,  mapGetters  } from 'vuex'

export default {
  directives: { mask },

  data() {
      return {
        organizacaoForm: {
          tipo: '',
          segmento: '',
          nome: '',
          cnpj: '',
          uf: '',
          municipio: '',
          ativo: '',
        },        
        
        formLabelWidth: '50px'
      }
  },
             
    methods: { 

      ...mapActions({
          getOrganizacoes: 'getOrganizacoes'
      }),
       
      Limpar() {
          this.getOrganizacoes();
          this.organizacaoForm.tipo = '';
          this.organizacaoForm.segmento = '';
          this.organizacaoForm.nome = '';
          this.organizacaoForm.cnpj = '';
          this.organizacaoForm.uf = '';
          this.organizacaoForm.municipio = '';    
          this.organizacaoForm.ativo = '';
                                 
      },

      Adicionar(){
       
      }, 
        

   Pesquisar(){        
        if
        (
        this.organizacaoForm.tipo === "" && this.organizacaoForm.segmento === ""
        && this.organizacaoForm.nome === "" && this.organizacaoForm.cnpj === ""
        && this.organizacaoForm.uf === "" && this.organizacaoForm.municipio === "" 
        && this.organizacaoForm.ativo === "" 
        )
        {
            this.$message(
            {
            type: 'warning',
            message: 'Preencha um dos campos para pesquisar.'
            }
          );     
        }

        let _organizacao = {
          
            tipo: this.organizacaoForm.tipo,            
            segmento: this.organizacaoForm.segmento,
            nome: this.organizacaoForm.nome,       
            cnpj: this.organizacaoForm.cnpj,
            uf: this.organizacaoForm.uf,            
            municipio: this.organizacaoForm.municipio,                   
            ativo: this.organizacaoForm.ativo,                                            

        }
        
        this.$store.dispatch('getPesquisaOrganizacao', _organizacao) 
    },

  },
  computed: 
     {
        ...mapState({
            organizacoes: 'organizacoes'
        }),

        ...mapGetters({
            organizacoes: 'organizacoes'
        }),
       
     },

      mounted: function () {
            this.getOrganizacoes();
     },
    

}
  
</script>

<style>

</style>