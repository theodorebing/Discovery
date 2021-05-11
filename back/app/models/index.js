const List = require('./list');
const Link = require('./link');
const Category = require('./category');

List.hasMany(Link, {
    as: 'links',
    foreignKey: 'list_id'
});

Link.belongsTo(List, {
    as: 'list',
    foreignKey: 'list_id'
});

List.belongsTo(Category, {
    as: 'categories',
    foreignKey: 'category_id'
});

Category.hasMany(List, {
    as: 'list',
    foreignKey: 'category_id'
});

module.exports = { List, Link, Category };