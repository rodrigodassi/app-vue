<template>
<div>
  <!-- <el-col :span="22" :offset="1">
      
      <el-card class="box-card">
        
          <el-table :data="perfis" style="width: 100%" size="small">    

          <el-table-column label="NOME DO PERFIL" prop="nome" >

          <template slot-scope="scope">
         <i class="el-icon-edit"></i>
         <el-button type="text" @click="$router.push('organizacao/editar/', scope.row)">
         <el-button type="text" @click="$router.push('perfil/editar/' + scope.row.id)">
      
         <span style="margin-left: 5px">{{ scope.row.nome }}</span>
        </el-button>
       </template>    

          </el-table-column>          
        
           
          <el-table-column label="ATIVO" prop="ativo" ></el-table-column>
         <div slot="empty">
             <span>Nenhum registro</span>
             </div>  -->
           
         <!-- <el-table-column align="right">   
          <template slot-scope="scope">                                     

             <el-button size="mini" type="danger" icon="el-icon-close" @click="Inativar(scope.row)" v-if="scope.row.ativo == 1" >Inativar</el-button>                         
             <el-button size="mini" type="success" icon="el-icon-check" @click="Ativar(scope.row)" v-else >Ativar</el-button>     
                             
          </template>
          
          </el-table-column> -->

        <!-- </el-table>
      </el-card>  
  </el-col> -->
</div>
</template>

<script>
// import { mapState, mapActions,  mapGetters  } from 'vuex'
// export default {   
    
    
    //  data() {
    //    return { 
    //    }
    //  }

    // props:['perfil.id'],

      //  methods: {
      //   ...mapActions({
      //       getPerfis: 'getPerfis'
      //   }),
       

  
  //  Inativar(row) {
      
        
  //       this.$confirm('Deseja realmente inativar o Perfil ' + row.nome + '?', 'Atenção', {
  //         confirmButtonText: 'Confirmar',
  //         cancelButtonText: 'Cancelar',
  //         type: 'warning'                
  //       }).then(() => {

  //           let _perfil = {
  //           id: row.id,
  //           nome: row.nome,
  //           ativo: 0           
  //       } 
  //       this.$store.dispatch('inativarPerfil', _perfil)
  //       .then(() =>
  //       {
  //           this.$message({            
  //           type: 'success',
  //           message: 'Perfil ' + row.nome + ' inativado.'                                               
  //         });
  //       }).catch(() => {
  //         this.$message({
  //           type: 'error',
  //           message: 'Erro na Inativação.'
  //         });          
  //        });
  //     }).
  //     catch(() => {
  //         this.$message({
  //           type: 'warning',
  //           message: 'Inativação Cancelada.'
  //         });          
  //        });
         
  //     },

  //     Ativar(row) {
      
       
  //       this.$confirm('Deseja realmente ativar o Perfil ' + row.nome + '?', 'Atenção', {
  //         confirmButtonText: 'Confirmar',
  //         cancelButtonText: 'Cancelar',
  //         type: 'warning'                
  //       }).then(() => {

  //           let _perfil = {
  //           id: row.id,
  //           nome: row.nome,
  //           ativo: 1
            
           
  //       } 
        
          
  //       this.$store.dispatch('ativarPerfil', _perfil)
  //       .then(() =>
  //       {
  //           this.$message({            
  //           type: 'success',
  //           message: 'Perfil ' + row.nome + ' ativado.'                                               
  //         });
  //       }).catch(() => {
  //         this.$message({
  //           type: 'error',
  //           message: 'Erro na Ativação.'
  //         });          
  //        });
  //     }).
  //     catch(() => {
  //         this.$message({
  //           type: 'warning',
  //           message: 'Ativação Cancelada.'
  //         });          
  //        });
  //     },

  //     formatarAtivo :function(row, column, cellValue){
        
  //      if(cellValue == 0){
  //          return "Não"
  //      }
  //      else{
  //          return "Sim"
  //      }
  //     },

      //  onChangePage(page){
      //     this.page = page;
      //     this.getPerfis()
      // }

    // },
    //  computed: { 
    //     ...mapState({
    //        perfis: 'perfis'
    //     }),
    //     ...mapGetters({
    //         perfis: 'perfis'
    //     })   
    // },   

    //  mounted: function () {
    //      this.getPerfis() 
         
    //  },
    
    
  
    
// }
</script>