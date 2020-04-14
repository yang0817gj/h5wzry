/**
 * Express默认并不处理HTTP请求体中的数据，对于普通请求体(JSON、二进制、字符串)数据，可以使用body-parser中间件。而文件上传(multipart/form-data请求)，可以基于请求流处理，也可以使用formidable模块或Multer中间件。
 */
const multer = require('multer')
    // dest 目标地址  文件存放在哪里
const upload = multer({ dest: __dirname + '/../../uploads' })
module.exports = (app) => {
    // upload.single() 接受名称为的单个文件fieldname。单个文件将存储在中req.file。
    app.post('/admin/api/upload', upload.single('file'), async(req, res) => {
            const file = req.file
            file.url = `http://localhost:3000/uploads/${file.filename}`
            res.send(file)
        })
        // http: //localhost:3000/uploads/93b6a6e7af522ceda9e93ed788e646dc
}