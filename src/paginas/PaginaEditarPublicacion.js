import React from 'react';
import MenuNavegacion from '../componetes/MenuNavegacion'; 
import EditarPublicacion from '../components/editarpublicacion/Editarpublicacion.jsx'; 
import '../hojas-de-estilo/Editarpublicacion.css';

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
