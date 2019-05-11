import React, { useState } from 'react';
import LightPNG from '../../../assets/volca_slices/light.png'
import "./light-toggle.css";

function LightToggle(props) {
    return(
        <div    className="light-toggle_wrapper"
                style={{left: props.left}}
                draggable={false} 
                
                onClick={() => { props.onToggle(props.name, props.active) }} >
            
            
            <img    style={{ display: props.active === true ? "block" : "none" }} 
                    draggable={false} 
                    className="key_bg-image" 
                    alt="Volca Light Toggle" 
                    src={LightPNG}>
            </img>


        </div>
    );
}

LightToggle.defaultProps = {
    active: false
}

export default LightToggle;