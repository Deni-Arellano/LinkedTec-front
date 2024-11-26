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
                            <FaUserXmark size={20} /> Quitar seguir
                        </>
                    ) : (
                        <>
                            <FaUserCheck size={20} /> Siguiendo
                        </>
                    )
                ) : (
                    <>
                        <FaUserPlus size={20} /> Seguir
                    </>
                )}
            </button>
        </div>
    );
};

export default BotonSeguimientoEnPerfil;
