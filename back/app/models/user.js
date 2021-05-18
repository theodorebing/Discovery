const sequelize = require('../db');

const { Model, DataTypes } = require('sequelize');

class User extends Model { }

User.init({
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
}, {
    sequelize,
    tableName: 'user'
});

module.exports = User;