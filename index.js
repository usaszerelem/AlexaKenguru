'use strict';

const Alexa = require('alexa-sdk');
const Main = require('./src/MainIntentHandler');
const AppState = require('./src/AppState');

//=============================================================================
// Application ID
//=============================================================================

const APP_ID = 'amzn1.ask.skill.d5c4ab79-4b14-4d25-905d-25026c438ba9';

//=============================================================================
// All exported state specific handles
//=============================================================================

exports.handler = function (event, context, callback) {
    try {
        const alexa = Alexa.handler(event, context, callback);
        alexa.APP_ID = APP_ID;
        
        alexa.registerHandlers(
            mainModeHandlers               // Main entry point
        );

        alexa.execute();
    } catch(err) {
        console.log(err.toString());
    }
};

//=============================================================================
// Main mode intent handler
//=============================================================================

var mainModeHandlers = Alexa.CreateStateHandler(AppState.MAINMODE, {
    'LaunchRequest': function () { Main.LaunchRequest(this); },
    'AMAZON.StartOverIntent': function() { Main.StartOverIntent(this); },
    'AMAZON.RepeatIntent': function() { Main.RepeatIntent(this); },
    'AMAZON.HelpIntent': function() { Main.HelpIntent(this); },
    'AMAZON.StopIntent': function() { Main.StopIntent(this); },
    'AMAZON.CancelIntent': function() { Main.CancelIntent(this); },
    'SessionEndedRequest': function() { Main.SessionEndedRequest(this); },
    'HowToContact': function() { Main.HowToContact(this); },
    'Unhandled': function() { Main.Unhandled(this); }
});
