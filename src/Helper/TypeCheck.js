'use strict';

module.exports = {

    // -----------------------------------------------------------------------
    // A string is always a string so this one is easy. However when a string
    // is called with new it’s suddenly an object, so to know if the object
    // is a string instanceof can be used.

    IsString: function(value) {
        return typeof value === 'string' || value instanceof String;
    },


    // -----------------------------------------------------------------------
    // From typeof more things than just an ordinary number will return “number”
    // like NaN and Infinity. To know if a value really is a number the function
    // isFinite is also required.

    IsNumber: function(value) {
        return typeof value === 'number' && isFinite(value);
    },

    // -----------------------------------------------------------------------
    // Date isn’t really a data type in javascript. But to know if something’s
    // a Date object it can be tested with instanceof against Date.

    IsDate: function(value) {
        return value instanceof Date;
    },

    // -----------------------------------------------------------------------
    // In javascript arrays are not true arrays like in java and in other
    // languages. They’re actually objects so typeof will return “object” for
    // them. To know if something’s really an array its constructor can be
    // compared to Array.

    IsArray: function(value) {
        return value && typeof value === 'object' && value.constructor === Array;
    },

    // -----------------------------------------------------------------------
    // RegExp’s are objects so the only thing needed to check is if the
    // constructor is RegExp.

    IsRegExp: function(value) {
        return value && typeof value === 'object' && value.constructor === RegExp;
    },

    // -----------------------------------------------------------------------
    // Errors in javascript are the same as ”exceptions” in many other
    // programming languages. They come in a couple different forms like for
    // instance Error, TypeError and RangeError. An instanceof statement is
    // enough for them all, but just to be extra sure we also check for the
    // ”message” property that errors have.
    
    IsError: function(value) {
        return value instanceof Error && typeof value.message !== 'undefined';
    },

    // -----------------------------------------------------------------------
    // Functions are functions so here just typeof is enough.

    IsFunction: function(value) {
        return typeof value === 'function';
    },

    // For booleans typeof is enough since it returns ”boolean” for both true
    // and false.

    IsBoolean: function(value) {
        return typeof value === 'boolean';
    }
}
