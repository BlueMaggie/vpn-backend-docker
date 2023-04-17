////配置环境变量
require('dotenv').config('/.env');
require('./utils/config')
//
const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const index=require('./routes')

// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// routes
app.use(index.routes(),index.allowedMethods())

// dbinit

const dbInit=require('./db/dbSync')
dbInit()

// error-handling
app.on('error', (err, ctx) => {
  ctx.body=err
  console.error('server error', err, ctx)
});
//定时任务
const ClashController=require('./controller/service/clash')
const CaptchaController=require('./controller/captcha')
//判断是否为版本测试,如果是则不需要去自动请求link
if (global.WEB_CONFIG.get('VER_TEST')) {
  console.log("test")
  setInterval(ClashController.requestLink, 1000 * 60 * global.WEB_CONFIG.get('REQ_LINK_INTERVAL'))
  setInterval(ClashController.clearTokens, 1000 * 60 * 10)
  setInterval(CaptchaController.clearExpiredCaptcha, 1000 * 60* 10)
} else {
  setInterval(ClashController.requestLink, 1000 * 60 * global.WEB_CONFIG.get('REQ_LINK_INTERVAL'))
  setInterval(ClashController.clearTokens, 1000 * 60 * 10)
  setInterval(CaptchaController.clearExpiredCaptcha, 1000 * 60 * 10)
}

module.exports = app
