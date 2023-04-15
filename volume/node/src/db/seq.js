const { Sequelize } = require('sequelize')
const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_DB
} = process.env
console.log(MYSQL_USER)
//const dbInit=require('./dbSync')
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
    host: MYSQL_HOST, //ip
    dialect: 'mysql', //数据库类型
    port: MYSQL_PORT, //数据库端口
})
module.exports = seq