<template>
<div class="admin-container">
  <el-container>
    <el-aside width="auto">
      <div class="logo"></div>
      <app-aside></app-aside>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
//引入组件
import Aside from "../components/Aside";

export default {
  name:'Admin',
  components:{
    'app-aside':Aside,
  }
};
</script>

<style>
.admin-container{
    position: fixed;
    top:0;
    bottom: 0;
    width: 100%;
    height: 100%;
}
 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    display: flex;
    flex-direction: column;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  .el-container {
    margin-bottom: 40px;
    height: 100%;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .logo{
    height: 60px;
    background: #002140;
  }
</style>
