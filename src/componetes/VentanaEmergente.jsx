import React from 'react';
import '../hojas-de-estilo/VentanaEmergente.css';

const VentanaEmergente = ({ mostrar, mensaje, cerrarVentana }) => {
  if (!mostrar) {
    return null; // Si mostrar es false, no renderiza nada
  }

  return (
    <div className="ventana-emergente-overlay">
      <div className="ventana-emergente">
        <div className="ventana-emergente-contenido">
          <span className="icono">❗</span>
          <span>{mensaje}</span>
          <button className="cerrar-boton" onClick={cerrarVentana}>✖</button>
        </div>
      </div>
    </div>
  );
};

export default VentanaEmergente;
