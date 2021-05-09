const Request = require( '../utils/request' );
const User = require( '../model/user' );
const constants = require( '../utils/constants' );
const roleDefinition = require( '../helpers/roleDefinition' );
const Acl = require( '../helpers/Acl' );
const permissionHandler = new Acl( roleDefinition );
//checks for the permissions and the errors
exports.grantPermission = async ( req ) =>
{
    const request = new Request( req );
    let bodyData = { email: "" };
    const { email } = request.getBody( bodyData );
    const user = await User.findOne( { where: { email: email } } );
    if ( !user )
    {
        return false;
    }
    else if ( !permissionHandler.grantedPrivilege( user.role.toString(), constants.loginOperation ) )
    {
        //checks the permissions from the ACL class
        return true;
    }
};