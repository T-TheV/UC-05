const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
// Configurações do banco de dados

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
  }
);

module.exports = sequelize;
