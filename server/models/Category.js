const mongoose = require('mongoose')

const schema = new mongoose.Schema({
        name: { type: String },
        parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
    })
    /**
     * type: mongoose.SchemaTypes.ObjectId  指定数据类型是id populate
     * 查询对象时，对象中存在其他对象的引用，查询出来的引用对象默认是显示引用对象的id，如果需要引用对象的其他属性就需要使用populate方法填充引用对象。
     * ref: 'Category'  指定用谁的id
     */
module.exports = mongoose.model('Category', schema)