import React from 'react';
import { FaEnvelope, FaPhone, FaBirthdayCake, FaBriefcase } from 'react-icons/fa';
import MenuNavegacion from '../componetes/MenuNavegacion'; // Asegúrate de que la ruta sea correcta
import Etiquetas from '../componetes/Etiquetas'; // Importamos el componente Etiquetas
import '../hojas-de-estilo/VisualizacionPerfil.css'; // Importamos el CSS de visualización

const VisualizacionPerfil = () => {
    return (
        <div>
            {/* Menú de navegación */}
            <MenuNavegacion className="menu-navegacion" />

            {/* Contenido del perfil */}
            <div className="perfil-wrapper">
                <div className="perfil-contenido">
                    {/* Información del usuario */}
                    <div className="usuario-info">
                        <img src="https://via.placeholder.com/150" alt="Foto de perfil" className="foto-perfil" />
                        <div className="info-usuario">
                            <h2>Deni Arellano</h2>
                            <p className="carrera">Estudiante</p>
                        </div>
                    </div>

                    {/* Cuadro de información */}
                    <div className="perfil-cuadro">
                        <p><Etiquetas className="etiqueta-visualizacion" /> <strong>Carrera:</strong> Ingeniería en Sistemas</p>
                        <p><strong>Biografía:</strong></p>
                        <p className="biografia">Biografía del usuario aquí.</p>
                        <p><FaEnvelope className="icono" /> <strong>Correo:</strong> <a href="mailto:correo@gmail.com">correo@gmail.com</a></p>
                        <p><FaPhone className="icono" /> <strong>Teléfono:</strong> +52 123456789</p>
                        <p><FaBirthdayCake className="icono" /> <strong>Fecha de Nacimiento:</strong> 01/01/2060</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisualizacionPerfil;
