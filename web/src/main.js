import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import http from './http';
Vue.prototype.$http = http
Vue.use(VueAwesomeSwiper, /* { default options with global component } */ )
Vue.config.productionTip = false
import './style/style.scss'
import './assets/iconfont/iconfont.css'
import Card from '../src/components/Card.vue';
Vue.component('m-card', Card)
import ListCard from '../src/components/ListCard.vue';
Vue.component('m-list-card', ListCard)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')