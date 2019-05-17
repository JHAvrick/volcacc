/**
 * This MidiController is responsible for sending the actual
 * midi messages to a selected output.
 */
class MidiController {
    constructor(){
        this.input = null;
        this.output = null;
    }

    _handleInputNoteOn(e){
        this.keyPress(e.note.number);
    }

    _handleInputNoteOff(e){
        this.keyRelease(e.note.number);
    }

    _handleInputCC(e){
        this.cc(e.controller.number, e.value);
    }

    setInput(input){ 
        if (input == null) return;
        if (this.input != null){
            try {
                this.input.removeListener("noteon", "all", this._handleInputNoteOn.bind(this));
                this.input.removeListener("noteoff", "all", this._handleInputNoteOff.bind(this));
                this.input.removeListener("controlchange", "all", this._handleInputCC.bind(this));
            } catch (err) {
                console.log("Output Error: ");
                console.log(err);   
            }
        }

        this.input = input; 
        try {
            this.input.addListener("noteon", "all", this._handleInputNoteOn.bind(this));
            this.input.addListener("noteoff", "all", this._handleInputNoteOff.bind(this));
            this.input.addListener("controlchange", "all", this._handleInputCC.bind(this));
        } catch (err) {
            console.log("Output Error: ");
            console.log(err);   
        }
    }

    setOutput(output){ 
        this.output = output; 
    }

    /**
     * 
     * @param {Object} patch - Patch data object w/ key/values pairs of cc
     */
    patch(patch){
        let data = patch.data;
        let ccValues = patch.cc;
        for (let name in ccValues){
            this.cc(ccValues[name], data[name]);
        }
    }

    cc(cc, value){
        if (this.output != null){
            try {
                this.output.sendControlChange(cc, value);
            } catch (err) {
                console.log("Output Error: ");
                console.log(err);    
            }
        }
    }

    keyPress(note){
        if (this.output != null){
            try {
                this.output.playNote(note, "all", {velocity: 1});
            } catch (err){
                console.log("Output Error: ");
                console.log(err);
            }
        }
    }

    keyRelease(note){
        if (this.output != null){
            try {
                this.output.stopNote(note);
            } catch (err) {
                console.log("Output Error: ");
                console.log(err);
            }
        }     
    }

}

export default MidiController;