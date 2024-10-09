import React from 'react';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion.jsx';
import EditarPublicacion from '../../components/editar-publicacion/EditarPublicacion.jsx'; 
import './EditarPublicacion.css';

const PaginaEditarPublicacion = () => {
    return (
        <>
            {/* Barra de navegación */}
            <MenuNavegacion />
            
            {/* Contenedor de la página de edición */}
            <div className="editar-publicacion-container">
                <EditarPublicacion /> {/* Componente para editar la publicación */}
            </div>
        </>
    );
}

export default PaginaEditarPublicacion;
