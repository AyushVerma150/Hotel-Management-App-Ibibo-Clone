const express = require( 'express' );
const router = express.Router();
//importing the validator function
const hotelDataValidator = require( '../helpers/hotelValidators' );
//importing the controller class
const HotelController = require( '../controller/hotelControls' );
const hotelControls = new HotelController();
//multer is used to upload file/image from the postman
const multer = require( 'multer' );
//response handler 
const Response = require( '../utils/response' );
let response;
//file upload functionality imported 
const constants = require( '../utils/constants' );
const fileUpload = require( '../helpers/fileUpload' );
const { route } = require( './user' );
//storage defines the storage location for the uploaded files.
const storage = fileUpload.storage();
//file filter checks for different file types using mimetype to allow only images
const fileFilter = ( req, file, cb ) =>
{
    fileUpload.fileFilter( req, file, cb );
};
const uploadImage =
    multer( {
        storage: storage,
        limits:
        {
            // maximum file size allowed is 5MB
            fileSize: constants.numericalValues.maxFileSize
        },
        // file types are filtered
        fileFilter: fileFilter
    } );
//router to handle a register request using POST method
router.post( '/addHotel', ( req, res, next ) =>
{

    hotelControls.addHotel( req, res, next );
    // controller.createUser( req, res, next );
} );

router.get( '/fetchAllHotels', ( req, res, next ) =>
{
    hotelControls.fetchHotel( req, res, next );
    // controller.createUser( req, res, next );
} );

router.post( '/AddDestinations', ( req, res, next ) =>
{
    hotelControls.addDestination( req, res, next );
} );

router.post( '/filterHotels', ( req, res, next ) =>
{
    hotelControls.filterHotels( req, res, next );
} );


router.post( '/addHotelAmenity', ( req, res, next ) =>
{
    hotelControls.addAmenities( req, res, next );
} );


router.post( '/addRoom', ( req, res, next ) =>
{
    hotelControls.addHotelRooms( req, res, next );
} );

router.post( '/fetchRooms', ( req, res, next ) =>
{
    hotelControls.fetchHotelWithRooms( req, res, next );
} );

router.post( '/fetchReviews', ( req, res, next ) =>
{
    hotelControls.fetchHotelReviews( req, res, next );
} );

router.post( '/createBooking', ( req, res, next ) =>
{
    hotelControls.createBooking( req, res, next );
} );


// //router to handle a login request using POST method
// router.post( '/removeHotel', validator.login, ( req, res, next ) =>
// {
//     // controller.loginUser( req, res, next );
// } );

// router.post( '/addHotelImages', ( req, res, next ) =>
// {
//     // controller.editUser( req, res, next );
// } );

// //router to support multilingual lang request using Get method
// router.get( '/zh', ( ( req, res, next ) =>
// {
//     response = new Response( res );
//     return response.setMessage( __( constants.i18n.authSuccess ), constants.status.ok );

// } ) );
// //router to support multilingual lang request using Get method
// router.get( '/de-ch', ( ( req, res, next ) =>
// {
//     response = new Response( res );
//     return response.setMessage( __( constants.i18n.welcomeMsg ), constants.status.ok );

// } ) );

module.exports = router;