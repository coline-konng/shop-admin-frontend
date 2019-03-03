import Vue from 'vue'
import App from './App.vue'
// 引入element-ui
import ElementUI from 'element-ui';
// 引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';
// 注册element-ui
Vue.use(ElementUI);
// 引入axios
import axios from 'axios';
// 把axios绑定到vue实例的属性$axios
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')