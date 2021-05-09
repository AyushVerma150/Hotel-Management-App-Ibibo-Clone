const winston = require( 'winston' );
const WinstonTransportSequelize = require( 'winston-transport-sequelize' );
const sequelize = require( '../helpers/database' );
const options = {
    sequelize: sequelize, // sequelize instance [required]
    tableName: 'WinstonLog', // default name
    meta: { project: 'myProject' }, // meta object defaults
    // fields: { meta: sequelize.JSONB },
    modelOptions: { timestamps: true }, // merge model options
}

const logger = new winston.createLogger( {
    transports: [
        new WinstonTransportSequelize( options )
    ]
} );
module.exports = logger;