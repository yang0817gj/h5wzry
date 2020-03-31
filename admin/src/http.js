import axios from 'axios'

const http = axios.create({
    baseURL = 'htpp://localhost:8080/admin/api'
})

export default http