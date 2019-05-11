import React, { useState, useEffect } from 'react';
import "./settings-toggle.css";

function SettingsToggle(props) {

    const [value, setValue] = useState(props.value);
    useEffect(() => setValue(props.value), [props.value]);

    return(
        <div className="settings-toggle_wrapper">
            <div className="settings-toggle_toggle" onClick={props.onToggle}> 
                <div className="settings-toggle_fill" style={{ visibility: value ? "visible" : "hidden" }} > 
                </div>
            </div>
            {props.label}
        </div>
    );
}

SettingsToggle.defaultProps = {
    value: true,
    onToggled: function(){}
}

export default SettingsToggle;