//sequelize is used to make db models easily ....
const Sequelize = require( 'sequelize' );
//creating User DB model using sequelize .....
const sequelize = require( '../helpers/database' );
//creating the user Model to store user Info in database.
const User = sequelize.define( 'user',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        userName: {
            type: Sequelize.STRING,
            allowNull: false

        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        }
        ,
        contact: {
            type: Sequelize.STRING,
            allowNull: false

        },
        password: {
            type: Sequelize.STRING,
            allowNull: false

        },
        userImage:
        {
            type: Sequelize.STRING,
            allowNull: true

        },
        role:
        {
            type: Sequelize.STRING,
            allowNull: true
        }

    } );

module.exports = User;