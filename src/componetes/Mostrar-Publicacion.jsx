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

    const handleLike = () => {
        alert('Te ha gustado')
    }

    const handleDislike = () => {
        alert('Te ha disgustado')
    }

    const handleComment = () => {
        alert('Haz comentado')
    }

    const handleEdit = () => {
        alert('Publicacion editada')
    }

    const handleDelete = () => {
        alert('Publicacion eliminada')
    }

    return (
        <div className="Most-publicacion">
            <div className="publicacion-header">
                <img 
                    src="https://via.placeholder.com/50" 
                    alt="Profile" 
                    className="imagen-perfil" 
                />
                <Texto texto={'Nombre'}/>
                
                <BsThreeDots className="icono-tres-puntos" size={20} onClick={handleOpciones} 
                />
                {mostrarOpciones && (
                    <div className="opciones-dropdown">
                        <button className="opcion-boton" onClick={handleEdit}>Editar</button>
                        <button className="opcion-boton" onClick={handleDelete}>Eliminar</button>
                    </div>
                )}
                
            </div>
            <div className="Fecha">
                <Texto tamano={15} texto={'Publicado el:'} />
            </div>
            <div className="publicacion-contenido">
                <div className="publicacion-texto">
                    <div className="Descripcion">
                        <Texto texto={'Descripcion de la publicacion'}/>
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
                    <AiFillLike  size={30} onClick={handleLike}/>
                </button>
                <button className="Medisgusta">
                    <AiFillDislike  size={30} onClick={handleDislike}/>
                </button>
                <button className="Comentar">
                    <MdAddComment size={30} onClick={handleComment}/>
                </button>
            </div>
        </div>
    );
}

export default MostrarPubli;