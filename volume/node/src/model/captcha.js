const {DataTypes}=require('sequelize')
const seq=require('../db/seq')
const User=require('./user')
const Captcha=seq.define('Captcha',{
    code:{
        type:DataTypes.INTEGER(6),
        allowNull:false,
        unique:false,
        comment:'验证码'
    },
   
},{
    tableName:'captcha',
    timestamps:true,
    createdAt:'created_time',
})
User.hasMany(Captcha,{
    foreignKey:{
        name:'uid',
        allowNull:false,
        unique:false,
        comment:'用户id'
    },
    targetKey:'id',
})
Captcha.belongsTo(User,{
    foreignKey:{
        name:'uid',
        allowNull:false,
        unique:false,
        comment:'用户id'
    },
    targetKey:'id',
})
module.exports=Captcha