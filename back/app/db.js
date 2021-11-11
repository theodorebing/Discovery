const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    define: {
        underscored: true,

        createdAt: 'created_at',
        updatedAt : 'updated_at'
    },

    host: 'process.env.HOST',
    dialect: 'postgres',
    ssl: true,
    protocol: "postgres",
    logging: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }

    // ssl: {
    //   rejectUnauthorized: false
    // }
});

module.exports = sequelize;