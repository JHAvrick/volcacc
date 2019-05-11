import React from 'react';
import ButtonPNG from '../../../assets/volca_slices/button.png';
import "./push-button.css";


function PushButton(props) {
    return(
        <div  draggable={false} className="button_wrapper"
             style={{left: props.left}}>

            <img  draggable={false} className="button_bg-image" alt="Volca Push Button" src={ButtonPNG}></img>
            <div  draggable={false} className="button_tint-overlay"> </div>

        </div>
    );
}

export default PushButton;