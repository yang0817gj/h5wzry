import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Main.vue'
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
            },
            {
                path: '/CategoryList',
                name: 'CategoryList',
                component: () =>
                    import ('@/views/CategoryList.vue')
            },
            {
                path: '/CategoryEdit/:id',
                name: 'CategoryEdit',
                props: true,
                component: () =>
                    import ('@/views/CategoryEdit.vue')
            },
            {
                path: '/items/edit',
                name: 'itemsEdit',
                component: () =>
                    import ('@/views/ItemEdit.vue')
            },
            {
                path: '/items/list',
                name: 'itemsList',
                component: () =>
                    import ('@/views/ItemList.vue')
            },
            {
                path: '/items/edit/:id',
                name: 'itemsEdit',
                props: true, // 在页面中可以 props 拿到动态参数
                component: () =>
                    import ('@/views/ItemEdit.vue')
            }
        ]
    },


]

const router = new VueRouter({
    routes
})

export default router