<template>
  <div class="admin-container">
    <el-container>
      <el-aside width="auto">
        <div class="logo"></div>
        <app-aside :isCollapse="isCollapse"></app-aside>
      </el-aside>
      <el-container>
        <el-header>
          <app-header @onchange="changeIsCollapse"></app-header>
        </el-header>
        <el-main>
          <braed-crumb></braed-crumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//引入组件
import Aside from "../components/Aside";
import Header from "../components/Header";
import Breadcrumb from "../components/Breadcrumb";
export default {
  name: "Admin",
  components: {
    "app-aside": Aside,
    "app-header": Header,
    "braed-crumb":Breadcrumb
  },
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    changeIsCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style scoped>
.admin-container {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.el-header {
  color: #333;
}

.el-aside {
  display: flex;
  flex-direction: column;
}
.el-main {
  background-color: #e9eef3;
  padding-top: 0;
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
.logo {
  height: 60px;
  background: #002140;
}
</style>
