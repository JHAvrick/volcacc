import convertRange from '../../../util/convert-range';

const convertPitchDisplay = function(value){
    if (value <= 25)
        return Math.floor(convertRange(value, 25, 0, -1, -12)) + "n";
    if (value <= 60)
        return Math.floor(convertRange(value, 60, 26, 0, -100)) + "c";
    if (value > 60 && value < 68)
        return "off";
    if (value > 68 && value < 100)
        return Math.floor(convertRange(value, 68, 99, 0, 100)) + "c";
    if (value > 100)
        return Math.floor(convertRange(value, 100, 127, 1, 12)) + "n";
}

/**
 * These functions are used to get the display values for certain Controls
 * which use a midi range (0 to 127) internally but show different, more
 * informative values on the LED screen.
 */
export default {
    octave: function(value) {
        return Math.floor(convertRange(value, 0, 127, 1, 6));
    },
    tempo: function(value) { 
        return Math.floor(convertRange(value, 0, 127, 56, 240));
    },
    pitch1: convertPitchDisplay,
    pitch2: convertPitchDisplay,
    pitch3: convertPitchDisplay,
}


