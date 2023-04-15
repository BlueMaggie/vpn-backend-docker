const router = require('koa-router')()
const userController=require('../../../controller/user')
const Identify=require('../../../middleware/identify')
const FormatCheck=require('../../../middleware/format_check')
router.prefix('/api/v1/user')

router.post('/get_captcha',
    FormatCheck.reqCaptchaParamCheck,
    Identify.userIdentify,
    userController.sendCaptcha
)
router.get('/notice',
    Identify.jwtTokenIdentify,
    Identify.clientIdentify,
    userController.repNotice
)
router.get('/public_notice',
    Identify.jwtTokenIdentify,
    Identify.clientIdentify,
    userController.repPublicNotice
)
router.patch('/bind',
    FormatCheck.wxBindFormCheck,
    Identify.userIdentify,
    Identify.captchaIdentify,
    Identify.codeIdentify,
    userController.wxBindWithEmail
)
router.get('/:id/info',
    Identify.jwtTokenIdentify,
    Identify.clientIdentify,
    userController.queryInfo
)
router.get('/self',
    Identify.jwtTokenIdentify,
    Identify.clientIdentify,
    userController.querySelf
)
module.exports = router