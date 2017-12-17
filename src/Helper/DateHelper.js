'use strict';

const KString = require('./KDateStringHelper');

module.exports = {
    // -----------------------------------------------------------------------
    // Takes the difference between two dates and creates a string of the
    // difference such as: 2 hour, 45 minutes and 12 seconds.
    // -----------------------------------------------------------------------

    DateDiffPrettyString: function(dtFrom, dtTo) {
        var PrettyString = '';
        var diff;
        
        if (dtFrom > dtTo)
            diff = dtFrom.getTime() - dtTo.getTime();
        else
            diff = dtTo.getTime() - dtFrom.getTime();
        
        assert(diff > 0);
        
        var ElapsedDays = Math.trunc(diff / (1000*60*60*24));
        assert(ElapsedDays < 30);
        
        var Remainder = diff % (1000*60*60*24);
        
        var ElapsedHours = Math.trunc(Remainder / (1000*60*60));
        assert(ElapsedHours < 24);
        Remainder = Remainder % (1000*60*60);
        
        var ElapsedMinutes = Math.trunc(Remainder / (1000*60));
        assert(ElapsedMinutes < 60);
        
        if (ElapsedDays > 0) {
            if (ElapsedDays === 1) {
                PrettyString += KString.DatePrettyDaySingular;
            } else {
                PrettyString += KString.DatePrettyDaysPlural.replace(KString.Count, ElapsedDays.toString());
            }
        }
                
        if (ElapsedHours > 0) {
            if (ElapsedDays > 0) {
                if (ElapsedMinutes > 0) {
                    // Days, hours and minutes
                    PrettyString += KString.DatePrettyPreviousToLastSeparator;
        
                    if (ElapsedHours === 1) {
                        PrettyString += KString.DatePrettyHourSingular;
                    } else {
                        PrettyString += KString.DatePrettyHoursPlural.replace(KString.Count, ElapsedHours.toString());
                    }
        
                    PrettyString += KString.DatePrettyLastSeparator;
        
                    if (ElapsedMinutes === 1) {
                        PrettyString += KString.DatePrettyMinuteSingular;
                    } else {
                        PrettyString += KString.DatePrettyMinutesPlural.replace(KString.Count, ElapsedMinutes.toString());
                    }
                } else {
                    // Days and hours. No minutes
                    PrettyString += KString.DatePrettyLastSeparator;
        
                    if (ElapsedHours === 1) {
                        PrettyString += KString.DatePrettyHourSingular;
                    } else {
                        PrettyString += KString.DatePrettyHoursPlural.replace(KString.Count, ElapsedHours.toString());
                    }
                }                    
            } else {
                // No days, Hours and possibly minutes
                if (ElapsedHours === 1) {
                    PrettyString += KString.DatePrettyHourSingular;
                } else {
                    PrettyString += KString.DatePrettyHoursPlural.replace(KString.Count, ElapsedHours.toString());
                }
        
                if (ElapsedMinutes > 0) {
                    PrettyString += KString.DatePrettyLastSeparator;
        
                    if (ElapsedMinutes === 1) {
                        PrettyString += KString.DatePrettyMinuteSingular;
                    } else {
                        PrettyString += KString.DatePrettyMinutesPlural.replace(KString.Count, ElapsedMinutes.toString());
                    }    
                }
            }
        } else {
            // No hours
            if (ElapsedDays > 0) {
                if (ElapsedMinutes > 0) {
                        PrettyString += KString.DatePrettyLastSeparator;
                }
        
                if (ElapsedMinutes === 1) {
                    PrettyString += KString.DatePrettyMinuteSingular;
                } else if (ElapsedMinutes > 1) {
                        PrettyString += KString.DatePrettyMinutesPlural.replace(KString.Count, ElapsedMinutes.toString());
                }
            } else {
                // No days and no hours
        
                if (ElapsedMinutes === 1) {
                    PrettyString += KString.DatePrettyMinuteSingular;
                } else if (ElapsedMinutes > 1) {
                    PrettyString += KString.DatePrettyMinutesPlural.replace(KString.Count, ElapsedMinutes.toString());
                }
            }
        }
        
        return PrettyString;
    }
}
