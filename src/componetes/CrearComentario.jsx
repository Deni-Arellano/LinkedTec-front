import React from "react";
import '../hojas-de-estilo/CrearComentario.css'
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import Axios from 'axios';

const CrearComentario = ({ id_publicacion, idUsuario, onComentarioAgregado }) => {
    const [comentario, setComentario] = useState('');
    const [error, setError] = useState('');

    const add = async () => {
        if (!comentario.trim()) {
            console.log('El comentario no puede estar vacío.');
            return;
        }

        const datosEnviar = {
            'texto': comentario,
            'id_usuario': idUsuario, 
            'fecha': new Date().toISOString()
        };


        
        const response = await Axios.post(`http://localhost:3000/publicaciones/comentarios/${id_publicacion}`, datosEnviar)
        .then((response) => {
            //console.log('Datos del servidor:' ,response.data);
            onComentarioAgregado(response.data)
            setComentario('');
        })
        .catch((error) => {
            if (error.response) {
                console.log("Error de respuesta del servidor:", error.response.data);
                console.log("Código de estado:", error.response.status);
                
      
            } else {
                console.log("Error en la solicitud:", error.message);
            }
      
      
          })
          ;
    };
    
    return (
        <div className="mostrar-crear-comentario">  
            <textarea
                className="texto-crear-comentario"
                placeholder="Escribe un comentario..."
                value={comentario} 
                onChange={(e) => setComentario(e.target.value)} 
            ></textarea>
            {error && <p className="error">{error}</p>} 
            <div className="boton-crear-comentario">
                <button className="crear-comentario" onClick={add}>
                    <IoSend />
                </button>
            </div>
        </div>
    );
}

export default CrearComentario;