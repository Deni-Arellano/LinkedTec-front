import React from 'react';
import '../hojas-de-estilo/BotonPublicar.css';

const BotonPublicar = ({ onClick, style }) => {
  return (
    <button className="boton-publicar" onClick={onClick} style={style}>
      <div className="icono-mas">+</div>
      <span className="texto">Publicar Empleo</span>
    </button>
  );
};

export default BotonPublicar;
