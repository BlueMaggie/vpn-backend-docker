const joi=require('joi')
const {paramFormatError}=require('../constant/error_type')
class FormatCheck{
    async loginParamCheck(ctx, next){
        const  param  = ctx.request.body
        const schema = joi.object({
            email:joi.string().max(128).pattern(/^\w+@(\w+\.)\w+$/).required(),
            captcha:joi.number().max(999999).min(100000).required(),
        })
        try {
            // 如果验证成功，validateAsync()的返回值就是验证的参数对象
            await schema.validateAsync(param)
        }
        catch (err) {
            let error=paramFormatError
            error.result=err.details[0].message
            ctx.app.emit('error', error, ctx)
            return
        }
    
        await next()
    }
    async wxLoginParamCheck(ctx, next){
        const  param  = ctx.request.body
        const schema = joi.object({
            code:joi.string().max(128).required(),
        })
        try {
            // 如果验证成功，validateAsync()的返回值就是验证的参数对象
            await schema.validateAsync(param)
        }
        catch (err) {
            let error=paramFormatError
            error.result=err.details[0].message
            ctx.app.emit('error', error, ctx)
            return
        }
    
        await next()
    }
    async reqCaptchaParamCheck(ctx, next){
        const  param  = ctx.request.body
        const schema = joi.object({
            email:joi.string().max(128).pattern(/^\w+@(\w+\.)\w+$/).required(),
        })
        try {
            // 如果验证成功，validateAsync()的返回值就是验证的参数对象
            await schema.validateAsync(param)
        }
        catch (err) {
            let error=paramFormatError
            error.result=err.details[0].message
            ctx.app.emit('error', error, ctx)
            return
        }
    
        await next()
    }
    async revisePublicNoticeParamCheck(ctx, next){
        const  param  = ctx.request.body
        const schema = joi.object({
            content:joi.string().max(4096).required(),
        })
        try {
            // 如果验证成功，validateAsync()的返回值就是验证的参数对象
            await schema.validateAsync(param)
        }
        catch (err) {
            let error=paramFormatError
            error.result=err.details[0].message
            ctx.app.emit('error', error, ctx)
            return
        }
        await next()
    }
    async addUserParamCheck(ctx, next){
        const  param  = ctx.request.body
        const schema = joi.object({
            email:joi.string().max(32).pattern(/^\w+@(\w+\.)\w+$/).required(),
            role:joi.number().max(3).min(2).required(),
            name:joi.string().max(20).required()
        })
        try {
            // 如果验证成功，validateAsync()的返回值就是验证的参数对象
            await schema.validateAsync(param)
        }
        catch (err) {
            let error=paramFormatError
            error.result=err.details[0].message
            ctx.app.emit('error', error, ctx)
            return
        }
    
        await next()
    }
    async updateUserParamCheck(ctx, next){
        const  param  = ctx.request.body
        const schema = joi.object({
            id:joi.number().required(),
            role:joi.number().max(3).min(1).required(),
            email:joi.string().max(32).pattern(/^\w+@(\w+\.)\w+$/),
            name:joi.string().max(20)
        })
        try {
            // 如果验证成功，validateAsync()的返回值就是验证的参数对象
            await schema.validateAsync(param)
        }
        catch (err) {
            let error=paramFormatError
            error.result=err.details[0].message
            ctx.app.emit('error', error, ctx)
            return
        }
        await next()
    }
    async wxBindFormCheck(ctx,next){
        const  param  = ctx.request.body
        const schema = joi.object({
            code:joi.string().max(128).required(),
            email:joi.string().max(32).pattern(/^\w+@(\w+\.)\w+$/).required(),
            captcha:joi.number().min(100000).max(999999).required()
        })
        try {
            // 如果验证成功，validateAsync()的返回值就是验证的参数对象
            await schema.validateAsync(param)
        }
        catch (err) {
            let error=paramFormatError
            error.result=err.details[0].message
            ctx.app.emit('error', error, ctx)
            return
        }
        await next()
    }
}
module.exports=new FormatCheck()