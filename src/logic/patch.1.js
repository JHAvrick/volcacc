
import EventEmitter from '../util/event-emitter';

/**
 * The VolcaPatch class stores and modifies the complete state of a
 * Volca Bass as far as it can be 
 */
class Patch {
    /**
     * @param {String} name - The name of the patch
     * @param {String} jsonPatch - A JSON string that can be used to hydrate this classes properties
     */
    constructor(name = "Untitled", jsonPatch = "{}"){
        let loadedPatch = JSON.parse(jsonPatch);
        
        this.dateCreated = loadedPatch.dateCreated || new Date().toDateString();
        this.name = loadedPatch.name || name;

        /**
         * This object holds Midi Control properties that can actually be recieved by 
         * the Volca Bass
         */
        this.cc = Object.assign({}, VolcaPatch.defaultCC, JSON.parse(loadedPatch.cc));

        /**
         * Simple event emitter, used to notify subscriptions of when the patch has been altered.
         */
        this.events = new EventEmitter();
        
    }

    /**
     * Wrapper function for EventEmitter.on()
     * 
     * @param {String} event - The event to listen for
     * @param {Function} listener - The event's callback function
     */
    on(event, listener){
        this.events.on(event, listener);
    }

    /**
     * Change one of the midi control parameters for this patch
     * 
     * @param {String} param - The midi control parameter to adjust
     * @param {Number} value - A value between 0 and 127 
     */
    setCC(param, value){
        if (this.cc[param] != null){
            this.cc[param] = value;
            //this.events.emit("patchChange", this.toString());
        }
    }

    /**
     * Returns the midi control parameters of this patch
     */
    getCC(){
        return this.cc;
    }

    /**
     * Returns another instance of VolcaPatch with the same properties,
     * omitting the dateCreated property.
     */
    getCopy(){
        return new VolcaPatch(this.name , JSON.stringify({
            name: this.name.concat("_copy"),
            cc: this.cc
        }));
    }

    /**
     * Returns this patch as a string for storing
     */
    toString(){
        return JSON.stringify({
            dateCreated: this.dateCreated,
            name: this.name,
            cc: this.cc
        });
    }

    getParams(){
        return {
            slideTime: { controllable: true, cc: 5 },
            expression: { controllable: true, cc: 11 },
            octave: { controllable: true, cc: 40 },
            lfoRate:{ controllable: true, cc: 41 },
            lfoInt: { controllable: true, cc: 42 },
            vcoPitch1: { controllable: true, cc: 43 },
            vcoPitch2: { controllable: true, cc: 44 },
            vcoPitch3: { controllable: true, cc: 45 },
            egAttack: { controllable: true, cc: 46 },
            egDecayRelease: { controllable: true, cc: 47 },
            cutoffEgInt: { controllable: true, cc: 48 },
            gateTime: { controllable: true, cc: 49 },
        }
    }
}

VolcaPatch.defaultCC = {
    octave: 0,
    lfoRate: 0,
    lfoInt: 0,
    vcoPitch1: 0,
    vcoPitch2: 0,
    vcoPitch3: 0,
    attack: 0,
    decay: 0,
    cutoffEgInt: 0
}

export default Patch;