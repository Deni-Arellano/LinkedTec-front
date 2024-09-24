import React from 'react';
import '../hojas-de-estilo/PublicarEmpleoBoton.css'; // Asegúrate de que la ruta esté correcta

const PublicarEmpleoBoton = ({ onClick, style }) => {
  return (
    <button className="PublicarEmpleo-button" onClick={onClick} style={style}> {/* Cambié boton-publicar a PublicarEmpleo-button */}
      <div className="PublicarEmpleo-icon">+</div> {/* Cambié icono-mas a PublicarEmpleo-icon */}
      <span className="PublicarEmpleo-text">Publicar Empleo</span> {/* Cambié texto a PublicarEmpleo-text */}
    </button>
  );
};

export default PublicarEmpleoBoton;
