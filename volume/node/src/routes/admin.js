const router = require('koa-router')()
const getPage=require('../views/get_pages')

router.get('/SuperAdmin',async (ctx,next)=>{
    ctx.body=getPage('admin')
    ctx.set('content-type','text/html; charset=UTF-8')
    await next()
})
module.exports = router