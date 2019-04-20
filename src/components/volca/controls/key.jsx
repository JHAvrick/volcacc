import React, { useState, useEffect } from 'react';
import LightPNG from '../../../assets/volca_slices/light.png'
import "./key.css";

function Key(props) {

    const [lightVisibility, setLightVisibility] = useState("hidden");

    return(
        <div 
            onMouseOver={(e) => {
                if (e.buttons === 1 || e.buttons === 3){
                    setLightVisibility("visible");
                    props.onPressed(props.note);
                }
            }} 
            
            onMouseDown={() => { setLightVisibility("visible"); props.onPressed(props.note); }} 
            onMouseUp={() => { setLightVisibility("hidden"); props.onReleased(props.note); }} 
            onMouseOut={() => { setLightVisibility("hidden"); props.onReleased(props.note); }} 
        
            draggable={false} className="key_wrapper"
            style={{left: props.left}}>

            <img draggable={false} className="key_bg-image" alt="Volca Key" src={props.image}></img>
            <img style={{ visibility: lightVisibility }} draggable={false} className="key_light-overlay" alt="Volca Key" src={LightPNG}></img>

        </div>
    );
}

Key.defaultProps = {
    onTriggered: function(){}
}

export default Key;