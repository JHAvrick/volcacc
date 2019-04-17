import React, { useState, useEffect } from 'react';
import "./key.css";


function Key(props) {
    return(
        <div className="key_wrapper"
             style={{left: props.left}}>

            <img className="key_bg-image" alt="Volca Bass" src={props.image}>

            </img>
        </div>
    );
}

export default Key;