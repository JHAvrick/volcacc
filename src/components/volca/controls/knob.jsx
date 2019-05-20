import React, { useState, useEffect } from 'react';
import convertRange from '../../../util/convert-range'; 
import clamp from '../../../util/clamp'; 
import KnobLargePNG from '../../../assets/volca_slices/knob_large.png'
import KnobMediumPNG from '../../../assets/volca_slices/knob_small.png';
import KnobSmallPNG from '../../../assets/volca_slices/knob_mini.png';
import "./knob.css";

/**
 * Converts a midi value to an angle that is usable by the Knob component
 * 
 * @param {Number} midiValue - A value between 0 and 127
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
    
    const [isHighlighted, setIsHighlighted] = useState(props.isHighlighted);
    const [outputValue, setOutputValue] = useState(props.value);
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
            
            //Convert the angle to a value on the user's number range (0 to 127 for most knobs)
            let outputValue = convertRange(nextAngle, -145, 145, props.min, props.max);
            setOutputValue(outputValue);

            //Call onChange callback for the new value (if passed back as value prop by parent)
            props.onChange(props.name, outputValue, props.cc);
        }        
    }

    /**
     * This function is called on a "mouseup" event and udpates the setActive flag
     * to false.
     */
    const handleMouseUp = () => {
       setDragActive(false);
       props.onHoverEnd();
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

    //Update state if highlighting is added or removed
    useEffect(() => {
        setIsHighlighted(props.isHighlighted);
    }, [props.isHighlighted])

    return (
        <div className="knob_wrapper"

            style ={{
                width: props.width,
                height: props.height,
                top: props.top,
                left: props.left,
                transition: dragActive ? "none" : "300ms",
                transform: `rotate(${midiToAngle(props.value)}deg)`
            }}

            onDragStart={(e) => handleDragStart(e)}
            onMouseOver={() => props.onHover(props.name, outputValue)}
            onMouseOut={props.onHoverEnd}>

            <img className="knob_bg-image" alt="Volca Control Knob" src={knobImage}></img>
            
            <div style={{ opacity: isHighlighted ? 1 : 0 }} className="knob_highlighter"></div>

        </div>
    );
}

Knob.defaultProps = {
    min: 0,
    max: 127,
    onChange: function(){},
    onHover: function(){},
    value: 63.5,
    size: "large",
    isHighlighted: false
};

export default Knob;