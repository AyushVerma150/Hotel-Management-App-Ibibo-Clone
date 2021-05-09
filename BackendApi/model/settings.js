//sequelize is used to make db models easily ....
const Sequelize = require( 'sequelize' );
//creating User DB model using sequelize .....
const sequelize = require( '../helpers/database' );
//creating the user Model to store user Info in database.
const ControlList = sequelize.define( 'controlList',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        accessType: {
            type: Sequelize.STRING,
            allowNull: false

        },
        level: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    } );

module.exports = ControlList;