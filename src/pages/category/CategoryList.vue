<template>
  <div class="category">
    <el-row type="flex" justify="space-between" align="middle" class="toolbar">
      <div class="edit">
        <el-button @click="handleAddCategory">新增</el-button>
        <el-button>删除</el-button>
      </div>
    </el-row>
    <el-row type="flex" justify="space-between" class="cateTitle">
      <span>类别</span>
      <span>排序</span>
      <span>操作</span>
    </el-row>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <input v-model="data.sort_id" @blur="handleEnter(data)" class="sort-input"/>
        </span>
        <span>
          <el-button type="text" size="mini" @click="handleEdit(data)">编辑</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data:[],
    };
  },
   mounted() {
    this.$axios({
      url: "/admin/category/getlist/goods",
      method: "GET"
    }).then(res => {
      //console.log(res);
      let { message } = res.data;
      // 重新排序
      message = message.sort((a, b) => {
          // 如果a的category_id大于B的，那么b数据就排到a的前面
          return a.category_id - b.category_id;
      });

      let categories = [];
      //递归函数,为element找到父级菜单，并将element添加到该父级菜单的children中
      function loop(categories,element){
        categories.forEach(v =>{
          if(v.category_id==element.parent_id){
            //判断当前的分类是否有children属性
            if(!v.children){
              //不存在就创建
              v.children=[];
            }
            //把element添加到当前分类的children属性中
            v.children.push({
              ...element,
              id:element.category_id,
              label:element.title
            });
            return;
          }
          //如果当前数据不符合，继续递归，寻找父级菜单
          if(v.children){
            loop(v.children,element);
          }
        })
      }
      message.forEach(element => {
        //查找一级菜单，直接添加到categories
        if (element.parent_id === 0) {
          //将element添加到categories，并添加id和label属性
          categories.push({
            ...element,
            id:element.category_id,
            label:element.title
          });
        } else {
          //判断该element的父级菜单，添加到该父级菜单的children中
          loop(categories,element);
        }
      });
      this.data = categories;      
    });
  },
  methods:{
    // 修改排序失去焦点时候触发
    handleEnter(data){
      this.$axios({
        url:`/admin/category/edit/${data.category_id}`,
        method:'POST',
        data,
        withCredentials:true
      }).then((res)=>{
        const {status,message}=res.data;
        if(status==0){
          this.$message({
            type:'success',
            message
          })
        }else{
          this.$message.error(message);
        }
      })
    },
    handleAddCategory(){
      this.$router.push('/admin/category-add');
    },
    handleEdit(data){
      this.$router.push(`/admin/category-edit/${data.category_id}`);
    }
  }
};
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.sort-input{
  width: 60px;
  border-radius: 4px;
  border: 1px #eee solid;
  text-align: center;
}
.toolbar {
  height: 60px;
}
.cateTitle{
  background-color: #fff;
  color: #666;
  padding: 10px;
  font-size: 14px;
}
</style>
