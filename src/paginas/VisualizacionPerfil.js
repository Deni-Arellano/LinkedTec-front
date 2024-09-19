import React from 'react';
import '../hojas-de-estilo/VisualizacionPerfil.css';
import { FaEnvelope, FaPhone, FaBirthdayCake, FaBriefcase } from 'react-icons/fa';

const VisualizacionPerfil = () => {
    return (
        <div className="perfil-container">
            {/* Información del perfil */}
            <div className="nombre-usuario">
                <img src="https://via.placeholder.com/150" alt="Foto de perfil" className="foto-perfil" />
                <div className="info-usuario">
                    <h2>Deni Arellano</h2>
                    <p className="carrera">Estudiante</p>
                </div>
            </div>

            {/* Cuadro de información */}
            <div className="perfil-cuadro">
                <p><FaBriefcase className="icono"/> <strong>Carrera:</strong> Ingeniería en Sistemas</p>
                
                <p><strong>Biografía:</strong></p> 
                <p className="biografia"></p>

                <p><FaEnvelope className="icono"/> <strong>Correo:</strong> <a href="mailto:correo@gmail.com">correo@gmail.com</a></p>
                <p><FaPhone className="icono"/> <strong>Teléfono:</strong> +52 123456789</p>
                <p><FaBirthdayCake className="icono"/> <strong>Fecha de Nacimiento:</strong> 01/01/2060</p>
            </div>
        </div>
    );
};

export default VisualizacionPerfil;
