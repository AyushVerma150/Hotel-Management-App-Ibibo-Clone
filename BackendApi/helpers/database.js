require("custom-env").env(process.env.NODE_ENV);
const Sequelize = require("sequelize");

//initializing the Database creation...
const sequelize = new Sequelize(
  process.env.Db_Name,
  process.env.Db_User,
  process.env.Db_Pass,
  {
    dialect: process.env.Db_Dialect,
    host: process.env.Db_Host,
  }
);

module.exports = sequelize;
