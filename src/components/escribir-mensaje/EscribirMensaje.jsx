import React from "react";
import './EscribirMensaje.css';
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import Axios from 'axios';

const NuevoMensaje = () => {
    const [mensaje, setMensaje] = useState('');

    return (
        
        <div className="mostrar-nuevo-mensaje">
            <textarea
                className="texto-nuevo-mensaje"
                placeholder="Escribe un mensaje..."
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                maxLength="500"
            ></textarea>
            <button className="nuevo-mensaje" >
                <IoSend />
            </button>
        </div>
        
    );
};

export default NuevoMensaje;
