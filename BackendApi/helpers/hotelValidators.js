const { body } = require( 'express-validator/check' );
const constants = require( '../utils/constants' );
const { BadRequest } = require( '../utils/errors' );
const Request = require( '../utils/request' );
const Response = require( '../utils/response' );
const Hotel = require( '../model/hotel' );

exports.addHotel =
    [
        body( 'type', "Not a valid hotel type" )
            .not()
            .isEmpty(),
        body( 'name', "Enter a valid hotel name" )
            .isLength( { min: constants.numericalValues.minLength } )
            .isLength( { max: constants.numericalValues.maxLength } )
            .not()
            .isEmpty()
            .custom( async ( value, { req, res } ) =>
            {
                response = new Response( res ); //response handler
                const existingHotel = await Hotel.findOne( { where: { name: req.body.name } } );
                if ( existingHotel )
                {
                    throw new Error( "A hotel with this name already exits" );
                }
            } ),
        body( 'cancellationAvailable', "Provide cancellation available or not" )
            .not()
            .isEmpty(),
        body( 'address', "address is not correct" )
            .not()
            .isEmpty()
    ];