module.exports = () => {
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../models/AdminUser')
    return async(req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请重新登录')
        const { id } = jwt.verify(token, req.app.get('secret'))
        assert(id, 401, '请重新登录')
        req.user = AdminUser.findById(id)
        assert(req.user, 401, '请重新登录')
        next()
    }
}