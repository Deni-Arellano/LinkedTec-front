import React, { useState } from 'react';
import './DatosUsuarioReclutador.css';
import { FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars, FaBuilding, FaIndustry, FaBriefcase } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BsThreeDots } from "react-icons/bs";
import Swal from 'sweetalert2';
import axios from 'axios';

const DatosUsu_Rec = ({ datos }) => {
    const navigate = useNavigate();
    const [mostrarOpciones, setMostrarOpciones] = useState(false);

    const handleOpciones = () => {
        setMostrarOpciones(!mostrarOpciones);
    };

    const editarPerfil = () => {
        if (datos.rol === 'Reclutador') {
            navigate('/editar-reclutador');
        }
    };

    const eliminarPerfil = async () => {
        if (!datos.id) {
            Swal.fire('Error', 'No se encontró el ID del usuario. No se puede eliminar el perfil.', 'error');
            return;
        }
    
        const { value: password } = await Swal.fire({
            title: 'Eliminar Perfil',
            input: 'password',
            inputLabel: 'Por favor, ingresa tu contraseña para confirmar',
            inputPlaceholder: 'Contraseña',
            inputAttributes: {
                maxlength: 20,
                autocapitalize: 'off',
                autocorrect: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        });
    
        if (password) {
            try {
                const response = await axios.delete(`/usuarios/${datos.id}`, {
                    params: { contraseña: password }
                });
                if (response.status === 200) {
                    Swal.fire('Eliminado', 'Tu perfil ha sido eliminado exitosamente', 'success');
                    navigate('./src/pages/pagina-login/Login.jsx');
                }
            } catch (error) {
                Swal.fire('Error', error.response?.data?.error || 'No se pudo eliminar el perfil', 'error');
            }
        }
    };
    
    return (
        <div className="perfil-cuadro-reclutador">
            <BsThreeDots className="mostrar-datos-usuario-icono-tres-puntos" size={20} onClick={handleOpciones} />
            {mostrarOpciones && (
                <div className="mostrar-datos-usuario-opciones-dropdown">
                    <button className="mostrar-datos-usuario-opcion-boton" onClick={editarPerfil}>Editar</button>
                    <button className="mostrar-datos-usuario-opcion-boton" onClick={eliminarPerfil}>Eliminar</button>
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
};

export default DatosUsu_Rec;
