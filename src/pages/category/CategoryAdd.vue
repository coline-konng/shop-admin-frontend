<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="所属父类别">
        <el-cascader :options="data" :show-all-levels="false" @change="handleChange"></el-cascader>
      </el-form-item>
      <el-form-item label="排序数字">
        <el-col :span="12">
          <el-input v-model="form.sort_id"></el-input>
        </el-col>
        <el-col :span="12">
          <span class="tips">*栏目排序,排序不能小于{{form.category_id}}</span>
        </el-col>
      </el-form-item>
      <el-form-item label="类别名称">
        <el-col :span="12">
          <el-input v-model="form.title"></el-input>
        </el-col>
        <el-col :span="12">
          <span class="tips">*类别中文名称，100字符内</span>
        </el-col>
      </el-form-item>
      <el-form-item label="类别级别">
        <el-col :span="12">
          <el-input v-model="form.class_layer"></el-input>
        </el-col>
        <el-col :span="12">
          <span class="tips">类别的级别，1:1级菜单 2：二级菜单 依次类推</span>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      /* options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        }
      ], */
      form: {
        title: "",
        category_id: "",
        sort_id: "",
        class_layer: ""
      }
    };
  },
  mounted() {
    this.$axios({
      url: "/admin/category/getlist/goods"
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
      function loop(categories, element) {
        categories.forEach(v => {
          if (v.category_id == element.parent_id) {
            //判断当前的分类是否有children属性
            if (!v.children) {
              //不存在就创建
              v.children = [];
            }
            //把element添加到当前分类的children属性中
            v.children.push({
              ...element,
              value: element.category_id,
              label: element.title
            });
            return;
          }
          //如果当前数据不符合，继续递归，寻找父级菜单
          if (v.children) {
            loop(v.children, element);
          }
        });
      }
      message.forEach(element => {
        //查找一级菜单，直接添加到categories
        if (element.parent_id === 0) {
          //将element添加到categories，并添加id和label属性
          categories.push({
            ...element,
            value: element.category_id,
            label: element.title
          });
        } else {
          //判断该element的父级菜单，添加到该父级菜单的children中
          loop(categories, element);
        }
      });
      this.data = categories;
    });
  },
  methods: {
    //获取选择的父级分类的id
    handleChange(data) {
      //console.log(data);
      this.form.category_id = data[data.length - 1];
    },
    //立即创建
    onSubmit() {
      console.log(this.form);
      this.$axios({
        method: "POST",
        url: "/admin/category/add/goods",
        data: this.form
      }).then(res => {
        console.log(res);
        const { status, message } = res.data;
        if (status == 0) {
          this.$message({
            type: "success",
            message
          });
          setTimeout(() => {
            this.$router.push("/admin/category-list");
          }, 1000);
        } else {
          this.$message({
            type: "warning",
            message
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.tips {
  font-size: 12px;
  color: #999;
  vertical-align: middle;
  margin: 0 10px;
}
</style>
