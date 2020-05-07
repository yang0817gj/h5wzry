module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
        useNewUrlParser: true,
        useUnifiedTopology: true //这个即是报的警告
    }).then(res => {
        console.log('数据库连接成功')
    })
    require('require-all')(__dirname + '/../models')
}