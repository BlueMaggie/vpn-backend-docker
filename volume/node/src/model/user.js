const { DataTypes } = require('sequelize')
const seq=require('../db/seq')
const Role=require('./role')
const User=seq.define('User',{
    name:{
        allowNull:false,
        unique:false,
        type:DataTypes.STRING(20),
        comment:"用户备注"
    },
    email:{
        type:DataTypes.STRING(32),
        allowNull:false,
        unique:true,
        comment:'电子邮箱'
    },
    openid:{
        type:DataTypes.STRING(48),
        allowNull:true,
        unique:false,
        comment:'wx_openid'
    },
    boss:{
        type:DataTypes.INTEGER(),
        allowNull:true,
        unique:false,
        comment:'用户上级'
    },
    activation:{
        type:DataTypes.INTEGER(),
        allowNull:false,
        unique:false,
        defaultValue:0,
        comment:'用户活跃度'
    }
},{
    tableName: 'user',
    timestamps: true,
    createdAt: 'create_time',
    updatedAt: 'update_time',  
})
Role.hasMany(User, {
    foreignKey: {
        name: 'role', //外键字段名。如果foreignKey的值不是对象而是字符串，则默认该字符串就是字段名
        type: DataTypes.INTEGER, //这里不写就默认和引用的外键一样的类型，写的话比如你可以改为UUID类型
        allowNull: false, //默认为ture
        defaultValue: 3,
        comment: '用户角色',
    },
    targetKey: 'id', //外键关联Role的字段，默认为Role主键
    onDelete: 'RESTRICT', //onDelete设为严格模式。onUpdate默认为CASCADE一般没有改的必要
})
User.belongsTo(Role, {
    foreignKey: {
        name: 'role', //外键字段名。如果foreignKey的值不是对象而是字符串，则默认该字符串就是字段名
        type: DataTypes.INTEGER, //这里不写就默认和引用的外键一样的类型，写的话比如你可以改为UUID类型
        allowNull: false, //默认为ture
        defaultValue: 3,
        comment: '用户角色',
    },
    targetKey: 'id', //外键关联Role的字段，默认为Role主键
    onDelete: 'RESTRICT', //onDelete设为严格模式。onUpdate默认为CASCADE一般没有改的必要
})

module.exports = User