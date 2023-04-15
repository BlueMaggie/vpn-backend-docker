const CaptchaOp=require('../db/ops/captcha')
class CaptchaController{
    async clearExpiredCaptcha(){
        let captchaArr=await CaptchaOp.queryAllCaptcha()
        let now=new Date()
        for(let i=0;i<captchaArr.length;i++){
            if(Math.floor(now.getTime()/1000)-Math.floor(new Date(captchaArr[i].dataValues.created_time).getTime()/1000)>=5*60){
                CaptchaOp.deleteCaptchaById(captchaArr[i].dataValues.id)
            }
        }
    }
}

module.exports=new CaptchaController()