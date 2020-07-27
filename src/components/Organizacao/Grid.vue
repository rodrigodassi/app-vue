<template>
<div>
  <el-col :span="22" :offset="1">
      
      <el-card class="box-card">
        
          <el-table :data="organizacoes" style="width: 100%" size="small">    

          <el-table-column label="NOME" prop="nome" >

          <template slot-scope="scope">
         <i class="el-icon-edit"></i>
         <!--<el-button type="text" @click="$router.push('organizacao/editar/', scope.row)">-->
         <el-button type="text" @click="$router.push('organizacao/editar/' + scope.row.id)">
      
         <span style="margin-left: 5px">{{ scope.row.nome }}</span>
        </el-button>
       </template>    

          </el-table-column>          

           <el-table-column label="CNPJ" prop="cnpj" ></el-table-column>

           <el-table-column label="TIPO" prop="tipo" ></el-table-column>

           <el-table-column label="SEGMENTO" prop="segmento" ></el-table-column>

           <el-table-column label="MUNICÍPIO" prop="municipio" ></el-table-column>

           <el-table-column label="UF" prop="uf" ></el-table-column>        

                      
          <el-table-column label="ATIVO" prop="ativo" :formatter="formatarAtivo"></el-table-column>
         <div slot="empty">
             <span>Nenhum registro</span>
             </div>
           
         <el-table-column align="right">   
          <template slot-scope="scope">                                     

             <el-button size="mini" type="danger" icon="el-icon-close" @click="Inativar(scope.row)" v-if="scope.row.ativo == 1" >Inativar</el-button>                         
             <el-button size="mini" type="success" icon="el-icon-check" @click="Ativar(scope.row)" v-else >Ativar</el-button>     
                             
          </template>
          
          </el-table-column>

        </el-table>
      </el-card>  
  </el-col>
</div>
</template>

<script>
import { mapState, mapActions,  mapGetters  } from 'vuex'
export default {   
    
    
    data() {
      return { 
      }
    },

    props:['organizacao.id'],

       methods: {
        ...mapActions({
            getOrganizacoes: 'getOrganizacoes'
        }),
       

  
   Inativar(row) {
      
        
        this.$confirm('Deseja realmente inativar a Organização ' + row.nome + '?', 'Atenção', {
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
          type: 'warning'                
        }).then(() => {

            let _organizacao = {
            id: row.id,
            tipo: row.tipo,
            segmento: row.segmento,            
            nome: row.nome,
            cnpj: row.cnpj,
            uf: row.uf,            
            municipio: row.municipio, 
            cep: row.cep, 
            rua: row.rua,
            numero: row.numero,
            complemento: row.complemento,
            email: row.email,
            bairro: row.bairro,
            telefone: row.telefone,
            celular: row.celular,
            ativo: 0
        } 
        this.$store.dispatch('inativarOrganizacao', _organizacao)
        .then(() =>
        {
            this.$message({            
            type: 'success',
            message: 'Organização ' + row.nome + ' inativada.'                                               
          });
        }).catch(() => {
          this.$message({
            type: 'error',
            message: 'Erro na Inativação.'
          });          
         });
      }).
      catch(() => {
          this.$message({
            type: 'warning',
            message: 'Inativação Cancelada.'
          });          
         });
         
      },

      Ativar(row) {
      
       
        this.$confirm('Deseja realmente ativar a Organização ' + row.nome + '?', 'Atenção', {
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
          type: 'warning'                
        }).then(() => {

            let _organizacao = {
            id: row.id,
            tipo: row.tipo,
            segmento: row.segmento,            
            nome: row.nome,
            cnpj: row.cnpj,
            uf: row.uf,            
            municipio: row.municipio, 
            cep: row.cep, 
            rua: row.rua,
            numero: row.numero,
            complemento: row.complemento,
            email: row.email,
            bairro: row.bairro,
            telefone: row.telefone,
            celular: row.celular,
            ativo: 1
            
           
        } 
        
          
        this.$store.dispatch('ativarOrganizacao', _organizacao)
        .then(() =>
        {
            this.$message({            
            type: 'success',
            message: 'Organização ' + row.nome + ' ativada.'                                               
          });
        }).catch(() => {
          this.$message({
            type: 'error',
            message: 'Erro na Ativação.'
          });          
         });
      }).
      catch(() => {
          this.$message({
            type: 'warning',
            message: 'Ativação Cancelada.'
          });          
         });
      },

      formatarAtivo :function(row, column, cellValue){
        
       if(cellValue == 0){
           return "Não"
       }
       else{
           return "Sim"
       }
      },

       onChangePage(page){
          this.page = page;
          this.getOrganizacoes()
      }

    },
     computed: { 
        ...mapState({
           organizacoes: 'organizacoes'
        }),
        ...mapGetters({
            organizacoes: 'organizacoes'
        })   
    },   

     mounted: function () {
         this.getOrganizacoes() 
         
     },
    
    
  
    
}
</script>