import React, { useState } from 'react';
import LightPNG from '../../../assets/volca_slices/light.png'
import "./key.css";

function Key(props) {

    const [lightVisibility, setLightVisibility] = useState("hidden");

    return(
        <div 
            onMouseOver={(e) => {
                if (e.buttons === 1 || e.buttons === 3){
                    setLightVisibility("visible");
                    props.onPressed(props.note + props.octave);
                }
            }} 
            
            onMouseDown={() => { setLightVisibility("visible"); props.onPressed(props.note + props.octave); }} 
            onMouseUp={() => { setLightVisibility("hidden"); props.onReleased(props.note + props.octave); }} 
            onMouseOut={() => { setLightVisibility("hidden"); props.onReleased(props.note + props.octave); }} 
            
            className="key_wrapper"
            draggable={false} 
            onDragStart={(e) => { e.preventDefault() }}
            style={{left: props.left}}>

            <img    draggable={false} className="key_bg-image" alt="Volca Key" src={props.image}></img>
            <img    draggable={false} 
                    style={{ visibility: lightVisibility }}  
                    className="key_light-overlay" alt="Volca Key" 
                    src={LightPNG}>
            </img>

        </div>
    );
}

Key.defaultProps = {
    onTriggered: function(){}
}

export default Key;