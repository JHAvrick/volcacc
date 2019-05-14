import React, { useState, useEffect } from 'react';
import "./settings-panel.css";

import SettingsDropdown from './settings-dropdown';
import SettingsToggle from './settings-toggle';
import SettingsModal from './settings-modal';

function SettingsPanel(props) {

    const [modalActive, setModalActive] = useState({ open: false, operation: "new" });
    const [inputDevice, setInputDevice] = useState(props.inputDevice);
    const [inputOptions, setInputOptions] = useState(props.inputOptions);
    const [outputDevice, setOutputDevice] = useState(props.outputDevice);
    const [outputOptions, setOutputOptions] = useState(props.outputOptions);
    const [activePatch, setActivePatch] = useState(props.activePatch);
    const [patchOptions, setPatchOptions] = useState(props.patchOptions);
    const [autoSend, setAutoSend] = useState(true);

    const handleInputSelected = (option) => { 
        props.onInputSelected(option);
        setInputDevice(option); 
    }
   
    const handleOutputSelected = (option) => { 
        props.onOutputSelected(option);
        setOutputDevice(option); 
    } 

    const handlePatchSelected = (option) => { 
        props.onPatchSelected(option);
        setActivePatch(option); 
    } 

    const handledAutoSendToggled = () => { 
        setAutoSend(!autoSend); 
    }

    useEffect(() => setInputDevice(props.inputDevice), [props.inputDevice]);
    useEffect(() => setInputOptions(props.inputOptions), [props.inputOptions]);
    useEffect(() => setOutputDevice(props.outputDevice), [props.outputDevice]);
    useEffect(() => setOutputOptions(props.outputOptions), [props.outputOptions]);
    useEffect(() => setActivePatch(props.activePatch), [props.activePatch]);
    useEffect(() => setPatchOptions(props.patchOptions), [props.patchOptions]);

    const handleNewClicked = () =>  setModalActive({ open: true, operation: "new" });
    const handleDuplicateClicked = () =>  setModalActive({ open: true, operation: "duplicate" });
    const handleModalCancelled = () =>  setModalActive(false);

    const handleModalConfirmed = (value) => {
        setModalActive({ open: false});
        if (modalActive.operation === "new")
            props.onNew(value);
        else
            props.onDuplicate(value);
    }

    return(
        <div className="settings-panel_wrapper">

            <SettingsModal 
                label="Patch Name" 
                active={modalActive.open} 
                onCancelled={handleModalCancelled}
                onConfirmed={handleModalConfirmed}
            />


            <div className="settings-panel_group"> 
                <p className="settings-panel_group-header"> Devices </p>
                <SettingsDropdown value={inputDevice} onSelected={handleInputSelected} options={inputOptions} />
                <SettingsDropdown value={outputDevice} onSelected={handleOutputSelected} options={outputOptions} />
            </div>

            <div className="settings-panel_group"> 
                <p className="settings-panel_group-header"> Patch </p>

                <SettingsDropdown value={activePatch} onSelected={handlePatchSelected} options={patchOptions} />

                <div className="settings-panel_line "> 
                    <button onClick={handleNewClicked} style={{width:"50%"}} className="settings-panel_button button-green"> New </button>
                    <button onClick={handleDuplicateClicked} style={{width:"50%"}} className="settings-panel_button button-blue"> Copy </button>
                </div>

                <div className="settings-panel_line"> 
                    <button style={{width:"100%"}} onClick={props.onPatchDeleted} className="settings-panel_button button-red"> Delete </button>
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
    activePatch: { name: "No Patch", value: null },
    patchOptions: [],
    onNew: function(){},
    onPatchSelected: function(){},
    onPatchDeleted: function(){},
    onDuplicate: function(){},
    onInputSelected: function(){},
    onOutputSelected: function(){}
}


export default SettingsPanel;