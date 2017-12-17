'use strict'

const CardType = require('./CardType');

// ===========================================================================
// Class to build an Alexa card.
// ===========================================================================

exports.DisplayCard = class {

    // -----------------------------------------------------------------------

    constructor() {
        this._title;
        this._hint;
        this._cardType;
        this._token = 'tokitoki';
        this._imgBackground;
        this._imgBackgroundDescription;
        this._imgForeground;
        this._imgForegroundDescription;
        this._outputSpeech;
        this._repromptSpeech;
        this._textContentArray = new Array();
        this.ShouldEndSession = false;
        this.SessionAttributes;
    }

    // -----------------------------------------------------------------------
    // Set optional token to associate with this list item.
    get Title() {
        return this._title;
    }
    
    // -----------------------------------------------------------------------
    // Retrieve associated token

    set Title(value) {
        this._title = value;
    }

    // -----------------------------------------------------------------------
    // Set optional token to associate with this list item.
    get Token() {
        return this._token;
    }
    
    // -----------------------------------------------------------------------
    // Retrieve associated token

    set Token(value) {
        this._token = value;
    }

    // -----------------------------------------------------------------------

    get CardType() {
        return this._cardType;
    }

    // -----------------------------------------------------------------------

    set CardType(value) {
        if (value != CardType.NoImage && value != CardType.ImageRight && value != CardType.ImageLeft) {
            throw 'Use one of the card type definitions in AlexaCardHelper.js';
        }

        this._cardType = value;
    }

    // -----------------------------------------------------------------------

    set Hint(value) {
        this._hint = value;
    }


    // -----------------------------------------------------------------------
    // Optional image to associated with this list item.

    ForegroundImage(imageUrl, imageDescription) {
        if (imageDescription == undefined) {
            imageDescription = 'Foreground image';
        }

        this._imgForeground = imageUrl;
        this._imgForegroundDescription = imageDescription;
    }

    // -----------------------------------------------------------------------
    // Optionally set a card background image

    BackGroundImage(imageUrl, imageDescription) {
        if (imageDescription == undefined) {
            imageDescription = 'Background image';
        }

        this._imgBackground = imageUrl;
        this._imgBackgroundDescription = imageDescription;
    }

    // -----------------------------------------------------------------------
    // Optional speech that Alexa should utter when displaying this card.

    Speech(outSpeech, repromptSpeech) {
        this._outputSpeech = outSpeech;
        this._repromptSpeech = repromptSpeech;
    }

    // ----------------------------------------------------------------
    // There can be a maximum of 3 text content items within one
    // list item.

    AddCardPlainText(outputText) {
        if (this._textContentArray.length > 2)
            throw 'Maximum text content limit reached';

        this._textContentArray.push([outputText,'PlainText']);
    }

    // ----------------------------------------------------------------
    // There can be a maximum of 3 text content items within one
    // list item.

    AddCardRichText(outputText) {
        if (this._textContentArray.length > 2)
            throw 'Maximum text content limit reached';

        this._textContentArray.push([outputText,'RichText']);
    }

    // -----------------------------------------------------------------------
    // Built an Alexa reponse based on the provided data

    BuildResponse() {
        var DirectiveIndex = 0;

        if (this._cardType == undefined)
            throw 'Card type not specified.';

        var response = {
            version: "1.0",
            response: {
                directives: []
            }
        }

        if (this._hint != undefined) {
            response.response.directives[DirectiveIndex] = {
                type: "Hint",
                hint: {
                    type: "PlainText",
                    text: this._hint
                }
            }

            DirectiveIndex++;
        }

        response.response.directives[DirectiveIndex] = {
            type: "Display.RenderTemplate",
            token: this._token,

            template: {
                type: this._cardType,
                title: this._title,
                backButton: "HIDDEN"
            }
        }

        response.response.directives[DirectiveIndex].template.textContent = {};

        for(let idx = 0; idx < this._textContentArray.length; idx++) {
            switch(idx) {
                case 0:
                    response.response.directives[DirectiveIndex].template.textContent.primaryText = {
                        text: this._textContentArray[idx][0],
                        type: this._textContentArray[idx][1]
                    }
                    break;

                case 1:
                    response.response.directives[DirectiveIndex].template.textContent.secondaryText = {
                        text: this._textContentArray[idx][0],
                        type: this._textContentArray[idx][1]
                    }
                    break;

                case 2:
                    response.response.directives[DirectiveIndex].template.textContent.tertiaryText = {
                        text: this._textContentArray[idx][0],
                        type: this._textContentArray[idx][1]
                    }
                    break;

                default:
                    throw 'Internal Error';
            }
        }

        if (this._imgForeground != undefined) {
            response.response.directives[DirectiveIndex].template.image = {
                contentDescription: this._imgForegroundDescription,
                "sources": [{
                    "url": this._imgForeground
                }]
            }
        }

        if (this._imgBackground != undefined) {
            response.response.directives[DirectiveIndex].template.backgroundImage = {
                contentDescription: this._imgBackgroundDescription,
                "sources": [{
                    "url": this._imgBackground
                }]
            }
        }

        if (this._outputSpeech != undefined) {
            response.response.outputSpeech = {
                type: "SSML",
                ssml: "<speak>" + this._outputSpeech + "</speak>"
            }
        }

        if (this._repromptSpeech != undefined) {
            response.response.reprompt = {
                "outputSpeech": {
                    type: 'SSML',
                    ssml: "<speak>" + this._repromptSpeech + "</speak>"
                }
            }
        }

        response.response.shouldEndSession = this.ShouldEndSession;

        response.sessionAttributes = {}

        for (var key in this.SessionAttributes){
            response.sessionAttributes[key] = this.SessionAttributes[key];
        }

        return response;
    }
}
