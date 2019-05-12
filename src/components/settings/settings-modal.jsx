import React, { useState, useEffect, useRef } from 'react';
import "./settings-modal.css";

function SettingsModal(props) {

    const inputEl = useRef(null);
    const [active, setActive] = useState(false);

    //Confirm input when enter is pressed
    const handleInputKeyPress = (e) => {
        if (active){
            if (e.key.toUpperCase() === "ENTER"){
                if (inputEl.current.value.length < 1) return;
                props.onConfirmed(inputEl.current.value);
                return;
            }

            if (e.key.toUpperCase() === "ESCAPE"){
                props.onCancelled();
            }
        }
    }

    useEffect(() => { 
        setActive(props.active);
        if (props.active){
            inputEl.current.value = "";
            inputEl.current.focus();
            inputEl.current.select();
        } 
    });

    return(
        <div style={{ display: active ? "flex" : "none" }} className="settings-toggle_overlay">
            <div> 
                <p> {props.label} </p>
                <input onKeyDown={handleInputKeyPress} minLength={1} maxLength={24} ref={inputEl} type="text" />
                <div className="settings-modal_button-tray"> 
                    <button onClick={props.onCancelled} style={{marginRight: "10px"}}> Cancel </button>
                    <button onClick={() => { 
                        if (inputEl.current.value.length < 1) return;
                        props.onConfirmed(inputEl.current.value);
                    }} > Confirm </button>
                </div>
            </div>
        </div>
    );
}

SettingsModal.defaultProps = {
    onCancelled: function(){},
    onConfirmed: function(){}
}

export default SettingsModal;