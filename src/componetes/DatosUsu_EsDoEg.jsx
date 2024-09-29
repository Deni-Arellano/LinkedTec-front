import React from 'react';
import '../hojas-de-estilo/DatosUsu_EsDoEg.css';
import { FaEnvelope, FaPhone, FaBirthdayCake, FaBriefcase, FaVenusMars } from 'react-icons/fa';  // Añadimos el icono de sexo

const DatosUsu_EsDoRec = ({datos}) => {
    return (
        <div className="perfil-cuadro">
            <p><FaBriefcase className="icono"/> <strong>Carrera:</strong> {datos.carrera}</p>
            <p><strong>Biografía:</strong></p>
            <p className="biografia">{datos.biografia}</p>

            <p><FaEnvelope className="icono"/> <strong>Correo:</strong>{datos.correo}</p>
            <p><FaPhone className="icono"/> <strong>Teléfono:</strong> {datos.telefono}</p>
            <p><FaBirthdayCake className="icono"/> <strong>Fecha de Nacimiento:</strong> {datos.fecha}</p>
            <p><FaVenusMars className="icono"/> <strong>Sexo:</strong> {datos.sexo}</p> {/* Aquí incluimos el nuevo campo */}
        </div>
    );
}

export default DatosUsu_EsDoRec;
