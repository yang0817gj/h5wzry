const multer = require('multer');
const chunksBasePath = '~uploads/';
const fs = require('fs')
const storage = multer.diskStorage({
    destination: chunksBasePath,
});
const baseUpload = multer({ storage });
const upload = baseUpload.single('file');
/**
 * @name uploadMiddleware
 * @description 文件上传中间件，upload 方法调用的时候 会有 err 进行错误判断
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const uploadMiddleware = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            // 进行错误捕获
            res.json({ code: -1, msg: err.toString() });
        } else {
            next();
        }
    });
};
module.exports = (app) => {
    // 上传chunks
    app.post('/admin/api/uploads', uploadMiddleware, (req, res) => {
        // 创建chunk的目录
        // hash 是前端传递过来的
        // console.log(req.body);

        const chunkTmpDir = chunksBasePath + req.body.hash + '/';
        // 判断目录是否存在
        if (!fs.existsSync(chunkTmpDir)) fs.mkdirSync(chunkTmpDir);
        // 移动切片文件
        fs.renameSync(req.file.path, chunkTmpDir + req.body.hash);
        res.send(req.file);

    });
    // 文件分片
    app.post('/merge_chunks', (req, res) => {
        const total = req.body.total;
        const hash = req.body.hash;
        const saveDir = fileBasePath + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate() + '/';
        const savePath = saveDir + Date.now() + hash + '.' + req.body.ext;
        const chunkDir = chunkBasePath + '/' + hash + '/';
        try {
            // 创建保存的文件夹(如果不存在)
            if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir);
            // 创建文件
            fs.writeFileSync(savePath, '');
            // 读取所有的chunks 文件名存放在数组中
            const chunks = fs.readdirSync(chunkBasePath + '/' + hash);
            // 检查切片数量是否正确
            if (chunks.length !== total || chunks.length === 0) return res.send({ code: -1, msg: '切片文件数量不符合' });
            for (let i = 0; i < total; i++) {
                // 追加写入到文件中
                fs.appendFileSync(savePath, fs.readFileSync(chunkDir + hash + '-' + i));
                // 删除本次使用的chunk
                fs.unlinkSync(chunkDir + hash + '-' + i);
            }
            // 删除chunk的文件夹
            fs.rmdirSync(chunkDir);
            // 返回uploads下的路径，不返回uploads
            res.json({ code: 0, msg: '文件上传成功', data: { path: savePath.split(fileBasePath)[savePath.split(fileBasePath).length - 1] } });
        } catch (err) {
            res.json({ code: -1, msg: '出现异常,上传失败' });
        }
    });
}