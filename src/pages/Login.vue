<template>
  <div id="app">
    
    <div class="loginContainer">
      <h2>登录</h2>
      <el-form label-width="45px">
        <el-form-item label="账号" >
          <el-input type="text"  v-model="userform.uname"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="userform.upwd"></el-input>
        </el-form-item>
        <el-form-item class="button-list">
          <el-button type="primary" @click="getuser">提交</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data(){
    return {
        userform:{
            uname:'',
            upwd:''
        }
     
    }
  },
  methods:{
    getuser(){
        //console.log(this.userform);
        //console.log("账号："+this.userform.username,"密码："+this.userform.userpassword);
        this.$axios({
          method:"POST",
          url:'/admin/account/login',
          data:this.userform,
          // 处理跨域
          withCredentials: true,
        }).then((res)=>{
          //console.log(res);
          const {message,status}=res.data;
          if(status===0){
            //登录成功，返回上一页
            this.$router.back();
          }else{
            //登录失败，提示错误信息
            this.$message.error(message);
          }
        })
    },
    reset(){
      this.username="";
      this.userpassword="";
    }
  }
}
</script>

<style scoped lang="css">
.loginContainer{
    width: 400px;
    position:absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
}
h2{
      color: #409EFF;
      text-align: center;
      font-weight: normal;
}
.button-list{
    text-align: center;
}
</style>
