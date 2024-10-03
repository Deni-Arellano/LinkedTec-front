import React from 'react';
import '../hojas-de-estilo/PEDE.css';  // Recuerda ajustar la ruta si es necesario

const FotoNombre = ({datos}) => {
    return (
        <div className="nombre-usuario">
            <img src={datos.foto} alt="Foto de perfil" className="foto-perfil" />
            <div className="info-usuario">
                <h2>{datos.nombre}</h2>
                <p className="carrera">{datos.role}</p>
            </div>
        </div>
    );
}

export default FotoNombre;
