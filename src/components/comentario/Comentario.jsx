import React, { useState } from "react";
import Texto from '../../componetes/Etiquetas';
import '../hojas-de-estilo/Comentario.css'
import { BsThreeDots } from "react-icons/bs";

const Comentar = ({comentario}) => {
    console.log(comentario);
    const formatFecha = (fechaString) => {
        const fecha = new Date(fechaString);
        return fecha.toLocaleDateString(); 
    };

    
    return (
        <div className="mostrar-comentario">
            <div className="mostrar-comentario-header">
                <img 
                    src= { "https://via.placeholder.com/50"} 
                    alt="Profile" 
                    className="mostrar-imagen-perfil-comentario" 
                />
                <Texto className='textoComentario' texto={ "Usuario desconocido"}/>

                
            </div>
            <div className="fecha-comentario">
                <Texto tamano={11} texto={ "Fecha no disponible"} />
            </div>
            <div className="comentario-contenido">
                <div className="comentario-texto">
                    <div className="comentario-descripcion">
                        <Texto texto={ "Sin descripción disponible"}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comentar;