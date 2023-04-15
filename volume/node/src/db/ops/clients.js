const clients=require('../../model/clients')
const { Op } = require("sequelize")
class ClientsOp{
    //【增】
   async createClient(cid,uid){   
        let res=await clients.create({
            cid,
            uid
        })
        return res?res.dataValues:null
   }
    //【删】
    //通过id删除对应的clients
    async deleteClientByUid(uid,cid){
        let res=await clients.destroy({
            where:{
                uid,
                cid
            }
        })
        return res
    }
    
    //【改】
    async updateClientById({...args}){
        let {id,...ops}=args
        await clients.update(ops,{
            where:{
                id
            }
        })
    }
    //【查】
    //通过uid查询其所有cid
    async queryAllClientsByUid(uid){
        let res=await clients.findAll({
            where:{
                uid
            }
        })
        return res
    }
    //查询uid对应的某cid是否存在
    async queryClientByUidAndCid(uid,cid){
        let res=await clients.findOne({
            where:{
                uid,
                cid
            }
        })
        return res?res.dataValues:null
    }
    //通过uid查询客户端个数
    async queryClientsCountByUid(uid)
    {
        let res=await clients.count({
            where:{
                uid
            }
        })
        return res //若无，res则为[]
    }

}
module.exports=new ClientsOp()