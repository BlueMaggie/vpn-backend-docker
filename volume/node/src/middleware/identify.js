const jwt=require('jsonwebtoken')
const UserOp=require('../db/ops/user')
const {queryClientByUidAndCid}=require('../db/ops/clients')
const errorType=require('../constant/error_type')
const {queryCaptcha}=require('../db/ops/captcha')
const axios=require('axios')
class Identify{
    async userIdentify(ctx,next){
        let {email}=ctx.request.body
        let res =await UserOp.queryUser({email})
        if(res==null){
            ctx.app.emit('error', errorType.userIsNotExist, ctx)
            return 
        }else{
            ctx.userInfo=res
        }
        await next()
    }
    async wxUserIdentify(ctx,next){
        let {code}=ctx.request.body
        //code->phone number -> query user
        await next()
    }
    async captchaIdentify(ctx,next){
        let {captcha}=ctx.request.body
        let {id}=ctx.userInfo
        let res=await queryCaptcha({uid:id,code:captcha})
        console.log(res)
        if(res==null){
            ctx.app.emit('error',errorType.verificationError,ctx)
            return 
        }else{
            let now=(new Date()).getTime()
            if(now-(new Date(res.created_time))>1000*60*5){
                ctx.app.emit('error',errorType.verificationExpired,ctx)
                return  
            }
        }
        await next()
    }
    async jwtTokenIdentify(ctx,next){
        let auth=ctx.request.headers.authorization
        if(auth==undefined||auth==null){
            ctx.app.emit('error',errorType.authTokenError,ctx)
            return 
        }
        let token=auth.replace(/Bearer /g,'')
        try{
            let {id,cid}= jwt.verify(token,process.env.JWT_SECRET)//email or phone
            let res=await UserOp.queryUser({id})//从数据库里面查询最新用户信息
            if(res==null){
                ctx.app.emit('error',errorType.userIsNotExist,ctx)
                return
            }else{
                ctx.userInfo=res
                ctx.userInfo.cid=cid
            }
        }catch(e){
            ctx.app.emit('error',errorType.authTokenError,ctx)
            return 
        }
        await next()
    }
    async roleIdentify(ctx,next){
        let {role} =ctx.userInfo
        if(role==3){
            ctx.app.emit('error',errorType.hasNotAdminPermission,ctx)
            return 
        }
        await next()
    }
    async sRoleIdentify(ctx,next){
        let {role} =ctx.userInfo
        if(role>1){
            ctx.app.emit('error',errorType.hasNotAdminPermission,ctx)
            return 
        }
        await next()
    }
    async clientIdentify(ctx,next){
        let {cid,id}=ctx.userInfo
        let res=await queryClientByUidAndCid(id,cid)
        if(res==null){//用户设备数达到最大上限
            ctx.app.emit('error',errorType.clientsPoolFull,ctx)
            return
        }
        await next()
    }
    async codeIdentify(ctx,next){ //for wx code check
        let appid=global.WEB_CONFIG.get("WX_APPID")
        let secret=global.WEB_CONFIG.get("WX_APPSECRET")
        if(appid==''||secret==''){
            return ctx.app.emit('error',errorType.wxSettingsError,ctx)
        }
        let code=ctx.request.body.code
        let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
        let msg= await axios.get(url)
        console.log(msg.data)
        if(msg.data.openid==undefined){
            let errmsg=errorType.someApiOfWxError
            errmsg.result=msg.data.errmsg
            return ctx.app.emit('error',errmsg,ctx)
        }
        ctx.wxInfo={}
        ctx.wxInfo.openid=msg.data.openid
        await next()
    }
    async wxUserIdentify(ctx,next){               //
        let openid=ctx.wxInfo.openid
        let user=await UserOp.queryUser({openid})
        if(user==null){
            return ctx.app.emit('error',errorType.wxNotBindError,ctx)
        }
        ctx.userInfo=user
        await next()
    }
}
module.exports=new Identify()