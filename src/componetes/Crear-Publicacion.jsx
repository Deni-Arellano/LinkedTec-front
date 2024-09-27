import React, { useState } from "react";
import Boton from './Button';
import Cajatexto from './Caja-de-texto.jsx';
import Texto from './Etiquetas';
import { BiImageAdd } from "react-icons/bi";
import '../hojas-de-estilo/Crear-publicacion.css';

const CrearPubli = () => {
    const [textoPubli, setTextoPubli] = useState('');

    // Verificar que la descripcion no este vacia
    const publicar = (e) => {
        e.preventDefault();

        if (textoPubli.trim() === '') {
            console.log('La descripción no puede estar vacia.');
            return;
        }

        console.log('Publicando:', textoPubli);
    };

    
    const manejarCambioTexto = (e) => {
        setTextoPubli(e.target.value);
    };

    return (
        <div className="caja-crear-publicacion">
            <form className="estilo-caja-crear-publicacion" onSubmit={publicar}>
                <Texto tamano='20' texto='¿Qué estás pensando?'/>
                <Cajatexto className='estilo-caja-texto' placeholder={'Ingresar texto...'} value={textoPubli} onChange={manejarCambioTexto}/>
                
                <div className="boton-contenedor-crear-publicacion">
                    <button className="boton-imagen-crear-publicacion">
                        <BiImageAdd size={30}/>
                    </button>
                    <div className="botones-derecha-crear-publicacion">
                        <Boton texto='Publicar' className='boton-crear-publicacion'/>
                        <Boton texto='Cancelar' className='boton-crear-publicacion'/>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CrearPubli;