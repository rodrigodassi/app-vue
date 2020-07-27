export const SET_PRODUCTS = (state, products) => {
    state.products = products;
}

export const SET_PRODUCT = (state, product) => {
    state.product = product;
}

export const SET_REGIONAIS = (state, regionais) => {
    state.regionais = regionais;
}

export const PATCH_PESQUISA_REGIONAL = (state, regionais) => {
    state.regionais = regionais;
}

export const UPDATE_REGIONAL = (state, regional) => {
    let idx = state.regionais.map(a => a.id).indexOf(regional.id)
    state.regionais.splice(idx, 1, regional)
}

export const ADD_REGIONAL = (state, regional) => {
    state.regionais = state.regionais.concat(regional);
} 

export const DELETE_REGIONAL = (state, regional) => {
    let idx = state.regionais.map(a => a.id).indexOf(regional.id)
    state.regionais.splice(idx, 1, regional)
}

export const ATIVAR_REGIONAL = (state, regional) => {
    let idx = state.regionais.map(a => a.id).indexOf(regional.id)
    state.regionais.splice(idx, 1, regional)
}

export const SET_DEPARTAMENTOS = (state, departamentos) => {
    state.departamentos = departamentos;
}

export const ADD_DEPARTAMENTO = (state, departamento) => {
    state.departamentos = state.departamentos.concat(departamento);

}

export const DELETE_DEPARTAMENTO = (state, departamento) => {
    let idx = state.departamentos.map(a => a.id).indexOf(departamento.id)
    state.departamentos.splice(idx, 1, departamento)   
  }

  export const PATCH_PESQUISA_DEPARTAMENTO = (state, departamentos) => {
    state.departamentos = departamentos;
    
}


export const ATIVAR_DEPARTAMENTO = (state, departamento) => {
    let idx = state.departamentos.map(a => a.id).indexOf(departamento.id)
    state.departamentos.splice(idx, 1, departamento)   
  }

  export const UPDATE_DEPARTAMENTO = (state, departamento) => {
    let idx = state.departamentos.map(a => a.id).indexOf(departamento.id)
    state.departamentos.splice(idx, 1, departamento)   
  }

  export const SET_ORGANIZACOES = (state, organizacoes) => {
    state.organizacoes = organizacoes;
}

export const SET_ORGANIZACAO = (state, organizacao) => {
    state.organizacao = organizacao;
}

export const PATCH_PESQUISA_ORGANIZACAO = (state, organizacoes) => {
    state.organizacoes = organizacoes;          
}

export const DELETE_ORGANIZACAO = (state, organizacao) => {
    let idx = state.organizacoes.map(a => a.id).indexOf(organizacao.id)
    state.organizacoes.splice(idx, 1, organizacao)   
  }

export const ATIVAR_ORGANIZACAO = (state, organizacao) => {
    let idx = state.organizacoes.map(a => a.id).indexOf(organizacao.id)
    state.organizacoes.splice(idx, 1, organizacao)   
}
export const ADD_DADOS_GERAIS = (state, dadosGerais) => {
    state.dadosGerais = dadosGerais;
}

export const UPDATE_ORGANIZACAO = (state, organizacao) => {
  let idx = state.organizacoes.map(a => a.id).indexOf(organizacao.id)
  state.organizacoes.splice(idx, 1, organizacao)   
}

// export const SET_DESCRICAO_CPR = (state, descricoesCpr) => {
//     state.descricoesCpr = state.descricoesCpr.concat(descricoesCpr);

// }

// export const SET_DESCRICAO_PRODUTOR = (state, descricoesPermissao) => {
//     state.descricoesPermissao = state.descricoesPermissao.concat(descricoesPermissao);

// }

export const ADD_CONJUGE = (state, conjuge) => {
    state.conjuges = state.conjuges.concat(conjuge);

}

export const UPDATE_CONJUGE = (state, conjuge) => {
    let idx = state.conjuges.map(a => a.id).indexOf(conjuge.id)
    state.conjuges.splice(idx, 1, conjuge)   
  }

  export const PATCH_PESQUISA_CONJUGE = (state, conjuges) => {
    state.conjuges = conjuges;
    
}

export const SET_CONJUGES = (state, conjuges) => {
    state.conjuges = conjuges;
}




