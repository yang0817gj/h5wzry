module.exports = (app) => {
    const router = require('express').Router()
    const mongoose = require('mongoose')
    const Article = mongoose.model('Article')
    const Category = mongoose.model('Category')
    const Hero = mongoose.model('Hero')

    // 初始化新闻列表数据
    router.get('/news/init', async (req, res) => {
        const parent = await Category.findOne({
            name: '新闻资讯'
        })
        const cats = await Category.find().where({
            parent: parent
        })
        const newsTitle = ["王者荣耀×谭盾丨五虎定制交响乐，用传统乐器复原中国声韵", "王者英雄导航来啦!", "新皮肤爆料丨龙战于野，迅疾如风，赵云新装登场！", "跨系统角色转移限量测试开启公告", "新皮肤爆料丨活动免费兑换！【盾山-圆桌骑士】新装登场", "挑战绝悟活动暂时关闭入口扩容说明", "5月1日全服不停机更新公告", "5月2日跨系统角色转移测试公告", "多模式无法匹配异常问题说明公告", "短时间内充值未到账的异常说明公告", "神秘商店开启公告", "点亮守护星·抽内测皮肤 百万内测皮肤大放送", "【五五集结领豪礼】活动开启公告", "与我为伍，彼此守护，五五开黑节多重福利就绪", "2020亲密度昵称升级投票结果公告", "【原创内容大赛音乐比赛】优秀作品合集（二）", "大众赛事合作赛道全面开启，携手合作伙伴共建王者电竞生态", "【KPL今日预报】南京Hero久竞 vs DYG，DYG.久诚迎战老东家能否取胜", "关于责成TS俱乐部就欠薪问题进行说明的通知", "《一招即浪》第二期：逆天牛魔王最浪打法，城市赛教你一招制敌"]
        const newsList = newsTitle.map(el => {
            const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
            return {
                categories: randomCats.slice(0, 2),
                title: el
            }
        })
        await Article.deleteMany()
        await Article.insertMany(newsList)
        res.send(newsList)
    })

    // 查看新闻列表数据
    router.get('/news/list', async (req, res) => {
        const parent = await Category.findOne({
            name: '新闻资讯'
        })
        // mongodb 聚合查询
        const cats = await Category.aggregate([
            // $match 用于过滤数据，只输出符合条件的文档
            {
                $match: { parent: parent._id }
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
                    newList: { $slice: ['$newList', 5] }
                }
            }
        ])
        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '热门',
            newList: await Article.find().where({
                categories: { $in: subCats }
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

    // 初始化英雄数据
    router.get('/heroes/init', async (req, res) => {
        await Hero.deleteMany({})
        const rawData = [
            {
                "name": "热门",
                "heroes": [{ "name": "", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg" }, { "name": "", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg" }, { "name": "", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg" }, { "name": "", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg" }, { "name": "", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" }, { "name": "", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg" }, { "name": "", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg" }, { "name": "", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg" }, { "name": "", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg" }, { "name": "", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg" }]
            },
            {
                "name": "战士",
                "heroes": [{ "name": "赵云", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg" }, { "name": "墨子", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg" }, { "name": "钟无艳", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg" }, { "name": "吕布", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg" }, { "name": "夏侯惇", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg" }, { "name": "曹操", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg" }, { "name": "典韦", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg" }, { "name": "宫本武藏", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg" }, { "name": "达摩", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg" }, { "name": "老夫子", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg" }, { "name": "关羽", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg" }, { "name": "程咬金", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg" }, { "name": "露娜", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg" }, { "name": "花木兰", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg" }, { "name": "橘右京", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg" }, { "name": "亚瑟", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" }, { "name": "孙悟空", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg" }, { "name": "刘备", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg" }, { "name": "钟馗", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg" }, { "name": "杨戬", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg" }, { "name": "雅典娜", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg" }, { "name": "哪吒", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg" }, { "name": "铠", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg" }, { "name": "苏烈", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg" }, { "name": "裴擒虎", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg" }, { "name": "狂铁", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg" }, { "name": "孙策", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg" }, { "name": "李信", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg" }, { "name": "盘古", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg" }, { "name": "云中君", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg" }, { "name": "曜", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg" }, { "name": "马超", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg" }]
            },

            {
                "name": "法师",
                "heroes": [{ "name": "小乔", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg" }, { "name": "墨子", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg" }, { "name": "妲己", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg" }, { "name": "嬴政", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg" }, { "name": "高渐离", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg" }, { "name": "孙膑", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg" }, { "name": "扁鹊", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg" }, { "name": "芈月", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg" }, { "name": "周瑜", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg" }, { "name": "甄姬", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg" }, { "name": "武则天", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg" }, { "name": "貂蝉", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg" }, { "name": "安琪拉", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg" }, { "name": "露娜", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg" }, { "name": "姜子牙", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg" }, { "name": "王昭君", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg" }, { "name": "张良", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg" }, { "name": "不知火舞", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg" }, { "name": "钟馗", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg" }, { "name": "诸葛亮", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg" }, { "name": "干将莫邪", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg" }, { "name": "女娲", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg" }, { "name": "杨玉环", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg" }, { "name": "弈星", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg" }, { "name": "米莱狄", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg" }, { "name": "司马懿", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg" }, { "name": "沈梦溪", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg" }, { "name": "上官婉儿", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg" }, { "name": "嫦娥", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg" }, { "name": "西施", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/523/523.jpg" }]
            },
            {
                "name": "坦克",
                "heroes": [{ "name": "廉颇", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg" }, { "name": "庄周", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg" }, { "name": "刘禅", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg" }, { "name": "钟无艳", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg" }, { "name": "白起", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg" }, { "name": "芈月", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg" }, { "name": "吕布", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg" }, { "name": "夏侯惇", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg" }, { "name": "达摩", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg" }, { "name": "项羽", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg" }, { "name": "程咬金", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg" }, { "name": "刘邦", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg" }, { "name": "亚瑟", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" }, { "name": "牛魔", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg" }, { "name": "张飞", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg" }, { "name": "太乙真人", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg" }, { "name": "东皇太一", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg" }, { "name": "铠", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg" }, { "name": "苏烈", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg" }, { "name": "梦奇", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg" }, { "name": "孙策", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg" }, { "name": "嫦娥", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg" }, { "name": "猪八戒", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg" }]
            },
            {
                "name": "刺客",
                "heroes": [{ "name": "赵云", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg" }, { "name": "阿轲", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg" }, { "name": "李白", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg" }, { "name": "貂蝉", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg" }, { "name": "韩信", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg" }, { "name": "兰陵王", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg" }, { "name": "花木兰", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg" }, { "name": "不知火舞", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg" }, { "name": "娜可露露", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg" }, { "name": "橘右京", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg" }, { "name": "孙悟空", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg" }, { "name": "百里守约", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg" }, { "name": "百里玄策", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg" }, { "name": "裴擒虎", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg" }, { "name": "元歌", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg" }, { "name": "司马懿", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg" }, { "name": "上官婉儿", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg" }, { "name": "云中君", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg" }, { "name": "马超", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg" }, { "name": "镜", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/531/531.jpg" }]
            },
            {
                "name": "射手",
                "heroes": [{ "name": "孙尚香", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg" }, { "name": "鲁班七号", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg" }, { "name": "马可波罗", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg" }, { "name": "狄仁杰", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg" }, { "name": "后羿", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg" }, { "name": "李元芳", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg" }, { "name": "虞姬", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg" }, { "name": "成吉思汗", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg" }, { "name": "黄忠", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg" }, { "name": "百里守约", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg" }, { "name": "公孙离", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg" }, { "name": "伽罗", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg" }, { "name": "蒙犽", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/524/524.jpg" }]
            },
            {
                "name": "辅助",
                "heroes": [{ "name": "庄周", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg" }, { "name": "刘禅", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg" }, { "name": "孙膑", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg" }, { "name": "姜子牙", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg" }, { "name": "牛魔", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg" }, { "name": "张飞", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg" }, { "name": "蔡文姬", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg" }, { "name": "太乙真人", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg" }, { "name": "大乔", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg" }, { "name": "鬼谷子", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg" }, { "name": "明世隐", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg" }, { "name": "杨玉环", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg" }, { "name": "盾山", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg" }, { "name": "瑶", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg" }, { "name": "鲁班大师", "avater": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/525/525.jpg" }]
            }
        ]
        for (let cat of rawData) {
            if (cat.name == '热门') {
                continue
            }
            const category = await  Category.findOne({
                name: cat.name
            })
            // console.log(category.name)
            cat.heroes = cat.heroes.map(v => {
                v.categories = [category._id]
                return v
            })
            // 录入英雄
            await Hero.insertMany(cat.heroes)
        }
        
        res.send(await Hero.find())

    })

    // 查看英雄分类数据
    router.get('/heroes/list', async (req, res) => {
        const parent = await Category.findOne({
            name: '英雄分类'
        })
        // mongodb 聚合查询
        const cats = await Category.aggregate([
            // $match 用于过滤数据，只输出符合条件的文档
            {
                $match: { parent: parent._id }
            },
            {
                $lookup: {
                    from: 'heroes',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'heroList'
                }
            },
        ])
        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '热门',
            heroList: await Hero.find().where({
                categories: { $in: subCats }
            }).limit(10).lean()
        })
        res.send(cats)
    })
    app.use('/web/api', router)
}