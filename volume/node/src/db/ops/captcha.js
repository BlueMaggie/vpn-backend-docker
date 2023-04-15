const Captcha=require('../../model/captcha')
const { Op } = require("sequelize")
class CaptchaOP{
    //【增】
   async createCaptcha({...args}){  
        let res=await Captcha.create(args)
        return res?res.dataValues:null
   }
    //【删】
    //通过id删除对应的Captcha
    async deleteCaptchaById(id){
        let res=await Captcha.destroy({
            where:{
                id
            }
        })
    }
    //【改】
    //【查】
    async queryCaptcha({...args})
    {
        
        let res=await Captcha.findOne({
            where:args
        })
        return res?res.dataValues:null //若无，res则为[]
    }
    async queryAllCaptcha(){
        return await Captcha.findAll()
    }
}
module.exports=new CaptchaOP()