<template>
    <div>
        <titulo texto="Aluno"></titulo>
        <span>
            <input type="text" placeholder="Nome do Aluno" v-model="nome" @keyup.enter="addAluno()">
            <button class="btn-add" @click="addAluno()">Adicionar</button>    
        </span>
        <table>
            <thead>
                <th>Matrícula</th>
                <th>Nome</th>
                <th>Opções</th>
            </thead>
            <tbody v-if="alunos.length">
                <tr v-for="(aluno, index) in alunos" :key="index">
                    <td>{{aluno.id}}</td>
                    <!--<td>{{aluno.id}}</td>-->
                    <td>{{aluno.nome}} {{aluno.sobrenome}}</td>
                    <td>
                        <button class='btn' @click='removeAluno(aluno)'>Remover</button>
                    </td>
                </tr>               
            </tbody>
            <tfoot v-else> 
                <span>Nenhum aluno encontrado</span>        
            </tfoot>
        </table>
    </div>
</template>

<script>
import Titulo from '../_share/Titulo.vue'

export default {
    components: {
        Titulo
    },
    data () {
        return {
            titulo: 'Aluno',
            nome: '',
            // alunos: [
            //     {id: 1, nome: 'Marcus', sobrenome: 'Silva'}, 
            //     {id: 2, nome: 'Joao', sobrenome: 'Pedro' },
            //     {id: 3, nome: 'Paulo', sobrenome: 'Almeida' }
            //     ]
            alunos: []
    
      }
    },
    created() { 
        this.$http.get('http://localhost:3000/alunos')
            .then(res => res.json())
            .then(alunos => this.alunos = alunos)
    },
    props: {

    },
    methods: {
        addAluno() {
            let _aluno = {
                nome: this.nome,
                sobrenome: ""
            }

            this.$http.post('http://localhost:3000/alunos', _aluno)
            .then(res => res.json())
            .then(alunoRetornado => {
                this.alunos.push(alunoRetornado);
                this.nome = '';
            });
        },
        removeAluno(aluno) {

            this.$http.delete(`http://localhost:3000/alunos/${aluno.id}`)
            .then(() => {
                let indice = this.alunos.indexOf(aluno);
                this.alunos.splice(indice, 1)        
            })   
        }
    },
}
</script>

<style scoped>
    div {
        display: grid;
        justify-items: center;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 22px;
    }
    table {
        margin: 0px;
        padding: 0px;
        list-style-type: none;
        width: 30%;
    }
    table tr td{
        background-color: #ebebeb;
        font-size: 1.3em;
        padding: 10px;
    }
    table thead th{
        background-color: slategrey;
        font-size: 1.2em;
        padding: 10px 10px;
        text-align: center !important;
    }
    .btn {
        background-color: crimson;
        padding: 10px 20px;
        cursor: pointer;
        border: 1px saddlebrown;
        color: snow;
        font-weight: bold;
        border-radius: 3px;
        border-bottom: 2px solid tomato;
        margin-left: 20px;
    }
    .btn-add{
        background-color: teal;
        padding: 10px 20px;
        cursor: pointer;
        border: 1px saddlebrown;
        color: snow;
        font-weight: bold;
        border-radius: 3px;
        border-bottom: 2px solid turquoise;
        margin-left: 20px;
    }
    input {
        padding: 7px;
        width: 348px;
    }
    span {
        margin-bottom: 20px;
    }
    .colPequeno {
        width: 5%;
    }
</style>