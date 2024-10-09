import React from 'react';
import './radio-boton.css'; 

const RadioButtons = ({ label, name, options, selectedOption, onChange }) => {
  return (
    <div className="campo">
      <h2>{label}</h2> 
      <div className="grupo-radio">
        {options.map((option) => (
          <label key={option.value} className="radio-personalizado">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedOption === option.value}
              onChange={onChange}
            />
            <span className="etiqueta">{option.label}</span>
            <span className="boton"></span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioButtons;

