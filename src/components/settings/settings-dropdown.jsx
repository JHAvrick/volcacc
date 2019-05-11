import React, { useState, useEffect } from 'react';
import "./settings-dropdown.css";

function SettingsDropdown(props) {

    const [value, setValue] = useState(props.value || props.defaultValue);
    const [options, setOptions] = useState(props.options);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => { setValue(props.value) }, [props.value]);
    useEffect(() => { setOptions(props.options) }, [props.options]);

    return(
        <div className="settings-dropdown_wrapper"
             onMouseLeave={() => setIsOpen(false)}
             onClick={() => setIsOpen(!isOpen)}>

            {value.name}

            <div className={ isOpen ? "arrow-up" : "arrow-down" }></div>

            <div style={{ visibility: isOpen ? "visible" : "hidden", height: isOpen ? "150px" : "0px" }} 
                 className="settings-dropdown_drawer"> 

                {
                    options.map((option, i) => 
                        <div className="settings-dropdown_item" 
                            key={option.name + i} 
                            onClick={() => props.onSelected(option)}> 
                    
                                { option.name }
                    
                        </div>
                    )
                }


            </div>

        </div>
    );
}

SettingsDropdown.defaultProps = {
    onSelected: function(){},
    defaultValue: { name: "none", value: 0 },
    options: []
}

export default SettingsDropdown;