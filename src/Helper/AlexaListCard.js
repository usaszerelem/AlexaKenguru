'use strict';

// ***************************************************************************
// To use this class should be hopefully very simple.
// 1.- Create an ListItem object for each list item in the Alexa card.
// 2.- Create an ListCard object and add all ListItem objects.
// 3.- To display card: session.context.succeed(ListCard.BuildResponse());
// ***************************************************************************

// ===========================================================================
// Class to build each list item that goes into an Alexa list card.
// ===========================================================================

exports.ListItem = class {
    constructor() {
        this._token = undefined;
        this._imageUrl = undefined;
        this._imageDescription = undefined;
        this._textContentArray = new Array();
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
    // Optional image to associated with this list item.

    AddImage(imageUrl, imageDescription) {
        this._imageUrl = imageUrl;
        this._imageDescription = imageDescription;
    }

    // ----------------------------------------------------------------
    // There can be a maximum of 3 text content items within one
    // list item.

    AddTextContent(outputText, IsRichText) {
        if (IsRichText == undefined) {
            IsRichText = false;
        }

        this._textContentArray.push([outputText, IsRichText ? 'RichText' : "PlainText"]);
    }

    // -----------------------------------------------------------------------
    // Build a JSON object from the provided data

    BuildJSONObject() {
        var response = {
            token: this._token
        }

        if (this._imageUrl != undefined) {
            response.image = {
                contentDescription: this._imageDescription,
                sources: [
                    {
                        url: this._imageUrl
                    }
                ]
            }
        }

        let tc = {};

        for (let idx = 0; idx < this._textContentArray.length; idx++) {
            switch(idx) {
                case 0:
                    tc.primaryText = {}
                    tc.primaryText.text = this._textContentArray[idx][0];
                    tc.primaryText.type = this._textContentArray[idx][1];
                    break;

                case 1:
                    tc.secondaryText = {}
                    tc.secondaryText.text = this._textContentArray[idx][0];
                    tc.secondaryText.type = this._textContentArray[idx][1];
                    break;

                case 2:
                    tc.tertiaryText = {}
                    tc.tertiaryText.text = this._textContentArray[idx][0];
                    tc.tertiaryText.type = this._textContentArray[idx][1];
                    break;
            }
            
        }

        response.textContent = tc;

        return response;
    }
}

// ===========================================================================
// Class to build an Alexa card.
// ===========================================================================

exports.ListCard = class {

    // -----------------------------------------------------------------------

    constructor() {
        this._title;
        this._token = 'list_template';
        this._listItems = Array();
        this._imgBackgroundSmall;
        this._imgBackgroundLarge;
        this._outputSpeech;
        this._repromptSpeech;
        this.ShouldEndSession = false;
    }

    // -----------------------------------------------------------------------
    // Retreive card title that was set

    get Title() {
        return this._title;
    }
    
    // -----------------------------------------------------------------------
    // Set card title
    
    set Title(value) {
        this._title = value;
    }

    // -----------------------------------------------------------------------
    // retrieve associated token

    get Token() {
        return this._token;
    }
    
    // -----------------------------------------------------------------------
    // Set optional token for this card.

    set Token(value) {
        this._token = value;
    }

    // -----------------------------------------------------------------------
    // Add an Alexa list item object to this card.

    AddListItem(lstItem) {
        this._listItems.push(lstItem);
    }

    // -----------------------------------------------------------------------
    // Add an array of Alexa list item object to this card.

    AddListItemArray(lstItemArr) {
        this._listItems = this._listItems.concat(lstItemArr);
    }

    // -----------------------------------------------------------------------
    // Optionally set a card background image

    BackGroundImage(imgSmall, imgLarge) {
        this._imgBackgroundSmall = imgSmall;
        this._imgBackgroundLarge = imgLarge;
    }

    // -----------------------------------------------------------------------
    // Optional speech that Alexa should utter when displaying this card.

    Speech(outSpeech, repromptSpeech) {
        this._outputSpeech = outSpeech;
        this._repromptSpeech = repromptSpeech;
    }

    // -----------------------------------------------------------------------
    // Built an Alexa reponse based on the provided data
    
    BuildResponse() {
        var response = {
            version: "1.0",
            response: {
                card: null,
                shouldEndSession: this.ShouldEndSession,

                directives: [
                    {
                        type: "Display.RenderTemplate",
                        template: {
                            title: this._title,
                            type: "ListTemplate1",
                            token: this._token,
                            backButton: "HIDDEN",
                            listItems: []
                        }
                    }
                ]
            }
        }

        if (this._imgBackgroundSmall != undefined && this._imgBackgroundLarge != undefined) {
            response.response.directives[0].template.backgroundImage = {
                sources: [
                    {
                        size: "SMALL",
                        url: this._imgBackgroundSmall
                    },
                    {
                        size: "LARGE",
                        url: this._imgBackgroundLarge
                    }
                ]
            }
        }

        if (this._outputSpeech != undefined) {
            response.response.outputSpeech = {
                type: "SSML",
                text: "<speak>" + this._outputSpeech + "</speak>"
            }
        }

        if (this._repromptSpeech != undefined) {
            response.response.reprompt = {
                outputSpeech: {
                    type: "SSML",
                    text: "<speak>" + this._repromptSpeech + "</speak>"
                }
            }
        }

        var dummy = this._listItems.map(function(item, index){
            return item.BuildJSONObject();
        });

        for(let idx = 0; idx < dummy.length; idx++) {
            response.response.directives[0].template.listItems[idx] = dummy[idx];
        }

        return response;
    }
}
