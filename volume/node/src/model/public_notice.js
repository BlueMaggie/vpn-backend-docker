const {DataTypes}=require('sequelize')
const seq=require('../db/seq')
const PublicNotice=seq.define('PublicNotice',{
    content:{
        type:DataTypes.STRING(4096),
        allowNull:true,
        unique:false,
        comment:'公告',
    },
},{
    tableName:'public_notice',
    timestamps:true,
})
module.exports=PublicNotice