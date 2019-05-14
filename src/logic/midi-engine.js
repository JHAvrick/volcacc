import WebMidi from 'webmidi';
//import DeviceManager from './device-manager';
import PatchManager from './patch-manager';
import DeviceManager from './device-manager';
import EventEmitter from '../util/event-emitter';
import MidiController from './midi-controller';


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
    controller: new MidiController(),
    events: new EventEmitter(),
    init(){
        WebMidi.enable((err) => {
            if (err) {
                console.warn('VOLCACC: WebMidi failed to start. See error message below.');
                console.warn(err);

                this.events.emit("midiFailure", err);
                return;
            }

            /**
             * Connect thej midi controller to the data model. The controller does
             * not modify the data model, just passively listens for changes
             * and sends appropriate messages to the active device output
             */
            this.devices.on("activeDeviceChange", (input, output) => {
                this.controller.setInput(input);
                this.controller.setOutput(output);
            })

            this.patches.on("cc", (cc, value) => this.controller.cc(cc, value));
            this.patches.on("patchSwitch", (newPatch) => this.controller.patch(newPatch));

            this.devices.init(WebMidi);
            console.log('VOLCACC: WebMidi started successfully.');
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
    },

    getInputOptions(){
        return this.devices.getInputs()
        .filter((input) => input.state === "connected" && input.connection === "open")
        .map((input) => { 
            return { name: input.name, value: input.name}
        });
    },

    getOutputOptions(){
        return this.devices.getOutputs()
        .filter((output) => output.state === "connected" && output.connection === "open")
        .map((output) => { 
            return { name: output.name, value: output.name}
        });
    }

}

export default MidiEngine;