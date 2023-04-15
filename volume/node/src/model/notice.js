const {DataTypes}=require('sequelize')
const seq=require('../db/seq')
const User=require('./user')
const Notice=seq.define('Notice',{
    content:{
        type:DataTypes.STRING(4096),
        allowNull:true,
        unique:false,
        comment:'提示内容',
    },
    updatedBy:{
        type:DataTypes.STRING(32),
        allowNull:false,
        unique:false,
        comment:'创建者'
    }
},{
    tableName:'notice',
    timestamps:true,
})
User.hasOne(Notice,{
    foreignKey:{
        name:'uid',
        allowNull:false,
        unique:false,
    },
    targetKey:'id'
})
Notice.belongsTo(User,{
    foreignKey:{
        name:'uid',
        allowNull:false,
        unique:false,
    },
    targetKey:'id'
})
module.exports=Notice