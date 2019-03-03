import Vue from 'vue'
import App from './App.vue'
// 引入element-ui
import ElementUI from 'element-ui';
// 引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';

// 引入路由模块
import VueRouter from "vue-router";

// 引入axios
import axios from 'axios';

//导入组件
import Login from './pages/Login.vue';
import Admin from './pages/Admin.vue';

// 把axios绑定到vue实例的属性$axios
Vue.prototype.$axios = axios;

// 注册element-ui
Vue.use(ElementUI);
// 注册路由插件
Vue.use(VueRouter);

// 配置路由
const routes = [
    { path: '/', redirect: '/admin' },
    { path: '/login', component: Login, meta: '登录页' },
    { path: '/admin', component: Admin, meta: '首页' }
];
//创建路由对象
const router = new VueRouter({ routes });

Vue.config.productionTip = false;

//配置路由


new Vue({
    render: h => h(App),
    router,
}).$mount('#app')