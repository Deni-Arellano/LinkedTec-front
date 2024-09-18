import React from 'react';
import '../hojas-de-estilo/VisualizacionPerfil.css';  // Asegúrate de que el archivo de estilos esté en la ruta correcta
import BarraSuperior from '../componetes/BarraSuperior';  // Ruta ajustada

const VisualizacionPerfil = () => {
  return (
    <div>
      <BarraSuperior />  {/* Agregamos la barra superior */}
      <div className="perfil-container">
        <aside className="barra-lateral">
          <ul>
            <li>Noticias</li>
            <li>Empleos</li>
            <li>Foro</li>
          </ul>
        </aside>

        <div className="perfil-contenido">
          <div className="nombre-usuario">
            <img 
              src="https://via.placeholder.com/150" 
              alt="Foto de perfil" 
              className="foto-perfil"
            />
            <div>
              <h2>Deni Arellano</h2>
              <p className="carrera">Estudiante de Sistemas Computacionales</p>
            </div>
          </div>

          <div className="biografia">
            <p><strong>Biografía:</strong></p>
            <p>___________________________________________________________________________________________________________________</p>
            <p>___________________________________________________________________________________________________________________</p>
            <p>___________________________________________________________________________________________________________________</p>
          </div>

          <div className="perfil-info">
            <div className="contacto">
              <p className="correo"><strong>Correo:</strong> deni@correo.com</p>
              <p className="telefono"><strong>Teléfono:</strong> +52 123456789</p>
            </div>
            <p className="fecha-nacimiento"><strong>Fecha de Nacimiento:</strong> 1/1/1994</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizacionPerfil;
