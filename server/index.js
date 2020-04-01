const express = require('express')

const app = express()
const cors = require('cors')
app.use(cors()) // 引入cors 解决跨域问题
app.use(express.json())



app.listen(3000, () => console.log('http://localhost:3000'))
require('./routes/admin')(app)
require('./plugins/db')(app)