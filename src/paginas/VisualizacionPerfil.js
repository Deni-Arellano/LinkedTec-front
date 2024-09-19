import React from 'react';
import { FaBirthdayCake } from "react-icons/fa"; // Asegúrate de tener esta librería instalada

const VisualizacionPerfil = () => {
  return (
    <div className="perfil-container">
      <div className="perfil-contenido">
        <div className="nombre-usuario">
          <img 
            src="https://via.placeholder.com/150" 
            alt="Foto de perfil" 
            className="foto-perfil"
          />
          <div className="info-usuario">
            <h2>Deni Arellano</h2>
            <p className="carrera">Estudiante</p>
          </div>
        </div>

        <div className="perfil-cuadro">
          <p><strong>Carrera:</strong> Ingeniería en Sistemas</p>
          <p><strong>Biografía:</strong></p> {/* Aquí se elimina la línea */}
          <p><strong>Correo:</strong> correo@gmail.com</p>
          <p><strong>Teléfono:</strong> +52 123456789</p>
          <p><strong>Fecha de Nacimiento:</strong> 01/01/2060 <FaBirthdayCake className="icono-pastelito" /></p>
        </div>
      </div>
    </div>
  );
};

export default VisualizacionPerfil;
