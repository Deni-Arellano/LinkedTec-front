import React from 'react';
import './hojas-de-estilo/VisualizacionPerfil.css';  // Asegúrate de tener este archivo CSS vinculado
import MenuNavegacion from './componetes/MenuNavegacion';

const VisualizacionPerfil = () => {
  return (
    <div>
      <MenuNavegacion />
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
              <p className="carrera">Estudiante</p> {/* Aquí cambia el texto a "Estudiante" */}
            </div>
          </div>

          {/* Sección de detalles en el cuadro */}
          <div className="perfil-cuadro">
            <p><strong>Carrera:</strong> Ingeniería en Sistemas</p>
            <p><strong>Biografía:</strong> ________________________________________________</p>
            <p><strong>Correo:</strong> correo@gmail.com</p>
            <p><strong>Teléfono:</strong> +52 123456789</p>
            <p><strong>Fecha de Nacimiento:</strong> 01/01/2060</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizacionPerfil;
