import React, { useState } from 'react';
import './DatosUsuarioReclutador.css';
import { FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars, FaBuilding, FaIndustry } from 'react-icons/fa';
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

    const cambiarImagen = async () => {
        const { value: file } = await Swal.fire({
            title: 'Selecciona una imagen',
            input: 'file',
            inputAttributes: {
                accept: 'image/png, image/jpeg',
                'aria-label': 'Sube tu imagen de perfil'
            },
            showCancelButton: true,
            confirmButtonText: 'Subir',
            cancelButtonText: 'Cancelar'
        });

        if (file) {
            const formData = new FormData();
            formData.append('imagen', file);

            try {
                const uploadResponse = await axios.post('http://localhost:3000/subidas/subir-imagen', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                const { secure_url } = uploadResponse.data.data;

                // Actualizamos la imagen en el servidor
                await axios.put('http://localhost:3000/usuarios/imagen', {
                    id: datos.id,
                    imagen_nueva: secure_url,
                    antigua_imagen: datos.imagen
                });

                // Recargamos la página
                window.location.reload(); // Recarga la página para actualizar los datos

            } catch (error) {
                Swal.fire('Error', error.response?.data?.error || 'No se pudo cambiar la imagen', 'error');
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
                    <button className="mostrar-datos-usuario-opcion-boton" onClick={cambiarImagen}>Cambiar Imagen</button>
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
