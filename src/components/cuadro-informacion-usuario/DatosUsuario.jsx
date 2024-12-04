import axios from 'axios';
import React, { useState } from 'react';
import './DatosUsuario.css';
import { FaEnvelope, FaPhone, FaBirthdayCake, FaBriefcase, FaVenusMars } from 'react-icons/fa';
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const DatosUsu_EsDoEg = ({ datos }) => {
    const navigate = useNavigate();
    const [mostrarOpciones, setMostrarOpciones] = useState(false);
    const usuarioId = datos.id; // Asegúrate de que `id` esté presente en `datos`
    const [imagen, setImagen] = useState(datos.imagen); // Agregar estado para la imagen

    const handleOpciones = () => {
        setMostrarOpciones(!mostrarOpciones);
    };

    const editarPerfil = () => {
        if (datos.rol === 'Estudiante') {
            navigate('/editar-estudiante');
        } else if (datos.rol === 'Egresado') {
            navigate('/editar-egresado');
        } else if (datos.rol === 'Docente') {
            navigate('/editar-docente');
        }
    };

    const eliminarPerfil = async () => {
        const { value: password } = await Swal.fire({
            title: 'Eliminar Perfil',
            text: 'Ingrese su contraseña para confirmar:',
            input: 'password',
            inputPlaceholder: 'Contraseña',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                if (!value) {
                    return '¡Debe ingresar su contraseña!';
                }
            }
        });

        if (password) {
            try {
                if (!usuarioId) {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'ID de usuario no válido. Verifique su sesión.'
                    });
                    return;
                }

                // URL combinada para verificar la contraseña y eliminar el perfil
                const eliminarUrl = `http://localhost:3000/usuarios/${usuarioId}?contraseña=${encodeURIComponent(password)}`;

                // Realiza la solicitud DELETE para eliminar el perfil
                const eliminarResponse = await axios.delete(eliminarUrl);

                if (eliminarResponse.status === 200) {
                    await Swal.fire({
                        icon: 'success',
                        title: 'Perfil eliminado',
                        text: 'Su perfil ha sido eliminado con éxito.',
                        confirmButtonText: 'OK'
                    });
                    // Redirige al login después de eliminar el perfil
                    navigate('/src/pages/pagina-login/Login');
                } else {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo eliminar el perfil. Inténtelo de nuevo más tarde.'
                    });
                }
            } catch (error) {
                console.error('Error al eliminar perfil:', error);
                // Verifica si el error fue por una contraseña incorrecta o por usuario no encontrado
                if (error.response) {
                    if (error.response.status === 401) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Contraseña incorrecta. Verifique e intente de nuevo.'
                        });
                    } else if (error.response.status === 404) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Usuario no encontrado.'
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Ocurrió un error al eliminar su perfil.'
                        });
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error de conexión. Inténtelo más tarde.'
                    });
                }
            }
        }
    };

    // Función para cambiar la imagen
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
                // Subir la imagen al servidor
                const uploadResponse = await axios.post('http://localhost:3000/subidas/subir-imagen', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                const { secure_url } = uploadResponse.data.data;

                // Actualizamos la imagen en el servidor
                await axios.put('http://localhost:3000/usuarios/imagen', {
                    id: usuarioId,
                    imagen_nueva: secure_url,
                    antigua_imagen: datos.imagen
                });

                // Actualizamos el estado de la imagen
                setImagen(secure_url); // Esto actualizará la imagen en el componente

                Swal.fire('Éxito', 'Imagen actualizada correctamente.', 'success');

                // Recargamos la página para actualizar los datos
                window.location.reload(); // Recarga la página para reflejar los cambios

            } catch (error) {
                Swal.fire('Error', error.response?.data?.error || 'No se pudo cambiar la imagen', 'error');
            }
        }
    };

    return (
        <div className="perfil-cuadro-datos-usuario">
            <BsThreeDots className="mostrar-datos-usuario-icono-tres-puntos" size={20} onClick={handleOpciones} />
            {mostrarOpciones && (
                <div className="mostrar-datos-usuario-opciones-dropdown">
                    <button className="mostrar-datos-usuario-opcion-boton" onClick={editarPerfil}>Editar</button>
                    <button className="mostrar-datos-usuario-opcion-boton" onClick={eliminarPerfil}>Eliminar perfil</button>
                    <button className="mostrar-datos-usuario-opcion-boton" onClick={cambiarImagen}>Cambiar Imagen</button>
                </div>
            )}
            <p><FaBriefcase className="icono" /> <strong>Carrera: </strong> {datos.carrera}</p>
            <p><strong>Biografía: </strong></p>
            <p className="biografia">{datos.biografia}</p>
            <p><FaEnvelope className="icono" /> <strong>Correo: </strong> {datos.correo}</p>
            <p><FaPhone className="icono" /> <strong>Teléfono: </strong> {datos.telefono}</p>
            <p><FaBirthdayCake className="icono" /> <strong>Fecha de nacimiento: </strong> {datos.fecha}</p>
            <p><FaVenusMars className="icono" /> <strong>Sexo: </strong> {datos.sexo}</p>
            <img src={imagen} alt="Imagen de perfil" className="perfil-imagen" />
        </div>
    );
};

export default DatosUsu_EsDoEg;
