import React from 'react';
import { useNavigate } from 'react-router-dom'; // Hook para navegación
import MenuNavegacion from '../componetes/MenuNavegacion'; // Importar el menú de navegación
import Etiquetas from '../componetes/Etiquetas'; // Importar el componente Etiquetas
import BotonPublicar from '../componetes/BotonPublicarEmpleo'; // Importar el botón de publicación
import '../hojas-de-estilo/PublicacionEmpleo.css'; // Estilos de la publicación

const PublicacionEmpleoNuevo = ({ datos }) => {
    const navigate = useNavigate(); // Hook para navegar a otras páginas

    return (
        <>
            <MenuNavegacion /> {/* Menú de navegación */}
            
            {/* Botón flotante para publicar */}
            <div className="PublicacioEmpleoNuevo-boton-flotante">
                <BotonPublicar onClick={() => navigate('/FormularioPublicacionEmpleo')} /> {/* Redirige al formulario de publicación */}
            </div>
            
            {/* Contenedor de la publicación */}
            <div className="PublicacioEmpleoNuevo-publicacion-container">
                <div className="PublicacioEmpleoNuevo-publicacion">
                    <div className="PublicacioEmpleoNuevo-perfil">
                        <img src={datos.fotoPerfil} alt="Foto de Perfil" className="PublicacioEmpleoNuevo-foto-perfil" /> {/* Foto de perfil */}
                        <p className="PublicacioEmpleoNuevo-usuario-publicacion-empleo">{datos.nombreUsuario}</p> {/* Nombre del usuario */}
                    </div>
                    
                    <h1 className="PublicacioEmpleoNuevo-titulo-publicacion">{datos.tituloEmpleo}</h1> {/* Título del empleo */}
                    
                    <div className="PublicacioEmpleoNuevo-detalle">
                        <h2>Detalles del Empleo:</h2>
                        <p><strong><Etiquetas texto="Empresa" />:</strong> {datos.empresa}</p>
                        <p><strong><Etiquetas texto="Salario" />:</strong> {datos.salario}</p>
                        <p><strong><Etiquetas texto="Descripción" />:</strong> {datos.descripcion}</p>
                        <p><strong><Etiquetas texto="Ubicación (Estado)" />:</strong> {datos.ubicacion}</p>
                        <p><strong><Etiquetas texto="Nivel de Inglés Requerido" />:</strong> {datos.nivelIngles}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

// Datos ficticios para prueba
const datosFicticios = {
    tituloEmpleo: 'Desarrollador Frontend',
    empresa: 'Tech Inc.',
    salario: '$50,000 - $70,000',
    descripcion: 'Buscamos un desarrollador frontend con experiencia en React y habilidades sólidas en HTML, CSS y JavaScript.',
    ubicacion: 'Ciudad de México',
    nivelIngles: 'Avanzado',
    fotoPerfil: 'https://via.placeholder.com/100', // URL de imagen de perfil
    nombreUsuario: 'Juan Pérez' // Nombre ficticio del usuario
};

export default function App() {
    return <PublicacionEmpleoNuevo datos={datosFicticios} />; // Renderiza la publicación con datos ficticios
}
