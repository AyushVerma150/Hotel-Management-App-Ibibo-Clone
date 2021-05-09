const constants = require( '../utils/constants' );
const { BadRequest } = require( '../utils/errors' );
const Request = require( '../utils/request' );
const User = require( '../model/user' );
exports.isValidEmail = async ( value, req ) =>
{
    let getData = { email: "" };
    handleRequest = new Request( req );
    const { email } = handleRequest.getBody( getData );
    const existingUser = await User.findOne( { where: { email: email } } );
    if ( existingUser )
    {
        throw new BadRequest( constants.error.emailInUse );
    }
};

exports.isPasswordConfirmed = ( value, req ) =>
{
    let getData = { password: "", confirmPassword: "" };
    const { password, confirmPassword } = handleRequest.getBody( getData );
    if ( password !== confirmPassword )
    {
        throw new BadRequest( constants.error.passwordMismatch );
    }
    return true;
};