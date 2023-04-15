const User=require('../../model/user')
const { Op } = require("sequelize")
class UserOp{
    //【增】
   async createUser({...args}){  
        let res=await User.create(args)
        return res?res.dataValues:null
   }
    //【删】
    //通过id删除对应的User
    async deleteUserById(id){
        let res=await User.destroy({
            where:{
                id
            }
        })
        return res
    }
    //【改】
    async updateUserById({...args}){
        let {id,...updateOP}=args
        let res=await User.update(updateOP,{
            where:{
                id
            }
        })
    }
    //【查】查一个用户
    async queryUser({...args})
    {
        let res=await User.findOne({
            where:args
        })
        return res?res.dataValues:null 
    }
    //通过管理员id查某页用户
    async queryAllUsersByAdminId(adminId,page,pageSize){
        let res=await User.findAll({
            where:{
                boss:adminId
            },
            offset:(page-1)*pageSize,
            limit:pageSize
        })
        return res //若无，res则为[]
    }
    //查询所有用户（超管专用）
    async queryAllUsers(page,pageSize){
        let res=await User.findAll({
            where:{
                role:{
                    [Op.gt]:1
                }
            },
            offset:(page-1)*pageSize,
            limit:pageSize
        })
        return res //若无，res则为[]
    }

}
module.exports=new UserOp()