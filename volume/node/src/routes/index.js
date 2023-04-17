const router = require('koa-router')()
const fs = require('fs')
loadRouter(__dirname)

// 载入dirname文件夹下及其所有子孙文件夹下的所有路由
function loadRouter(dirname) {
    fs.readdirSync(dirname).forEach(file => {
        if (!/^.+(\.js)$/.test(file)) {
            loadRouter(dirname + '/' + file)
        } else if (file !== 'index.js') {
            let r = require(dirname + '/' + file)
            router.use(r.routes())
        }
    })
}


module.exports = router