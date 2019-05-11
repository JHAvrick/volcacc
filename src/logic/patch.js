
import EventEmitter from '../util/event-emitter';

/**
 * The VolcaPatch class stores and modifies the complete state of a
 * Volca Bass as far as it can be 
 */
class MidiPatch {
    /**
     * @param {Object} patchData - An object with key/values pairs representing Midi CC params and their values respectively 
     * @param {Object} patchMeta - An object with key/values describing the Midi CC params from the patchData object
     */
    constructor(patchData, patchMeta){
        let loadedPatch = JSON.parse(jsonPatch);
        
        this._data = patchData;
        this._meta = patchMeta;


        this.events = new EventEmitter();
        
    }

    on(event, listener){
        this.events.on(event, listener);
    }

    load(patchData, patchMeta){

        this.events.emit("patchChange");
    }

}


export default Patch;