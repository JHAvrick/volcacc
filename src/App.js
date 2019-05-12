import React, { useState, useEffect } from 'react';
import './App.css';

import SettingsPanel from "./components/settings/settings-panel";
import Volca from "./components/volca/volca";
import VolcaController from './logic/volca-controller';
import VolcaBassDefaultPatch from './resources/volca-bass-default-patch';

//const volcaController = new VolcaController(VolcaBassDefaultPatch);

import MidiEngine from './logic/midi-engine';


function App(){

  const [patchData, setPatchData] = useState(MidiEngine.getPatchData());
  const [patchMeta, setPatchMeta] = useState(MidiEngine.getPatchMeta());
  const [patchOptions, setPatchOptions] = useState(MidiEngine.getPatchOptions());

  useEffect(() => {
    /**
     * Emitted when any part of the patch data is modified
     */
    MidiEngine.patches.on("patchChange", (alteredPatch) => {
      setPatchData(alteredPatch.data);
    });

      /**
     * Emitted when any part of the patch data is modified
     */
    MidiEngine.patches.on("patchOptionsChange", () => {
      setPatchOptions(MidiEngine.getPatchOptions());
    });

    /**
     * Emitted when the active patch is switched
     */
    MidiEngine.patches.on("patchSwitch", (otherPatch, patchID) => {
      //This state value is used by the Volca UI
      setPatchData(otherPatch.data);

      //This state value is used by the settings panel patch dropdown
      setPatchMeta({ name: otherPatch.meta.name, value: otherPatch.meta.id });

      //TO DO: Send fresh patch to device from controller
    });

    MidiEngine.devices.on("inputsConnected", (devices) => {

    });
    
    MidiEngine.devices.on("outputsConnected", (devices) => {

    });

    MidiEngine.devices.on("inputActivated", (devices) => {

    });

    MidiEngine.devices.on("outputActivated", (devices) => {

    });

    //TO DO: on 'inputDevcieConnected' event, refresh 'inputDeviceOptions' state
    //TO DO: on 'outputDevcieConnected' event, refresh 'outputDeviceOptions' state


  },[]);

  return(
    <div className="App">

      <div className="spacer"></div>
          <div className="app_content-wrapper">

            <Volca  patch={patchData} 
                onCC={ (name, value, cc) => MidiEngine.patches.cc(name, value, cc) } 
                //onKeyPress={ (note) => volcaController.keyPress(note) }
                //onKeyRelease={ (note) => volcaController.keyRelease(note) }
                onFuncToggle={ (name, active) => MidiEngine.patches.func(name, active) }
            />

            <SettingsPanel 
              activePatch={patchMeta}
              patchOptions={patchOptions}
              onNew={(name) => MidiEngine.patches.newPatch(name)}
              onDuplicate={(name) => MidiEngine.patches.duplicateActivePatch(name) }
              onPatchSelected={(option) => MidiEngine.patches.setActivePatch(option.value)}
              onPatchDeleted={() => MidiEngine.patches.deleteActivePatch() }
            />
          
          </div>

      <div className="spacer"></div>
    </div>)

}

//Data Model
  //DEVICES:
    //Device Input
    //Device Output
    //Device Options
  ///PATCHES:
    //Active Patch Meta
    //Active Patch Data
    //Patch Options

//Data Model Effects
  //CC Message
  //Func Buttons
  //

export default App;
