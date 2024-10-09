import React, { useState } from "react";
<<<<<<<< HEAD:src/components/comentario/Comentario.jsx
import Texto from '../../componetes/Etiquetas';
import '../hojas-de-estilo/Comentario.css'
========
import Texto from './Etiquetas';
import './mostrarcomentario.css'
>>>>>>>> 8cb730ed57b0b12203837d233e53fc9c88d57a1d:src/components/componente-mostrar-comentario/MostrarComentario.jsx
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