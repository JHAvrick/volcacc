import WebMidi from 'webmidi';
import EventEmitter from '../util/event-emitter';

/**
 * This VolcaController class is the actual midi interface which 
 * sends messages to the Vocla Bass hardware unit.
 */
class VolcaController {
    constructor(patch){
        this.patch = patch;

        WebMidi.enable((err) => {
            console.log(WebMidi.inputs);
            console.log(WebMidi.outputs);
            this.output = WebMidi.outputs[0];
        });

        this.events = new EventEmitter();
    }

    on(event, listener){
        this.events.on(event, listener);
    }

    loadPatch(newPatch){
        this.patch = Object.assign({}, this.patch, newPatch);
        this.events.emit("patchChange", this.patch);
    }

    cc(param, value, cc){
        if (cc != null && this.output != null){
            this.output.sendControlChange(cc, value);
        }
        
        //let obj = {};
       // obj[param] = value;

        this.patch[param] = value;
        this.patch = {...this.patch};
        

        //this.patch = Object.assign({}, this.patch, obj);
        this.events.emit("patchChange", this.patch);
    }

    keyPress(note){
        if (this.output != null)
            this.output.playNote(note);
    }

    keyRelease(note){
        if (this.output != null)
            this.output.stopNote(note);
    }

    func(name, active){
        console.log(name, active);

        let modifier = {};
            modifier[name] = !active;

        this.patch = Object.assign({}, this.patch, modifier);
        this.events.emit("patchChange", this.patch);
    }

}

export default VolcaController;