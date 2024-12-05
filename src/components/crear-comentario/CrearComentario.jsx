import React from "react";
import './CrearComentario.css';
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import Axios from 'axios';

const CrearComentario = ({ id_publicacion, idUsuario, onComentarioAgregado }) => {
    const [comentario, setComentario] = useState('');

    const add = async () => {
        console.clear();

        if (!comentario.trim()) {
            console.log('El comentario no puede estar vacío.');
            return;
        }
        if (comentario.length > 250) {
            console.log('El comentario no puede exceder los 250 caracteres.');
            return;
        }

        // Preparar datos para enviar
        const datosEnviar = {
            'texto': comentario,
            'id_usuario': idUsuario, 
            'fecha': new Date().toISOString()
        };
        try {
            const response = await Axios.post(`https://linked-back-spring-lake-433.fly.dev/publicaciones/comentarios/${id_publicacion}`, datosEnviar);
            onComentarioAgregado(response.data);  
            setComentario('');  
            console.log('Comentario agregado con éxito.'); 
        } catch (error) {
            if (error.response) {
                console.log("Error del servidor:", error.response.data);
            } else {
                console.log("Error en la solicitud:", error.message);
            }
        }
    };

    return (
        <div className="mostrar-crear-comentario">
            <textarea
                className="texto-crear-comentario"
                placeholder="Escribe un comentario..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                maxLength="250" 
            ></textarea>
            <div className="botones-comentario">
                <button className="crear-comentario" onClick={add}>
                    <IoSend />
                </button>
            </div>
        </div>
    );
};

export default CrearComentario;
