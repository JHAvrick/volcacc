import React, { useState, useEffect } from 'react';
import KnobLayout from './knob-layout';
import ButtonLayout from './button-layout';
import VolcaPNG from "../../assets/volca_slices/volca.png";
import Knob from './controls/knob';
import PushButton from './controls/push-button';
import KeyImages from './controls/key-images';
import Key from './controls/key';
import "./volca.css";
import WebMidi from 'webmidi';

var output;
WebMidi.enable(function (err) {
    console.log(WebMidi.inputs);
    console.log(WebMidi.outputs);
    output = WebMidi.outputs[0];
});


//Iterated over to generate the Volca keybed
const Notes = ["A", "Bb", "B", "C", "C#", "D", "Eb", "E", "F", "F#", "G", "G#", "A", "Bb", "B", "C"];

function handleNotePressed(note) {
        output.playNote(note + "2");
}

function handleNoteReleased(note) {
    output.stopNote(note + "2");
}

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

    const [tempo, setTempo] = useState(64);
    const [attack, setAttack] = useState(64);
    const [decay, setDecay] = useState(64);
    const [egInt, setEgInt] = useState(64);

    const VCF = [octave, peak, cutoff];
    const LFO = [rate, int];
    const VCO = [pitch1, pitch2, pitch3, volume];
    const EG = [tempo, attack, decay, egInt];

    useEffect(() => {
        output.sendControlChange(42, int);
    }, [int]);

    useEffect(() => {
        output.sendControlChange(41, rate);
    }, [rate]);

    useEffect(() => {
        output.sendControlChange(47, decay);
    }, [decay]);

    return(
        <div  className="volca_wrapper"  draggable={false}>
            <img className="volca_bg-image" alt="Volca Bass" src={VolcaPNG}  draggable={false}></img>

            <Knob { ...KnobLayout.Octave } cc={40} value={ octave } onChange={(value) => setOctave(value)} />
            <Knob { ...KnobLayout.Peak } value={ peak } onChange={(value) => setPeak(value)}/>
            <Knob { ...KnobLayout.Cutoff } value={ cutoff } onChange={(value) => setCutoff(value)}/>
            <Knob { ...KnobLayout.Rate } cc={41} value={ rate } onChange={(value) => setRate(value)}/>
            <Knob { ...KnobLayout.Int } cc={42} value={ int } onChange={(value) => setInt(value)}/>
            <Knob { ...KnobLayout.Pitch1 } cc={43} value={ pitch1 } onChange={(value) => setPitch1(value)}/>
            <Knob { ...KnobLayout.Pitch2 } cc={44} value={ pitch2 } onChange={(value) => setPitch2(value)}/>
            <Knob { ...KnobLayout.Pitch3 } cc={45} value={ pitch3 } onChange={(value) => setPitch3(value)}/>
            <Knob { ...KnobLayout.Volume } value={ volume } onChange={(value) => setVolume(value)}/>

            <Knob { ...KnobLayout.Tempo } value={ tempo } onChange={(value) => setTempo(value)}/>
            <Knob { ...KnobLayout.Attack } cc={46} value={ attack } onChange={(value) => setAttack(value)}/>
            <Knob { ...KnobLayout.Decay } cc={47} value={ decay } onChange={(value) => setDecay(value)}/>
            <Knob { ...KnobLayout.EgInt } cc={48} value={ egInt } onChange={(value) => setEgInt(value)}/>

            <PushButton { ...ButtonLayout.Memory } />
            <PushButton { ...ButtonLayout.StepMode } />
            <PushButton { ...ButtonLayout.Play } />
            <PushButton { ...ButtonLayout.Record } />
            <PushButton { ...ButtonLayout.VCO1 } />
            <PushButton { ...ButtonLayout.VCO2 } />
            <PushButton { ...ButtonLayout.VCO3 } />
            <PushButton { ...ButtonLayout.Func } />

            {
                Notes.map((note, i) => 
                    <Key    key={i} 
                            onPressed={(note) => {handleNotePressed(note)}} 
                            onReleased={(note) => {handleNoteReleased(note)}} 
                            note={note} 
                            image={KeyImages[i]} 
                            left={ (5.1 + (5.7*i)) + "%" } />
                )
            }

        </div>
    );
}

export default Volca;