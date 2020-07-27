<template>
<div> 
   <el-col :span="22" :offset="1">
      <el-card class="box-card">
        
        <el-form ref="form" :model="perfilForm" label-width="140px">     
                 
           <el-form-item label="Nome do Perfil">
            <el-col :span="10">
            <el-input size="small" v-model="perfilForm.nome" name="nome"></el-input>
            </el-col>                
          </el-form-item>

          <el-form-item label="Ativo">
            <el-select size="small" v-model="perfilForm.ativo" name="ativo" placeholder="-- Selecione --">     
         
              <el-option label="Não" value="0" ></el-option>
              <el-option label="Sim" value="1" ></el-option>     
                     
            </el-select>
          </el-form-item>
               
          <el-form-item size="small">            
            <!-- <el-button type="primary" @click="$router.push('perfil/adicionar/adicionarperfil')"><span>Adicionar</span></el-button> -->
            
            <!-- <el-button type="success" @click="Pesquisar">Pesquisar</el-button> -->
            <el-button type="info" @click="Limpar">Limpar</el-button>
          </el-form-item>
        </el-form>
     </el-card>
    </el-col>


</div>
     
</template>

<script>

// import { mask } from 'vue-the-mask'
// import { mapState, mapActions,  mapGetters  } from 'vuex'

 export default {
//   directives: { mask },

   data() {
       return {
         perfilForm: {
           nome: '',
           ativo: ''
         }       
        
//         formLabelWidth: '50px'
       }
   },
             
     methods: { 

//       ...mapActions({
//           getPerfis: 'getPerfis'
//       }),
       
       Limpar() {
           this.getPerfis();
           this.perfilForm.nome = '';
           this.perfilForm.ativo = '';                           
       },

//    Pesquisar(){        
//         if
//         (
//         this.perfilForm.nome === "" && this.perfilForm.ativo === ""
//         )
//         {
//             this.$message(
//             {
//             type: 'warning',
//             message: 'Preencha um dos campos para pesquisar.'
//             }
//           );     
 //        }

//         let _perfil = {
          
//             nome: this.perfilForm.nome,            
//             ativo: this.perfilForm.ativo,                                        

//         }
        
//         this.$store.dispatch('getPesquisaPerfil', _perfil) 
//     },

   }
//   computed: 
//      {
//         ...mapState({
//             perfis: 'perfis'
//         }),

//         ...mapGetters({
//             perfis: 'perfis'
//         }),
       
//      },

//       mounted: function () {
//             this.getPerfis();
//      },
    

 }
  
</script>

<style>

</style>
