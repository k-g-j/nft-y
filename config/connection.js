const Sequelize = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize('nft_galleries','username','password', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;