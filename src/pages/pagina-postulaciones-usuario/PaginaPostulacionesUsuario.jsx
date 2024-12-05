import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion'; // Ajusta la ruta si es necesario
import { BsThreeDots } from "react-icons/bs";
import './PaginaPostulacionesUsuario.css';

const PostulacionUsuario = ({ idPostulacion }) => {
  const [datos, setDatos] = useState({});
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [estadoPostulacion, setEstadoPostulacion] = useState('Activa');

  useEffect(() => {
    const fetchPostulacionData = async () => {
      try {
        const response = await axios.get(`https://linked-back-spring-lake-433.fly.dev/postulaciones/${idPostulacion}/info`);
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
        setEstadoPostulacion('Cancelada'); // Cambia el estado a "Cancelada"
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

            <button 
              onClick={handleCancelarPostulacion} 
              className="cancelar-boton"
              disabled={estadoPostulacion === 'Cancelada'} // Deshabilita el botón si el estado es "Cancelada"
            >
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

const PaginaPostulacionesUsuario = () => {
  const [postulaciones, setPostulaciones] = useState([]); 

  useEffect(() => {
    const fetchPostulaciones = async () => {
      try {
        const userId = 5; // Reemplaza con el ID real del usuario
        const response = await axios.get('https://linked-back-spring-lake-433.fly.dev/postulaciones/5?pagina=1&limite=10');
        setPostulaciones(response.data.postulaciones);
      } catch (error) {
        console.error("Error al cargar las postulaciones:", error);
        Swal.fire(
          'Error',
          'No se pudieron cargar las postulaciones del usuario.',
          'error'
        );
      }
    };

    fetchPostulaciones();
  }, []);

  return (
    <div className="contenedor-pagina">
      <div className="menu-navegacion">
        <MenuNavegacion />
      </div>
      <div className="pagina-postulaciones">
        <div className="postulaciones-lista">
          {postulaciones.map((postulacion) => (
            <PostulacionUsuario
              key={postulacion.id_postulacion}
              idPostulacion={postulacion.id_postulacion}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaginaPostulacionesUsuario;
