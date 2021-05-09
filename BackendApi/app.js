// const express = require( 'express' );
// const bodyParser = require( 'body-parser' );
// const app = express();
// const { NotFound } = require( './utils/errors' );
// const winston = require( './utils/winston' );
// const logger = require( './utils/winstonSequelize' );
// const sequelize = require( './helpers/database' );
// sequelize.sync( ( err ) =>
// {
//     console.log( err );
// }
// );


// //protection against the CORS
// // app.use( ( req, res, next ) =>
// // {
// //     res.setHeader( 'Access-Control-Allow-Origin', '*' );
// //     res.setHeader(
// //         'Access-Control-Allow-Methods',
// //         'OPTIONS, GET, POST, PUT, PATCH, DELETE'
// //     );
// //     res.setHeader( 'Access-Control-Allow-Headers', 'Content-Type, Authorization' );
// //     next();
// // } );
// const morgan = require( 'morgan' );
// //setting up winston logger using morgan to log error and messages to different files.
// app.use( morgan( 'combined', { stream: winston.stream } ) );
// const i18nConf = require( './utils/i18n' );
// const i18n = require( 'i18n' );
// //setting up i18n
// i18nConf();

// const constants = require( './utils/constants' );
// const handleErrors = require( './middleware/handleErrors' );
// const userRoute = require( './routes/user' );
// const adminRoute = require( './routes/hotel' );
// //require( 'custom-env' ).env( process.env.NODE_ENV ); //custom env file 
// //initializing the i18n
// app.use( i18n.init );
// app.use( bodyParser.json() ); // .json() is used to parse json data
// app.use( '/user', userRoute );
// app.use( '/admin', adminRoute );

// console.log( "I am working" );
// //middleware to handle unregistered URL's
// app.use( ( req, res, next ) =>
// {
//     throw new NotFound( constants.error.pageError );
// } );
// app.use( handleErrors ); // common error handling middleware 

// console.log( "Port Num", process.env.PORT );
// app.listen( 8080 );




const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const app = express();
const { NotFound } = require( './utils/errors' );
const winston = require( './utils/winston' );
const logger = require( './utils/winstonSequelize' );
const sequelize = require( './helpers/database' );
sequelize.sync();
//protection against the CORS
const { OAuth2Client } = require( 'google-auth-library' )
const client = new OAuth2Client( "308868571923 - oisq1f23hksege4ti01k7ic8sdrpicgv.apps.googleusercontent.com" );


// app.post( "/api/v1/auth/google", async ( req, res ) =>
// {
//     console.log( "I was called" );
//     const { token } = req.body
//     const ticket = await client.verifyIdToken( {
//         idToken: token,
//         audience: 308868571923 - oisq1f23hksege4ti01k7ic8sdrpicgv.apps.googleusercontent.com
//     } );
//     const { name, email, picture } = ticket.getPayload();
//     console.log( email, name, picture );
//     // res.status( 201 )
//     // res.json( user )
// } );


app.use( ( req, res, next ) =>
{
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader( 'Access-Control-Allow-Headers', 'Content-Type, Authorization' );
    next();
} );
const morgan = require( 'morgan' );
//setting up winston logger using morgan to log error and messages to different files.
app.use( morgan( 'combined', { stream: winston.stream } ) );
const i18nConf = require( './utils/i18n' );
const i18n = require( 'i18n' );
//setting up i18n
i18nConf();
const constants = require( './utils/constants' );
const handleErrors = require( './middleware/handleErrors' );
const userRoute = require( './routes/user' );
const adminRoute = require( './routes/hotel' );
require( 'custom-env' ).env( process.env.NODE_ENV ); //custom env file 
//initializing the i18n

app.use( i18n.init );
app.use( bodyParser.json() ); // .json() is used to parse json data
app.post( "/api/v1/auth/google", async ( req, res ) =>
{
    console.log( "I was called" );
    const { token } = req.body
    const ticket = await client.verifyIdToken( {
        idToken: token,
        audience: "308868571923-oisq1f23hksege4ti01k7ic8sdrpicgv.apps.googleusercontent.com"
    } );
    const { name, email, picture } = ticket.getPayload();
    console.log( email, name, picture );
} );
app.use( '/user', userRoute );
app.use( '/admin', adminRoute );


//middleware to handle unregistered URL's
app.use( ( req, res, next ) =>
{
    throw new NotFound( constants.error.pageError );

} );
app.use( handleErrors ); // common error handling middleware 
const data = {
    message: 'message',
    level: 'info'
};
logger.log( data, ( err, val ) =>
{
    console.log( err, val );
} );


console.log( "Port Number is ", process.env.PORT );
app.listen( process.env.PORT );
