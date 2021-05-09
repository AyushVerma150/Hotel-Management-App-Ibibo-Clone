const { validationResult } = require( 'express-validator/check' );
const Request = require( '../utils/request' );
const Response = require( '../utils/response' );
const bcrypt = require( 'bcryptjs' );
const User = require( '../model/user' );
const Hotel = require( '../model/hotel' );
const HotelImage = require( '../model/hotelImages' );
const shortId = require( 'shortid' );
HotelImage.belongsTo( Hotel, { constraints: true, onDelete: 'CASCADE' } );
Hotel.hasMany( HotelImage );

// Hotel.create(
//     {
//         hotelId: shortId.generate(),
//         type: "villa",
//         name: "Ayush Villa",
//         address: "Patiala,Punjab",
//         cancellationAvailable: false
//     }
// ).then( res =>
// {
//     console.log( res )
// } ).catch( err =>
// {
//     console.log( err );
// } );


// Hotel.findOne( { where: { hotelId: 't5w3_u2Wn' } } )
//     .then( res =>
//     {
//         console.log( "Hotel was found , ofccccc!!" )
//         res.createHotelImage(
//             {
//                 path: "yet to be uploaded",
//                 type: "depreciated",
//                 source: "customer"
//             }
//         )
//             .then( result => 
//             {
//                 console.log( result );
//             } )
//             .catch( err => console.log( err ) );
//     } ).catch( err => console.log( err ) );

// existingHotel.createHotelImage(
//     {
//         path: "yet to be uploaded",
//         type: "depreciated",
//         source: "customer"
//     }
// )
//     .then( result => 
//     {
//         console.log( result );
//     } )
//     .catch( err => console.log( err ) );

const constants = require( '../utils/constants' );
const { BadRequest } = require( '../utils/errors' );
const Email = require( '../email/emailHandler' );
const redis = require( 'redis' );
const JWTR = require( 'jwt-redis' ).default;
const EmailConfig = require( '../model/email' );
let redisClient = redis.createClient();
let jwtr = new JWTR( redisClient );
const sqlQueries = require( '../helpers/sqlQueries' );
let response;
require( 'custom-env' ).env( process.env.NODE_ENV ); //custom env file 
// created a common UserController class to handle all the controller information like creating a user , user login...
module.exports = class UserController
{
    createUser = async ( req, res, next ) =>
    {
        //create user func checks if all the inputs are valid and then creates a db row for the same...
        response = new Response( res ); //response handler
        try
        {
            let bodyData = { userName: "", email: "", contact: "", password: "", file: "" };
            //let fileData = { filename: "" };
            //taking the request from the common request handler by passing the specific fields which the user wants.
            const handleRequest = new Request( req );
            const errors = validationResult( req );
            if ( !errors.isEmpty() ) //check for validations
            {

                const { msg } = errors.array()[0];
                console.log( msg );
                return response.setError( msg, constants.status.unprocessable );
            }
            //using destructuring i am able  to access the required fields
            const { userName, email, contact, password, _, file } = handleRequest.getBody( bodyData );
            const hashedPassword = await bcrypt.hash( password, constants.numericalValues.hashCycles );
            //let updatedUser = {};
            if ( hashedPassword )
            {

                const user =
                    await
                        User.create(
                            {
                                userName: userName,
                                email: email,
                                contact: contact.toString(),
                                password: hashedPassword,
                                userImage: file,
                                role: constants.userType.defaultAccess
                            }
                        );

                const isValid =
                    await
                        User.update(
                            {
                                role: constants.userType.higherAccess
                            },
                            {
                                where:
                                {
                                    email: email
                                }
                            }
                        );
                return response.setData( user, "", constants.status.ok );
                // const updatedUser = await sqlQueries.getUserRow( email );

                //console.log( updatedUser );
                //if not a valid user or update
                if ( !user || !isValid || !updatedUser )
                {
                    throw new BadRequest( constants.error.signUpFailed );
                }
                //return response.setData( updatedUser, constants.status.ok );
                //sending email with HTML content
                const emailHandler = new Email( constants.email.htmlType, res );

                // const ack = await
                //     emailHandler
                //         .sendHtml( email, constants.email.sender, constants.email.signupSuccess, "Sign up success" );
                // console.log( ack );
                // if ( ack )    
                // {
                // return response.setData( updatedUser, constants.status.ok );
                // }
            }
        }
        catch ( err )
        {
            return response.setError( err, constants.status.unprocessable );
        }
    }

    loginUser = async ( req, res, next ) =>
    {
        //login user checks for password and returns a token if the authentication is successful 
        response = new Response( res );
        let field = { email: "" };
        const handleRequest = new Request( req );
        const { email } = handleRequest.getBody( field );
        const errors = validationResult( req );
        console.log( "in Login" );
        console.log( email );
        const userInfo = await sqlQueries.getUserRow( email );
        console.log( userInfo );
        if ( !errors.isEmpty() )
        {
            //getting the error message 
            const { msg } = errors.array()[0];
            return response.setError( msg, constants.status.unprocessable );
        }
        const token =
            await
                jwtr.sign(
                    {
                        email: email
                    },
                    "Super",
                    {
                        expiresIn: "1h"
                    }
                );
        console.log( token );
        if ( !token )
        {
            return response.setError( constants.error.tokenFailure, constants.status.unprocessable );
        }

        return response.setData( [userInfo, token], "", constants.status.ok );
    }



    editUser = async ( req, res, next ) =>
    {
        response = new Response( res ); //response handler
        try
        {
            console.log( "In edit User" );
            let bodyData = { userName: "", email: "", contact: "", password: "" };
            const handleRequest = new Request( req );
            // const errors = validationResult( req );
            //using destructuring i am able  to access the required fields
            const { email, userName, contact } = handleRequest.getBody( bodyData );
            const userInfo = await sqlQueries.getUserRow( email );
            let isValid = "";
            if ( userInfo )
            {
                isValid =
                    await
                        User.update(
                            {
                                userName,
                                contact
                            },
                            {
                                where:
                                {
                                    email: email
                                }
                            }
                        );
            }
            if ( isValid[0] )
            {
                return response.setData( "User edit Success", "", constants.status.ok );
            }
            else
            {
                return response.setError( "Edit could not be Completed", constants.status.unprocessable );
            }
        }
        catch ( err )
        {

        }

    }
};
