import React, { useState, useEffect } from 'react';
import './BotonSeguirPerfil.css';
import { FaUserPlus, FaUserCheck, FaUserXmark } from "react-icons/fa6";
import Swal from 'sweetalert2';
import axios from 'axios';

const BotonSeguimientoEnPerfil = ({ id_usuario_log, id_perfil_a_seguir }) => {
    const [siguiendo, setSiguiendo] = useState(false);
    const [hover, setHover] = useState(false);

    // Verificar el estado inicial de seguimiento
    useEffect(() => {
        const verificarSeguimiento = async () => {
            if (id_usuario_log && id_perfil_a_seguir) {
                try {
                    const response = await axios.get(
                        `http://localhost:3000/seguimientos/usuarios/${id_usuario_log}/seguidos?pagina=1&limite=100`
                    );
                    // Comprueba si el usuario está siguiendo al perfil
                    const siguiendoPerfil = response.data.usuariosSeguidos.some(
                        (seg) => seg.id === id_perfil_a_seguir
                    );
                    setSiguiendo(siguiendoPerfil);
                } catch (error) {
                    console.error("Error al verificar seguimiento:", error);
                }
            }
        };

        verificarSeguimiento();
    }, [id_usuario_log, id_perfil_a_seguir]);

    // Manejar el clic del botón
    const manejarClick = () => {
        axios
            .post('http://localhost:3000/seguimientos', {
                id_usuario: id_usuario_log,
                id_perfil_a_seguir: id_perfil_a_seguir,
            })
            .then((response) => {
                setSiguiendo(!siguiendo); // Cambiar el estado actual
                Swal.fire({
                    icon: 'success',
                    title: response.data.message, // Mostrar mensaje del backend
                });
            })
            .catch((error) => console.error("Error al gestionar seguimiento:", error));
    };

    return (
        <div>
            <button
                className={`boton-seguimiento-en-perfil ${siguiendo ? 'siguiendo' : ''}`}
                onClick={manejarClick}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                {siguiendo ? (
                    hover ? (
                        <>
                            <FaUserXmark size={16} /> Quitar seguir
                        </>
                    ) : (
                        <>
                            <FaUserCheck size={16} /> Siguiendo
                        </>
                    )
                ) : (
                    <>
                        <FaUserPlus size={16} /> Seguir
                    </>
                )}
            </button>
        </div>
    );
};

export default BotonSeguimientoEnPerfil;
