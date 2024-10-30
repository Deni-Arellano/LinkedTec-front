import React from 'react';
import '../boton-postulaciones/BotonPostulaciones.css';

const PostulacionesBoton = ({ onClick, style }) => {
  return (
    <button className="Postulaciones-button" onClick={onClick} style={style}>
      <div className="Postulaciones-content">
        <div className="Postulaciones-text">Postulaciones</div>
      </div>
    </button>
  );
};

export default PostulacionesBoton;