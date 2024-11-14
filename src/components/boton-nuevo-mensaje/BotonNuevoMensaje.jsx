import React from 'react';
import './BotonNuevoMensaje.css';
import { BiMessageEdit } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

const BotonNuevoMensaje = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    //console.log('click boton nuevo mensaje');
    navigate('/nuevo-mensaje');
  }
  return (
    <button type="button" 
    className="mensajes-button"
    onClick={handleClick}><BiMessageEdit size='2.5em'/></button>
    
  );
};

export default BotonNuevoMensaje;