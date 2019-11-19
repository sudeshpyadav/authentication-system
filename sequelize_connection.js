const config = require('config');
const connection_config = config.mysql;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(connection_config);

module.exports.sequelize = sequelize;
