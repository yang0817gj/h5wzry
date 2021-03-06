import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Main.vue'
Vue.use(VueRouter)
const routes = [{
        path: '/login',
        component: () =>
            import ('@/views/Login.vue'),
        meta: {
            isPublic: true
        }
    }, {
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
            },
            {
                path: '/heros/edit',
                name: 'herosEdit',
                component: () =>
                    import ('@/views/HeroEdit.vue')
            },
            {
                path: '/heros/list',
                name: 'herosList',
                component: () =>
                    import ('@/views/HeroList.vue')
            },
            {
                path: '/heros/edit/:id',
                name: 'herosEdit',
                props: true, // 在页面中可以 props 拿到动态参数
                component: () =>
                    import ('@/views/HeroEdit.vue')
            },
            {
                path: '/articles/edit',
                name: 'articlesEdit',
                component: () =>
                    import ('@/views/ArticleEdit.vue')
            },
            {
                path: '/articles/list',
                name: 'articlesList',
                component: () =>
                    import ('@/views/ArticleList.vue')
            },
            {
                path: '/articles/edit/:id',
                name: 'articlesEdit',
                props: true, // 在页面中可以 props 拿到动态参数
                component: () =>
                    import ('@/views/ArticleEdit.vue')
            },
            {
                path: '/ads/edit',
                name: 'adsEdit',
                component: () =>
                    import ('@/views/AdEdit.vue')
            },
            {
                path: '/ads/list',
                name: 'adsList',
                component: () =>
                    import ('@/views/AdList.vue')
            },
            {
                path: '/ads/edit/:id',
                name: 'adsEdit',
                props: true, // 在页面中可以 props 拿到动态参数
                component: () =>
                    import ('@/views/AdEdit.vue')
            },
            {
                path: '/admin_users/edit',
                component: () =>
                    import ('@/views/AdminUserEdit.vue')
            },
            {
                path: '/admin_users/list',
                component: () =>
                    import ('@/views/AdminUserList.vue')
            },
            {
                path: '/admin_users/edit/:id',
                props: true, // 在页面中可以 props 拿到动态参数
                component: () =>
                    import ('@/views/AdminUserEdit.vue')
            },
            {
                path: '/fileUploads',
                props: true, // 在页面中可以 props 拿到动态参数
                component: () =>
                    import ('@/views/FileUploads.vue')
            }
        ]
    },


]

const router = new VueRouter({
    routes
})


router.beforeEach((to, from, next) => {
    console.log(to);
    if (!to.meta.isPublic && !localStorage.token) {
        return next({ path: '/login' })
    }
    next()
})

export default router