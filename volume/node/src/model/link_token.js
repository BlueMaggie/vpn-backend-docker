const {DataTypes}=require('sequelize')
const seq=require('../db/seq')
const LinkToken=seq.define('LinkToken',{
    content:{
        type:DataTypes.STRING(32),
        allowNull:false,
        unique:false,
        comment:'token内容'
    },
    isExpired:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        unique:false,
        defaultValue:false,
        comment:'是否过期'
    }
},{
    tableName:'link_token',
    createdTime:'created_time',
    timestamps:true
})
module.exports=LinkToken