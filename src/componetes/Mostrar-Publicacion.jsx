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
        <div className="Most-publicacion">
            <div className="publicacion-header">
                <img 
                    src="https://via.placeholder.com/50" 
                    alt="Profile" 
                    className="imagen-perfil" 
                />
                <Texto text={'Nombre'}/>
                <BsThreeDots className="icono-tres-puntos" size={20} onClick={handleOpciones} 
                />
                {mostrarOpciones && (
                    <div className="opciones-dropdown">
                        <button className="opcion-boton">Editar</button>
                        <button className="opcion-boton">Eliminar</button>
                    </div>
                )}
            </div>
            <div className="publicacion-contenido">
                <div className="publicacion-texto">
                    <div className="Descripcion">
                        <Texto text={'Descripcion de la publicacion'}/>
                    </div>
                </div>
                <img 
                    src="https://via.placeholder.com/300" 
                    alt="Post" 
                    className="publicacion-imagen" 
                />
            </div>
            <div className="botones">
                <button className="Megusta">
                    <AiFillLike  size={30}/>
                </button>
                <button className="Medisgusta">
                    <AiFillDislike  size={30}/>
                </button>
                <button className="Comentar">
                    <MdAddComment size={30}/>
                </button>
            </div>
        </div>
    );
}

export default MostrarPubli;