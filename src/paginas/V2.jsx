import React from 'react';
import '../hojas-de-estilo/V2.css';  // El archivo de estilos para V2
import MenuNavegacion from '../componetes/MenuNavegacion';  // Componente del menú de navegación
import FotoNombre from '../componetes/PerfilUsu_FotoNomb'; 
import DatosUsu_Rec from '../componetes/DatosUsu_EsDoEg';
import { FaBuilding, FaIndustry } from 'react-icons/fa';  // Importar íconos de react-icons (o cualquier librería que estés usando)

const V2 = () => {
    return (
        <div className="visualizacion-container">
            {/* Menú de navegación */}
            <MenuNavegacion />

            {/* Contenedor para los componentes separados */}
            <div className="perfil-contenido">
                {/* Componente de la foto y nombre */}
                <FotoNombre />
                
                {/* Contenedor de datos adicionales y empresa */}
                <div className="perfil-cuadro">
                    {/* Información del usuario */}
                    <DatosUsu_Rec />

                    {/* Incluimos empresa y giro de la empresa dentro del mismo grupo de p */}
                    <p><FaBuilding style={{ marginRight: '10px' }} /><strong>Empresa:</strong> XYZ Corporativo</p>
                    <p><FaIndustry style={{ marginRight: '10px' }} /><strong>Giro de la Empresa:</strong> Tecnología</p>
                </div>
            </div>
        </div>
    );
}

export default V2;
