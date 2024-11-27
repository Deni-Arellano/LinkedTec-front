import React, { useState } from 'react';
import './BotonSeguirPerfil.css';
import { FaUserPlus, FaUserCheck, FaUserXmark } from "react-icons/fa6";

const BotonSeguimientoEnPerfil = () => {
    const [siguiendo, setSiguiendo] = useState(false);
    const [hover, setHover] = useState(false);

    const manejarClick = () => {
        setSiguiendo(!siguiendo);
        // Aquí puedes añadir lógica para realizar una acción en el backend
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
