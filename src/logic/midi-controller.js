/**
 * This MidiController is responsible for sending the actual
 * midi messages to a selected output.
 */
class MidiController {
    constructor(){
        this.input = null;
        this.output = null;
    }

    setInput(input){ this.input = input; }
    setOutput(output){ this.output = output; }

    /**
     * 
     * @param {Object} patch - Patch data object w/ key/values pairs of cc
     */
    patch(patch){
        let data = patch.data;
        let ccValues = patch.cc;
        for (let name in ccValues){
            console.log(name, ccValues[name], data[name]);
            this.cc(ccValues[name], data[name]);
        }
    }

    cc(cc, value){
        if (this.output != null){
            this.output.sendControlChange(cc, value);
        }
    }

    keyPress(note){
        if (this.output != null)
        try {
            this.output.playNote(note, "all", {velocity: 1});
        } catch (err){
            console.log("Output Error: ");
            console.log(err);
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