const successType=require('../constant/success_type')
const errorType=require('../constant/error_type')
const PublicNoticeOp=require('../db/ops/public_notice')
const UserOp=require('../db/ops/user')
const NoticeOp=require('../db/ops/notice')
class AdminController{
    async  revisePublicNotice(ctx,next){
        let {content}=ctx.request.body
        await PublicNoticeOp.updatePublicNotice({content})
        ctx.body=successType.revisePublicNoticeSuccess
        await next()
    }
    async addUser(ctx,next){
        let {...args}=ctx.request.body
        let {id,role}=ctx.userInfo
        //权限拦截
        console.log(ctx.userInfo,args)
        if(args.role<=role){
            return ctx.app.emit('error',errorType.hasNotAdminPermission,ctx)
        }
        let {email}=args
        args.boss=id//上级设置为请求者id
        let res=await UserOp.queryUser({email})
        if(res!=null){
            ctx.body=errorType.userMailExist
        }else{
            let user=await UserOp.createUser(args)
            await NoticeOp.createNotice({content:"",uid:user.id,updatedBy:id})
            ctx.body=successType.createUserSuccess
            ctx.body.result=user
        }
        await next()
    }
    async getUsers(ctx,next){
        let {page,pageSize}=ctx.params
        let {id,role}=ctx.userInfo
        let users
        if(role==1){
            users=await UserOp.queryAllUsers(parseInt(page),parseInt(pageSize))
        }else{
            users= await UserOp.queryAllUsersByAdminId(id,parseInt(page),parseInt(pageSize))
        }
        ctx.body=successType.queryUsersSuccess
        ctx.body.result=users
        await next()
    }
    async deleteUser(ctx,next){
        let {id,role}=ctx.userInfo
        let {targetId}=ctx.request.body
        let targetUser= await UserOp.queryUser({id:targetId,boss:id})
        if(targetUser==null){ //用户不存在
            ctx.app.emit('error',errorType.userIsNotExist,ctx)
            return 
        }else if(targetUser.role<=role){//权限不够
            ctx.app.emit('error',errorType.hasNotAdminPermission,ctx)
            return
        }else{
            UserOp.deleteUserById(targetId)
        }
        ctx.body=successType.deleteUserSuccess
        await next()
    }
    async updateUser(ctx,next){
        let userInfo=ctx.userInfo
        let {role,...options}=ctx.request.body
        let {id}=ctx.request.body
        let res
        if(userInfo.role==1){//超管
            res=await UserOp.queryUser({id})
        }else{//普通管理员
            res=await UserOp.queryUser({id,boss:userInfo.id})
        }
        if(res==null){
            return ctx.app.emit('error',errorType.userIsNotExist,ctx)
        }
        if(role<=ctx.userInfo.role){
            return ctx.emit('error',errorType.hasNotAdminPermission,ctx)
        }
        UserOp.updateUserById(options)
        ctx.body=successType.updateUserSuccess
        await next()
    }
    async getUserNotice(ctx,next){
        let userInfo=ctx.userInfo
        let uid=ctx.params.uid
        let res
        if(userInfo.role==1){//超管
            res=await NoticeOp.queryNoticeByUid(uid)
        }else{//普通管理员
            let user=await UserOp.queryUser({id:uid,boss:userInfo.id})
            if(user==null){
                return ctx.app.emit('error',errorType.userIsNotExist,ctx)
            }else {
                res=await NoticeOp.queryNoticeByUid(uid) 
            }
        }
        ctx.body=successType.queryNoticeSuccess
        ctx.body.result=res
        await next()
    }
    async updateNotice(ctx,next){
        let userInfo=ctx.userInfo
        let {uid,content}=ctx.request.body
        console.log(uid)
        let res
        if(userInfo.role==1){//超管
            res=await NoticeOp.updateNoticeByUid({uid,content,updatedBy:userInfo.id})
        }else{//普通管理员
            let user=UserOp.queryUser({id:uid,boss:userInfo.id})
            if(user==null){
                return ctx.app.emit('error',errorType.userIsNotExist,ctx)
            }else {
                res=await NoticeOp.updateNoticeByUid({uid,content,updatedBy:userInfo.id}) 
            } 
        }
        ctx.body=successType.reviseNoticeSuccess
        await next()
    }

}
module.exports=new AdminController()