module.exports={
    paramFormatError: {
        code: 10001,
        message: '参数格式错误',
        result: null,
    },
    ///用户注册系
    userMailExist: {
        code: 10003,
        message: '该邮箱已被注册',
        result: null,
    },
    userRegisterError: {
        code: 10004,
        message: '用户注册失败,账户已存在',
        result: null,
    },
    ///用户登录系
    userIsNotExist: {
        code: 10005,
        message: '用户不存在',
        result: null,
    },
    userVerificationError: {
        code: 10006,
        message: '验证码错误',
        result: null,
    },
    userLoginError: {
        code: 10007,
        message: '用户登录失败',
        result: null,
    },
    ///用户角色权限系
    hasNotAdminPermission: {
        code: 10009,
        message: '操作权限不够',
        result: null,
    },
    ///验证码系
    verificationError:{
        code: 10010,
        message: '验证码错误',
        result: null,
    },
    verificationExpired:{
        code: 10011,
        message: '验码已过期',
        result: null,
    },
    getVerificationError:{
        code: 10012,
        message: '请勿频繁地获取验证码,请稍后再试',
        result: null,
    },
    clientsPoolFull:{
        code:10013,
        message:'设备未登录',
        result:null,
    },
    ///接口使用验证系
    authTokenError:{
        code:10014,
        message:'用户身份信息过期',
        result:null,
    },
    //用户删除失败
    deleteUserFail:{
        code:10014,
        message:'删除用户失败',
        result:null,
    },
    //useragent参数未知
    useragentUnknow:{
        code:10015,
        message:'未知客户端',
        result:null,
    },
    //获取clashlink失败
    getClashLinkError:{
        code:10016,
        message:"获取clash链接失败，请稍后再试!",
        result:null
    },
    //参数校验失败
    paramFormatError:{
        code:10017,
        message:"参数格式不正确",
        result:null
    },
    someApiOfWxError:{
        code:10018,
        message:"验证code时出错",
        result:null
    },
    wxSettingsError:{
        code:10019,
        message:"小程序接口配置错误",
        result:null
    },
    wxNotBindError:{
        code:10020,
        message:"该微信用户未绑定邮箱",
        result:null
    }
}