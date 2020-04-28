import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */ )
Vue.config.productionTip = false
import './style/style.scss'

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')