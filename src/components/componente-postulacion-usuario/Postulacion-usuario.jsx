import React, { useState } from 'react';
import './Postulacion-usuario.css';
import { BsThreeDots } from "react-icons/bs";

const PostulacionesUsuario = ({ datos, onEliminar }) => {
  const [mostrarDetalles, setMostrarDetalles] = useState(null);
  const [estadoPostulacion, setEstadoPostulacion] = useState('Activa');

  const handleVerDetalles = () => {
    setMostrarDetalles(!mostrarDetalles);
  };

  const handleCerrarDetalles = () => {
    setMostrarDetalles(null);
  };

  const handleCancelarPostulacion = () => {
    if (window.confirm('¿Estás seguro de que deseas cancelar esta postulación?')) {
      setEstadoPostulacion('Cancelada');
      onEliminar(datos.id_postulacion);
      handleCerrarDetalles();
    }
  };

  return (
    <div className="postulacion-tarjeta">
      <div className="postulacion-header">
        <img src={datos.fotoPerfil} alt="Foto de perfil" className="postulacion-foto-perfil" />
        <p className="postulacion-usuario-nombre">{datos.nombreUsuario}</p>
        <BsThreeDots className="icono-tres-puntos" />
      </div>
      <h3 className="titulo-empleo">{datos.tituloEmpleo}</h3>
      <p className="detalle"><strong>Empresa:</strong> {datos.empresa}</p>
      <p className="detalle"><strong>Salario:</strong> {datos.salario}</p>
      <p className="detalle"><strong>Estado de la postulación:</strong> {estadoPostulacion}</p>
      <button onClick={handleVerDetalles} className="ver-detalles-boton">
        {mostrarDetalles ? "Ocultar detalles" : "Ver detalles"}
      </button>

      {mostrarDetalles && (
        <div className="detalles-modal">
          <div className="detalles-contenido">
            <h2 className="titulo-empleo">{datos.tituloEmpleo}</h2>
            <p><strong>Descripción:</strong> {datos.descripcion}</p>
            <p><strong>Ubicación:</strong> {datos.ubicacion}</p>
            <p><strong>Nivel de inglés:</strong> {datos.nivelIngles}</p>
            <button onClick={handleCancelarPostulacion} className="cancelar-boton">
              Cancelar Postulación
            </button>
            <button onClick={handleCerrarDetalles} className="cerrar-boton">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostulacionesUsuario;
