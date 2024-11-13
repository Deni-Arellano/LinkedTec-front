import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion'; // Asegúrate de que la ruta sea correcta
import PostulacionUsuario from '../../components/componente-postulacion-usuario/Postulacion-usuario'; // Importa el componente PostulacionUsuario

const PaginaPostulacionesUsuario = () => {
  const [postulaciones, setPostulaciones] = useState([]); // Estado para las postulaciones

  useEffect(() => {
    const fetchPostulaciones = async () => {
      try {
        const response = await axios.get('http://localhost:3000/postulaciones/id_usuario?pagina=1&limite=10');
        setPostulaciones(response.data.postulaciones); // Actualizamos el estado con las postulaciones recibidas
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
    <div className="pagina-postulaciones">
      <MenuNavegacion />
      {/* Mapea y muestra cada postulación */}
      {postulaciones.map((postulacion) => (
        <PostulacionUsuario key={postulacion.id_postulacion} idPostulacion={postulacion.id_postulacion} />
      ))}
    </div>
  );
};

export default PaginaPostulacionesUsuario;
