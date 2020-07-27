<template>
<div>
  <el-col :span="22" :offset="1">
      
      <el-card class="box-card">
        
          <el-table :data="departamentos" style="width: 100%" size="small">                           
          <el-table-column label="NOME DO DEPARTAMENTO" prop="nome" >
          <template slot-scope="scope">
        <i class="el-icon-edit"></i>
        <el-button type="text" value="" @click="Editar(scope.row)">
        <span style="margin-left: 5px">{{ scope.row.nome }}</span>
        </el-button>
      </template>    
          </el-table-column>          
          <el-table-column label="ATIVO" prop="ativo" :formatter="formatarAtivo"></el-table-column>
         <div slot="empty">
             <span>Nenhum registro</span>
             </div>
          <el-table-column align="right">   
          <template slot-scope="scope">                                     
             <!--<el-button size="mini" type="danger" -v-if scope.row.ativo = 1 @click="Inativar(scope.row)">Inativar</el-button>-->                      
             <!--<el-button size="mini" type="primary" -v-if scope.row.ativo = 1  @click="Ativar(scope.row)">Ativar</el-button>   -->   
             <el-button size="mini" type="danger" icon="el-icon-close" @click="Inativar(scope.row)" v-if="scope.row.ativo == 1" >Inativar</el-button>                         
             <el-button size="mini" type="success" icon="el-icon-check" @click="Ativar(scope.row)" v-else >Ativar</el-button>     
                             
          </template>
          
          </el-table-column>

          
       
        </el-table>
      </el-card>  


  
         


    </el-col>
      <el-dialog title="Editar Departamento" :visible.sync="dialogEditar" width="30%">
  <el-form :model="editarForm">
  <el-input type="hidden" :value="editarForm.id" ></el-input>
  <el-input type="hidden" :value="editarForm.ativo" ></el-input>
    <el-form-item label="Nome" :label-width="formLabelWidth">
      <el-input size="small" type="text" v-model="editarForm.nome" autocomplete="off"></el-input>
    </el-form-item>    
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogEditar = false">Cancelar</el-button>
    <el-button type="primary" @click="Salvar(editarForm)">Confirmar</el-button>
  </span>
</el-dialog>
    
      
      </div> 
</template>

<script>
import { mapState, mapActions, mapGetters  } from 'vuex'

export default {   
    
    
    data() {
      return { 

    editarForm: {
        nome: '',
        ativo: ''
    
        },        
        
        dialogEditar: false,
        formLabelWidth: "50px"
         
      };
    },  
    
    methods: {
        ...mapActions({
            getDepartamentos: 'getDepartamentos'
        }),
    //   handleEdit(index, row) {
    //     console.log(index, row);
    //   },
    
      Inativar(row) {
      
        
        this.$confirm('Deseja realmente inativar o Departamento ' + row.nome + '?', 'Atenção', {
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
          type: 'warning'                
        }).then(() => {

            let _departamento = {
            id: row.id,
            nome: row.nome,
            ativo: 0,
        } 
        this.$store.dispatch('inativarDepartamento', _departamento)
        .then(() =>
        {
            this.$message({            
            type: 'success',
            message: 'Departamento ' + row.nome + ' inativado.'                                               
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
      
        
        this.$confirm('Deseja realmente ativar o Departamento ' + row.nome + '?', 'Atenção', {
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
          type: 'warning'                
        }).then(() => {

            let _departamento = {
            id: row.id,
            nome: row.nome,
            ativo: 1,
            
            
        } 
        this.$store.dispatch('ativarDepartamento', _departamento)
        .then(() =>
        {
            this.$message({            
            type: 'success',
            message: 'Departamento ' + row.nome + ' ativado.'                                               
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

        Editar(row){
       
       this.dialogEditar = true
       this.editarForm.id = row.id
       this.editarForm.nome  = row.nome        
       this.editarForm.ativo = row.ativo

       let _departamento = {
           id: this.editarForm.id,
           nome: this.editarForm.nome,
           ativo: this.editarForm.ativo
                  
        } 
        
        this.$store.dispatch('editarDepartamento', _departamento)
       
        
        

    //     let _departamento = {
    //         nome: this.editarForm.nome,           
    //     }
    //    this.$store.dispatch('editarDepartamento', _departamento)
    //     .then(() =>
    //     {
    //         this.$message({            
    //         type: 'success',
    //         message: 'Departamento ' + _departamento.nome + ' salvo com sucesso.'                                               
    //       });
    //     }).catch(() => {
    //       this.$message({
    //         type: 'error',
    //         message: 'Erro no cadastro.'
    //       });          
    //      });    
        
    //     this.dialogAdicionar = false;
    //     this.adicionarForm.nome = "";
     }, 

     Salvar(departamento){
        let _departamento = {
            id: departamento.id,
            nome: departamento.nome,  
            ativo: departamento.ativo         
        }
     this.$store.dispatch('editarDepartamento', _departamento)
     .then(() =>
        {
            this.$message({            
            type: 'success',
            message: 'Departamento ' + departamento.nome + ' editado.'                                               
          });
        }).catch(() => {
          this.$message({
            type: 'error',
            message: 'Erro na edição.'
          });          
         });
      
        
        this.dialogEditar = false;        
  
  
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
          this.getDepartamentos()
      }
    },    
    computed: { 
        ...mapState({
           departamentos: 'departamentos'
        }),
        ...mapGetters({
            departamentos: 'departamentos'
        })   
    },                       
        //  departamentos() {
        //      return this.$store.state.departamentos;
         
    
    // created() { 
    //     this.$http.get('http://localhost:3000/departamentos')
    //         .then(res => res.json())
    //         .then(departamentos => this.departamentos = departamentos)
    // },
    removeDepto(departamento) { 

            this.$http.delete(`http://localhost:3000/departamentos/${departamento.id}`)
            .then(() => {
                let indice = this.departamentos.indexOf(departamento);
                this.departamentos.splice(indice, 1)        
            })   
        },  

     mounted: function () {
         this.getDepartamentos()      
     },
    
   
    

    
}
</script>

<style>

.el-button.el-button--success.el-button--mini {
    width: 95px
}

</style>