import React from 'react';
import './MensajeContacto.css';

const MensajeContacto = ({ texto, hora }) => {
    return (

        <div className="mensaje-contacto">
            <div className="mensaje-contenido-contacto">
                <p>{texto}</p>
                <span className="mensaje-hora-contacto">{hora}</span>
            </div>
        </div>
    );
};

export default MensajeContacto;