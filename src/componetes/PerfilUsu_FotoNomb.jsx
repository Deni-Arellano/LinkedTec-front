import React from 'react';
import '../hojas-de-estilo/PEDE.css';  // Recuerda ajustar la ruta si es necesario

const FotoNombre = () => {
    return (
        <div className="nombre-usuario">
            <img src="https://via.placeholder.com/150" alt="Foto de perfil" className="foto-perfil" />
            <div className="info-usuario">
                <h2>Deni Arellano</h2>
                <p className="carrera">Estudiante</p>
            </div>
        </div>
    );
}

export default FotoNombre;
