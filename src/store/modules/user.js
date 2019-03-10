// 专门存储用户的数据，和修改用户数据的方法
import axios from 'axios';
export default {
    //命令空间
    namespaced: "user",
    // 初始数据
    state: {
        username: localStorage.getItem("username") || '',
        identity: localStorage.getItem("identity") || ''
    },
    // 命令和执行
    actions: {
        //登录
        login({ commit, state }, data) {
            var p = new Promise((resolve, reject) => {
                //resolve，reject，分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。
                axios({
                    method: "POST",
                    url: '/admin/account/login',
                    data,
                    // 处理跨域
                    withCredentials: true,
                }).then((res) => {
                    //console.log(res);
                    const {
                        message,
                        status
                    } = res.data;
                    if (status === 0) {
                        // 把接口返回的值更新store下的数据
                        state.username = message.uname;
                        state.identity = message.realname;
                        //把用户信息写入本地存储,避免刷新页面时用户信息的丢失
                        localStorage.setItem("username", message.uname);
                        localStorage.setItem("identity", message.realname);
                        //登录成功，返回上一页
                    }
                    /* else {
                                           //登录失败，提示错误信息
                                           this.$message.error(message);
                                       }  */
                    //这里的业务，放在登录页面执行login命令成功后，调用执行
                    resolve(res.data);
                })
            })
            return p;
        },
        //登出
        logout({ state }, fn) {
            // 调用退出的接口
            axios({
                url: '/admin/account/logout',
                withCredentials: true
            }).then((res) => {
                //console.log(res);
                const { status, message } = res.data;
                if (status == 0) {
                    //1.清空用户信息（state和本地储存中的）
                    state.username = '';
                    state.identity = '';
                    localStorage.removeItem('username');
                    localStorage.removeItem('identity');
                    //2.跳转到登录页
                    fn();
                }
            });

        }
    }
}