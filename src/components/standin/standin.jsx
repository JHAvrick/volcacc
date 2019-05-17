import React from 'react';
import { BrowserView, MobileView } from "react-device-detect";
import VolcaSimpleGIF from '../../assets/volca-simple.gif';
import MdErrorOutline from 'react-icons/lib/md/error-outline';
import "./standin.css";

/**
 * This component appears on mobile browsers or when a desktop browser is 
 * scaled too small for the app to be displayed properly. 
 */
function ContentStandin() {
    return(
        <div className="standin_wrapper"> 
            <BrowserView>
                <MdErrorOutline size={32} color="white"></MdErrorOutline>
                <h1 className="standin_h1-desktop"> We're gonna need a bigger screen! </h1>
            </BrowserView>
            <MobileView>
                <MdErrorOutline size={32} color="white"></MdErrorOutline>
                <h1 className="standin_h1-mobile"> 
                    Sorry, this app won't run properly in your browser. 
                    A Desktop browser that supports the WebMidi API is recommended.
                </h1>
            </MobileView>
            <img alt="Volca Simple Gif" src={VolcaSimpleGIF}></img>
        </div>
    );
}

export default ContentStandin;