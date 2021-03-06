const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize('loja', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: 0,
  port: 3306,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
