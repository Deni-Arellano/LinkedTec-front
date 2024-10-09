import React from 'react';
import './Fecha.css';  

const Fecha = ({ value, onChange }) => {
    return (
        <div className="fecha-container">
            <label htmlFor="fecha-input" className="fecha-label">Fecha de nacimiento:</label>
            <input
                type="date"
                id="fecha-input"
                value={value} 
                onChange={onChange} 
                className="fecha-input"
            />
        </div>
    );
};

export default Fecha;
