import React from 'react';
import './BotonNuevoMensaje.css';
import { BiMessageEdit } from "react-icons/bi";

const BotonNuevoMensaje = ({ onClick, style }) => {
  return (
    <button type="button" className="mensajes-button"><BiMessageEdit size='2.5em'/></button>
    
  );
};

export default BotonNuevoMensaje;