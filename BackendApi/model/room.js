const Sequelize = require("sequelize");
//creating User DB model using sequelize .....
const sequelize = require("../helpers/database");
//creating the user Model to store user Info in database.
const RoomAmenities = require("./roomAmenities");
const Hotel = require("./hotel");
const Room = sequelize.define("room", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  discountPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  bedSize: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  area: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  capacity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

RoomAmenities.belongsTo(Room, { constraints: true, onDelete: "CASCADE" });
Room.hasMany(RoomAmenities);

Room.belongsTo(Hotel, { constraints: true, onDelete: "CASCADE" });
Hotel.hasMany(Room);

module.exports = Room;
