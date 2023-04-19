const router = require('koa-router')()
const AdminController=require('../../../controller/admin')
const FormatCheck=require('../../../middleware/format_check')
const Identify=require('../../../middleware/identify')
router.prefix('/api/v1/admin')

router.put('/public_notice',
    FormatCheck.revisePublicNoticeParamCheck,
    Identify.jwtTokenIdentify,
    Identify.clientIdentify,
    Identify.sRoleIdentify,
    AdminController.revisePublicNotice
)
router.post('/user',
    FormatCheck.addUserParamCheck,
    Identify.jwtTokenIdentify,
    Identify.clientIdentify,
    Identify.roleIdentify,
    AdminController.addUser
)
router.get('/users/:page/:pageSize',
    Identify.jwtTokenIdentify,
    Identify.clientIdentify,
    Identify.roleIdentify,
    AdminController.getUsers
)
router.post('/del_user',
    Identify.jwtTokenIdentify,
    Identify.clientIdentify,
    Identify.roleIdentify,
    AdminController.deleteUser
)
router.patch('/user',
    FormatCheck.updateUserParamCheck,
    Identify.jwtTokenIdentify,
    Identify.clientIdentify,
    Identify.roleIdentify,
    AdminController.updateUser
    )
router.get('/user/notice/:uid',
    Identify.jwtTokenIdentify,
    Identify.clientIdentify,
    Identify.roleIdentify,
    AdminController.getUserNotice
    )
router.put('/user/notice',
    Identify.jwtTokenIdentify,
    Identify.clientIdentify,
    Identify.roleIdentify,
    AdminController.updateNotice
    )
module.exports = router