'use strict';

const Alexa = require('alexa-sdk');
const AppState = require('./AppState');
const KAttrib = require('./KAttrib');
const KString = require('./KString');
const Image = require('./Image');
const CardType = require('./Helper/CardType');
const {DisplayCard} = require('./Helper/AlexaCard');
const assert = require('assert');

//=============================================================================
// Dashboard intent handler
//=============================================================================

module.exports = {
    // -----------------------------------------------------------------------

    LaunchRequest: function(session) {
        OnStartup(session);
    },

    // -----------------------------------------------------------------------

    StartOverIntent: function(session) {
        OnStartup(session);
    },

    // -----------------------------------------------------------------------    

    RepeatIntent: function(session) {
        console.log('AMAZON.RepeatIntent handler inside MainIntent');
        SayWelcome(session);
    },

    // -----------------------------------------------------------------------
    
    HelpIntent: function(session) {
        console.log('AMAZON.HelpIntent handler inside MainIntent');
        ProvideHelp(session);
    },

    // -----------------------------------------------------------------------
    
    StopIntent: function(session) {
        console.log('AMAZON.StopIntent handler inside MainIntent');
        SayGoodbye(session);
    },

    // -----------------------------------------------------------------------
    
    CancelIntent: function(session) {
        console.log('AMAZON.CancelIntent handler inside MainIntent');
        SayGoodbye(session);
    },

    // -----------------------------------------------------------------------
    
    SessionEndedRequest: function (session) {
        console.log('SessionEndedRequest handler inside MainIntent');
        SayGoodbye(session);
    },

    HowToContact: function(session) {
        console.log('HowToContact handler inside MainIntent');
        HowToContact(session);
    },

    // -----------------------------------------------------------------------

    Unhandled: function(session) {
        console.log('Unknown request detected inside MainIntent');

        let card = new DisplayCard();
        card.SessionAttributes = session.attributes;
        card.Title = KString.SkillName;
        card.CardType = CardType.NoImage;
        card.BackGroundImage(Image.DefaultBackground);
        card.Speech(KString.UnknownRequestInMainSpeech, KString.UnknownRequestInMainSpeech);
        card.AddCardRichText(KString.UnknownRequestInMainCard);
    
        let response = card.BuildResponse();
    
        console.log(JSON.stringify(response, null, 2));
        session.context.succeed(response);
    }
}

// -----------------------------------------------------------------------

function OnStartup(session) {
    console.log('OnStartup');

    session.attributes[KAttrib.State] = AppState.MAINMODE;
    session.handler.state = AppState.MAINMODE;
    
    SayWelcome(session);
}

// -----------------------------------------------------------------------

function SayWelcome(session) {
    let card = new DisplayCard();
    card.SessionAttributes = session.attributes;
    card.Title = KString.SkillName;
    card.CardType = CardType.NoImage;
    card.BackGroundImage(Image.WelcomeBackground);
    card.Speech(KString.WelcomeSpeech, KString.WelcomeSpeech);

    let response = card.BuildResponse();

    console.log(JSON.stringify(response, null, 2));
    session.context.succeed(response);
}

// -----------------------------------------------------------------------

function ProvideHelp(session) {
    let card = new DisplayCard();
    card.SessionAttributes = session.attributes;
    card.Title = KString.SkillName;
    card.CardType = CardType.NoImage;
    card.BackGroundImage(Image.KenguruBackground);
    card.Speech(KString.ProvideHelpSpeech, KString.ProvideHelpSpeech);
    card.AddCardRichText(KString.ProvideHelpCard);

    let response = card.BuildResponse();

    console.log(JSON.stringify(response, null, 2));
    session.context.succeed(response);
}

// -----------------------------------------------------------------------

function SayGoodbye(session) {
    let card = new DisplayCard();
    card.SessionAttributes = session.attributes;
    card.CardType = CardType.NoImage;
    card.BackGroundImage(Image.WelcomeBackground);
    card.Speech(KString.StopMessageSpeech);
    card.ShouldEndSession = true;

    let response = card.BuildResponse();

    console.log(JSON.stringify(response, null, 2));
    session.context.succeed(response);
}

// -----------------------------------------------------------------------

function HowToContact(session) {
    let card = new DisplayCard();
    card.SessionAttributes = session.attributes;
    card.Title = KString.SkillTitle;
    card.CardType = CardType.NoImage;
    card.BackGroundImage(Image.KenguruBackground);
    card.Speech(KString.HowToContactSpeech);
    card.AddCardRichText(KString.HowToContactCard);

    let response = card.BuildResponse();

    console.log(JSON.stringify(response, null, 2));
    session.context.succeed(response);
}