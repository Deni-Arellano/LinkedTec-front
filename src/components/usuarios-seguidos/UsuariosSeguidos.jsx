import React, { useState } from 'react';
import './UsuariosSeguidos.css';
import { IoMdClose } from "react-icons/io";
import Seguido from '../seguido/Seguido';
import swal from 'sweetalert2';

const UsuariosSeguidos = ({ closeModal, datosUsuarios }) => {
  const [usuarios, setUsuarios] = useState(datosUsuarios.usuariosSeguidos || []);
  const [pagina, setPagina] = useState(datosUsuarios.pagina);
  const [totalPaginas, setTotalPaginas] = useState(datosUsuarios.total_paginas);
  const [paginaAnterior, setPaginaAnterior] = useState(datosUsuarios.pagina_anterior);
  const [paginaSiguiente, setPaginaSiguiente] = useState(datosUsuarios.pagina_siguiente);

  //Funcion para cargar los usuarios seguidos
  const cargarUsuarios = async (url) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data.usuariosSeguidos);
        setPagina(data.pagina);
        setTotalPaginas(data.total_paginas);
        setPaginaAnterior(data.pagina_anterior);
        setPaginaSiguiente(data.pagina_siguiente);
      } else {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al cargar los datos',
        });
        
      }
    } catch (error) {
      
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error en la solicitud',
      });
    }
  };

  return (
    <div className="overlay-usuarios-seguidos">
      <div className="contenido-usuarios-seguidos">
        <button className="cerrar-usuarios-seguidos" onClick={closeModal}>
          <IoMdClose />
        </button>
        <h3 className="titulo-usuarios-seguidos">Siguiendo</h3>

        
        {usuarios.map((usuario) => (
          <Seguido
            key={usuario.id}
            datosUsuario={{
              id: usuario.id,
              nombre: `${usuario.nombre} ${usuario.apellido_paterno} ${usuario.apellido_materno}`,
              foto: usuario.imagen_usuario,
              rol: usuario.role,
            }}
          />
        ))}

        
        <div className="paginacion-usuarios-seguidos">
          <button
            className="pagina-anterior-usuarios-seguidos"
            onClick={() => cargarUsuarios(paginaAnterior.url)}
            disabled={!paginaAnterior.exists}
          >
            Anterior
          </button>
          <span className="paginacion-info-usuarios-seguidos">
            Página {pagina} de {totalPaginas}
          </span>
          <button
            className="pagina-siguiente-usuarios-seguidos"
            onClick={() => cargarUsuarios(paginaSiguiente.url)}
            disabled={!paginaSiguiente.exists}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsuariosSeguidos;
