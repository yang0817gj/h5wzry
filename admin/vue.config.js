module.exports = {
    lintOnSave: false,
    devServer: {
        overlay: {
            warning: false,
            errors: false
        },
    },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/admin/'
    : '/',
    outputDir: __dirname + '/../server/admin', // 表示生产到那个文件夹， 默认是dist
}