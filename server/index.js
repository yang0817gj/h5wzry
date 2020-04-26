const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
app.use(cors()) // 引入cors 解决跨域问题
app.use(express.json())

app.set('secret', 'a123s4das231da')

app.listen(3000, () => console.log('http://localhost:3000'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
require('./routes/admin')(app)
require('./plugins/db')(app)
require('./routes/upload')(app)
require('./routes/uploads')(app)
require('./routes/login')(app)

// assert会抛出异常 在这里要捕获异常 并给web返回异常

app.use(async(err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        message: err.message
    })
})