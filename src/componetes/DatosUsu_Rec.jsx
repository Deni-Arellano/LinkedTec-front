import React from 'react';
import '../hojas-de-estilo/DatosUsu_Rec.css';  // Asegúrate de que el CSS esté enlazado correctamente
import { FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars, FaBuilding, FaIndustry, FaBriefcase } from 'react-icons/fa';  // Solo íconos necesarios

const DatosUsu_Rec = () => {
    return (
        <div className="perfil-contenido">
            <div className="nombre-usuario">
                <div className="foto-perfil">150 x 150</div> {/* Imagen de perfil */}
                <div className="info-usuario">
                    <h2>Deni Arellano</h2>
                    <p className="estudiante">Estudiante</p>
                </div>
            </div>

            {/* Cuadro de información del perfil */}
            <div className="perfil-cuadro">
                <p><strong><FaBriefcase className="icono" /> Carrera:</strong> Ingeniería en Sistemas</p>
                <p><strong><i className="icono fas fa-info-circle"></i> Biografía:</strong></p>
                <p className="biografia"></p>
                <p><strong><FaEnvelope className="icono" /> Correo:</strong> correo@gmail.com</p>
                <p><strong><FaPhone className="icono" /> Teléfono:</strong> +52 123456789</p>
                <p><strong><FaBirthdayCake className="icono" /> Fecha de Nacimiento:</strong> 01/01/2060</p>
                <p><strong><FaVenusMars className="icono" /> Sexo:</strong> Femenino</p>
                <p><strong><FaBuilding className="icono" /> Empresa:</strong> XYZ Corporativo</p>
                <p><strong><FaIndustry className="icono" /> Giro de la Empresa:</strong> Tecnología</p>
            </div>
        </div>
    );
}

export default DatosUsu_Rec;
