import React, { useContext, useState, useEffect } from 'react';
import Etiquetas from '../componente-label/Etiquetas';
import './PostulacionesUsuario.css';
import { usuarioContext } from '../../App';
import Axios from 'axios';

const PostulacionesUsuario = ({ userId }) => {
  const { usuarioLog, setUsuarioLog } = useContext(usuarioContext);
  const [postulaciones, setPostulaciones] = useState([]);
  const [mostrarDetalles, setMostrarDetalles] = useState(null);
  const [estadoPostulacion, setEstadoPostulacion] = useState([]);
  const [detallePostulacion, setDetallePostulacion] = useState(null);

  useEffect(() => {
    // Cargar todas las postulaciones del usuario
    Axios.get(`http://localhost:3000/postulaciones/${userId}?pagina=1&limite=10`)
      .then(response => {
        setPostulaciones(response.data.postulaciones);
        setEstadoPostulacion(response.data.postulaciones.map(post => post.estado || 'Activa'));
      })
      .catch(error => console.error("Error al cargar postulaciones:", error));
  }, [userId]);

  const handleVerDetalles = (id_postulacion) => {
    Axios.get(`http://localhost:3000/postulaciones/${id_postulacion}/info`)
      .then(response => {
        setDetallePostulacion(response.data);
        setMostrarDetalles(id_postulacion);
      })
      .catch(error => console.error("Error al cargar detalles de la postulación:", error));
  };

  const handleCerrarDetalles = () => {
    setMostrarDetalles(null);
    setDetallePostulacion(null);
  };

  const handleCancelarPostulacion = (index) => {
    if (window.confirm('¿Estás seguro de que deseas cancelar esta postulación?')) {
      const nuevoEstado = [...estadoPostulacion];
      nuevoEstado[index] = 'Cancelada';
      setEstadoPostulacion(nuevoEstado);
      handleCerrarDetalles();
    }
  };

  return (
    <div className="postulaciones-lista">
      {postulaciones.map((postulacion, index) => (
        <div key={postulacion.id_postulacion} className="postulacion-tarjeta">
          <div className="postulacion-header">
            <h3>{postulacion.titulo}</h3>
            <p><strong><Etiquetas texto="Empresa" />:</strong> {postulacion.empresa}</p>
            <p><strong><Etiquetas texto="Salario" />:</strong> {postulacion.salario}</p>
            <p><strong>Estado de la postulación:</strong> {estadoPostulacion[index]}</p>
            <button onClick={() => handleVerDetalles(postulacion.id_postulacion)} className="ver-detalles-boton">
              Ver detalles
            </button>
          </div>

          {mostrarDetalles === postulacion.id_postulacion && detallePostulacion && (
            <div className="detalles-modal">
              <div className="detalles-contenido">
                <h2>{detallePostulacion.empleo.titulo}</h2>
                <p><strong><Etiquetas texto="Descripción" />:</strong> {detallePostulacion.empleo.descripcion}</p>
                <p><strong><Etiquetas texto="Ubicación (estado)" />:</strong> {detallePostulacion.empleo.ubicacion}</p>
                <p><strong><Etiquetas texto="Nivel de inglés requerido" />:</strong> {detallePostulacion.empleo.nivel_de_ingles}</p>
                <button onClick={() => handleCancelarPostulacion(index)} className="cancelar-boton">
                  Cancelar Postulación
                </button>
                <button onClick={handleCerrarDetalles} className="cerrar-boton">
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostulacionesUsuario;
