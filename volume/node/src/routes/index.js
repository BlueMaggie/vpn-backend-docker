const router = require('koa-router')()
const fs = require('fs')
const getPage=require('../views/get_pages')
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

router.get('/',async (ctx,next)=>{
    ctx.body=getPage('index')
    ctx.set('content-type','text/html; charset=UTF-8')
    await  next()
})
router.get('/test/:page/:pageSize',async (ctx,next)=>{
    ctx.body='testing'
    await  next()
})

module.exports = router