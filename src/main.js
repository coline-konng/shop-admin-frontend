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
// 引入store
import store from "./store";

//导入组件
import Login from './pages/Login.vue';
import Admin from './pages/Admin.vue';
import GoodsList from './pages/goods/GoodsList.vue';
import CategoryList from './pages/category/CategoryList.vue';
import GoodsAdd from './pages/goods/GoodsAdd.vue';
import GoodsEdit from './pages/goods/GoodsEdit.vue';
import CategoryAdd from './pages/category/CategoryAdd.vue';
import CategoryEdit from './pages/category/CategoryEdit.vue';
//
axios.defaults.baseURL = 'http://127.0.0.1:8899';
// 把axios绑定到vue实例的属性$axios
Vue.prototype.$axios = axios;

// 注册element-ui
Vue.use(ElementUI);
// 注册路由插件
Vue.use(VueRouter);

// 配置路由
const routes = [{
        path: '/',
        redirect: '/admin'
    },
    {
        path: '/login',
        component: Login,
        meta: '登录页'
    },
    {
        path: '/admin',
        component: Admin,
        meta: '首页',
        redirect: '/admin/goods-list',
        children: [{
                path: 'goods-list',
                component: GoodsList,
                meta: '商品管理'
            },
            {
                path: 'goods-add',
                component: GoodsAdd,
                meta: '新增商品'
            },
            {
                path: 'goods-edit/:id',
                component: GoodsEdit,
                meta: '编辑商品'
            },
            {
                path: 'category-list',
                component: CategoryList,
                meta: '栏目管理'
            },
            {
                path: 'category-add',
                component: CategoryAdd,
                meta: '新增栏目'
            },
            {
                path: 'category-edit/:id',
                component: CategoryEdit,
                meta: '编辑栏目'
            }
        ]
    }
];
//创建路由对象
const router = new VueRouter({
    routes
});

Vue.config.productionTip = false;

//配置路由


new Vue({
    render: h => h(App),
    // 绑定store到组件，组件可以使用this.$store访问
    store,
    router,
}).$mount('#app')