import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

function ColorPicker({ onColorChange }) { // Añade onColorChange como una prop
    const [color, setColor] = useState('#fff');
    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    const handleChange = (newColor) => {
        setColor(newColor.hex);
        onColorChange(newColor.hex); // Llama a onColorChange con el nuevo color
    };

    return (
        <div>
            <button onClick={handleClick}>Seleccionar color</button>
            {displayColorPicker ? (
                <div style={{ position: 'absolute', zIndex: '2' }}>
                    <div style={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' }} onClick={handleClose} />
                    <SketchPicker color={color} onChange={handleChange} />
                </div>
            ) : null}
        </div>
    );
}

export default ColorPicker;