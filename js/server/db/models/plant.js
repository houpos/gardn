// Create a new file for each model
const Sequelize = require('sequelize')
const db = require('../db')

const Plant = db.define('plant', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  source: {
    type: Sequelize.STRING
  },
  thumbnail: {
    type: Sequelize.STRING,
    defaultValue: './js/client/res/placeholder-square.jpg'
  },
  resources: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  type: {
    type: Sequelize.STRING
  }
})

module.exports = Plant
