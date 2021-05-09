
var appRoot = require( 'app-root-path' );
var winston = require( 'winston' );
const constants = require( '../utils/constants' );

// define the custom settings for each transport (file, console)
var options = {
    file: {
        level: constants.infoFile.level,
        name: constants.infoFile.name,
        filename: `${ appRoot }/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: constants.maxFileSize,
        maxFiles: constants.maxFiles,
        colorize: true,
    },
    errorFile: {
        level: constants.errorFile.level,
        name: constants.errorFile.name,
        filename: `${ appRoot }/logs/error.log`,
        handleExceptions: true,
        json: true,
        maxsize: constants.maxFileSize,
        maxFiles: constants.maxFiles,
        colorize: true,
    }
};

// instantiate a new Winston Logger with the settings defined above
var logger = new winston.createLogger( {
    transports: [
        new ( winston.transports.File )( options.errorFile ),
        new ( winston.transports.File )( options.file )
    ],
    exitOnError: false, // do not exit on handled exceptions
} );

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function ( message, encoding )
    {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info( message );
    },
};

module.exports = logger;