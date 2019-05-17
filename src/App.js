import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * Primary views
 */
import Footer from "./components/footer/footer";
import ContentStandin from "./components/standin/standin";
import SettingsPanel from "./components/settings/settings-panel";
import Volca from "./components/volca/volca";

/**
 * Data model controller
 */
import MidiEngine from './logic/midi-engine';

function App(){

  const [patchData, setPatchData] = useState(MidiEngine.getPatchData());
  const [patchMeta, setPatchMeta] = useState(MidiEngine.getPatchMeta());
  const [patchOptions, setPatchOptions] = useState(MidiEngine.getPatchOptions());
  const [inputOptions, setInputOptions] = useState([]);
  const [outputOptions, setOutputOptions] = useState([]);
  const [inputDevice, setInputDevice] = useState();
  const [outputDevice, setOutputDevice] = useState();
  const [showSendable, setShowSendable] = useState(false);

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
    });

    MidiEngine.devices.on("deviceOptionsChange", (inputs, outputs) => {
      setInputOptions(MidiEngine.getInputOptions());
      setOutputOptions(MidiEngine.getOutputOptions());
    });
    
    MidiEngine.devices.on("activeDeviceChange", (input, output) => {
      setInputDevice({name: input.name, value: input.name});
      setOutputDevice({name: output.name, value: output.name});
    });

    /**
     * Starting the MidiEngine will allow the device list to populate, which will 
     * trigger events causing a rerender, so we wait until all our data binding is
     * done to start the midi engine.
     */
    MidiEngine.init();
  },[]);

  return(
    <div className="App">
      
      <div className="app_header"> 
        <h1> VolcaCC </h1>
      </div>
      
      <div className="spacer"></div>

          <ContentStandin />

          <div className="app_content-wrapper">
            <Volca  patch={patchData} 
                onCC={ (name, value, cc) => MidiEngine.patches.cc(name, value, cc) } 
                onKeyPress={ (note) => MidiEngine.controller.keyPress(note) }
                onKeyRelease={ (note) => MidiEngine.controller.keyRelease(note) }
                onFuncToggle={ (name, active) => MidiEngine.patches.func(name, active) }
                showSendable={ showSendable }
            />

            <SettingsPanel 
              activePatch={patchMeta}
              patchOptions={patchOptions}
              inputDevice={inputDevice}
              inputOptions={inputOptions}
              outputDevice={outputDevice}
              outputOptions={outputOptions}
              onInputSelected={(option) => MidiEngine.devices.setActiveInput(option.value)}
              onOutputSelected={(option) => MidiEngine.devices.setActiveOutput(option.value)}
              onNew={(name) => MidiEngine.patches.newPatch(name)}
              onDuplicate={(name) => MidiEngine.patches.duplicateActivePatch(name) }
              onPatchSelected={(option) => MidiEngine.patches.setActivePatch(option.value)}
              onPatchDeleted={() => MidiEngine.patches.deleteActivePatch() }
              onShowSendableToggled={(value) =>  setShowSendable(!value)}
              showSendable={showSendable}
            />
          </div>

      <div className="spacer"></div>

      <Footer />

    </div>)

}

export default App;
