import React, { useState, useEffect } from 'react';
import './App.css';

import SettingsPanel from "./components/settings/settings-panel";
import Volca from "./components/volca/volca";
import VolcaController from './logic/volca-controller';
import VolcaBassDefaultPatch from './resources/volca-bass-default-patch';

const volcaController = new VolcaController(VolcaBassDefaultPatch);

function App(){

  //const [octave, setOctave] = useState(127);
  const [patch, setPatch] = useState(volcaController.patch);

  useEffect(() => {
    volcaController.on("patchChange", (newPatch) => {
      setPatch(Object.assign({}, patch, newPatch));
    });
  },[]);

  return(      
    <div className="App">

      <div className="spacer"></div>
          <div className="app_content-wrapper">

            <Volca  patch={patch} 
                onCC={ (name, value, cc) => volcaController.cc(name, value, cc) } 
                onKeyPress={ (note) => volcaController.keyPress(note) }
                onKeyRelease={ (note) => volcaController.keyRelease(note) }
                onFuncToggle={ (name, active) => volcaController.func(name, active) }
                />

            <SettingsPanel />
          
          </div>

      <div className="spacer"></div>
    </div>)

}

export default App;
