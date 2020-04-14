const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: { type: String },
    avater: { type: String },
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    scores: { // 符合类型  //  评分
        difficult: { type: Number },
        skills: { type: Number },
        attack: { type: Number },
        survive: { type: Number },
    },
    skills: [{ // 技能
        icon: { type: String },
        name: { type: String },
        description: { type: String },
        tips: { type: String }
    }],
    items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }], // 顺风出装
    items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }], // 逆风
    usageTips: { type: String }, // 使用技巧
    battleTips: { type: String }, // 对抗技巧
    teamTips: { type: String }, // 团战思路
    partners: [{ // 最佳搭档
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
        description: { type: String }
    }]
})

module.exports = mongoose.model('Hero', schema)
    /**
     * type: mongoose.SchemaTypes.ObjectId  指定数据类型是id populate
     * 查询对象时，对象中存在其他对象的引用，查询出来的引用对象默认是显示引用对象的id，如果需要引用对象的其他属性就需要使用populate方法填充引用对象。
     * ref: 'Item'  指定用谁的id
     */