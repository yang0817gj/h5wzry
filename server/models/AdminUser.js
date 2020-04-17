const mongoose = require('mongoose')

const schema = new mongoose.Schema({
        username: { type: String },
        password: {
            type: String,
            select: false, // 不被查出来
            set(val) {
                return require('bcryptjs').hashSync(val, 10)
            }
        }
    })
    /**
     * bcryptjs 加密  一般用12 -10  密码散列操作
     * 散列过后的数据不要再被散列 会成错误数据
     * 设置select 数据就不会被查出来
     */
module.exports = mongoose.model('AdminUser', schema)