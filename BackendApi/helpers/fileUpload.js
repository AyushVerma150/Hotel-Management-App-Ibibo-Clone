const multer = require( 'multer' );
exports.storage = () =>
{
    return multer.diskStorage( {
        destination: function ( req, file, cb )
        {
            // destination function tells where the uploaded files will be stored...
            cb( null, './uploads/' );
        },
        filename: function ( req, file, cb )
        {
            //the filename function gives name to files based on the username entered.
            cb( null, req.body.userName + '' + file.originalname );
        }
    } );
};

exports.fileFilter = ( req, file, cb ) =>
{
    if ( file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' )
    {
        // file is accepted only if it is jpeg , jpg , png else not uploaded.
        cb( null, true );
    }
    else
    {
        //rejected files
        cb( null, false );
    }
};


