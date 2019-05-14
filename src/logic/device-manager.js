import EventEmitter from '../util/event-emitter';

class DeviceManager {
    constructor(){
        this.meta = this._initStore();

        /**
         * A reference to the WebMidiJS singleton.
         * Assigned when init() is called.
         */
        this.webMidi = null;

        /**
         * A reference to an input device as provided by the WebMidi library.
         * Can be assigned only after init() is called.
         */
        this.activeInput = null;

        /**
         * A reference to an output device as provided by the WebMidi library.
         * Can be assigned only after init() is called.
         */
        this.activeOutput = null;

        /**
         * Dummy input/output to stand in for missing devices (really unpredictable)
         */
        this.defaultInput = { 
            name: "Input - None",
            playNote: function(){},
            stopNote: function(){},
            sendControlChange: function(){}
        };

        this.defaultOutput = { 
            name: "Output - None",
            playNote: function(){},
            stopNote: function(){},
            sendControlChange: function(){}
        };

        /**
         * Event emitter, emits events related to the connection/disconnection
         * of midi devices and the state of the active input/output.
         */
        this.events = new EventEmitter();
    }

    _initStore(){
        if (localStorage.getItem("volcabass-devices") == null){
            localStorage.setItem("volcabass-devices", JSON.stringify({}));
        }

        return JSON.parse(localStorage.getItem("volcabass-devices"));
    }

    _commitStore(){
        localStorage.setItem("volcabass-devices", JSON.stringify(this.meta));
    }

    on(event, listener){
        this.events.on(event, listener);
    }

    init(WebMidi){
        this.webMidi = WebMidi;

        /**
         * Set up listeners
         */
        this.webMidi.addListener("connected", this._handleConnected.bind(this));
        this.webMidi.addListener("disconnected", this._handleDisconnected.bind(this));

        /**
         * Connect last active devices if they are available
         */
        this.activeInput = this.webMidi.getInputByName(this.meta.inputName) || this.defaultInput;
        this.activeOutput = this.webMidi.getOutputByName(this.meta.outputName) || this.defaultOutput;
        this.events.emit("activeDeviceChange", this.activeInput, this.activeOutput);
    }

    setActiveInput(name){
        if (this.webMidi.getInputByName(name) !== false){
            this.activeInput = this.webMidi.getInputByName(name);
            this.meta.inputName = name;
        }

        this.events.emit("activeDeviceChange", this.activeInput, this.activeOutput);
        this._commitStore();
    }

    setActiveOutput(name){
        if (this.webMidi.getOutputByName(name) !== false){
            this.activeOutput = this.webMidi.getOutputByName(name);
            this.meta.outputName = name;
        }

        this.events.emit("activeDeviceChange", this.activeInput, this.activeOutput);
        this._commitStore();
    }
    
    getInputs(){ return this.webMidi.inputs; }
    getOutputs(){ return this.webMidi.outputs; }

    _handleConnected(e){
        console.log("VolcaCC: Device Connected - " + e.port.name);
        this.events.emit("deviceOptionsChange", this.webMidi.inputs, this.webMidi.outputs);
    }

    _handleDisconnected(e){
        console.log("VolcaCC: Device Disconnected - " + e.port.name);
        if (e.port.name === this.activeInput.name){
            this.activeInput = this.defaultInput;
            this.events.emit("activeDeviceChange", this.activeInput, this.activeOutput);
        }

        if (e.port.name === this.activeOutput.name){
            this.activeOutput = this.defaultOutput;
            this.events.emit("activeDeviceChange", this.activeInput, this.activeOutput);
        }

        this.events.emit("deviceOptionsChange", this.webMidi.inputs, this.webMidi.outputs);
    }
     
}

export default DeviceManager;