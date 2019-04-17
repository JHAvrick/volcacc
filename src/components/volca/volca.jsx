import React, { useState, useEffect } from 'react';
import VolcaLayout from './volca-layout';
import VolcaPNG from "../../assets/volca_slices/volca.png";
import "./volca.css";

import Knob from './controls/knob';


import KeyImages from './controls/key-images';
import Key from './controls/key';

//Assigned to the keys when generated
const Notes = ["A", "Bb", "B", "C", "C#", "D", "Eb", "E", "F", "F#", "G", "G#", "A", "Bb", "B", "C"];


function Volca(props) {

    const [octave, setOctave] = useState(64);
    const [peak, setPeak] = useState(64);
    const [cutoff, setCutoff] = useState(64);
    const [rate, setRate] = useState(64);
    const [int, setInt] = useState(64);
    const [pitch1, setPitch1] = useState(64);
    const [pitch2, setPitch2] = useState(64);
    const [pitch3, setPitch3] = useState(64);
    const [volume, setVolume] = useState(64);


    return(
        <div className="volca_wrapper">
            <img className="volca_bg-image" alt="Volca Bass" src={VolcaPNG}></img>

            <Knob { ...VolcaLayout.Octave } value={ octave }onChange={(value) => setOctave(value)} />
            <Knob { ...VolcaLayout.Peak } value={ peak } onChange={(value) => setPeak(value)}/>
            <Knob { ...VolcaLayout.Cutoff } value={ cutoff } onChange={(value) => setCutoff(value)}/>
            <Knob { ...VolcaLayout.Rate } value={ rate } onChange={(value) => setRate(value)}/>
            <Knob { ...VolcaLayout.Int } value={ int } onChange={(value) => setInt(value)}/>
            <Knob { ...VolcaLayout.Pitch1 } value={ pitch1 } onChange={(value) => setPitch1(value)}/>
            <Knob { ...VolcaLayout.Pitch2 } value={ pitch2 } onChange={(value) => setPitch2(value)}/>
            <Knob { ...VolcaLayout.Pitch3 } value={ pitch3 } onChange={(value) => setPitch3(value)}/>
            <Knob { ...VolcaLayout.Volume } value={ volume } onChange={(value) => setVolume(value)}/>

            {
                Notes.map((note, i) => 
                    <Key key={i} note={note} image={KeyImages[i]} left={ (5.1 + (5.7*i)) + "%" } />
                )
            }

        </div>
    );
}

export default Volca;