import React from 'react';
import './hojas-de-estilo/VisualizacionPerfil.css';  // Ruta correcta dentro de src
import BarraSuperior from './componetes/BarraSuperior';  // Ruta correcta dentro de src

const VisualizacionPerfil = () => {
  return (
    <div>
      <BarraSuperior />  {/* Barra superior */}
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
            <div className="info-usuario">
              <h2>Deni Arellano</h2>
              <p className="carrera">Estudiante de Sistemas Computacionales</p>
            </div>
          </div>

          <div className="biografia">
            <h3>Biografía:</h3>
            <p>___________________________________________________________________________________________________________________</p>
            <p>___________________________________________________________________________________________________________________</p>
            <p>___________________________________________________________________________________________________________________</p>
          </div>

          <div className="perfil-info">
            <h3>Contacto:</h3>
            <div className="info-contacto">
              <div className="fila-contacto">
                <p><strong>Correo:</strong> deni@correo.com</p>
                <p><strong>Teléfono:</strong> +52 123456789</p>
              </div>
              <p><strong>Fecha de Nacimiento:</strong> 1/1/1994</p>
            </div>
          </div>

          {/* Sección de Publicaciones */}
          <div className="publicaciones">
            <h3>Publicaciones:</h3>
            <div className="publicacion">
              <h4>Título de la Publicación</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec urna ac arcu commodo tristique.</p>
            </div>
            <div className="publicacion">
              <h4>Otra Publicación</h4>
              <p>Proin vitae orci bibendum, bibendum erat nec, malesuada nisl. Nullam congue, dui eget mollis vehicula.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizacionPerfil;
