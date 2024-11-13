import React, { useState, useEffect } from 'react'; // Importa useState y useEffect
import axios from 'axios'; // Importa axios para realizar solicitudes HTTP
import Swal from 'sweetalert2'; // Importa Swal para las alertas
import './Postulacion-usuario.css';
import { BsThreeDots } from "react-icons/bs";

const PostulacionUsuario = ({ idPostulacion, onEliminar }) => { // Asegúrate de recibir idPostulacion como prop
  const [datos, setDatos] = useState({});
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [estadoPostulacion, setEstadoPostulacion] = useState('Activa');

  useEffect(() => {
    // Obtener los datos de la postulación desde la API
    const fetchPostulacionData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/postulaciones/${idPostulacion}/info`);
        setDatos(response.data); // Asigna los datos recibidos a 'datos'
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire(
          'Error',
          'No se pudieron cargar los datos de la postulación.',
          'error'
        );
      }
    };

    fetchPostulacionData();
  }, [idPostulacion]);

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
        if (onEliminar) onEliminar(idPostulacion); // Llama a onEliminar si está definido
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
        <img src={datos.usuario?.fotoPerfil || "default_profile.png"} alt="Foto de perfil" className="postulacion-foto-perfil" />
        <p className="postulacion-usuario-nombre">{datos.usuario?.nombre || "Usuario desconocido"}</p>
        <BsThreeDots className="icono-tres-puntos" />
      </div>
      <h3 className="titulo-empleo">{datos.empleo?.titulo || "Título no disponible"}</h3>
      <p className="detalle"><strong>Empresa:</strong> {datos.empleo?.empresa || "Empresa no disponible"}</p>
      <p className="detalle"><strong>Salario:</strong> {datos.empleo?.salario || "Salario no disponible"}</p>
      <p className="detalle"><strong>Estado de la postulación:</strong> {estadoPostulacion}</p>
      <button onClick={handleVerDetalles} className="ver-detalles-boton">
        {mostrarDetalles ? "Ocultar detalles" : "Ver detalles"}
      </button>

      {mostrarDetalles && (
        <div className="detalles-modal">
          <div className="detalles-contenido">
            <h2 className="titulo-empleo">{datos.empleo?.titulo}</h2>
            <p><strong>Descripción:</strong> {datos.empleo?.descripcion || "Descripción no disponible"}</p>
            <p><strong>Ubicación:</strong> {datos.empleo?.ubicacion || "Ubicación no disponible"}</p>
            <p><strong>Nivel de inglés:</strong> {datos.empleo?.nivel_de_ingles || "Nivel no disponible"}</p>
            <p><strong>Fecha de creación:</strong> {datos.empleo?.fecha_creacion || "Fecha no disponible"}</p>

            <h3>Detalles de la postulación</h3>
            <p><strong>Correo del candidato:</strong> {datos.usuario?.correo || "Correo no disponible"}</p>
            <p><strong>Mensaje del candidato:</strong> {datos.usuario?.descripcion_personal || "Mensaje no disponible"}</p>
            <p><strong>Experiencia relevante:</strong> {datos.usuario?.cv || "Experiencia no disponible"}</p>

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
