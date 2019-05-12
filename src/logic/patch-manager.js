import shortid from 'shortid';
import VolcaBassDefaultPatch from '../resources/volca-bass-default-patch';
import EventEmitter from '../util/event-emitter';

/**
 * The PatchManager is responsible for storing/retreiving patches as well as managing 
 * the state of the active patch and emitting events when the patch is altered.
 */
class PatchManager {
    constructor(defaultPatch = VolcaBassDefaultPatch){
        this._initStore();

        /**
         * If no use patches exist, the default patch is assigned to activePatch
         */
        this.defaultPatch = defaultPatch;

        /**
         * Initiate patches dictionary from store
         */
        this.patches = JSON.parse(localStorage.getItem("volcabass-patches"));

        /**
         * Initiate patch meta config object from store
         */
        this.meta = JSON.parse(localStorage.getItem("volcabass-patch-meta"));

        /**
         * Set the current active patch or fallback to the default patch
         */
        this.activePatch = null;
        if (this.meta.lastActive != null && this.patches[this.meta.lastActive] != null){
            this.activePatch = this.patches[this.meta.lastActive];
        } else if (Object.keys(this.patches).length !== 0){
            this.activePatch = this.patches[Object.keys(this.patches)[0]]
        } else {
            this.activePatch = {
                meta: {...this.defaultPatch.meta},
                data: {...this.defaultPatch.data}
            };
        }

        /**
         * Set the current active patch
         */
        this.events = new EventEmitter();
    }

    /**
     * Wrapper for EventEmitter's on() function
     * 
     * @param {String} event 
     * @param {Callback} listener 
     */
    on(event, listener){
        this.events.on(event, listener);
    }

    /**
     * If no patch or meta store exists in localStorage, this function creates it.
     * Should only be called internally.
     */
    _initStore(defaultPatch){
        if (localStorage.getItem("volcabass-patches") == null){
            localStorage.setItem("volcabass-patches", JSON.stringify({}));
        }

        if (localStorage.getItem("volcabass-patch-meta") == null){
            localStorage.setItem("volcabass-patch-meta", JSON.stringify({}));   
        }
    }

    /**
     * Commits and changes to localStorage
     */
    _commitStore(){
        localStorage.setItem("volcabass-patches", JSON.stringify(this.patches));
    }

    /**
     * Edit the value of one of the active patch's CC parameters. 
     * Triggers a patchChange event nad CC event.
     * 
     * @param {String} name - The name of the Control Change parameter
     * @param {Number} value - A value between 0 and 127
     */
    cc(name, value, cc){
        //Check if the CC parameter exists in this patch
        if (this.activePatch.data[name] != null){
            this.activePatch.data[name] = value;
        }

        this.events.emit("cc", name, value, cc);
        this.events.emit("patchChange", { 
            meta: {...this.activePatch.meta},
            data: {...this.activePatch.data}
        });

        this._commitStore();
    }

    /**
     * 
     * @param {} name 
     * @param {Boolean} active 
     */
    func(name, active){
        if (this.activePatch.data[name] != null){
            this.activePatch.data[name] = !active;
        }    

        this.events.emit("patchChange", { 
            meta: {...this.activePatch.meta},
            data: {...this.activePatch.data}
        });

        this._commitStore();
    }

    setActivePatch(id){
        if (this.patches[id]){
            this.activePatch = this.patches[id];
            this.events.emit("patchSwitch", this.activePatch);
        } 
    }

    /**
     * Creates a new patch with given name and makes it the active patch
     * 
     * @param {String} name - The name for the new patch 
     */
    newPatch(name){
        //Clone default patch
        let newPatch = {
            meta: {
                ...this.defaultPatch.meta,
                name: name,
                id: "id".concat(shortid.generate())
            },
            data: {
                ...this.defaultPatch.data
            }
        }
        

        //Add to patch dictionary
        this.patches[newPatch.meta.id] = newPatch;

        //Make active patch
        this.activePatch = this.patches[newPatch.meta.id];

        this.events.emit("patchSwitch", this.activePatch);
        this.events.emit("patchOptionsChange", this.patches);

        this._commitStore();
    }

    duplicateActivePatch(name){
        let newPatch = {
            meta: {
                ...this.activePatch.meta,
                name: name,
                id: "id".concat(shortid.generate())
            },
            data: {
                ...this.activePatch.data
            }
        }

        //Add to patch dictionary
        this.patches[newPatch.meta.id] = newPatch;

        //Make active patch
        this.activePatch = this.patches[newPatch.meta.id];

        this.events.emit("patchSwitch", this.activePatch);
        this.events.emit("patchOptionsChange", this.patches);

        this._commitStore();
    }

    deleteActivePatch(){
        delete this.patches[this.activePatch.meta.id];

        //There was only one patch, fallback to the default
        if (Object.keys(this.patches).length === 0){
            this.activePatch = {
                meta: {...this.defaultPatch.meta},
                data: {...this.defaultPatch.data}
            }
        } else {
            this.activePatch = this.patches[Object.keys(this.patches)[0]];
        }

        this.events.emit("patchSwitch", this.activePatch);
        this.events.emit("patchOptionsChange", this.patches);   

        this._commitStore();
    }

    getPatchesAsArray(){
        var patches = [];
        for (var patchID in this.patches){
            patches.push({
                id: patchID,
                meta: this.patches[patchID].meta,
                data: this.patches[patchID].data,
            })
        }

        return patches;
    }

}

export default PatchManager;