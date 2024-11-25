import React, { useState } from 'react';
import './BotonSeguidos.css'; 
import { FaUserFriends } from 'react-icons/fa';  
import UsuariosSeguidos from '../usuarios-seguidos/UsuariosSeguidos';
import Swal from 'sweetalert2';

const BotonSeguidos = ({ numSeguidos, datosSeguidos}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Funcion para abrir la ventana de seguidos
  const openModal = () => {
    if (datosSeguidos && numSeguidos > 0) {
      setIsModalOpen(true);
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'No hay seguidos',
      });
    }
  };

  //Funcion para cerrar la ventana de seguidos
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>

      <button className="boton-seguidos" onClick={openModal}>
        <FaUserFriends className="icono-seguidos" />
        Seguidos ({numSeguidos})
      </button>


      {isModalOpen && <UsuariosSeguidos closeModal={closeModal} datosUsuarios={datosSeguidos}/>}
    </div>
  );
};

export default BotonSeguidos;
