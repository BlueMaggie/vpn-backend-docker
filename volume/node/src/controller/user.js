const sendVerificationAsync=require('../utils/sendverification')
const jwt=require('jsonwebtoken')
const successType=require('../constant/success_type')
const {deleteClientByUid}=require('../db/ops/clients')
const {createCaptcha}=require('../db/ops/captcha')
const {queryNoticeByUid}=require('../db/ops/notice')
const {queryPublicNotice}=require('../db/ops/public_notice')
const UserOp=require('../db/ops/user')
const errorType = require('../constant/error_type')

class userController{
    async sendCaptcha(ctx,next){
        let {email,id}=ctx.userInfo
        let Captcha=Math.floor(Math.random()*899999)+100000
        sendVerificationAsync({service:'qq',user:'473211890@qq.com',pass:'mvvxkbqvojyocbac'},email,String(Captcha))
        createCaptcha({code:Captcha,uid:id})
        ctx.body=successType.sendCaptchaSuccess
        await next()
    }
    async login(ctx,next){
        ctx.userInfo.cid=new Date()
        let token =jwt.sign(ctx.userInfo,process.env.JWT_SECRET,{
            expiresIn:'30d'
        })
        ctx.body=successType.loginSuccess
        ctx.body.result={
            token,
            user:ctx.userInfo
        }
        await next()
    }
    async logout(ctx,next){
        let {id,cid}=ctx.userInfo
        deleteClientByUid(id,cid)
        ctx.body=successType.logoutSuccess
        await next()
    }
    async repNotice(ctx,next){
        let userid=ctx.userInfo.id
        let res=await queryNoticeByUid(userid)
        let {id,uid,...notice}=res
        ctx.body=successType.queryNoticeSuccess
        ctx.body.result=notice
        await next()
    }
    async repPublicNotice(ctx,next){
        let res=await queryPublicNotice()
        let {id,...notice}=res
        ctx.body=successType.queryPublicNoticeSuccess
        ctx.body.result=notice
        await next()
    }
    async wxBindWithEmail(ctx,next){
        let {id}=ctx.userInfo
        let openid=ctx.wxInfo.openid
        //如果改wx已经绑定了邮箱，就把改邮箱的openid清掉（解绑）
        let fakeUser=await UserOp.queryUser({openid})
        if(fakeUser!=null){
            await UserOp.updateUserById({id:fakeUser.id,openid:null})   
        }
        UserOp.updateUserById({id,openid})
        ctx.body=successType.wxBindSuccess
        await next()
    }
    async queryInfo(ctx,next){
        let {id}=ctx.params
        let user=await UserOp.queryUser({id})
        if(user==null){
            ctx.app.emit('error',errorType.userIsNotExist,ctx)
            return
        }
        let {email,role}=user
        ctx.body=successType.queryUsersSuccess
        ctx.body.result={
            email,
            role
        }
        await next()
    }
    async querySelf(ctx,next){
        let {id}=ctx.userInfo
        let user=await UserOp.queryUser({id})
        if(user==null){
            ctx.app.emit('error',errorType.userIsNotExist,ctx)
            return
        }
        ctx.body=successType.queryUserSelfSuccess
        ctx.body.result=user
        await next()
    }
    
}
module.exports=new userController()