/**
 * Returns a functionless dummy midi device with a given name. These are the 
 * default devices used by the MidiController when no real device is chosen
 * or available.
 * 
 * @param {String} name
 * 
 */
function getDummyDevice(name){
    return {
        name: name,
        playNote: function(){},
        stopNote: function(){},
        sendControlChange: function(){},
        addListener: function(){},
        removeListener: function(){}
    }
}

export default getDummyDevice;