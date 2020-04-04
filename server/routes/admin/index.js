module.exports = (app) => {
    const express = require('express')
    const router = express.Router() // 创建express 的子路由, 分模块存储接口
    const Category = require('../../models/Category')
    router.post('/categories', async(req, res) => {
        const model = await Category.create(req.body) // 往mongoodb添加数据
        res.send(model)
    })
    router.get('/categories', async(req, res) => {
        const items = await Category.find().populate('parent').limit(10) // find 相当于select  进行查询操作 populate 查找绑定对象
        res.send(items)
    })
    router.get('/categories/:id', async(req, res) => {
        const model = await Category.findById(req.params.id) // find 相当于select  进行查询操作
        res.send(model)
    })
    router.put('/categories/:id', async(req, res) => {
        const model = await Category.findByIdAndUpdate(req.params.id, req.body) // find 相当于select  进行查询操作
        res.send({ msg: '修改成功' })
    })
    router.delete('/categories/:id', async(req, res) => {
        await Category.findByIdAndDelete(req.params.id) // find 相当于select  进行查询操作
        res.send({ msg: '删除成功' })
    })
    app.use('/admin/api', router)
}