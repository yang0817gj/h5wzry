const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
app.use(cors()) // 引入cors 解决跨域问题
app.use(express.json())



app.listen(3000, () => console.log('http://localhost:3000'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
    // app.use('/uploads', (req, res, next) => {
    //     console.log(req)
    //     next()
    // })
require('./routes/admin')(app)
require('./plugins/db')(app)
require('./routes/upload')(app)