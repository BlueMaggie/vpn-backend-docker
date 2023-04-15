const PublicNotice=require('../../model/public_notice')
const { Op } = require("sequelize")
class PublicNoticeOp{
    //【增】
   async createPublicNotice({...args}){  
        let res=await PublicNotice.create(args)
        return res?res.dataValues:null
   }
    //【删】
    //通过id删除对应的PublicNotice
    async deletePublicNotice(){
        let res=await PublicNotice.destroy()
    }
    //【改】
    async updatePublicNotice({...args}){
        let res=await PublicNotice.update(args,{where:{
            id:1
        }})
        return res
    }
    //【查】
    async queryPublicNotice()
    {
        let [res]=await PublicNotice.findOrCreate({
            where:{},
            defaults:{
                content:'welcome to ikuns\' club!'
                }
            }
        )
        console.log(res)
        return res?res.dataValues:null //若无，res则为[]
    }
    

}
module.exports=new PublicNoticeOp()