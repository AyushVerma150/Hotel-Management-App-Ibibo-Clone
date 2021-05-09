const nodemailer = require( 'nodemailer' );
const sendgridTransport = require( 'nodemailer-sendgrid-transport' );
const Response = require( '../utils/response' );
let response;
require( 'custom-env' ).env( process.env.NODE_ENV );
const { BadRequest } = require( '../utils/errors' );
const constants = require( '../utils/constants' );
const transporter = nodemailer.createTransport( sendgridTransport(
    {
        auth:
        {
            api_key: process.env.Api_Key
        }
    }
) );



class Email
{
    //Email class to handle different types of emails with Html , text etc..
    constructor( type, res )
    {
        this.type = type;
        this.res = res;
    }
    sendText( receiver, sender, subject, textContent )
    {
        response = new Response( this.res );
        //sending email with simple text content
        transporter.sendMail(
            {
                to: receiver,
                from: sender,
                subject: subject,
                text: textContent
            }
        ).catch( err =>
        {
            return response.setError( err, constants.statusUnprocessable );
        } );
    }
    async sendHtml( receiver, sender, subject, htmlContent )
    {
        //sending email with Html content
        const result = await transporter.sendMail(
            {
                to: receiver,
                from: sender,
                subject: subject,
                html: htmlContent
            } );
        if ( !result )
        {
            return response.setError( err, constants.statusUnprocessable );
        }
        return true;
    }
};

module.exports = Email;