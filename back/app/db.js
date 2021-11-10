const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PG_URL, {
    define: {
        underscored: true,

        createdAt: 'created_at',
        updatedAt : 'updated_at'
    },
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    },
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = sequelize;