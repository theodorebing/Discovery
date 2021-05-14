const sequelize = require('../db');

const { Model, DataTypes } = require('sequelize');

class Category extends Model { }

Category.init({
    name: DataTypes.TEXT,
}, {
    sequelize,
    tableName: 'category'
});

module.exports = Category;