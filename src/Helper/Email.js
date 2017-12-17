'use strict'

const AWS = require('aws-sdk');
var EmailClient = new AWS.SES({region: 'us-east-1'});

// ===========================================================================
// Class to build an Alexa card.
// ===========================================================================

exports.Email = class {

    // -----------------------------------------------------------------------

    constructor() {
        this._FromEmail = '';
        this._Subject = '';
        this._Body = '';
        this._ToAddressees = new Array();
    }

    // -----------------------------------------------------------------------

    get FromEmail() {
        return this._FromEmail;
    }
    
    // -----------------------------------------------------------------------

    set FromEmail(value) {
        this._FromEmail = value;
    }

    // -----------------------------------------------------------------------

    get Subject() {
        return this._Subject;
    }
    
    // -----------------------------------------------------------------------

    set Subject(value) {
        this._Subject = value;
    }

    // -----------------------------------------------------------------------

    get Body() {
        return this._Body;
    }
    
    // -----------------------------------------------------------------------

    set Body(value) {
        this._Body = value;
    }

    // -----------------------------------------------------------------------

    AddToAddress(addressee) {
        this._ToAddressees.push(addressee);
    }

    // -----------------------------------------------------------------------

    Send(callback){

        if (this._ToAddressees.length == 0)
            throw 'Email param error: To Addressees not set';

        if (this._FromEmail.length == 0)
            throw 'Email param error: From email address not set';

        if (this._Subject.length == 0)
            throw 'Email param error: Subject not set';

        if (this._Body.length == 0)
            throw 'Email param error: Body not set';

        var eParams = {
            Destination: {
                ToAddresses: this._ToAddressees
            },
            Message: {
                Body: {
                    Text: {
                        Data: this._Body
                    }
                },
                Subject: {
                    Data: this._Subject
                }
            },
            Source: this._FromEmail
        };
        
        console.log('Sending Email: ' + JSON.stringify(eParams, null, 2));
    
        var email = EmailClient.sendEmail(eParams, function(err, data){
            if (err) {
                callback(err);
            } else {
                callback();
            }
        });
    }
}
