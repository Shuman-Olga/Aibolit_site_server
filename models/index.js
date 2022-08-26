const Sequelize = require('sequelize'),
  sequelize = require('../config/dbConfig'),
  db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Message = require('./messageModel')(sequelize, Sequelize);

module.exports = db;
