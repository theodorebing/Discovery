const sequelize = require('../db');

const { Model, DataTypes } = require('sequelize');

class Link extends Model { }

Link.init({
    url: DataTypes.TEXT,
    position: DataTypes.INTEGER
}, {
    sequelize,
    tableName: 'link'
});

module.exports = Link;