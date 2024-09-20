import React, { useState } from 'react';
import '../hojas-de-estilo/Radio-button.css'; 

const RadioButtons = ({ label, name, options }) => {
  const [opcion, setOpcion] = useState('');

  const manejarCambio = (e) => {
    setOpcion(e.target.value);
  };

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
              checked={opcion === option.value}
              onChange={manejarCambio}
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
