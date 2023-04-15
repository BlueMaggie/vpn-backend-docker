const { Sequelize } = require('sequelize')
const seq=require('./seq')
const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_DB
} = process.env
const seq1 = new Sequelize("", MYSQL_USER, MYSQL_PWD, {
    host: MYSQL_HOST, //ip
    dialect: 'mysql', //数据库类型
    port: MYSQL_PORT, //数据库端口
})
const seqInit=async function(){
    await seq1.authenticate()
    await seq1.query(`create database if not exists ${MYSQL_DB};`)
    await seq.authenticate()
}
module.exports= seqInit