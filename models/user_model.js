const Sequelize = require('sequelize');
const sequelize = require('../sequelize_connection').sequelize


 const User = sequelize.define('user', {
     id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true
     },
     firstName: {
         type: Sequelize.STRING,
         field: 'first_name',
         allowNull: true
     },
     lastName: {
         type: Sequelize.STRING,
         field: 'last_name',
         allowNull: true
     },
     username: {
         type: Sequelize.STRING,
         field: 'username',
         allowNull: false
     },
     password: {
         type: Sequelize.STRING,
         field: 'password',
         allowNull: false
     }
 });

User.sync();

module.exports.User = User;


