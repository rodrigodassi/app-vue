<template>
<div class="espaco">
  
    <el-form size="small" v-if="dadosGeraisForm" ref="dadosGeraisForm" :label-position="labelPosition" :rules="rules" :model="dadosGeraisForm" label-width="100px">
        
        <el-input type="hidden" :value="dadosGeraisForm.id" ></el-input>

        <el-row >
        <el-col :span="20">
            <el-form-item label="Nome" prop="nome">
                <el-input v-model="dadosGeraisForm.nome" :value="dadosGeraisForm.nome" name="nome"></el-input>
                </el-form-item>
        </el-col>
        </el-row>

         <el-row>
        <el-col :span="20">
            <el-form-item label="CNPJ" prop="cnpj">
                <el-input v-model="dadosGeraisForm.cnpj" name="cnpj" v-mask="'##.###.###/####-##'"></el-input>
            </el-form-item>
        </el-col>
        </el-row>

        <el-row>
        <el-col :span="12">
            <el-form-item label="Tipo" prop="tipo">
                <el-radio-group v-model="dadosGeraisForm.tipo" name="tipo">
                    <el-radio label="Credor" value="Credor"></el-radio>
                    <el-radio label="Serviços" value="Serviços"></el-radio>
                </el-radio-group>
            </el-form-item>
        </el-col>
        </el-row>

<el-row>
  <el-col :span="14">
      <el-form-item label="Segmento" prop="segmento">
          
                <el-select v-model="dadosGeraisForm.segmento" name="segmento" placeholder="-- Selecione --">     
                <el-option label="Grãos" value="Grãos" ></el-option>
                <el-option label="Pecuária" value="Pecuária" ></el-option>
                <el-option label="Insumos" value="Insumos" ></el-option>  
                <el-option label="Outros" value="Outros" ></el-option>  
                </el-select>
           
        </el-form-item>
      
  </el-col>
</el-row>

 <el-row>
  <el-col :span="11">
      <el-form-item label="CEP" prop="cep">
            <el-input v-model="dadosGeraisForm.cep" name="cep" v-mask="'##.###-###'"></el-input>
        </el-form-item>
  </el-col>
</el-row>

<el-row>
  <el-col :span="16">
      <el-form-item label="Rua" prop="rua">
                <el-input v-model="dadosGeraisForm.rua" name="rua"></el-input>
            </el-form-item>
  </el-col>
  <el-col :span="6">
      <el-form-item label="Número" prop="numero">
                <el-input v-model.number="dadosGeraisForm.numero" name="numero" ></el-input>
            </el-form-item>
  </el-col>
      
</el-row>


<el-row>
  <el-col :span="11">
<el-form-item label="Complemento" prop="complemento">
        
            <el-input v-model="dadosGeraisForm.complemento" name="complemento"></el-input>
                   
        </el-form-item>
      
  </el-col>
</el-row>

<el-row>
  <el-col :span="11">
      <el-form-item label="Bairro" prop="bairro">
        
            <el-input v-model="dadosGeraisForm.bairro" name="bairro"></el-input>
                   
        </el-form-item>
      
  </el-col>
</el-row>

<el-row>
  <el-col :span="8">
      <el-form-item label="UF" prop="uf">
           
              <el-select v-model="dadosGeraisForm.uf" name="uf" placeholder="-- Selecione --">     
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
      
  </el-col>
</el-row>

<el-row>
          
  <el-col :span="10">
      <el-form-item label="Município" prop="municipio">
                <el-input size="small" v-model="dadosGeraisForm.municipio" name="municipio"> </el-input>  
        </el-form-item>      
  </el-col>
</el-row>

<el-row>
      <el-col :span="8">
      <el-form-item label="Telefone" prop="telefone">
                <el-input v-model="dadosGeraisForm.telefone" name="telefone" v-mask="'(##) ####-####'"></el-input>
            </el-form-item>
  </el-col>
  <el-col :span="8">
      <el-form-item label="Celular">
                <el-input v-model="dadosGeraisForm.celular" name="celular" v-mask="'(##) #####-####'"></el-input>
            </el-form-item>
  </el-col>
      
</el-row>

<!-- <el-row>
  <el-col :span="8">

      <el-form-item label="Ativo" prop="ativo">
    
                <el-radio-group size="small" v-model="dadosGeraisForm.ativo" name="ativo">
                    <el-radio label="Sim" value="1"></el-radio>
                    <el-radio label="Não" value="0"></el-radio>
                </el-radio-group>
                 
        </el-form-item>
  </el-col>
