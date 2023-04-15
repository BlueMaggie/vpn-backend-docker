const router = require('koa-router')()
const clashController=require('../../../controller/service/clash')
const Identify=require('../../../middleware/identify')
router.prefix('/api/v1/service')

router.get('/link',
    Identify.jwtTokenIdentify,
    Identify.clientIdentify,
    clashController.getClashLink
)

router.get('/sub/:token',
    clashController.getCfgFile
)

router.get('/VipLink',
    clashController.getVipLink
)
module.exports = router