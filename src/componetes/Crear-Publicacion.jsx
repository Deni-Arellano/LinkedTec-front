import React from "react";
import Boton from './Button.js';
import Cajatexto from './Caja-de-texto.jsx';
import Texto from './Etiquetas.js';
import { BiImageAdd } from "react-icons/bi";
import '../hojas-de-estilo/Crear-publicacion.css';

const CrearPubli = () => {
    const handlePost = () => {
        alert('Post Publicado');
    };

    const handleImage = () => {
        alert('Imagen agregada');
    };

    return (
        <div className="caja-publicacion">
            <form className="estilo-caja-publicacion">
                <Texto tamano='20' texto='¿Qué estás pensando?'/>
                <Cajatexto className='estilo-caja-texto' placeholder={'Ingresar texto...'}/>
                
                <div className="boton-contenedor">
                    <button className="boton-imagen" onClick={handleImage}>
                        <BiImageAdd size={30}/>
                    </button>
                    <div className="botones-derecha">
                        <Boton texto='Publicar' className='boton1' onClick={handlePost}/>
                        <Boton texto='Cancelar' className='boton1'/>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CrearPubli;