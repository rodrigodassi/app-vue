import axios from "axios";

export const getRegionais = ({ commit }) => {
    axios.get('http://localhost:3001/regionais')
    .then((response) => {
      commit('SET_REGIONAIS', response.data)
    }).catch((error) => {
        const response = error.response
        console.log(response.data.errors)
      })
  }

export const getProducts = ({ commit }) => {
    //axios.get('http://127.0.0.1:8000/api/products')
    axios.get('http://www.mocky.io/v2/5ebee23f32000072000c329c')
    .then(response => {
        commit('SET_PRODUCTS', response.data);
    }).catch((error) => {
        const response = error.response
        console.log(response.data.errors)
      })
}

export const getPesquisaRegional = ({ commit }, regional ) => {
    axios.get('http://localhost:3001/regionais?', {
       params: {
           nome_like : regional.nome, 
           ativo_like: regional.ativo
        }
    }).then(response => {
        commit("PATCH_PESQUISA_REGIONAL", response.data);
    }).catch((error) => {
        const response = error.response
        console.log(response.data.errors)
      })
}

export const adicionarRegional = ({commit}, regional)  => {
    axios.post('http://localhost:3001/regionais/', regional)
    .then(response => {
        commit("ADD_REGIONAL", response.data);
    }).catch((error) => {
        const response = error.response
        console.log(response.data.errors)
      })
}

export const editarRegional = ({commit}, regional)  => {
    axios.put(`http://localhost:3001/regionais/${regional.id}`, regional)
    .then(response => {
        commit("UPDATE_REGIONAL", response.data);
    }).catch((error) => {
        const response = error.response
        console.log(response.data.errors)
      })
}

export const inativarRegional = ({commit}, regional)  => {
    axios.put(`http://localhost:3001/regionais/${regional.id}`, regional)
    .then(response => {
        commit("DELETE_REGIONAL", response.data);
    }).catch((error) => {
        const response = error.response
        console.log(response.data.errors)
      })
}

export const ativarRegional = ({commit}, regional)  => {
    axios.put(`http://localhost:3001/regionais/${regional.id}`, regional)
    .then(response => {
        commit("ATIVAR_REGIONAL", response.data);
    }).catch((error) => {
        const response = error.response
        console.log(response.data.errors)
      })
}

//------------------------------------------------------------------------------
//      Departamentos   
//------------------------------------------------------------------------------

export const getPesquisaDepartamento = ({commit}, departamento) => {
    axios.get('http://localhost:3000/departamentos?', {
        params: {
            nome_like: departamento.nome,
            ativo_like: departamento.ativo,
        }
    })
    .then(response1 =>{
        commit('PATCH_PESQUISA_DEPARTAMENTO', response1.data);
    } )
}

export const getDepartamentos = ({commit}) => {
    axios.get('http://localhost:3000/departamentos')
    .then(response1 =>{
        commit('SET_DEPARTAMENTOS', response1.data);
    } )
}

export const http = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/bancoDepartamento'
})

export const Adicionar = ({commit}) => {
    axios.post('http://localhost:3000/departamentos')
    .then(response1 =>{
        commit('SET_DEPARTAMENTOS', response1.data);
    } )
}

export const adicionarDepartamento =  ({commit}, departamento) =>
{
       axios.post('http://localhost:3000/departamentos/', departamento)
      .then(response1 =>{
          commit('ADD_DEPARTAMENTO', response1.data);
      } )
}

export const inativarDepartamento =  ({commit}, departamento) =>
{
axios.put(`http://localhost:3000/departamentos/${departamento.id}`, departamento)
      .then(response =>{
          commit('DELETE_DEPARTAMENTO', response.data);
          //return Promise.resolve(response);
      } )
}


export const ativarDepartamento =  ({commit}, departamento) =>
{
axios.put(`http://localhost:3000/departamentos/${departamento.id}`, departamento)
      .then(response =>{
          commit('ATIVAR_DEPARTAMENTO', response.data);    
      } )
}

export const editarDepartamento =  ({commit}, departamento) =>
{
axios.put(`http://localhost:3000/departamentos/${departamento.id}`, departamento)
      .then(response =>{
          commit('UPDATE_DEPARTAMENTO', response.data);          
      } )
}

