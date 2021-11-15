require('dotenv').config();
const { Sequelize } = require('sequelize');

const url = process.env.PG_URL;

const sequelize = new Sequelize("postgres://thelink:thelink@localhost:5432/thelink", {
    define: {
        underscored: true,

        createdAt: 'created_at',
        updatedAt : 'updated_at'
    },

    // host: 'process.env.HOST',
    // dialect: 'postgres',
    // ssl: true,
    // protocol: "postgres",
    // logging: true,
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false
    //     }
    // }

    // ssl: {
    //   rejectUnauthorized: false
    // }
});

module.exports = sequelize;