<template>
<div class="espaco">
    <el-form >
        <el-col :span="22" :offset="1">
        
         <el-form size="small" ref="permissaoForm" :label-position="labelPosition" :model="permissaoForm" label-width="100px">

          <!-- <h3> Produtor Rural </h3>         -->     

          <el-table :data="permissaoProdutor" style="width: 100%" size="small">  
             <el-table-column label="DESCRIÇÃO" prop="descricaoPermissaoProdutor" >
          </el-table-column>      

          <el-table-column label="ADICIONAR" prop="add" width="100" >
            <template>
              <el-checkbox v-model="permissoesProdutor"  v-bind=0></el-checkbox>
             </template>  
         </el-table-column>    

          <el-table-column label="EDITAR" prop="edit" width="100" > 
            <template>
              <el-checkbox v-model="permissoesProdutor"  v-bind=0></el-checkbox>
            </template>   
         </el-table-column>    
         
          <el-table-column label="VISUALIZAR" prop="view" width="100" > 
            <template>
              <el-checkbox v-model="permissoesProdutor"  v-bind=0></el-checkbox>
             </template>     
          </el-table-column>  

          <el-table-column label="EXCLUIR" prop="del" width="100" > 
            <template>
              <el-checkbox v-model="permissoesProdutor" v-bind=0></el-checkbox>
            </template>  
        </el-table-column>                                                        

        </el-table>  

        <divider></divider>     

        <!--<h3> CPR </h3>-->

         <el-table :data="permissaoCpr" style="width: 100%" size="small">  

            
          <el-table-column label="DESCRIÇÃO" prop="descricaoPermissaoCpr" >
         </el-table-column>         

          <el-table-column label="ADICIONAR" prop="add" width="100" >
                 <template>
              <el-checkbox v-model="permissoesCpr"  v-bind=0></el-checkbox>
             </template>  
               </el-table-column>    
          <el-table-column label="EDITAR" prop="edit" width="100" > 
            <template>
              <el-checkbox v-model="permissoesCpr"  v-bind=0></el-checkbox>
             </template>   
              </el-table-column>    
         
          <el-table-column label="VISUALIZAR" prop="view" width="100" > 
                <template>
              <el-checkbox v-model="permissoesCpr"  v-bind=0></el-checkbox>
             </template>     
          </el-table-column>  

          <el-table-column label="EXCLUIR" prop="del" width="100" > 
               <template>
              <el-checkbox v-model="permissoesCpr"  v-bind=0></el-checkbox>
             </template>  
        </el-table-column>                                                        

        </el-table>  


        
         </el-form> 

          
  </el-col>

        <el-form-item size="small" justify="end">
           <el-button size="small" type="success" @click="Adicionar('permissaoForm')">Salvar</el-button>
            <el-button size="small" type="primary" @click="Limpar()">Cancelar</el-button>           
          </el-form-item>
        
    </el-form>
</div>
</template>

<script>
//export default {
    // data(){
        //return{
        //     permissaoForm:
        //     [
        //     {
        //       permissaoProdutor:[
        //       {    
        //          descricaoPermissaoProdutor: [{items: ''}],
        //          permissoesProdutor: [{descricoes:[{descricao:'', permissoes:''}]}]
        //       }
        //       ],
               
        //       permissaoCpr:[
        //       {
        //         descricaoPermissaoCpr: [{items: ''}], 
        //         permissoesCpr: [{descricoes:[{descricao:'', permissoes:''}]}]
        //       }
        //       ]
        //    }
        //    ]
        // }
  //  },
             


    
//     methods:{

//      Adicionar(permissaoForm) {

          
            
//           let _permissaoForm = {
//               descricaoPermissaoProdutor: this.permissaoForm.permissoesProdutor.descricaoPermissaoProdutor,
//               permissoesProdutor: this.permissaoForm.permissaoProdutor.permissoesProdutor,
//               descricaoPermissaoCpr: this.promissaoForm.permissaoCpr.descricaoPermissaoCpr,
//               permissoesCpr: this.permissaoForm.permissaoCpr.permissoesCpr,
//               ativo: 1
//           };      
          
                         
       
//        this.$refs[permissaoForm].validate((valid) => {
//           if (valid) {
//             this.$store.dispatch('adicionarPermissaoPerfil', _permissaoForm)
//             .then(() => {             
//               this.$message({
//                 type: 'success',
//                 message: 'Permissões salvas com sucesso.'
//               });

//                this.resetForm(permissaoForm)

//             }).catch(() => {
//               this.$message({
//                 type: 'error',
//                 message: 'Erro no cadastro.'
//               });          
//             });
//           }
//         });
//       },

//       Limpar(){
          
//          this.permissaoForm.permissaoProdutor.permissoesProdutor = false;
//          this.permissaoForm.permissaoCpr.permissoesCpr = false;
//       }
//     },

//       mounted: function () {       
//         //this.getDescricaoCpr();        
//         this.getDescricaoProdutor();                      
//       },
// }
</script>

<style>

</style>