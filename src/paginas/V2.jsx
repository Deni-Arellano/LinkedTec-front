import React from 'react';
import '../hojas-de-estilo/V2.css';  // El archivo de estilos para V2
import MenuNavegacion from '../componetes/MenuNavegacion';  // Componente del menú de navegación
import R2 from '../componetes/R2';  // Importamos el nuevo componente R2

const V2 = () => {
    return (
        <div className="visualizacion-container">
            {/* Menú de navegación */}
            <MenuNavegacion />

            {/* Contenedor de R2 */}
            <div className="perfil-contenido">
                <R2 /> {/* Usamos el componente fusionado R2 */}
            </div>
        </div>
    );
}

export default V2;
