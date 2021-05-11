//sequelize is used to make db models easily ....
const Sequelize = require("sequelize");
//creating User DB model using sequelize .....
const sequelize = require("../helpers/database");
//creating the user Model to store user Info in database.
const EmailConfig = sequelize.define("emailConfig", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  subjectType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = EmailConfig;