//------------------------------------------------------------------------------
//      Organizacao Tela Principal Pesquisa   
//------------------------------------------------------------------------------

export const getOrganizacoes = ({commit}) => {
    axios.get('http://localhost:3002/dadosGerais')
    .then(response1 =>{
        commit('SET_ORGANIZACOES', response1.data);
    } )
}

// export const getOrganizacao = ({commit}, organizacaoId) => {
//     axios.get(`http://localhost:3002/dadosGerais/${organizacaoId}`)
//     .then(response1 =>{
//         commit('SET_ORGANIZACAO', response1.data[0]);
//     } )
// }

export const getPesquisaOrganizacao = ({commit}, organizacao) => {
    axios.get('http://localhost:3002/dadosGerais?', {
        params: {
            
            tipo_like: organizacao.tipo,            
            segmento_like: organizacao.segmento,
            nome_like: organizacao.nome,       
            cnpj_like: organizacao.cnpj,
            uf_like: organizacao.uf,            
            municipio_like: organizacao.municipio,                   
            ativo_like: organizacao.ativo,                                            
        }
    })
    .then(response1 =>{
        commit('PATCH_PESQUISA_ORGANIZACAO', response1.data);
    } )  
}

export const inativarOrganizacao =  ({commit}, organizacao) =>
{
axios.put(`http://localhost:3002/dadosGerais/${organizacao.id}`, organizacao)
      .then(response =>{
          commit('DELETE_ORGANIZACAO', response.data);        
      } )
}


export const ativarOrganizacao =  ({commit}, organizacao) =>
{
    
axios.put(`http://localhost:3002/dadosGerais/${organizacao.id}`, organizacao)
      .then(response =>{
          commit('ATIVAR_ORGANIZACAO', response.data);    
      } )
}

export const editarOrganizacao =  ({commit}, organizacao) =>
{
axios.put(`http://localhost:3002/dadosGerais/${organizacao.id}`, organizacao)
      .then(response =>{
          commit('UPDATE_ORGANIZACAO', response.data);          
      } )
}

//------------------------------------------------------------------------------
//      Organizacao DadosGerais   
//------------------------------------------------------------------------------

export const adicionarDadosGerais =  ({commit}, dadosGerais) =>
{
       axios.post('http://localhost:3002/dadosGerais/', dadosGerais)
      .then(response =>{
          commit('ADD_DADOS_GERAIS', response.data);
      })
      
}
//------------------------------------------------------------------------------
//      Perfis 
//------------------------------------------------------------------------------

export const getDescricaoProdutor = ({commit}) => {
    axios.get('http://localhost:3002/descricoesPermissao')
    .then(response1 =>{
        commit('SET_DESCRICAO_PRODUTOR', response1.data);
    } )
}

export const getDescricaoCpr = ({commit}) => {
    axios.get('http://localhost:3002/dadosPerfil')
    .then(response1 =>{
        commit('SET_DESCRICAO_CPR', response1.data);
    } )
}

//-----------------------------------------------------------------------------
//      Conjuges
//-----------------------------------------------------------------------------

// export const getPesquisaConjuge = ({commit}, conjuge) => {
//     axios.get('http://localhost:3005/conjuges?', {
//         params: {
//             nome_like: conjuge.nome,
//             rg_like: conjuge.rg,
//             cpf_like: conjuge.cpf,
//             datacadastro_like: conjuge.datacadastro,
//         }
//     })
//     .then(response1 =>{
//         commit('PATCH_PESQUISA_CONJUGE', response1.data);
//     } )
// }

export const getConjuges = ({commit}) => {
    axios.get('https://appazureteste.azurewebsites.net/api/conjuges')
    .then(response1 =>{
        commit('SET_CONJUGES', response1.data);
    } )
}


export const adicionarConjuge =  ({commit}, conjuge) =>
{
       axios.post('https://appazureteste.azurewebsites.net/api/conjuges', conjuge)
      .then(response1 =>{
          commit('ADD_CONJUGE', response1.data);
      } )
}


// export const editarConjuge =  ({commit}, conjuge) =>
// {
// axios.put(`http://localhost:3005/conjuges/${conjuge.id}`, conjuge)
//       .then(response =>{
//           commit('UPDATE_CONJUGE', response.data);          
//       } )
// }
