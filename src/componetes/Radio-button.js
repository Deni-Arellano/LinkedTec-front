import React, { useState } from 'react';
import'../hojas-de-estilo/Radio-button.css'; 

const BotonesRadio = () => {
  const [opcion, setOpcion] = useState('');

  const manejarCambio = (e) => {
    setOpcion(e.target.value);
  };

  return (
    <div>
      <h2>¿Cual es tu rol?</h2>
      <div className="grupo-radio">
        <label className="radio-personalizado">
          <input
            type="radio"
            value="Estudiante"
            checked={opcion === 'Estudiante'}
            onChange={manejarCambio}
          />
          <span className="etiqueta">Estudiante</span>
          <span className="boton"></span>
        </label>
        
        <label className="radio-personalizado">
          <input
            type="radio"
            value="Docente"
            checked={opcion === 'Docente'}
            onChange={manejarCambio}
          />
          <span className="etiqueta">Docente</span>
          <span className="boton"></span>
        </label>
        
        <label className="radio-personalizado">
          <input
            type="radio"
            value="Reclutador"
            checked={opcion === 'Reclutador'}
            onChange={manejarCambio}
          />
          <span className="etiqueta">Reclutador</span>
          <span className="boton"></span>
        </label>
      </div>
    </div>
  );
};
//sss

export default BotonesRadio;


