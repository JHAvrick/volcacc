import React, { useState } from 'react';
import "./settings-panel.css";
import SettingsDropdown from './settings-dropdown';
import SettingsToggle from './settings-toggle';

function SettingsPanel(props) {

    const [inputDevice, setInputDevice] = useState(props.inputDevice);
    const [inputOptions, setInputOptions] = useState(props.inputOptions);
    const [outputDevice, setOutputDevice] = useState(props.outputDevice);
    const [outputOptions, setOutputOptions] = useState(props.outputOptions);
    const [activePatch, setActivePatch] = useState(props.patch);
    const [patchOptions, setPatchOptions] = useState(props.patchOptions);
    const [autoSend, setAutoSend] = useState(true);

    const handleInputSelected = (option) => { setInputDevice(option); }
    const handleOutputSelected = (option) => { setOutputDevice(option); } 
    const handlePatchSelected = (option) => { setActivePatch(option); } 
    const handledAutoSendToggled = () => { setAutoSend(!autoSend); }

    return(
        <div className="settings-panel_wrapper">

            <div className="settings-panel_group"> 
                <p className="settings-panel_group-header"> Devices </p>
                <SettingsDropdown value={inputDevice} onSelected={handleInputSelected} options={inputOptions} />
                <SettingsDropdown value={outputDevice} onSelected={handleOutputSelected} options={outputOptions} />
            </div>

            <div className="settings-panel_group"> 
                <p className="settings-panel_group-header"> Patch </p>

                <SettingsDropdown value={activePatch} onSelected={handlePatchSelected} options={patchOptions} />

                <div className="settings-panel_line "> 
                    <button style={{width:"100%"}} className="settings-panel_button button-green"> New </button>
                    <button onClick={props.onDeletePatch} className="settings-panel_button button-red"> Delete </button>
                </div>

                <div className="settings-panel_line"> 
                    <button onClick={props.onSavePatch} className="settings-panel_button"> Save </button>
                    <button style={{width:"100%"}} className="settings-panel_button"> Save As Copy </button>
                </div>

                <div className="settings-panel_line "> 
                    <SettingsToggle label="Auto Send" value={autoSend} onToggle={handledAutoSendToggled} />
                    {(() => autoSend ? "" : (<button onClick={props.onSendPatch} className="settings-panel_button"> Send </button>))()}
                </div>
            </div>


        </div>
    );
}

SettingsPanel.defaultProps = {
    inputDevice: { name: "Input - None", value: null },
    inputOptions: [],
    outputDevice: { name: "Output - None", value: null },
    outputOptions: [],
    patch: { name: "No Patch", value: null },
    patchOptions: []
}


export default SettingsPanel;