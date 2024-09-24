import React, { useState } from "react";
import Texto from './Etiquetas';
import '../hojas-de-estilo/mostrar-publicacion.css';
import { BsThreeDots } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { MdAddComment } from "react-icons/md";

const MostrarPubli = () => {
    const [mostrarOpciones, setMostrarOpciones] = useState(false);

    const handleOpciones = () => {
        setMostrarOpciones(!mostrarOpciones);
    };

    return (
        <div className="Mostrar-publicacion">
            <div className="mostrar-publicacion-header">
                <img 
                    src="https://via.placeholder.com/50" 
                    alt="Profile" 
                    className="mostrar-publicacion-imagen-perfil" 
                />
                <Texto texto={'Nombre'}/>
                
                <BsThreeDots className="mostrar-publicacion-icono-tres-puntos" size={20} onClick={handleOpciones} 
                />
                {mostrarOpciones && (
                    <div className="mostrar-publicacion-opciones-dropdown">
                        <button className="mostrar-publicacion-opcion-boton">Editar</button>
                        <button className="mostrar-publicacion-opcion-boton">Eliminar</button>
                    </div>
                )}
                
            </div>
            <div className="Fecha-mostrar-publicacion">
                <Texto tamano={15} texto={'Publicado el:'} />
            </div>
            <div className="mostrar-publicacion-contenido">
                <div className="mostrar-publicacion-texto">
                    <div className="mostrar-publicacion-descripcion">
                        <Texto texto={'Descripcion de la publicacion'}/>
                    </div>
                </div>
                <img 
                    src="https://via.placeholder.com/300" 
                    alt="Post" 
                    className="mostrar-publicacion-imagen" 
                />
            </div>
            <div className="mostrar-publicacion-botones">
                <button className="mostrar-publicacion-megusta">
                    <AiFillLike  size={30}/>
                </button>
                <button className="mostrar-publicacion-medisgusta">
                    <AiFillDislike  size={30}/>
                </button>
                <button className="mostrar-publicacion-comentar">
                    <MdAddComment size={30}/>
                </button>
            </div>
        </div>
    );
}

export default MostrarPubli;