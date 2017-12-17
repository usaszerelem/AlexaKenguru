'use strict';
const KString = require('./KStringHelper');
const Image = require('./Image');
const CardType = require('../Helper/CardType');
const {DisplayCard} = require('../Helper/AlexaCard');
const assert = require('assert');

//=============================================================================
//=============================================================================

module.exports = {
    // -----------------------------------------------------------------------

    ShowStandardCard: function(session, speechOutput, cardOutput, cardTitle) {

        let CardTitle = KString.SkillName;

        if (cardTitle != undefined) {
            CardTitle = cardTitle;
        }

        let card = new DisplayCard();
        card.SessionAttributes = session.attributes;
        card.Title = CardTitle;
        card.CardType = CardType.ImageRight;
        card.ForegroundImage(Image.Blank);
        card.BackGroundImage(Image.HopsBackground);
        card.Speech(speechOutput, speechOutput);
        card.AddCardRichText(cardOutput);

        return(card.BuildResponse());
    }
}
