import React from 'react';
import '../hojas-de-estilo/PublicarEmpleoBoton.css';

const PublicarEmpleoBoton = ({ onClick, style }) => {
  return (
    <button className="PublicarEmpleo-button" onClick={onClick} style={style}>
      <div className="PublicarEmpleo-content">
        <div className="PublicarEmpleo-icon">+</div>
        <div className="PublicarEmpleo-text">Publicar Empleo</div>
      </div>
    </button>
  );
};

export default PublicarEmpleoBoton;
