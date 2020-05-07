module.exports = (app) => {
    const router = require('express').Router()
    const mongoose = require('mongoose')
    const Article = mongoose.model('Article')
    const Category = mongoose.model('Category')
    router.get('/news/init', async(req, res) => {
        const parent = await Category.findOne({
            name: '新闻资讯'
        })
        const cats = await Category.find().where({
            parent: parent
        })
        const newsTitle = ["王者荣耀×谭盾丨五虎定制交响乐，用传统乐器复原中国声韵", "王者英雄导航来啦!", "新皮肤爆料丨龙战于野，迅疾如风，赵云新装登场！", "跨系统角色转移限量测试开启公告", "新皮肤爆料丨活动免费兑换！【盾山-圆桌骑士】新装登场", "挑战绝悟活动暂时关闭入口扩容说明", "5月1日全服不停机更新公告", "5月2日跨系统角色转移测试公告", "多模式无法匹配异常问题说明公告", "短时间内充值未到账的异常说明公告", "神秘商店开启公告", "点亮守护星·抽内测皮肤 百万内测皮肤大放送", "【五五集结领豪礼】活动开启公告", "与我为伍，彼此守护，五五开黑节多重福利就绪", "2020亲密度昵称升级投票结果公告", "【原创内容大赛音乐比赛】优秀作品合集（二）", "大众赛事合作赛道全面开启，携手合作伙伴共建王者电竞生态", "【KPL今日预报】南京Hero久竞 vs DYG，DYG.久诚迎战老东家能否取胜", "关于责成TS俱乐部就欠薪问题进行说明的通知", "《一招即浪》第二期：逆天牛魔王最浪打法，城市赛教你一招制敌"]
        const newsList = newsTitle.map(el => {
            const randomCats = cats.slice(0).sort((a,b) => Math.random() - 0.5 )
            return {
                categories: randomCats.slice(0,2),
                title: el
            }
        })
        await Article.deleteMany()
        await Article.insertMany(newsList)
        res.send(newsList)
    })
    router.get('/news/list', async (req, res) => {
        const parent = await Category.findOne({
            name: '新闻资讯'
        })
        // mongodb 聚合查询
        const cats = await Category.aggregate([
            // $match 用于过滤数据，只输出符合条件的文档
            {
                $match: {parent: parent._id}
            },
            {
                $lookup: {
                    from: 'articles',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'newList'
                }
            },
            {
                $addFields: {
                    newList: { $slice: ['$newList',5]}
                }
            }
        ])
        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '热门',
            newList: await Article.find().where({
                categories: { $in : subCats }
            }).populate('categories').limit(5).lean()
        })
        cats.map(cat => {
            cat.newList.map(news => {
                news.categroyName = (cat.name == '热门') ? news.categories[0].name : cat.name
                return news
            })
            return cat
        })
        res.send(cats)
    })
    app.use('/web/api', router)
}