const {DataTypes}=require('sequelize')
const seq=require('../db/seq')
const User=require('./user')
const Clients=seq.define('Clients',{
    cid:{
        type:DataTypes.DATE,
        allowNull:false,
        unique:true,
        comment:'客户端id(实际上就是其某次登陆的时间)'
    },
    
},{
    tableName:'clients'
})
User.hasMany(Clients,{
    foreignKey:{
        name:'uid',
        allowNull:false,
        unique:false,
        comment:'用户id'
    },
    targetKey:'id'
})
Clients.belongsTo(User,{
    foreignKey:{
        name:'uid',
        allowNull:false,
        unique:false,
        comment:'用户id'
    },
    targetKey:'id'
})
module.exports=Clients