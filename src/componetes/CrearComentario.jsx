import React from "react";
import '../hojas-de-estilo/CrearComentario.css'
import { IoSend } from "react-icons/io5";

const CrearComentario = () => {
    
    return (
        <div className="mostrar-crear-comentario">  
            <textarea class="texto-crear-comentario" placeholder="Escribe un comentario..."></textarea>
            <div className="boton-crear-comentario">
                <button class="crear-comentario"><IoSend /></button>

            </div>
        </div>
    );
}

export default CrearComentario;