const LinkToken=require('../../model/link_token')
const { Op } = require("sequelize")
class LinkTokenOp{
    //【增】
   async createToken(content){   
        let res=await LinkToken.create({
            content
        })
        return res?res.dataValues:null
   }
    //【删】
    //通过id删除对应的LinkToken
    async deleteTokenById(id){
        let res=await LinkToken.destroy({
            where:{
                id
            }
        })
        return res
    }
    async deleteTokensByIsExpired(){
        let res=await LinkToken.destroy({
            where:{
                isExpired:true
            }
        })
        return res
    }
    async deleteTokenByContent(content){
        let res=await LinkToken.destroy({
            where:{
                content
            }
        })
    }
    //【改】
    async updateTokenById({...args}){
        let {id,...updateOpt}=args
        console.log(updateOpt)
        let res=await LinkToken.update(
            updateOpt
            ,{
            where:{
                id
            }
        })
        return res
    }
    //【查】
    //查询4个可用的
    async queryOneLinkToken(limit)
    {
        let res=await LinkToken.findOne({
            where:{
                isExpired:false
            }
        })
        return res?res.dataValues:null 
    }
    //查询所有tokens
    async queryAllLinkTokens()
    {
        let res=await LinkToken.findAll()
        return res
    }

}
module.exports=new LinkTokenOp()