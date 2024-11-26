import React from 'react';
import './MensajeUsuario.css';

const MensajeUsuario = ({ texto, hora }) => {
    return (

        <div className="mensaje-usuario">
            <div className="mensaje-contenido-usuario">
                <p>{texto}</p>
                <span className="mensaje-hora-usuario">{hora}</span>
            </div>
        </div>
    );
};

export default MensajeUsuario;
