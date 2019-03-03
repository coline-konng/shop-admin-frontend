<template>
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu v-for="(item,index) in menus" :key="index" index="`${index+1}`">

        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </template>

        <el-menu-item-group>
          <el-menu-item v-for="(subItem,subIndex) in item.group"
           :key="subIndex"
            index="`${index+1}-${subIndex+1}`">
            <router-link :to="subItem.src"></router-link>
            {{subItem.title}}
            </el-menu-item>
        </el-menu-item-group>
       
      </el-submenu>
    </el-menu>
</template>


<script>
export default {
  data() {
    return {
      isCollapse: false,
      menus:[
        {icon:'el-icon-menu',title:'购物商城',group:[
          {src:'#',title:'商品管理'},{src:'#',title:'栏目管理'}
        ]},
        {icon:'el-icon-service',title:'会员管理',group:[
          {src:'#',title:'会员列表'}
        ]},
        {icon:'el-icon-tickets',title:'商城订单',group:[
          {src:'#',title:'订单列表'}
        ]},
      ]
    };
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-item-group__title{
display: none;
}
.el-menu{
  border-right: none;
}
.el-menu-vertical-demo{
  flex: 1;
}
</style>