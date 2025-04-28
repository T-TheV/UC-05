const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
// Configurações do banco de dados

const sequelize = new Sequelize(
  process.env.DEV_DB_NOME, 
  process.env.DEV_DB_USER, 
  process.env.DEV_DB_PASSWORD, {
  host: process.env.DEV_DB_HOST,
  dialect: process.env.DIALECT, // Exemplo: 'postgres'
  port: process.env.DEV_DB_PORTA, // Porta do banco de dados
  logging: true // Define se os logs de SQL serão exibidos
  }
);

module.exports = sequelize;