</el-row> -->

   
        <el-divider></el-divider>


<el-row type="flex" class="row-bg" justify="end">
  <el-button size="small" type="success" @click="Salvar('dadosGeraisForm')">Salvar</el-button>
  <el-button size="small" type="primary" @click="$router.push('/organizacao')">Voltar</el-button>
  <el-button size="small" type="info" @click="resetForm('dadosGeraisForm')">Limpar</el-button>
</el-row>


    </el-form>
</div>

</template>

<script>
import { mask } from 'vue-the-mask'


export default {

    props: ["id"],

    directives: { mask },
    data() {
      return {
        labelPosition: 'right',  
        
        dadosGeraisForm: {          
           id: '',
           nome: '',
           cnpj: '',
           tipo: '',
           segmento: '',
           cep: '',
           rua: '',
           numero: '',
           complemento: '',
           bairro: '',
           uf: '',
           municipio: '',
           telefone: '',
           celular: '',
           ativo: ''
        },
        rules: {
            nome: [
                { required: true, message: 'Nome é obrigatório', trigger: 'blur'}
             ],
            cnpj: [
                { required: true, message: 'CNPJ é obrigatório', trigger: 'blur'}
            ],
            tipo: [
                { required: true, message: 'Tipo é obrigatório', trigger: 'change'}
            ],
            segmento: [
                { required: true, message: 'Segmento é obrigatório', trigger: 'change'}
            ],
            cep: [
                { required: true, message: 'CEP é obrigatório', trigger: 'blur'}
            ],
            rua: [
                { required: true, message: 'Rua é obrigatório', trigger: 'blur'}
            ],
            numero: [
                { required: true, message: 'Número é obrigatório', trigger: 'blur'},
                { type: 'number', message: 'Apenas número'}
            ],
            bairro: [
                { required: true, message: 'Bairro é obrigatório', trigger: 'blur'}
            ],
            uf: [
                { required: true, message: 'Estado é obrigatório', trigger: 'change'}
            ],
            municipio: [
                { required: true, message: 'Município é obrigatório', trigger: 'change'}
            ],
            telefone: [
                { required: true, message: 'Telefone é obrigatório', trigger: 'blur'}
            ]
            // ativo: [
            //     { required: true, message: 'Ativo é obrigatório', trigger: 'change'}
            // ]
        },        
       
        dialogAdicionar: false,

        
        formLabelWidth: '50px'
      }
  },
  methods: {


      Salvar(dadosGeraisForm) {
            
          let _dadosGerais = {
              id: this.dadosGeraisForm.id,
              nome: this.dadosGeraisForm.nome,
              cnpj: this.dadosGeraisForm.cnpj,
              tipo: this.dadosGeraisForm.tipo,
              segmento: this.dadosGeraisForm.segmento,
              cep: this.dadosGeraisForm.cep,
              rua: this.dadosGeraisForm.rua,
              numero: this.dadosGeraisForm.numero,
              complemento: this.dadosGeraisForm.complemento,
              bairro: this.dadosGeraisForm.bairro,
              uf: this.dadosGeraisForm.uf,
              municipio: this.dadosGeraisForm.municipio,
              telefone: this.dadosGeraisForm.telefone,
              celular: this.dadosGeraisForm.celular,
              ativo: this.dadosGeraisForm.ativo
          };         
       
       this.$refs[dadosGeraisForm].validate((valid) => {
          if (valid) {
            this.$store.dispatch('editarOrganizacao', _dadosGerais)
            .then(() => {             
              this.$message({
                type: 'success',
                message: 'Dados Gerais salvo com sucesso.'
              });         

            }).catch(() => {
              this.$message({
                type: 'error',
                message: 'Erro no cadastro.'
              });          
            });
          }
        });
      },
     
    },

    mounted(){   
       this.$http.get('http://localhost:3002/dadosGerais/' + this.id)
       .then(response =>{
      this.dadosGeraisForm = response.data;      
    })
}
}




</script>

<style>
.espaco {
    /* padding: 50px 0px 50px 100px; */
    padding-top: 50px;
    padding-left: 50px;
    padding-right: 50px;
}
.el-tabs__item.is-active {
    color: #67C23A !important;
}
</style>