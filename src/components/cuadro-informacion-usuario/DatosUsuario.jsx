import React, { useState } from 'react';
import './DatosUsuario.css';
import { FaEnvelope, FaPhone, FaBirthdayCake, FaBriefcase, FaVenusMars } from 'react-icons/fa';
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const DatosUsu_EsDoEg = ({ datos }) => {
    const navigate = useNavigate();
    const [mostrarOpciones, setMostrarOpciones] = useState(false);

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
            customClass: {
                input: 'swal-input',
                confirmButton: 'swal-confirm-button',
                cancelButton: 'swal-cancel-button'
            },
            inputAttributes: {
                style: 'width: 100%; padding: 10px; border-radius: 5px; box-sizing: border-box;'
            },
            inputValidator: (value) => {
                if (!value) {
                    return '¡Debe ingresar su contraseña!';
                }
            }
        });

        if (password) {
            try {
                // Verificación del ID del usuario antes de la solicitud
                console.log("Valor de usuarioLog antes de la solicitud:", datos.usuarioLog);

                if (!datos || !datos.usuarioLog) {
                    console.error("Error: usuarioLog no está definido o es inválido.");
                    await Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'ID de usuario no encontrado. Verifique su sesión.'
                    });
                    return;
                }

                // Paso 1: Verificación de la contraseña con una solicitud GET
                const verificarUrl = `http://localhost:3000/usuarios/${datos.usuarioLog}?contraseña=${encodeURIComponent(password)}`;
                console.log("URL para la solicitud:", verificarUrl);

                const verificarResponse = await fetch(verificarUrl);

                if (verificarResponse.ok) {
                    const usuarioData = await verificarResponse.json();
                    
                    // Obtén el ID del usuario para la eliminación
                    const usuarioId = usuarioData.id;
                    console.log("ID del usuario para eliminación:", usuarioId);

                    // Paso 2: Realiza la solicitud DELETE para eliminar el perfil
                    const eliminarUrl = `http://localhost:3000/usuarios/${usuarioId}`;
                    const eliminarResponse = await fetch(eliminarUrl, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

                    if (eliminarResponse.ok) {
                        await Swal.fire({
                            icon: 'success',
                            title: 'Perfil eliminado',
                            text: 'Su perfil ha sido eliminado con éxito.',
                            confirmButtonText: 'OK'
                        });
                        navigate('/pagina-login/Login');
                    } else {
                        await Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo eliminar el perfil. Inténtelo de nuevo más tarde.'
                        });
                    }
                } else {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Contraseña incorrecta. Verifique e intente de nuevo.'
                    });
                }
            } catch (error) {
                console.error('Error al eliminar perfil:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al eliminar su perfil.'
                });
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
