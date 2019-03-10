<template>
  <div id="app">
    <router-view></router-view>
  
  </div>
</template>

<script>

export default {
  name: 'app',
  mounted(){
    this.$axios({
      url:'/admin/account/islogin',
      // 处理跨域
      withCredentials: true
    }).then((res)=>{
      //console.log(res);
      //没有登录，跳转到登录页面
      if(res.data.code==='nologin'){
        this.$router.push('/login')
      }
    })
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.mt20{
  margin-top: 20px;
}
</style>
