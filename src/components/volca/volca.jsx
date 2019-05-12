import React, { useState, useEffect } from 'react';
import convertRange from '../../util/convert-range';
import KnobLayout from './knob-layout';
import ButtonLayout from './button-layout';
import VolcaPNG from "../../assets/volca_slices/volca.png";
import Knob from './controls/knob';
import PushButton from './controls/push-button';
import KeyImages from './controls/key-images';
import Key from './controls/key';
import LightToggle from './controls/light-toggle';
import LEDDisplay from './controls/led-display';
import "./volca.css";


//Iterated over to generate the Volca keybed
const Notes = ["A", "Bb", "B", "C", "C#", "D", "Eb", "E", "F", "F#", "G", "G#", "A", "Bb", "B", "C"];

//List of 
const FuncControls = ["funcM1", "funcM2", "funcM3", "funcM4", "funcM5", "funcM6", "funcM7", "funcM8", 
                        "func9", "func10", "func11", "func12", "func13", "func14", "func15", "func16"]

function Volca(props) {
    
    const [activeCC, setActiveCC] = useState({ name: "octave", value: props.patch.octave });
    const [patch, setPatch] = useState(props.patch);
    const [noteOctave, setNoteOctave] = useState(
        Math.floor(convertRange(props.patch.octave, 0, 127, -1, 4))
    );

    useEffect(() => {
        setPatch({...props.patch});
        setNoteOctave(Math.floor(convertRange(props.patch.octave, 0, 127, 0, 6)));
    }, [props.patch]);

    return(
        <div  className="volca_wrapper"  draggable={false}>
            <img className="volca_bg-image" alt="Volca Bass" src={VolcaPNG}  draggable={false}></img>

            <LEDDisplay display={activeCC} />

            {
                KnobLayout.map((layout, i) => 
                    <Knob {...layout} 
                        key={layout.name} 
                        value={patch[KnobLayout[i].name]} 

                        onChange={(name, value, cc) => { 
                            props.onCC(name, value, cc);
                            setActiveCC({name: name, value: Math.floor(value) })
                        }}

                        isActiveControl={activeCC.name === patch[KnobLayout[i].name]}

                        onHover={(name, value) => { setActiveCC({name: name, value: Math.floor(value) }) }}
                        onHoverEnd={() => {setActiveCC(false)}}

                        />
                )
            }

            <PushButton { ...ButtonLayout.Memory } />
            <PushButton { ...ButtonLayout.StepMode } />
            <PushButton { ...ButtonLayout.Play } />
            <PushButton { ...ButtonLayout.Record } />
            <PushButton { ...ButtonLayout.VCO1 } />
            <PushButton { ...ButtonLayout.VCO2 } />
            <PushButton { ...ButtonLayout.VCO3 } />
            <PushButton { ...ButtonLayout.Func } />

            {/* 
                The Volca keybed covers a range of notes from A-1 to C7, with notes from
                three different octaves (but ALL of only one octave) represented at each keybed interval.
                The annoying expression used to calculate the "octave" property below
                is necessary to enforce this unusual range of notes.
                
                ----------16 Note Keybed---------
                Octave 1: A through B (Keys 1-3)
                Octave 2: C through B (Keys 3-15)
                Octave 3: C Only (Key 16)
                ---------------------------------

            */}
            {
                Notes.map((note, i) => 
                    <Key    key={i} 
                            octave={noteOctave + (i <= 2 ? -1 : i <= 14 ? 0 : 1)}
                            onPressed={(note) => { props.onKeyPress(note) }} 
                            onReleased={(note) => { props.onKeyRelease(note) }} 
                            note={ note } 
                            image={KeyImages[i]} 
                            left={ (5.1 + (5.7*i)) + "%" } />
                )
            }


            {
                FuncControls.map((funcControl, i) => 
                    <LightToggle    key={funcControl}
                                    active={props.patch[funcControl]}
                                    name={funcControl}
                                    left={ (5.6 + (5.69*i)) + "%" }
                                    onToggle={(name, active) => props.onFuncToggle(name, active)} />
                )
            }



        </div>
    );
}

Volca.defaultProps = {
    onKeyPress: function(){},
    onKeyRelease: function(){}
}

export default Volca;