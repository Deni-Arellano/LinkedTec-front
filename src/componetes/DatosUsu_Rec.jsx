import React from 'react';
import '../hojas-de-estilo/DatosUsu_EsDoEg.css';  // Asegúrate de que el CSS esté enlazado correctamente
import { FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars, FaBuilding, FaIndustry, FaBriefcase } from 'react-icons/fa';  // Solo íconos necesarios

const DatosUsu_Rec = ({datos}) => {
    return (
            <div className="perfil-cuadro">
                <p><strong><i className="icono fas fa-info-circle"></i> Biografía:</strong></p>
                <p className="biografia"> {datos.biografia}</p>
                <p><FaEnvelope className="icono"/> <strong>Correo:</strong> {datos.correo}</p>
                <p><strong><FaPhone className="icono" /> Teléfono:</strong> {datos.telefono}</p>
                <p><strong><FaBirthdayCake className="icono" /> Fecha de Nacimiento:</strong> {datos.fecha}</p>
                <p><strong><FaVenusMars className="icono" /> Sexo:</strong> {datos.sexo}</p>
                <p><strong><FaBuilding className="icono" /> Empresa:</strong> {datos.empresa}</p>
                <p><strong><FaIndustry className="icono" /> Giro de la Empresa:</strong> {datos.giro}</p>
            </div>
    );
}

export default DatosUsu_Rec;
