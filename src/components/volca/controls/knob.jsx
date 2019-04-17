import React, { useState, useEffect } from 'react';
import KnobLargePNG from '../../../assets/volca_slices/knob_large.png'
import KnobMediumPNG from '../../../assets/volca_slices/knob_small.png';
import KnobSmallPNG from '../../../assets/volca_slices/knob_mini.png';

import "./knob.css";

console.log(KnobLargePNG);

/**
 * This function clamps an number to a certain min/max range.
 */
function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}

/**
 * Converts a midi value to an angle that is usable by the Knob component
 * 
 * @param {} midiValue - A value between 0 and 127
 */
function midiToAngle(midiValue){
    return midiValue <= 63  ? clamp(-(145 - (midiValue * 2.28)), -145, 0)
                            : clamp((midiValue * 2.28) -145, 0, 145);
}

/**
 * The knob component is a slider-style knob. Moving the mouse up or down
 * after clicking and dragging on this component will adjust its value. 
 * I think The way I designed this component is straight up insane but
 * it works...
 */
function Knob(props) {

    const [dragActive, setDragActive] = useState(false);
    const [dragStartY, setDragStartY] = useState(0);
    const [knobImage] = useState(() => {
        switch (props.size){
            default:
            case "large":
                return KnobLargePNG;
            case "medium": 
                return KnobMediumPNG;
            case "small":
                return KnobSmallPNG;
        }
    });

    /**
     * This function updates the dragActive flag, telling the "mousemove" event that
     * it can start changing knobPosition. It also, importantly, sets the initial drag
     * position, taking into account the current angle of the knob. Otherwise the knob
     * would dart back to zero at every "dragstart".
     */
    const handleDragStart = (event) => {
        event.preventDefault();
        setDragActive(true);
        setDragStartY(event.screenY + midiToAngle(props.value));
    };

    /**
     * This function is called whenever the mouse moves, but only affects the knob
     * if it was the target of the last "dragstart" event. 
     */
    const handleMouseMove = (event) => {
        if (dragActive) {

            //Calculate the next angle based on how far the mouse has moved from it's starting position
            let nextAngle = clamp(dragStartY - event.screenY, -145, 145);

            //Translate the angle to a value between 0 and 127 (i.e. midi cc range)
            let midiValue = nextAngle < 0   ? Math.floor(63 - (Math.abs(nextAngle) * .4311))
                                            : Math.floor(65 + (nextAngle * .4311));

            //Call onChange callback for the new value (if passed back as value prop by parent)
            props.onChange(midiValue);
        }        
    }

    /**
     * This function is called on a "mouseup" event and udpates the setActive flag
     * to false.
     */
    const handleMouseUp = () => {
       setDragActive(false);   
    }

    //Document listeners
    useEffect(() => {
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mousemove", handleMouseMove);
    
        return () => {
            document.removeEventListener("mouseup", handleMouseUp); 
            document.removeEventListener("mousemove", handleMouseMove);    
        }
    }, [dragActive]);

    return (
        <div className="knob_wrapper"
            style ={{
                width: props.width,
                height: props.height,
                top: props.top,
                left: props.left,
                transform: `rotate(${midiToAngle(props.value)}deg)`
            }}
            onDragStart={(e) => handleDragStart(e)}>

            <img className="knob_bg-image" alt="Volca Knob" src={knobImage}></img>

        </div>
    );
}

Knob.defaultProps = {
    onChange: function(){},
    value: 63.5,
    size: "large"
};

export default Knob;