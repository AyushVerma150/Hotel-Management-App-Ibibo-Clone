//sequelize is used to make db models easily ....
const Sequelize = require( 'sequelize' );
//creating User DB model using sequelize .....
const sequelize = require( '../helpers/database' );
//creating the user Model to store user Info in database.
const Hotel = require( '../model/hotel' );
const User = require( '../model/user' );

const Booking = sequelize.define( 'booking',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        amount: {
            type: Sequelize.STRING,
            allowNull: false

        },
        roomsBooked: {
            type: Sequelize.STRING,
            allowNull: false
        },
        adults: {
            type: Sequelize.STRING,
            allowNull: false
        },
        children: {
            type: Sequelize.STRING,
            allowNull: false
        },
        checkIn: {
            type: Sequelize.STRING,
            allowNull: false
        },
        checkOut: {
            type: Sequelize.STRING,
            allowNull: false
        },
        primaryGuest: {
            type: Sequelize.STRING,
            allowNull: false
        },
    } );


Booking.belongsTo( Hotel, { constraints: true, onDelete: 'CASCADE' } );
Hotel.hasMany( Booking );
Booking.belongsTo( User, { constraints: true, onDelete: 'CASCADE' } );
User.hasMany( Booking );

module.exports = Booking;