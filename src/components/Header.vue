<template>
    <el-row type="flex" justify="space-between" align="middle" class="header">
        <i class="el-icon-back" @click="handleChange"></i>
        <div>admin</div>
    </el-row>
</template>

<script>
export default {
    methods:{
        handleChange(){
            this.$emit("onchange");
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
