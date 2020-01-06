const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DECIMAL
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
    defaultValue: null
  }
})
