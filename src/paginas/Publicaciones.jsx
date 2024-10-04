import React, { useContext, useState } from 'react';
import MenuNavegacion from "../componetes/MenuNavegacion";
import Crearpubli from "../componetes/Crear-Publicacion";
import '../hojas-de-estilo/Publicaciones.css';

import {usuarioContext} from '../App';


const PubliUsuarios = () => {
    const {usuarioLog, setUsuarioLog} = useContext(usuarioContext);
    
    console.log("Usuario en Publicaciones: ", usuarioLog)


    return (
        <>
        <div className="Menu-principal">
            <MenuNavegacion/>
            
        </div>

        <div className="Crear-publicacion">
                <Crearpubli/>
        </div>

        </>
    )
}

export default PubliUsuarios;