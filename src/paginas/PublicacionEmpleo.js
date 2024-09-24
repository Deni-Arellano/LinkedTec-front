import React from 'react';
import { useNavigate } from 'react-router-dom'; // Hook para navegación
import MenuNavegacion from '../componetes/MenuNavegacion'; // Importar el menú de navegación
import Etiquetas from '../componetes/Etiquetas'; // Importar el componente Etiquetas
import BotonPublicar from '../componetes/BotonPublicarEmpleo'; // Importar el botón de publicación
import '../hojas-de-estilo/PublicacionEmpleo.css'; // Estilos de la publicación

const PublicacionEmpleo = ({ datos }) => {
    const navigate = useNavigate(); // Hook para navegar a otras páginas

    return (
        <>
            <MenuNavegacion /> {/* Menú de navegación */}
            
            {/* Botón flotante para publicar */}
            <div className="boton-flotante">
                <BotonPublicar onClick={() => navigate('/FormularioPublicacionEmpleo')} /> {/* Redirige al formulario de publicación */}
            </div>
            
            {/* Contenedor de la publicación */}
            <div className="publicacion-container">
                <div className="publicacion">
                    <div className="perfil">
                        <img src={datos.fotoPerfil} alt="Foto de Perfil" className="foto-perfil" /> {/* Foto de perfil */}
                        <p className="usuario-publicacion-empleo">{datos.nombreUsuario}</p> {/* Nombre del usuario */}
                    </div>
                    
                    <h1 className="titulo-publicacion">{datos.tituloEmpleo}</h1> {/* Título del empleo */}
                    
                    <div className="detalle">
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
    return <PublicacionEmpleo datos={datosFicticios} />; // Renderiza la publicación con datos ficticios
}
