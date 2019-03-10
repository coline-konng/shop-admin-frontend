<template>
    <el-row type="flex" justify="space-between" align="middle" class="header">
        <i class="el-icon-back" @click="handleChange"></i>
        <div>
            {{username}}{{identity}}
            <a href="javascript:;" @click="handleLogout">退出</a>
        </div>
    </el-row>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed:{
        //mapState可以订阅store中数据，第一个参数user是命令空间
        ...mapState('user',{
            username:'username',
            identity:'identity'
        })
    },
    methods:{
        handleChange(){
            this.$emit("onchange");
        },
        handleLogout(){
            //点击退出
            //1.清空用户信息（state和本地储存中的）2.跳转到登录页
            this.$store.dispatch('user/logout',()=>{
              this.$router.push('/login');
            })
            
        }
    }
}
</script>

<style scoped>
    .header{
        height: 60px;
    }
    .el-icon-back{
        cursor: pointer;
    }
</style>
