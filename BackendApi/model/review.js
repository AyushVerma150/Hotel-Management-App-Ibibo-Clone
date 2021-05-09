const Sequelize = require( 'sequelize' );
//creating User DB model using sequelize .....
const sequelize = require( '../helpers/database' );
//creating the user Model to store user Info in database.
const Hotel = require( '../model/hotel' );
const User = require( '../model/user' );

const Review = sequelize.define( 'review',
    {
        id:
        {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        description:
        {
            type: Sequelize.STRING,
            allowNull: false
        },
        rating:
        {
            type: Sequelize.STRING,
            allowNull: false
        },
    } );



Review.belongsTo( Hotel, { constraints: true, onDelete: 'CASCADE' } );
Hotel.hasMany( Review );
Review.belongsTo( User, { constraints: true, onDelete: 'CASCADE' } );
User.hasMany( Review );

module.exports = Review;