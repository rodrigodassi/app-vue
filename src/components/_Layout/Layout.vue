<template>
  <div>
     <el-container>
      <el-aside width="250px">
        <div class="logo-container">
          <img src="../../assets/logo.png" width="130px" style="padding-left: 10px" class="image">
        </div>
        <div id="org"><span>ADMINISTRAÇÃO</span></div>

        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#ebebeb"
          text-color="#8e8e8e"
          active-text-color="#5ec21b">

          <router-link to="/Organizacao"><el-menu-item index="1">
            <i class="el-icon-office-building"></i>
            <span>Organização</span>
          </el-menu-item></router-link>
          
          <router-link to="/Departamento"><el-menu-item index="2">
            <i class="el-icon-school"></i>
            <span>Departamento</span>
          </el-menu-item></router-link>
          
          <router-link to="/Regional"><el-menu-item index="3">
            <i class="el-icon-map-location"></i>
             <span>Regional</span>
          </el-menu-item></router-link>

          <router-link to="/Perfil"><el-menu-item index="4">
            <i class="el-icon-set-up"></i>
            <span>Perfil</span>
          </el-menu-item></router-link>

          <el-menu-item index="5">
            <i class="el-icon-user"></i>
            <span>Usuário</span>
          </el-menu-item>

           <router-link to="/Modelos"><el-menu-item index="6">           
            <i class="el-icon-document-copy"></i>
            <span>Modelos de CPR</span>
          </el-menu-item></router-link>

           <el-menu-item index="8">
            <i class="el-icon-document-checked"></i>
            <span>Padrão Mínimo de Qualidade</span>
          </el-menu-item>

     <router-link to="/Conjuge"><el-menu-item index="7">
            <i class="el-icon-user"></i>
            <span>Conjuge</span>
          </el-menu-item></router-link>
        </el-menu>

        </el-aside>
          <el-container>

            <el-header >




            <div style="float: right; text-align: right; font-size: 12px">
              <el-dropdown>
                <i class="el-icon-user-solid" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>Sair</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span>Administrador</span>
            </div>

            </el-header>



          <el-col :span="24">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
                  <el-breadcrumb-item :to="{ path: '/' }">Organização</el-breadcrumb-item>
                  <el-breadcrumb-item>Administração Perfil</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
           <el-main>
               <router-view></router-view>
           </el-main>
           </el-container>
    </el-container>

  </div>
</template>

<script>
//import AppHeader from "./components/AppHeader";
//import Regional from '../Regional/Regional';
//import Home from '../pages/Home';
//import Titulo from '../_share/Titulo.vue'

export default {
  name: 'App',


  data () {
        return {            
        }
  },
   methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
      //  handleEdit(index, row) {
      //    console.log(index, row);
      //  },
      //  handleDelete(index, row) {
      //    console.log(index, row);
      //  },
      //  onSubmit() {
      //    console.log('submit!');
      //  }
     },
  // data () {
  //   return {
  //   tableData: [{
  //         date: '2016-05-03',
  //         name: 'Tom',
  //         address: 'No. 189, Grove St, Los Angeles'
  //       }, {
  //         date: '2016-05-02',
  //         name: 'John',
  //         address: 'No. 189, Grove St, Los Angeles'
  //       }, {
  //         date: '2016-05-04',
  //         name: 'Morgan',
  //         address: 'No. 189, Grove St, Los Angeles'
  //       }, {
  //         date: '2016-05-01',
  //         name: 'Jessy',
  //         address: 'No. 189, Grove St, Los Angeles'
  //       }],
  //   form: {
  //         name: '',
  //         region: '',
  //         date1: '',
  //         date2: '',
  //         delivery: false,
  //         type: [],
  //         resource: '',
  //         desc: ''
  //       }
  //   }
  // }
}
</script>

<style>
body { margin: 0; }

#app {
 font-family: Helvetica, Arial, sans-serif;
 -web-font-smoothing: antialiased;
 -moz-osx-smoothing: grayscale;
 color: #2c3e50;
}


.container {
  max-width: 1200px;
  margin: auto;
}

.el-aside {
  background: #ebebeb;
  color: white;
  min-height: 100vh;
}

.logo-container {
  padding: 14.5px;
  background-color: #434a50;
}

.el-menu {
  border-right: 0 !important;
}

.el-main {
  padding-top: 40px;
  background: #f8f8f8;
}

.el-header {
    background-color: #434a50;
    color: #fff;
    line-height: 60px;
  }

.el-dropdown {
  color: #fff;
  font-size: 22px;
}

span {
  font-size: 14px;
}

/* a > span {
  font-size: 14px;
  color: rgb(94, 194, 27) !important;

} */

.breadcrumb-container {
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 20px;
}

.box-card {
  margin-bottom: 20px;
}

#org {
 color: #434a50;
 padding-left: 20px;
 padding-top: 20px;
 padding-bottom: 5px;
}

#org > span {
  font-size: 11px;
   color: #aaaaaa;
}

.el-menu-item [class^=el-icon-]  {
  font-size: 25px;
  margin-right: 10px;
}

</style>