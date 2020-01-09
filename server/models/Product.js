const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define('products', {
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
  },
  filePath: {
    type: Sequelize.STRING,
    allowNull: true
  }
})
