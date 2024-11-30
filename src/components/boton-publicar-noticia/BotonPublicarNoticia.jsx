import React from 'react';
import '../boton-publicar-noticia/BotonPublicarNoticia.css';

const PublicarNoticiaBoton = ({ onClick, style }) => {
  return (
    <button className="PublicarNoticia-button" onClick={onClick} style={style}>
      <div className="PublicarNoticia-content">
        <div className="PublicarNoticia-icon">+</div>
        <div className="PublicarNoticia-text">Publicar noticia</div>
      </div>
    </button>
  );
};

export default PublicarNoticiaBoton;
