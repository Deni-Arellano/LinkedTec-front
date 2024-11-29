import React, { useState } from "react";
import Texto from '../componente-label/Etiquetas';
import './Comentario.css'
import { BsThreeDots } from "react-icons/bs";

const Comentar = ({ comentario }) => {
    console.log(comentario);
    const formatFecha = (fechaString) => {
        const fecha = new Date(fechaString);
        return fecha.toLocaleDateString();
    };


    return (
        <div className="mostrar-comentario">
            <div className="mostrar-comentario-header">
                <img
                    src={comentario.imagen || "https://via.placeholder.com/50"}
                    alt="Profile"
                    className="mostrar-imagen-perfil-comentario"
                />
                <Texto className='textoComentario' texto={comentario.nombre + ' ' + comentario.apellido_paterno + ' ' + comentario.apellido_materno || "Usuario desconocido"} />


            </div>

            <div className="comentario-contenido">
                <div className="comentario-texto">
                    <div className="comentario-descripcion">
                        <Texto texto={comentario.texto || "Sin descripción disponible"} />
                    </div>

                    <div className="fecha-comentario">
                        <Texto tamano={11} texto={formatFecha(comentario.fecha) || "Fecha no disponible"} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comentar;