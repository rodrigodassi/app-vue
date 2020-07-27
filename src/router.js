import Vue from 'vue'
import Router from 'vue-router'

//import Home from "./pages/Home"
import Alunos from "./components/Aluno/Alunos"
import Regional from "./components/Regional/Regional"
import Departamento from "./components/Departamento/Departamento"
import Organizacao from "./components/Organizacao/Organizacao"
//import Index from "./components/Organizacao/Index"
import Adicionar from "./components/Organizacao/Adicionar"
import Editar from "./components/Organizacao/Editar"
import Perfil from "./components/Perfil/Perfil"
import Modelos from "./components/ModelosCPR/Modelos"
import AdicionarPerfil from "./components/Perfil/Adicionar/AdicionarPerfil"
import Conjuge from "./components/Conjuge/Conjuge"


//import Product from "./pages/Product.vue"

Vue.use(Router);

export default new Router ({

    routes: 
    [ {
            path: '/alunos',
            component: Alunos,
            name: 'alunos'
    },
    {
            path: '/regional',
            component: Regional,
            name: 'regional'
    },
	{
            path: '/departamento',
            component: Departamento,
            name: 'departamento'        
    },
    {
            path: '/organizacao',
            component: Organizacao,
            name: 'organizacao',
            meta: {
                menuShow: true
            },
    },
    {
        path: '/perfil',
        component: Perfil,
        name: 'perfil',
        meta: {
            menuShow: true
        },
    },
    {
        path: '/conjuge',
        component: Conjuge,
        name: 'conjuge',
        meta: {
            menuShow: true
        },
    },
    {
        path: '/perfil/adicionar/adicionarperfil',
        component: AdicionarPerfil,
        name: 'adicionarperfil',
    },
    {
        path: '/modelos',
        component: Modelos,
        name: 'modelos' 
    },
    {
        path: '/organizacao/adicionar',
        component: Adicionar,
        name: 'adicionar',
    },
    {
        path: '/organizacao/editar/:id',
        component: Editar,
        name: 'editar',
        props: true

    }

    ]
})
