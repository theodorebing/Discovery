const sequelize = require('../db');

const { Model, DataTypes } = require('sequelize');

class Link extends Model { }

Link.init({
    url: DataTypes.TEXT,
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    image: DataTypes.TEXT,
    site_name: DataTypes.TEXT,
    position: DataTypes.INTEGER,
    member_id: DataTypes.INTEGER
}, {
    sequelize,
    tableName: 'link'
});

module.exports = Link;