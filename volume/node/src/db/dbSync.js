const User = require('../model/user')
const Role = require('../model/role')
const Captcha=require("../model/captcha")
const Clients=require('../model/clients')
const LinkToken=require('../model/link_token')
const Notice=require('../model/notice')
const PublicNotice=require('../model/public_notice')
const seqInit=require('./seq_init')
//dbInit()
//console.log("init");
async function dbInit() {
    
    //数据库初始化
    try{
        await seqInit()
    }catch(e){
        console.log(e)
        return 
    }
    // 模型同步。如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
    await Role.sync()
    await User.sync()
    await Captcha.sync()
    await Clients.sync()
    await LinkToken.sync()
    await Notice.sync()
    await PublicNotice.sync()
    //初始化数据
    const roles=await Role.findAll()
    if(roles.length==0)
    {
        await Role.bulkCreate([
            { id: 1, name: '超级管理员' },
            { id: 2, name: '管理员' },
            { id: 3, name: '普通用户'},
        ])
    }
    
}

module.exports =  dbInit

