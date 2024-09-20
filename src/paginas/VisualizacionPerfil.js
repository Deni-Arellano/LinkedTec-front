import React from 'react';
import '../hojas-de-estilo/VisualizacionPerfil.css';
import MenuNavegacion from '../componetes/MenuNavegacion'; 
import PEDE from '../componetes/PEDE'; 
import Reclutador from '../componetes/Reclutador'; 

const VisualizacionPerfil = () => {
    return (
        <div className="visualizacion-container">
            <MenuNavegacion />

            {/* Contenedor de PEDE con la clase para moverlo a la derecha */}
            <div className="perfil-contenido">
                <div className="pede-container">
                    <PEDE /> {/* Componente de arriba que muestra el nombre y la foto del usuario */}
                </div>
                
                <Reclutador /> {/* Componente que muestra el cuadro de información */}
            </div>
        </div>
    );
};

export default VisualizacionPerfil;
