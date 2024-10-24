import React from 'react';
import './PublicacionNoticia.css';  // Aquí estarán los estilos

const PublicacionNoticiaNuevo = ({ datos }) => {
    const { titulo_noticia, descripcion, enlace_noticia, imagen_noticia, categoria_noticia, fecha_noticia } = datos;

    return (
        <div className="tarjeta-noticia">
            {/* Imagen de la noticia o un placeholder si no hay imagen */}
            <div className="tarjeta-noticia-header">
                <img 
                    src={imagen_noticia || 'https://via.placeholder.com/100'}  // Placeholder si no hay imagen
                    alt={titulo_noticia}
                    className="tarjeta-noticia-imagen"
                />
                <div className="tarjeta-noticia-usuario">
                    <h4>Categoría: {categoria_noticia}</h4>  {/* Mostramos la categoría como título */}
                    <p>{new Date(fecha_noticia).toLocaleDateString()}</p> {/* Fecha de la noticia */}
                </div>
            </div>

            <div className="tarjeta-noticia-cuerpo">
                <h3 className="titulo-noticia">{titulo_noticia}</h3>
                <p>{descripcion}</p>
            </div>

            <div className="tarjeta-noticia-footer">
                {enlace_noticia && (
                    <a 
                        href={enlace_noticia} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="tarjeta-noticia-enlace"
                    >
                        Leer más
                    </a>
                )}
            </div>
        </div>
    );
};

export default PublicacionNoticiaNuevo;
