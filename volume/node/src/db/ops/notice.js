const Notice=require('../../model/notice')
const { Op } = require("sequelize")
class NoticeOp{
    //【增】
   async createNotice({...args}){  
        let res=await Notice.create(args)
        return res?res.dataValues:null
    }
    //【删】
    //通过id删除对应的Notice
    async deleteNoticeByUid(uid){
        let res=await Notice.destroy({
            where:{
                uid
            }
        })
    }
    //【改】
    async updateNoticeByUid({...args}){
        let {uid,...updateOP}=args
        let res=await Notice.update(updateOP,{
            where:{
                uid
            }
        })
        return res
    }
    //【查】
    async queryNoticeByUid(uid)
    {
        
        let [res]=await Notice.findOrCreate({
            where:{
                uid
            },
            defaults:{
                content:null,
                updatedBy:1
            }
        })
        return res?res.dataValues:null //若无，res则为[]
    }
    async queryNoticeCountByUid(uid){
        let count=await Notice.count({
            where:{
                uid
            }
        })
        return count
    }

}
module.exports=new NoticeOp()