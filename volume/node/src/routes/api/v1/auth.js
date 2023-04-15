const router = require('koa-router')()
const UserController=require('../../../controller/user')
const FormatCheck=require('../../../middleware/format_check')
const Identify=require('../../../middleware/identify')
const ClientsController=require('../../../controller/clients')
router.prefix('/api/v1/auth')

router.post('/login',
    FormatCheck.loginParamCheck,
    Identify.userIdentify,
    Identify.captchaIdentify,
    UserController.login,
    ClientsController.commitNewClient,
)
router.post('/wx_login',
    FormatCheck.wxLoginParamCheck,
    Identify.codeIdentify,
    Identify.wxUserIdentify,
    UserController.login,
    ClientsController.commitNewClient,
)

router.delete('/logout',
    Identify.jwtTokenIdentify,
    Identify.clientIdentify,
    UserController.logout
)
module.exports = router