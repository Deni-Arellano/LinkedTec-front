import React, { useState } from "react";
import Texto from './Etiquetas';
import '../hojas-de-estilo/Comentario.css'
import { BsThreeDots } from "react-icons/bs";

const Comentar = () => {
    const [mostrarOpciones, setMostrarOpciones] = useState(false);

    const handleOpciones = () => {
        setMostrarOpciones(!mostrarOpciones);
    };
    
    return (
        <div className="mostrar-comentario">
            <div className="mostrar-comentario-header">
                <img 
                    src="https://via.placeholder.com/50" 
                    alt="Profile" 
                    className="mostrar-imagen-perfil-comentario" 
                />
                <Texto texto={'Nombre'}/>
                <BsThreeDots className="mostrar-comentario-icono-tres-puntos" size={20} onClick={handleOpciones} 
                />
                {mostrarOpciones && (
                    <div className="opciones-dropdown-comentario">
                        <button className="opcion-boton-comentario">Editar</button>
                        <button className="opcion-boton-comentario">Eliminar</button>
                    </div>
                )}
            
            </div>
            <div className="fecha-comentario">
                <Texto tamano={15} texto={'Publicado el:'} />
            </div>
            <div className="comentario-contenido">
                <div className="comentario-texto">
                    <div className="comentario-descripcion">
                        <Texto texto={'Descripcion del comentario'}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comentar;