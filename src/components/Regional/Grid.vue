<template>
<div>
   <el-col :span="22" :offset="1">
      <el-card class="box-card">
        <el-table :data="regionais" style="width: 100%" size="small">
          <el-table-column label="NOME DA REGIONAL" prop="nome" name="nome">
          <template slot-scope="scope">
            <i class="el-icon-edit"></i>
            <el-button type="text" @click="Editar(scope.row)"><span style="margin-left:5px">{{ scope.row.nome }}</span></el-button>
          </template>
          </el-table-column>
          <el-table-column label="ATIVO" prop="ativo" name="ativo" :formatter="formatarAtivo"></el-table-column>
          <div slot="empty">
            <span>Nenhum registro</span>
          </div>
          <el-table-column align="right">
            <template slot-scope="scope">
              <el-button  type="danger" icon="el-icon-close" size="mini" v-if="scope.row.ativo === 1" @click="Inativar(scope.row)">Inativar</el-button>
              <el-button type="success" icon="el-icon-check" size="mini" v-if="scope.row.ativo === 0" @click="Ativar(scope.row)">Ativar</el-button>
            </template>
            <!-- <template v-slot:default="table">
              <router-link :to="{name: 'editproject', params: { id: table.row._id }}" tag="span">
                <el-button type="text" size="mini">
                  Edit
                  <i class="el-icon-edit" />
                </el-button>
              </router-link>
            </template> -->
          </el-table-column>
        </el-table>
      </el-card>  
    </el-col>

  <!--Dialog Editar-->    
    <el-dialog title="Editar Regional" :visible.sync="dialogEditar" width="30%">
      <el-form :model="editarForm">
        <el-input type="hidden" :value="editarForm.id" ></el-input>
        <el-input type="hidden" :value="editarForm.ativo" ></el-input>
        <el-form-item label="Nome" :label-width="formLabelWidth">
          <el-input size="small" v-model="editarForm.nome" name="nome" value="" autocomplete="off"></el-input>
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
import { mapState, mapActions, mapGetters } from 'vuex'
//import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
    data() {
      return {
        total: 0,
      listQuery: {
        page: 1,
        limit: 20
      },

        dialogEditar: false,
        editarForm: {
          nome: ''
        },
        formLabelWidth: '50px'
      }
    },
    methods: {
      ...mapActions({
          getRegionais: 'getRegionais'
          // editArticle: 'editArticle',
          // deleteArticle: 'deleteArticle'
        }),
      // handleEdit(index, row) {
      //   console.log(index, row);
      // },

     
      formatarAtivo: function(row, column, cellValue) {
        if (cellValue == false) {
          return 'Não'
        } else {
          return 'Sim'
        }
      },
      

      Inativar(row) {
        this.$confirm('Deseja realmente inativar a Regional ' + row.nome +' ?', 'Atenção', {
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
          type: 'warning',    
        }).then(() => {

          let _regional = {
            id: row.id,
            nome: row.nome,
            ativo: 0
          }

          this.$store.dispatch('inativarRegional', _regional)
            .then(() => {
              
              this.$message({
                type: 'success',
                message: 'Regional ' + row.nome + ' inativada.'
              });


            }).catch(() => {
              this.$message({
                type: 'error',
                message: 'Erro na inativação.'
              });          
            });
          
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: 'Inativação cancelada.'
          });          
        });
      },

      Ativar(row) {
        this.$confirm('Deseja realmente ativar a Regional ' + row.nome +' ?', 'Atenção', {
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
          type: 'warning',    
        }).then(() => {

          let _regional = {
            id: row.id,
            nome: row.nome,
            ativo: 1
          }

          this.$store.dispatch('ativarRegional', _regional)
            .then(() => {
              
              this.$message({
                type: 'success',
                message: 'Regional ' + row.nome + ' ativada.'
              });

            }).catch(() => {
              this.$message({
                type: 'error',
                message: 'Erro na ativação.'
              });          
            });
          
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: 'Ativação cancelada.'
          });          
        });
      },

      Editar(row) {
        
        this.dialogEditar = true;

        this.editarForm.id = row.id;
        this.editarForm.nome = row.nome;
        this.editarForm.ativo = row.ativo;
      },

      Salvar(regional) {

        let _regional = {
          id: regional.id,
          nome: regional.nome,
          ativo: regional.ativo          
        }

          this.$store.dispatch('editarRegional', _regional)
            .then(() => {
              
              this.$message({
                type: 'success',
                message: 'Regional ' + regional.nome + ' editada.'
              });

            }).catch(() => {
              this.$message({
                type: 'error',
                message: 'Erro na edição.'
              });          
            });

            this.dialogEditar = false;

      },
    },

    //created() { 
          // this.$http.get('http://localhost:3000/regionais')
          //     .then(res => res.json())
          //     .then(regionais => this.regionais = regionais)
         // this.$store.dispatch('getPesquisaRegional');
     // },

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
}

</script>

<style>
.el-button.el-button--success.el-button--mini {
  width: 95px;
}
</style>