import React, { useState } from 'react';
import './DatosUsuarioReclutador.css';
import { FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars, FaBuilding, FaIndustry, FaBriefcase } from 'react-icons/fa';  // Solo íconos necesarios
import { useNavigate } from 'react-router-dom';
import { BsThreeDots } from "react-icons/bs";

const DatosUsu_Rec = ({datos}) => {
    const navigate = useNavigate();
    const [mostrarOpciones, setMostrarOpciones] = useState(false);

    const handleOpciones = () => {
        setMostrarOpciones(!mostrarOpciones);
    };

    const editarPerfil = () => {
        console.log('Editar publicación');
        if (datos.rol === 'Reclutador') {
            navigate('/editar-reclutador');
        }
    };

    return (
        <div className="perfil-cuadro-reclutador">
            <BsThreeDots className="mostrar-datos-usuario-icono-tres-puntos" size={20} onClick={handleOpciones} />
            {mostrarOpciones && (
                <div className="mostrar-datos-usuario-opciones-dropdown">
                    <button className="mostrar-datos-usuario-opcion-boton" onClick={editarPerfil}>Editar</button>
                </div>
            )}
            <p><strong><i className="icono fas fa-info-circle"></i> Biografía: </strong></p>
            <p className="biografia"> {datos.biografia}</p>
            <p><FaEnvelope className="icono" /> <strong>Correo: </strong> {datos.correo}</p>
            <p><strong><FaPhone className="icono" /> Teléfono: </strong> {datos.telefono}</p>
            <p><strong><FaBirthdayCake className="icono" /> Fecha de nacimiento: </strong> {datos.fecha}</p>
            <p><strong><FaVenusMars className="icono" /> Sexo: </strong> {datos.sexo}</p>
            <p><strong><FaBuilding className="icono" /> Empresa: </strong> {datos.empresa}</p>
            <p><strong><FaIndustry className="icono" /> Giro de la empresa: </strong> {datos.giro}</p>
        </div>
    );
}

export default DatosUsu_Rec;
