<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="所属类别">
      <el-select v-model="form.category_id" placeholder="请选择">
        <el-option-group v-for="(item,index) in categories" :key="index" :label="item.title">
          <el-option
            v-for="(subitem,subindex) in item.options"
            :key="subindex"
            :label="subitem.title"
            :value="subitem.category_id"
          ></el-option>
        </el-option-group>
      </el-select>
    </el-form-item>
    <el-form-item label="是否发布">
      <el-switch v-model="form.status"></el-switch>
    </el-form-item>
    <el-form-item label="是否显示">
      <el-switch v-model="form.is_slide"></el-switch>
    </el-form-item>
    <el-form-item label="推荐类型">
      <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
      <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
    </el-form-item>
    <el-form-item label="内容标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="副标题">
      <el-input v-model="form.subtitle"></el-input>
    </el-form-item>
    <el-form-item label="封面图片">
      <el-upload
        class="avatar-uploader"
        action="http://127.0.0.1:8899/admin/article/uploadimg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="商品货号">
      <el-input v-model="form.goods_no"></el-input>
    </el-form-item>
    <el-form-item label="库存数量">
      <el-input v-model="form.stock_quantity"></el-input>
    </el-form-item>
    <el-form-item label="市场价格">
      <el-input v-model="form.market_price"></el-input>
    </el-form-item>
    <el-form-item label="销售价格">
      <el-input v-model="form.sell_price"></el-input>
    </el-form-item>
    <el-form-item label="图片相册">
      <el-upload
        action="http://127.0.0.1:8899/admin/article/uploadimg"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleFileList"
        multiple
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
    </el-form-item>

    <el-form-item label="内容摘要">
      <el-input type="textarea" v-model="form.zhaiyao"></el-input>
    </el-form-item>
    <el-form-item label="内容">
      <quillEditor v-model="form.content"></quillEditor>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// 导入富文本编辑的css文件
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

// 引入编辑器组件
import { quillEditor } from "vue-quill-editor";

export default {
  data() {
    return {
      form: {
        //封面图片
        imgList: [],
        //文章附件
        fileList: [],
        //富文本内容
        content: "",
        title: "",
        sub_title: "",
        goods_no: "",
        category_id: "",
        stock_quantity: "",
        market_price: "",
        sell_price: "",
        status: false,
        is_slide: false,
        is_top: false,
        is_hot: false,
        zhaiyao: ""
      },
      //封面图片
      imageUrl: "",
      // 图片墙的预览图片链接
      dialogImageUrl: "",
      // 是否预览图片
      dialogVisible: false,
      //类别数据
      categories: []
    };
  },
  components: {
    quillEditor
  },
  methods: {
    onSubmit() {
      //提交数据
      this.$axios({
        url: "/admin/goods/add/goods",
        method: "POST",
        data: this.form,
        // 处理跨域
        withCredentials: true
      }).then(res => {
        const { message, status } = res.data;
        if (status === 0) {
          //新增成功
          this.$message({
            message: message,
            type: "success"
          });
          //跳转到商品列表页
          setTimeout(() => {
            this.$router.push("/admin/goods-list");
          }, 1000);
        } else {
          this.$message({
            showClose: true,
            message: message,
            type: "warning"
          });
        }
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      //console.log(res);
      this.form.imgList = [res];
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //文件上传成功时的处理函数
    handleFileList(response, file, fileList) {
      //console.log(response, file, fileList);
      this.form.fileList.push(response);
      //console.log(this.form.fileList);
    }
  },
  mounted() {
    this.$axios({
      url: "/admin/category/getlist/goods",
      method: "GET"
    }).then(res => {
      //console.log(res);
      const { message } = res.data;
      let categories = [];
      message.forEach(element => {
        //查找一级菜单，直接添加到categories
        if (element.parent_id === 0) {
          element.options = [];
          categories.push(element);
        } else {
          //判断该element属于哪一个一级菜单，添加到该一级菜单的options中
          categories.forEach(item => {
            if (element.parent_id == item.category_id) {
              //将element添加到当前item.options中
              item.options.push(element);
            }
          });
        }
      });
      this.categories = categories;
      //console.log(this.categories);
    });
  }
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/* 清除富文本编辑的line-height */
.editor .el-form-item__content {
  line-height: unset;
}
</style>
