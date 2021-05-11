const Sequelize = require("sequelize");
//creating User DB model using sequelize .....
const sequelize = require("../helpers/database");
//creating the user Model to store user Info in database.

const HotelAmenities = sequelize.define("hotelAmenities", {
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
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = HotelAmenities;
