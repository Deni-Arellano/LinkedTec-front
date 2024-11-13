import React, { useState } from "react";
import './EscribirMensaje.css';
import { IoSend } from "react-icons/io5";

const NuevoMensaje = ({ enviarMensaje }) => {
    const [mensaje, setMensaje] = useState('');

    const manejarEnvio = () => {
        if (mensaje.trim()) {
            enviarMensaje(mensaje);
            setMensaje(''); // Limpiar el campo de entrada después de enviar el mensaje
        }
    };

    return (
        <div className="mostrar-nuevo-mensaje">
            <textarea
                className="texto-nuevo-mensaje"
                placeholder="Escribe un mensaje..."
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                maxLength="500"
            ></textarea>
            <button className="nuevo-mensaje" onClick={manejarEnvio}>
                <IoSend />
            </button>
        </div>
    );
};

export default NuevoMensaje;
