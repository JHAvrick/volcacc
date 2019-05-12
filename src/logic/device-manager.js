import EventEmitter from '../util/event-emitter';

class DeviceManager {
    constructor(){
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
         * Event emitter, emits events related to the connection/disconnection
         * of midi devices and the state of the active input/output.
         */
        this.events = new EventEmitter();
    }

    on(event, listener){
        this.events.on(event, listener);
    }

    init(WebMidi){
        this.webMidi = WebMidi;
        this.webMidi.addListener("connected", this._handleConnected.bind(this));
        this.webMidi.addListener("disconnected", this._handleDisconnected.bind(this));
    }

    _handleConnected(e){
        console.log(e);
    }

    _handleDisconnected(e){
        console.log(e);
    }
    

    

}

export default DeviceManager;