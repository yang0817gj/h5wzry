import axios from 'axios'
const http = axios.create({
    // baseURL: 'http://localhost:3000/web/api'
    baseURL: process.env.VUE_APP_API_URL || '/web/api'
})


export default http