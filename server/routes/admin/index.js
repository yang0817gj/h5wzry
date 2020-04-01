module.exports = (app) => {
    const express = require('express')
    const router = express.Router() // 创建express 的子路由
    const Category = require('../../models/Category')
    router.post('/categories', async(req, res) => {
        const model = await Category.create(req.body) // 往mongoodb添加数据
        res.send(model)
    })
    router.get('/categories', async(req, res) => {
        const items = await Category.find().limit(10)
        res.send(items)
    })
    app.use('/admin/api', router)
}