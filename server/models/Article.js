const mongoose = require('mongoose')
const Category = require('./Category')
const schema = new mongoose.Schema({
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: Category }], // 上级分类 可能回事多级
    body: { type: String }// 详情

}, {
    timestamps: true
})

/**
 * type: mongoose.SchemaTypes.ObjectId  指定数据类型是id populate
 * 查询对象时，对象中存在其他对象的引用，查询出来的引用对象默认是显示引用对象的id，如果需要引用对象的其他属性就需要使用populate方法填充引用对象。
 * ref: 'Category'  指定用谁的id
 * 
 * 查询的时候这样使用
 * Article.find().where({
        categories: { $in : subCats }
    }).populate('categories').limit(5).lean()
 */

module.exports = mongoose.model('Article', schema)