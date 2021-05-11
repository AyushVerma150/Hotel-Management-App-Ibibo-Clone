const Sequelize = require("sequelize");
//creating User DB model using sequelize .....
const sequelize = require("../helpers/database");
//creating the user Model to store user Info in database.

const RoomAmenities = sequelize.define("roomAmenities", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = RoomAmenities;
