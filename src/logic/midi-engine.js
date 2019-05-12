import WebMidi from 'webmidi';
//import DeviceManager from './device-manager';
import PatchManager from './patch-manager';
import DeviceManager from './device-manager';
import EventEmitter from '../util/event-emitter';
//import VolcaController from './volca-controller';


/**
 * The MidiEngine singleton contains the systems which control the
 * app's data model. The singleton also contains some convenience
 * functions for accessing / transforming data, as the data model
 * does not map perfectly to the views.
 */
const MidiEngine = {
    //devices: new DeviceManager(WebMidi), 
    patches: new PatchManager(),
    devices: new DeviceManager(),
    events: new EventEmitter(),
    init(){
        WebMidi.enable((err) => {
            if (err) {
                this.events.emit("midiFailure", err);
                return;
            }

            this.deviceManager.init(WebMidi);

        });
    },

    /**
     * Returns a name/value pair (the name & patch ID) for the active patch
     */
    getPatchMeta(){
        return {
            name: this.patches.activePatch.meta.name,
            value: this.patches.activePatch.meta.id
        }
    },

    /**
     * Returns a name/value pair (the name & patch ID) for the active patch
     */
    getPatchData(){
        return this.patches.activePatch.data;
    },

        /**
     * Returns a name/value pair (the name & patch ID) for the active patch
     */
    getPatchOptions(){
        return this.patches.getPatchesAsArray().map(
            (patch) => {return { name: patch.meta.name, value: patch.id }} 
        )
    }

}

export default MidiEngine;