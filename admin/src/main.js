import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
import http from './http.js';
Vue.prototype.$http = http
Vue.use(ElementUI);

Vue.mixin({
    methods: {
        uploadsHeaders() {
            return { Authorization: 'Bearer ' + (localStorage.token || '') }
        }
    }
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')