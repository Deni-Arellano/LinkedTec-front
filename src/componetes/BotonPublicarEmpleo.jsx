import React from 'react';
import '../hojas-de-estilo/BotonPublicar.css'; // Asegúrate de que la ruta esté correcta

const BotonPublicar = ({ onClick, style }) => {
  return (
    <button className="button" onClick={onClick} style={style}> {/* Cambié boton-publicar a button */}
      <div className="icon">+</div> {/* Cambié icono-mas a icon */}
      <span className="text">Publicar Empleo</span> {/* Cambié texto a text */}
    </button>
  );
};

export default BotonPublicar;
