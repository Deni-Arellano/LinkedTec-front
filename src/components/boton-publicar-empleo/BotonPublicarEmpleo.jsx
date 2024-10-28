import React from 'react';
import '../boton-publicar-empleo/BotonPublicarEmpleo.css';

const PublicarEmpleoBoton = ({ onClick, style }) => {
  return (
    <button className="PublicarEmpleo-button" onClick={onClick} style={style}>
      <div className="PublicarEmpleo-content">
        <div className="PublicarEmpleo-text">+ Publicar empleo</div>
      </div>
    </button>
  );
};

export default PublicarEmpleoBoton;
