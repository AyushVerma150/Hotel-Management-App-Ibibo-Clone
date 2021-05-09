const Sequelize = require( 'sequelize' );
//creating User DB model using sequelize .....
const sequelize = require( '../helpers/database' );
//creating the user Model to store user Info in database.
const HotelImage = require( '../model/hotelImages' );
const HotelAmenities = require( './hotelAmenities' );

const Hotel = sequelize.define( 'hotel',
    {
        id:
        {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        hotelId:
        {
            type: Sequelize.STRING,
            allowNull: false
        },
        type:
        {
            type: Sequelize.STRING,
            allowNull: false
        },
        name:
        {
            type: Sequelize.STRING,
            allowNull: false,
        },
        state:
        {
            type: Sequelize.STRING,
            allowNull: false
        },
        location:
        {
            type: Sequelize.STRING,
            allowNull: false
        },
        landmark:
        {
            type: Sequelize.STRING,
            allowNull: false
        },
        discountPrice:
        {
            type: Sequelize.STRING,
            allowNull: false
        },
        startPrice:
        {
            type: Sequelize.STRING,
            allowNull: false
        }

    } );

HotelImage.belongsTo( Hotel, { constraints: true, onDelete: 'CASCADE' } );
Hotel.hasMany( HotelImage );
HotelAmenities.belongsTo( Hotel, { constraints: true, onDelete: 'CASCADE' } );
Hotel.hasMany( HotelAmenities );


module.exports = Hotel;