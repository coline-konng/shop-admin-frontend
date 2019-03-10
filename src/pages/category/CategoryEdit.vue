<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px">
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
        <el-button type="primary" @click="onSubmit">保存</el-button>
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
      form: {
        title: "",
        category_id: "",
        sort_id: "",
        class_layer: ""
      }
    };
  },
  mounted() {
    // 请求当前分类数据
    const { id } = this.$route.params;
    this.$axios({
      url: `/admin/category/getcategorymodel/${id}`
    }).then(res => {
      //console.log(res);
      const { message, status } = res.data;
      if (status == 0) {
        //this.defaultId.push(message[0].channel_id),
        this.form = message[0];
      }
    });
  },
  methods: {
    //获取选择的父级分类的id
    handleChange(data) {
      //console.log(data);
      this.form.category_id = data[data.length - 1];
    },
    //保存
    onSubmit() {
      console.log(this.form);
      this.$axios({
        method: "POST",
        url: `/admin/category/edit/${this.form.id}`,
        data: this.form,
        withCredentials: true,
      }).then(res => {
        //console.log(res);
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
