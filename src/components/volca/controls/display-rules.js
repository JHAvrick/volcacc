import convertRange from '../../../util/convert-range';

const convertPitchDisplay = function(value){
    if (value <= 12)
        return Math.floor(convertRange(value, 12, 0, -1, -12)) + "n";
    if (value <= 55.5)
        return Math.floor(convertRange(value, 55.5, 12, 0, -100)) + "c";
    if (value > 55.5 && value < 71.5)
        return "off";
    if (value > 71.5 && value < 115)
        return Math.floor(convertRange(value, 71.5, 115, 0, 100)) + "c";
    if (value >= 115){
        return Math.round(convertRange(value, 115, 127, 1, 12)) + "n";
    }
        
}

/**
 * These functions are used to get the display values for certain Controls
 * which use a midi range (0 to 127) internally but show different, more
 * informative values on the LED screen.
 */
export default {
    octave: function(value) {
        if (value < 22)
            return 1;
        if (value >= 22 && value < 42)
            return 2;
        if (value >= 42 && value < 63)
            return 3;
        if (value >= 63 && value < 87)
            return 4;
        if (value >= 87 && value < 110)
            return 5;
        
        return 6;
    },
    tempo: function(value) { 
        return Math.floor(convertRange(value, 0, 127, 56, 240));
    },
    pitch1: convertPitchDisplay,
    pitch2: convertPitchDisplay,
    pitch3: convertPitchDisplay,
}


