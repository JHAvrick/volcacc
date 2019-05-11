import convertRange from '../util/convert-range';

const VolcaBassDefaultPatch = {
    octave: 64,
    peak: 64,
    cutoff: 64,
    rate: 64,
    int: 64,
    pitch1: 64,
    pitch2: 64,
    pitch3: 64,
    volume: 64,
    tempo: 64,
    attack: 64,
    decay: 64,
    egInt: 64,
    funcM1: true,
    funcM2: false,
    funcM3: false,
    funcM4: false,
    funcM5: false,
    funcM6: true,
    funcM7: false,
    funcM8: false,
    func9: false,
    func10: true,
    func11: false,
    func12: false,
    func13: false,
    func14: false,
    func15: false,
    func16: false,
}

const VolcaBassPatch = {
    octave: {
        value: 64,
        meta: {
            cc: 40,
            displayValue: function(){
                //TO DO
            }
        }
    },
    peak: { value: 64 },
    cutoff: { value: 64 },
    rate: { 
        value: 64,
        meta: { cc: 41 }
    },
    int: {
        value: 64,
        meta: { cc: 42 }
    },
    pitch1: {
        value: 64,
        meta: { cc: 43 }
    },
    pitch2: {
        value: 64,
        meta: { cc: 44 }
    },
    pitch3: {
        value: 64,
        meta: { cc: 45 }
    },
    volume: { value: 64 },
    tempo: { 
        value: 64,
        meta: {
            displayValue: function(){
                //TO DO
            }
        }
    },
    attack: {
        value: 64,
        meta: { cc: 46 }
    },
    decay: {
        value: 64,
        meta: { cc: 47 }
    },
    egInt: {
        value: 64,
        meta: { cc: 48 }
    },
    funcM1: {
        value: true,
        meta: { toggleGroup: "waveform" }
    },
    funcM2: {
        value: false,
        meta: { toggleGroup: "waveform" }
    },
    funcM3: {
        value: false,
        meta: { toggleGroup: "waveform" }
    }
}



export default VolcaBassDefaultPatch;
