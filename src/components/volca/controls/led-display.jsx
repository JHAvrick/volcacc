import React from 'react';
import DisplayRules from './display-rules';
import "./led-display.css";

function LEDDisplay(props) {

    const readout = () => {
        if (props.display === false) return "";

        if (DisplayRules[props.display.name] != null)
            return DisplayRules[props.display.name](props.display.value);
        
        return props.display.value;
    }

    return(
        <div    className="led-display_wrapper"
                draggable={false} 
                style={{left: props.left}}>

            { readout() }
            
        </div>
    );
}

export default LEDDisplay;