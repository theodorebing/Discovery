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

List.belongsToMany(Category, {
    as: 'categories',
    through: 'category_has_lists',
    foreignKey: 'list_id',
    otherKey: 'category_id',
    timestamps: false
});

Category.belongsToMany(List, {
    as: 'list',
    through: 'category_has_lists',
    foreignKey: 'category_id',
    otherKey: 'list_id',
    timestamps: false
});

module.exports = { List, Link, Category };