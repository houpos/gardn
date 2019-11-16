// Create a new file for each model
const Sequelize = require('sequelize')
const db = require('../db')

const Garden = db.define('garden', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Garden
