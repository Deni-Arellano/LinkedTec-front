import React from "react";
import Boton from '../componetes/Button.js';
import Cajatexto from '../componetes/Caja-de-texto.jsx';
import Texto from '../componetes/Etiquetas.jsx';
import '../hojas-de-estilo/Crear-publicacion.css'

const CrearPubli = () => {
    const handlePost = () => {
        alert('Post Publicado')
    };

    const handleImage = () => {
        alert('Imagen agregada')
    }

    return (
        <div className="caja-publicacion">
            <form className="estilo-caja-publicacion">
                <Texto text='¿Qué estás pensando?'/>
                <Cajatexto className='estilo-caja-texto'/>
                
                <div className="boton-contenedor">
                    <Boton label='Publicar' className='boton1' onClick={handlePost}/>
                    <Boton label='Agregar Imagen' className='boton1' onClick={handleImage}/>
                    <Boton label='Cancelar' className='boton1'/>
                </div>
            </form>
        </div>
    );
}

export default CrearPubli;