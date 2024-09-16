import React from "react";
import Texto from '../componetes/Etiquetas';
import '../hojas-de-estilo/mostrar-publicacion.css';

const MostrarPubli = () => {
    return (
        <div className="Most-publicacion">
            <img 
                src="https://via.placeholder.com/50" 
                alt="Profile" 
                className="imagen-perfil" 
            />
            <div className="publicacion-contenido">
                <div className="publicacion-texto">
                    <Texto text={'Nombre'}/>
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
        </div>
    );
}

export default MostrarPubli;