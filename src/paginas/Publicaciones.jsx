import React from "react";
import MenuNavegacion from "../componetes/MenuNavegacion";
import Crearpubli from "../componetes/Crear-Publicacion";
import '../hojas-de-estilo/Publicaciones.css'

const PubliUsuarios = () => {
    return (
        <div className="Menu-principal">
            <MenuNavegacion/>
            <div className="Crear-publicacion">
                <Crearpubli/>
            </div>
        </div>
    );
}

export default PubliUsuarios;