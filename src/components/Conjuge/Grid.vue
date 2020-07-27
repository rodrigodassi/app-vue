<template>
<div>
  <el-col :span="22" :offset="1">
      
      <el-card class="box-card">
        
          <el-table :data="conjuges" style="width: 100%" size="small">                           
          <el-table-column label="NOME DO CONJUGE" prop="nome" >
          <template slot-scope="scope">
        <i class="el-icon-edit"></i>
        <el-button type="text" value="" @click="Editar(scope.row)">
        <span style="margin-left: 5px">{{ scope.row.nome }}</span>
        </el-button>
      </template>    
          </el-table-column>    

        <el-table-column label="RG" prop="rg" >
        <template slot-scope="scope">
        
        <span style="margin-left: 5px">{{ scope.row.rg }}</span>
      </template>    
          </el-table-column>  

            <el-table-column label="CPF" prop="cpf" >
        <template slot-scope="scope">
        
        <span style="margin-left: 5px">{{ scope.row.cpf }}</span>
      </template>    
          </el-table-column>              

       
        </el-table>
      </el-card>  


  
         


    </el-col>
      <el-dialog title="Editar Conjuge" :visible.sync="dialogEditar" width="30%">
  <el-form :model="editarForm">
  <el-input type="hidden" :value="editarForm.conjugeId" ></el-input>  
    <el-form-item label="Nome" :label-width="formLabelWidth">
      <el-input size="small" type="text" v-model="editarForm.nome" autocomplete="off"></el-input>
    </el-form-item>    
    <el-form-item label="RG" :label-width="formLabelWidth">
      <el-input size="small" type="text" v-model="editarForm.rg" autocomplete="off"></el-input>
    </el-form-item>  
    <el-form-item label="CPF" :label-width="formLabelWidth">
      <el-input size="small" type="text" v-model="editarForm.cpf" autocomplete="off"></el-input>
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
        rg: '',
        cpf: ''
    
        },        
        
        dialogEditar: false,
        formLabelWidth: "50px"
         
      };
    },  
    
    methods: {
        ...mapActions({
            getConjuges: 'getConjuges'
        }),
    //   handleEdit(index, row) {
    //     console.log(index, row);
    //   },
    

        Editar(row){
       
       this.dialogEditar = true
       this.editarForm.conjugeId = row.conjugeId
       this.editarForm.nome  = row.nome        
       this.editarForm.rg = row.rg
       this.editarForm.cpf = row.cpf

       let _conjuge = {
           conjugeId: this.editarForm.conjugeId,
           nome: this.editarForm.nome,
           rg: this.editarForm.rg,
           cpf: this.editarForm.cpf
                  
        } 
        
        this.$store.dispatch('editarConjuge', _conjuge)
     }, 

     Salvar(conjuge){
        let _conjuge = {
            conjugeId: conjuge.id,
            nome: conjuge.nome,  
            rg: conjuge.rg,
            cpf: conjuge.cpf             
        }
     this.$store.dispatch('editarConjuge', _conjuge)
     .then(() =>
        {
            this.$message({            
            type: 'success',
            message: 'Conjuge ' + conjuge.nome + ' editado.'                                               
          });
        }).catch(() => {
          this.$message({
            type: 'error',
            message: 'Erro na edição.'
          });          
         });
      
        
        this.dialogEditar = false;        
  
  
  }, 



      onChangePage(page){
          this.page = page;
          this.getConjuges()
      }
    },    
    computed: { 
        ...mapState({
           conjuges: 'conjuges'
        }),
        ...mapGetters({
            conjuges: 'conjuges'
        })   
    },                       
        //  departamentos() {
        //      return this.$store.state.departamentos;
         
    
    // created() { 
    //     this.$http.get('http://localhost:3000/departamentos')
    //         .then(res => res.json())
    //         .then(departamentos => this.departamentos = departamentos)
    // },
    removeDepto(conjuge) { 

            this.$http.delete(`http://localhost:3003/conjuges/${conjuge.conjugeId}`)
            .then(() => {
                let indice = this.conjuges.indexOf(conjuge);
                this.conjuges.splice(indice, 1)        
            })   
        },  

     mounted: function () {
         this.getConjuges()   

    // this.$http.get('https://localhost:44340/api/conjuges')
    //   .then(response => {
    //     this.editarForm = response.data
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     this.errored = true
    //   })
    //   .finally(() => this.loading = false)   

      },
    
   
    

    
}
</script>

<style>

.el-button.el-button--success.el-button--mini {
    width: 95px
}

</style>