import React, { useState } from 'react';
import './Postulacion-usuario.css';
import Swal from 'sweetalert2';
import { BsThreeDots } from "react-icons/bs";

const PostulacionUsuario = ({ datos, onEliminar }) => {
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [estadoPostulacion, setEstadoPostulacion] = useState(datos.estado || 'Activa');

  const handleVerDetalles = () => {
    setMostrarDetalles(!mostrarDetalles);
  };

  const handleCerrarDetalles = () => {
    setMostrarDetalles(false);
  };

  const handleCancelarPostulacion = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, mantener'
    }).then((result) => {
      if (result.isConfirmed) {
        setEstadoPostulacion('Cancelada');
        onEliminar(datos.id_postulacion);
        handleCerrarDetalles();
        Swal.fire(
          'Cancelada',
          'Tu postulación ha sido cancelada.',
          'success'
        );
      }
    });
  };

  return (
    <div className="postulacion-tarjeta">
      <div className="postulacion-header">
        <img src={datos.fotoPerfil || "default_profile.png"} alt="Foto de perfil" className="postulacion-foto-perfil" />
        <p className="postulacion-usuario-nombre">{datos.nombreUsuario || "Usuario desconocido"}</p>
        <BsThreeDots className="icono-tres-puntos" />
      </div>
      <h3 className="titulo-empleo">{datos.tituloEmpleo || "Título no disponible"}</h3>
      <p className="detalle"><strong>Empresa:</strong> {datos.empresa || "Empresa no disponible"}</p>
      <p className="detalle"><strong>Salario:</strong> {datos.salario || "Salario no disponible"}</p>
      <p className="detalle"><strong>Estado de la postulación:</strong> {estadoPostulacion}</p>
      <button onClick={handleVerDetalles} className="ver-detalles-boton">
        {mostrarDetalles ? "Ocultar detalles" : "Ver detalles"}
      </button>

      {mostrarDetalles && (
        <div className="detalles-modal">
          <div className="detalles-contenido">
            <h2 className="titulo-empleo">{datos.tituloEmpleo}</h2>
            <p><strong>Descripción:</strong> {datos.descripcion || "Descripción no disponible"}</p>
            <p><strong>Ubicación:</strong> {datos.ubicacion || "Ubicación no disponible"}</p>
            <p><strong>Nivel de inglés:</strong> {datos.nivelIngles || "Nivel no disponible"}</p>

            <h3>Detalles de la postulación</h3>
            <p><strong>Fecha de postulación:</strong> {datos.fechaPostulacion || "Fecha no disponible"}</p>
            <p><strong>Mensaje del candidato:</strong> {datos.mensajeCandidato || "Mensaje no disponible"}</p>
            <p><strong>Experiencia relevante:</strong> {datos.experiencia || "Experiencia no disponible"}</p>

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

export default PostulacionUsuario;
