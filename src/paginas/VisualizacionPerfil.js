import React, { useContext, useState } from 'react';
import '../hojas-de-estilo/VisualizacionPerfil.css';
import MenuNavegacion from '../componetes/MenuNavegacion'; 
import FotoNombre from '../componetes/PerfilUsu_FotoNomb'; 
import DatosUsu_Rec from '../componetes/DatosUsu_Rec';
import DatosUsu_EsDoEg from '../componetes/DatosUsu_EsDoEg';
import {usuarioContext} from '../App';

const VisualizacionPerfil = () => {
    const {usuarioLog, setUsuarioLog} = useContext(usuarioContext);

    return (
        <div className="VisualizacionPerfil-container">
            <MenuNavegacion />

            {/* Contenedor de PEDE con la clase para moverlo a la derecha */}
            <div className="VisualizacionPerfil-perfil-contenido">
                <div className="VisualizacionPerfil-pede-container">
                    <FotoNombre /> {/* Componente de arriba que muestra el nombre y la foto del usuario */}
                </div>
                
                
                <DatosUsu_Rec /> {/* Componente que muestra el cuadro de información */}
            </div>
        </div>
    );
};

export default VisualizacionPerfil;
