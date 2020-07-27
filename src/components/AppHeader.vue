<template>
  <div>
  <!--<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <div class="nav navbar-nav">
                <router-link to="/" class="nav-tem nav-link active">Home</router-link>
                <a class="nav-item nav-link" href="#">Product</a>
            </div>

            <div>
                <div class="dropdown open">
                    <button type="button" id="triggerId" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">0 Cart</button>
                    <div @click="$event.stopPropagation()">
                        <mini-cart/>
                    </div>
                </div>
            </div>
        </div> 
    </nav>-->


<el-menu :router="true"
  :default-active="activeIndex2"
  class="el-menu-demo "
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1">Processing Center</el-menu-item>
  
  <el-submenu index="2">
    <template slot="title">Workspace</template>
    <el-menu-item index="2-1">item one</el-menu-item>
    <el-menu-item index="2-2">item two</el-menu-item>
    <el-menu-item index="2-3">item three</el-menu-item>
    <el-submenu index="2-4">
      <template slot="title">item four</template>
      <el-menu-item index="2-4-1">item one</el-menu-item>
      <el-menu-item index="2-4-2">item two</el-menu-item>
      <el-menu-item index="2-4-3">item three</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="3" disabled>Info</el-menu-item>
  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">Orders</a></el-menu-item>
  <el-menu-item index="5">Regional</el-menu-item>
 
    <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>View</el-dropdown-item>
          <el-dropdown-item>Add</el-dropdown-item>
          <el-dropdown-item>Delete</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>Tom</span>
    </el-header>
    
   
  </el-container>
</el-menu>

<!--
<el-container style="height: 500px; border: 1px solid #eee">

  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>View</el-dropdown-item>
          <el-dropdown-item>Add</el-dropdown-item>
          <el-dropdown-item>Delete</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>Tom</span>
    </el-header>
    
   
  </el-container>
</el-container>   -->

  </div>
  
</template>


<!--
<script>
//import MiniCart from "./MiniCart";
//export default {
  //  components: { MiniCart }
//}


  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }

</script>-->

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      };
      return {
          activeIndex: '1',
        activeIndex2: '1',
        tableData: Array(20).fill(item)
      }
    }
  };
</script>


<style>

</style>