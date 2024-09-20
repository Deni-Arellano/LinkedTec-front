import React, { useState } from "react";
import Texto from './Etiquetas';
import '../hojas-de-estilo/Comentario.css'
import { BsThreeDots } from "react-icons/bs";

const Comentar = () => {
    const [mostrarOpciones, setMostrarOpciones] = useState(false);

    const handleOpciones = () => {
        setMostrarOpciones(!mostrarOpciones);
    };

    const handleEdit = () => {
        alert('Publicacion editada')
    }

    const handleDelete = () => {
        alert('Publicacion eliminada')
    }
    
    return (
        <div className="Most-comentario">
            <div className="comentario-header">
                <img 
                    src="https://via.placeholder.com/50" 
                    alt="Profile" 
                    className="imagen-perfil-comentario" 
                />
                <Texto texto={'Nombre'}/>
                <BsThreeDots className="icono-tres-puntos" size={20} onClick={handleOpciones} 
                />
                {mostrarOpciones && (
                    <div className="opciones-dropdown-comentario">
                        <button className="opcion-boton-comentario" onClick={handleEdit}>Editar</button>
                        <button className="opcion-boton-comentario" onClick={handleDelete}>Eliminar</button>
                    </div>
                )}
            
            </div>
            <div className="Fecha">
                <Texto tamano={15} texto={'Publicado el:'} />
            </div>
            <div className="comentario-contenido">
                <div className="comentario-texto">
                    <div className="Descripcion">
                        <Texto texto={'Descripcion del comentario'}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comentar;