const VolcaBassMidiMap = {
    slideTime: { controllable: true, cc: 5 },
    expression: { controllable: true, cc: 11 },
    octave: { controllable: true, cc: 40 },
    lfoRate:{ controllable: true, cc: 41 },
    lfoInt: { controllable: true, cc: 42 },
    vcoPitch1: { controllable: true, cc: 43 },
    vcoPitch2: { controllable: true, cc: 44 },
    vcoPitch3: { controllable: true, cc: 45 },
    egAttack: { controllable: true, cc: 46 },
    egDecayRelease: { controllable: true, cc: 47 },
    cutoffEgInt: { controllable: true, cc: 48 },
    gateTime: { controllable: true, cc: 49 },
}

export default VolcaBassMidiMap;