const Sequelize = require( 'sequelize' );
//creating User DB model using sequelize .....
const sequelize = require( '../helpers/database' );
//creating the user Model to store user Info in database.

const HotelImage = sequelize.define( 'hotelImage',
    {
        id:
        {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        path:
        {
            type: Sequelize.STRING,
            allowNull: false
        },
        type:
        {
            type: Sequelize.STRING,
            allowNull: false,
        },
        source:
        {
            type: Sequelize.STRING,
            allowNull: false
        }

    } );

module.exports = HotelImage;