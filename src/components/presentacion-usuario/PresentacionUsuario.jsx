import React from 'react';
import './PresentacionUsuario.css';  // Recuerda ajustar la ruta si es necesario

const FotoNombre = ({datos}) => {
    return (
        <div className="nombre-usuario">
            <img src="https://via.placeholder.com/150" alt="Foto de perfil" className="foto-perfil" />
            <div className="info-usuario">
                <h2>{datos.nombre}</h2>
                <p className="carrera">{datos.role}</p>
            </div>
        </div>
    );
}

export default FotoNombre;
