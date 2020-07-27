<template>
              <!--<div class="card h-100 text-left">
              <img class="w-100" :src="product.image" alt>
              <div class="card-body">
                  <h4 class="card-title">
                    <router-link :to="{ name: 'product', params: { id: product.id }}">{{ product.title }}</router-link>
                    </h4>
                    <strong>${{ product.price }}</strong>
                  <p class="card-text">{{ product.description }}</p>
                </div>  
                <div class="px-4 pb-3">
                    <button class="btn btn-secondary">Add to Cart</button> 
                </div>
          </div>-->

          

    <el-row :gutter="5" type="flex" class="row-bg" justify="center">
        
        
        
      
            <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
                <el-card :body-style="{ padding: '0px' }">
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                <div style="padding: 14px;">
                    <span>Yummy hamburger</span>
                    <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <el-button type="text" class="button">Operating</el-button>
                    </div>
                </div>
                </el-card>
            </el-col>
          


        
      
            <el-col :span="1">

          <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="Fecha"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="Nombre"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="Dirección">
                </el-table-column>
                </el-table>

            </el-col>
 </el-row>

     




   
</template>



<!--<script>
export default {
    props: ["product"]
}
</script>

<style>

</style>-->


<style>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

<script>
export default {
  data() {
    return {
        props: ["product"],
      currentDate: new Date(),
      tableData: [{
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          }, {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          }, {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          }, {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          }]
    };
  }
}
</script>