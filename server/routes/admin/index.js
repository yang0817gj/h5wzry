module.exports = (app) => {
    const express = require('express')
    const router = express.Router({
            mergeParams: true // 保留来自父路由器的req.params值。如果父对象和子对象具有冲突的参数名，则以子对象的值为准。
        }) // 创建express 的子路由, 分模块存储接口
    router.post('/', async(req, res) => {
        const model = await req.model.create(req.body) // 往mongoodb添加数据
        res.send(model)
    })
    router.get('/', async(req, res) => {
        const items = await req.model.find().populate('parent').limit(10) // find 相当于select  进行查询操作 populate 查找绑定对象
        res.send(items)
    })
    router.get('/:id', async(req, res) => {
        const model = await req.model.findById(req.params.id) // find 相当于select  进行查询操作
        res.send(model)
    })
    router.put('/:id', async(req, res) => {
        const model = await req.model.findByIdAndUpdate(req.params.id, req.body) // find 相当于select  进行查询操作
        res.send({ msg: '修改成功' })
    })
    router.delete('/:id', async(req, res) => {
            await req.model.findByIdAndDelete(req.params.id) // find 相当于select  进行查询操作
            res.send({ msg: '删除成功' })
        })
        /**
         * 使用 rest 防止接口冲突 加上私有前缀
         *  /:resourse 绑定动态名称  
         */
    app.use('/admin/api/rest/:resourse', (req, res, next) => {
        const MODEL_NAME = require('inflection').classify(req.params.resourse)
            // const model = require(`../../models/${MODEL_NAME}`);
            // 为什么不使用 const   router 会访问不到model 所以挂载到req上
        req.model = require(`../../models/${MODEL_NAME}`);
        next()
    }, router)
}

/**
 * 共享接口 CRUD
 * 假如 有两个模板 功能都是增删改查 接口都是相似的操作 就可以使用共享接口
 * app.use('/admin/api/rest/:resourse', router)
 * 需要自己加一个 rest 防止接口冲突
 * 后面是动态的参数  也就是自己的模型名 数据库表名 == 接口名
 * req.params.resourse  可以拿到动态参数 也就是表名  resourse 是自己定义的 也可以是别的
 * 然后 在接口里面 引入参数对应的模型名  
 * inflection   inflection.classify( 'message_bus_properties' );//=== 'MessageBusProperty'  会把单词 复数 转换成 单数
 */