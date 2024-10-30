import React, { useState } from 'react';
import './Postulacion-usuario.css';
import Swal from 'sweetalert2';
import { BsThreeDots } from "react-icons/bs";

const PostulacionesUsuario = ({ datos, onEliminar }) => {
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [estadoPostulacion, setEstadoPostulacion] = useState('Activa');

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
      {/* Primera vista con solo datos del empleo */}
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

      {/* Ventana emergente de detalles con datos del empleo y de la postulación */}
      {mostrarDetalles && (
        <div className="detalles-modal">
          <div className="detalles-contenido">
            <h2 className="titulo-empleo">{datos.tituloEmpleo}</h2>
            <p><strong>Descripción:</strong> {datos.descripcion}</p>
            <p><strong>Ubicación:</strong> {datos.ubicacion}</p>
            <p><strong>Nivel de inglés:</strong> {datos.nivelIngles}</p>
            
            {/* Datos adicionales de la postulación */}
            <h3>Detalles de la Postulación</h3>
            <p><strong>Fecha de postulación:</strong> {datos.fechaPostulacion}</p>
            <p><strong>Mensaje del candidato:</strong> {datos.mensajeCandidato}</p>
            <p><strong>Experiencia relevante:</strong> {datos.experiencia}</p>
            
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
