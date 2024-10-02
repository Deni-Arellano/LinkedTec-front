// src/componentes/VentanaEmergente.jsx
import React from 'react';
import '../hojas-de-estilo/VentanaEmergente.css';

const VentanaEmergente = ({ mostrar, mensaje, cerrarVentana }) => {
  if (!mostrar) {
    return null; // Si mostrar es false, no renderiza nada
  }

  return (
    <div className="tooltip-container">
      <div className="tooltip-content">
        <span className="icono">❗</span>
        <span>{mensaje}</span>
        <button className="cerrar-boton" onClick={cerrarVentana}>✖</button>
      </div>
    </div>
  );
};

export default VentanaEmergente;
