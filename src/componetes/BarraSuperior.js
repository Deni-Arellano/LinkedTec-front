import React from 'react';
import '../hojas-de-estilo/BarraSuperior.css';  // Ruta cambiada para usar "hojas-de-estilo"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faCog } from '@fortawesome/free-solid-svg-icons';  // Importamos los iconos

const BarraSuperior = () => {
  return (
    <div className="barra-superior">
      <div className="logo-seccion">
        <h2 className="titulo">LinkedTec</h2>
      </div>
      <div className="buscador-seccion">
        <input type="text" className="buscador" placeholder="Buscar..." />
      </div>
      <div className="iconos-seccion">
        <FontAwesomeIcon icon={faEnvelope} />  {/* Icono de mensajes */}
        <FontAwesomeIcon icon={faUser} />      {/* Icono de usuario */}
        <FontAwesomeIcon icon={faCog} />       {/* Icono de ajustes */}
      </div>
    </div>
  );
};

export default BarraSuperior;
