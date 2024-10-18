import React, { useState } from 'react';
import './DatosUsuario.css';
import { FaEnvelope, FaPhone, FaBirthdayCake, FaBriefcase, FaVenusMars } from 'react-icons/fa';
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const DatosUsu_EsDoEg = ({ datos }) => {
    const navigate = useNavigate();
    const [mostrarOpciones, setMostrarOpciones] = useState(false);

    const handleOpciones = () => {
        setMostrarOpciones(!mostrarOpciones);
    };

    const editarPerfil = () => {
        console.log('Editar perfil');
        if (datos.rol === 'Estudiante') {
            navigate('/editar-estudiante');
        } else if (datos.rol === 'Egresado') {
            navigate('/editar-egresado');
        } else if (datos.rol === 'Docente') {
            navigate('/editar-docente');
        }
    };

    return (
        <div className="perfil-cuadro-datos-usuario">
            <BsThreeDots className="mostrar-datos-usuario-icono-tres-puntos" size={20} onClick={handleOpciones} />
            {mostrarOpciones && (
                <div className="mostrar-datos-usuario-opciones-dropdown">
                    <button className="mostrar-datos-usuario-opcion-boton" onClick={editarPerfil}>Editar</button>
                </div>
            )}
            <p><FaBriefcase className="icono" /> <strong>Carrera: </strong> {datos.carrera}</p>
            <p><strong>Biografía: </strong></p>
            <p className="biografia">{datos.biografia}</p>
            <p><FaEnvelope className="icono" /> <strong>Correo: </strong> {datos.correo}</p>
            <p><FaPhone className="icono" /> <strong>Teléfono: </strong> {datos.telefono}</p>
            <p><FaBirthdayCake className="icono" /> <strong>Fecha de nacimiento: </strong> {datos.fecha}</p>
            <p><FaVenusMars className="icono" /> <strong>Sexo: </strong> {datos.sexo}</p>
        </div>
    );
}

export default DatosUsu_EsDoEg;
