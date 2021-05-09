const { GeneralError, NotFound } = require( '../utils/errors' );
const Response = require( '../utils/response' );
const constants = require( '../utils/constants' );
//common error handler middleware for any unhandled error .
const handleErrors = ( err, req, res, next ) =>
{
    const response = new Response( res );
    if ( err instanceof NotFound )
    {
        return response.setError( err.message, constants.status.notFound );  // check for the err instance of NotFound
    }
    else if ( err instanceof GeneralError ) //checks if the error belongs to the Error class
    {
        return response.setError( err.message, constants.status.unprocessable );
    }
    return response.setError( err.message, constants.status.serverError );
};


module.exports = handleErrors;