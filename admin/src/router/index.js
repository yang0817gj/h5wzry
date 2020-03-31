import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Main.vue'
// import CategoryEdit from '../views/CategoryEdit.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        children: [{
            path: '/CategoryEdit',
            name: 'CategoryEdit',
            component: () =>
                import ('@/views/CategoryEdit.vue')
        }]
    },


]

const router = new VueRouter({
    routes
})

export default router