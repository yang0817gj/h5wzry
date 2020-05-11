import axios from 'axios'
import Vue from 'vue';
import router from './router'
const http = axios.create({
    // baseURL: 'http://localhost:3000/admin/api'
    baseURL: process.env.VUE_APP_API_URL || '/admin/api'
})
// baseURL 不是写死，生产环境和开发环境不一样，
// 通过 process.env.VUE_APP_自己写


// axios 请求拦截器
http.interceptors.request.use((config) => {
    // Do something before request is sent
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + (localStorage.token || '');
    }
    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});


// axios 响应拦截器
http.interceptors.response.use((res) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return res;
}, (err) => {
    if (err.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })
    }
    console.log(err.response);
    if (err.response.status === 401) {
        router.push({ path: '/login' })
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(err);
});

export default http