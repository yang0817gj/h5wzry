module.exports = (app) => {
    const assert = require('http-assert')
    app.post('/admin/api/login', async(req, res) => {
        const { username, password } = req.body

        // 1. 根据用用户名找用户

        const AdminUser = require('../../models/AdminUser')
        const user = await AdminUser.findOne({ username }).select('+password')
        assert(user, 422, '用户不存在')

        // 2. 效验密码

        const isVaild = require('bcryptjs').compareSync(password, user.password)
        assert(isVaild, 422, '用户不存在')

        // 3. 返回token

        const jwt = require('jsonwebtoken')
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token })

    })


}

/**
 * app.get('secret') 只能有一个参数  表示获取配置
 * jwt.sign()  签名 生成token 
 * 第一个参数 要加密的数据 用对象最好
 * 第二个参数  密钥 生成token时候 给的密钥 根据特殊算法 生成token
 * 密钥不要定义在这里  应该是全局的变量 或者放在环境中
 */