const { Sequelize } = require('sequelize');

// Set up Sequelize for PostgreSQL
const sequelize = new Sequelize('library_borrowing_service', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = { sequelize };
