<template>
  <div>
    <el-row type="flex" justify="space-between" align="middle" class="toolbar">
      <div class="edit">
        <el-button @click="handleAddGood">新增</el-button>
        <el-button @click="handleDelGood(idsStr)">删除</el-button>
      </div>
      <div class="search">
        <el-input v-model="searchInput" placeholder="请输入内容" class="searchInput"></el-input>
        <el-button icon="el-icon-search" @click="handleSearch"></el-button>
      </div>
    </el-row>
    <!-- 表格部分开始 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="标题" width="300">
        <template slot-scope="scope">
          <el-row type="flex" align="middle">
            <img :src="scope.row.imgurl" width="60" class="goods-img">
            {{ scope.row.title }}
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="categoryname" label="类型" width="120"></el-table-column>
      <el-table-column label="价格">
        <!-- 自定义模板, slot-scope属性可以获取当前每一行数据，数据是一个对象，scoped.row可获取该对象-->
        <template slot-scope="scope">
          <!-- 过滤器可以用在两个地方：双花括号插值和 v-bind 表达式 (后者从 2.1.0+ 开始支持) -->
          {{ scope.row.sell_price | tofixed }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelGood(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格部分结束 -->
    <!-- 分页器部分开始 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalcount"
      class="mt20"
    ></el-pagination>
    <!-- 分页器部分开始 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        /* {
          imgurl: "https://www.baidu.com/img/bd_logo1.png",
          title: "2016-05-03",
          categoryname: "王小虎",
          sell_price: "上海市普陀区金沙江路 1518 弄"
        } */
      ],
      searchInput: "",
      pageIndex: 1,
      pageSize: 5,
      searchvalue: "",
      totalcount: 1,
      idsStr: ""
    };
  },
  mounted() {
    this.getGoodsList();
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //当选择项发生变化时会触发该事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
      //console.log(val);
      //获取需要删除的商品id
      //注意：api中需要的文章数据id格式，多个id中间用逗号分隔，例如 1,2,3
      const ids = val.map(v => {
        return v.id;
      });
      this.idsStr = ids.join(",");
      //console.log(this.idsStr);
    },
    // 获取商品列表信息
    getGoodsList() {
      this.$axios
        .get(
          `http://127.0.0.1:8899/admin/goods/getlist?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}&searchvalue=${this.searchInput}`
        )
        .then(res => {
          //console.log(res);
          //通过解构，获取商品信息
          const { data } = res;
          //将商品信息赋值给tableData
          this.tableData = data.message;
          //获取商品总条数
          this.totalcount = data.totalcount;
        });
    },
    //pageSize 改变时会触发
    handleSizeChange(pageSize) {
      //console.log(pageSize);
      //修改页容量，重新请求数据
      this.pageSize = pageSize;
      this.getGoodsList();
    },
    //currentPage 改变时会触发
    handleCurrentChange(pageIndex) {
      //console.log(pageIndex);
      //修改当前页，重新请求数据
      this.pageIndex = pageIndex;
      this.getGoodsList();
    },
    //点击新增按钮
    handleAddGood() {
      //跳转到新增商品页面
      this.$router.push("/admin/goods-add");
    },
    //点击删除商品
    handleDelGood(ids) {
      this.$axios
        .get(`http://127.0.0.1:8899/admin/goods/del/${ids}`)
        .then(res => {
          const { message, status } = res.data;
          if (status == 0) {
            //弹出消息框，提示删除成功，并重新请求数据
            this.$message({
              //elementui中的消息提示
              message: message,
              type: "success"
            });
            this.getGoodsList();
          }
        });
    },
    // 点击搜索按钮时候触发
    handleSearch() {
      // 把当前页面重置为1
      this.pageIndex = 1;
      // 重新请求数据
      this.getGoodsList();
    },
    // 点击编辑按钮时触发
    handleEdit(){
      this.$router.push('/admin/goods-edit');
    }
  },
  filters: {
    tofixed: function(data) {
      return Number(data).toFixed(2);
    }
  }
};
</script>
<style scoped>
.toolbar {
  height: 60px;
}

.goods-img {
  margin-right: 10px;
}
.searchInput{
  width: auto;
}
</style>
