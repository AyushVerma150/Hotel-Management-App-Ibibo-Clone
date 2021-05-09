const constants = require( '../utils/constants' );
const { BadRequest } = require( '../utils/errors' );
//Acl class to check is particular user has the required permissions to proceed or not.
class Acl
{
    constructor( roles )
    {
        if ( typeof roles !== 'object' )
        {
            throw new BadRequest( constants.error.invalidType );
        }
        this.roles = roles;
    }
    grantedPrivilege( role, operation ) //check for the preferred role..
    {
        if ( this.roles[role] && this.roles[role].can.indexOf( operation ) >= 0 )
        {
            return true;

        }
        return false;
    }
};
module.exports = Acl;