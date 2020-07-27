<template>
<div>
   <el-col :span="22" :offset="1">
      <el-card class="box-card">
         <el-form size="small" ref="usuarioForm" :label-position="labelPosition" :rules="rules" :model="usuarioForm" label-width="100px">
          <el-form-item label="Nome">
            <el-col :span="10">
            <el-input size="small" v-model="usuarioForm.nome" name="nome"></el-input>
            </el-col>                
          </el-form-item>
               
          <el-form-item size="small">
           <el-button size="small" type="success" @click="Adicionar('usuarioForm')">Salvar</el-button>
            <el-button size="small" type="primary" @click="$router.push('/perfil')">Voltar</el-button>
          <el-button size="small" type="info" @click="Limpar()">Limpar</el-button>   
          </el-form-item>
        </el-form>
     </el-card>
    </el-col>

  </div>
</template>


<script>
// import { mask } from 'vue-the-mask'

// export default {
//     directives: { mask },
//     data() {
//       return {
//         labelPosition: 'right',

//         usuarioForm: {
//            nome: '', 
//            ativo:''
//         },

//         rules: {
//             nome: [
//                 { required: true, message: 'Nome é obrigatório', trigger: 'blur'}
//              ]
//         },        
        
//         dialogAdicionar: false,

        
//         formLabelWidth: '50px'
//       }
//   },

//   methods: {
//       Adicionar(usuarioForm) {
            
//           let _usuarioForm = {
//               nome: this.usuarioForm.nome,
//               ativo: 1
//           };      
                 
//        this.$refs[usuarioForm].validate((valid) => {
//           if (valid) {
//             this.$store.dispatch('adicionarUsuarioPerfil', _usuarioForm)
//             .then(() => {             
//               this.$message({
//                 type: 'success',
//                 message: 'Usuário Salvo.'
//               });

//                this.resetForm(usuarioForm)

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
//            this.usuarioForm.nome = '';
//       }
     
//     }
// }
</script>

<style>
</style>