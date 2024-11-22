import React from 'react';
import './BotonSeguidos.css'; 
import { FaUserFriends } from 'react-icons/fa';  
const BotonSeguidos = ({ numSeguidos }) => {
  return (
    <button className="boton-seguidos">
      <FaUserFriends className='icono-seguidos'/>
       Seguidos ({numSeguidos})
    </button>
  );
};

export default BotonSeguidos;
