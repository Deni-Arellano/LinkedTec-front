import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import MenuNavegacion from '../componetes/MenuNavegacion'; 
import Etiquetas from '../componetes/Etiquetas'; 
import BotonPublicar from '../componetes/BotonPublicarEmpleo'; 
import '../hojas-de-estilo/PublicacionEmpleo.css'; 
import { BsThreeDots } from "react-icons/bs";

const PublicacionEmpleoNuevo = ({ datos }) => {
    const navigate = useNavigate(); 
    const [mostrarOpciones, setMostrarOpciones] = useState(false);

    const handleOpciones = () => {
        setMostrarOpciones(!mostrarOpciones);
    };

    return (
        <>
            <MenuNavegacion /> {/* Menú de navegación */}
            
            {/* Botón flotante para publicar */}
            <div className="PublicacionEmpleoNuevo-boton-flotante">
                <BotonPublicar onClick={() => navigate('/FormularioPublicacionEmpleo')} /> {/* Redirige al formulario de publicación */}
            </div>
            
            {/* Contenedor de la publicación */}
            <div className="PublicacionEmpleoNuevo-publicacion-container">
                <div className="PublicacionEmpleoNuevo-publicacion">
                    <div className="PublicacionEmpleoNuevo-header">
                        <div className="PublicacionEmpleoNuevo-perfil">
                            <img src={datos.fotoPerfil} alt="Foto de Perfil" className="PublicacionEmpleoNuevo-foto-perfil" /> {/* Foto de perfil */}
                            <p className="PublicacionEmpleoNuevo-usuario-publicacion-empleo">{datos.nombreUsuario}</p> {/* Nombre del usuario */}
                        </div>
                        
                        {/* Ícono de tres puntos para opciones */}
                        <BsThreeDots 
                            className="PublicacionEmpleoNuevo-icono-tres-puntos" 
                            size={20} 
                            onClick={handleOpciones} 
                        />
                        
                        {mostrarOpciones && (
                    <div className="mostrar-publicacion-opciones-dropdown">
                        <button className="mostrar-publicacion-opcion-boton">Editar</button>
                        <button className="mostrar-publicacion-opcion-boton">Eliminar</button>
                    </div>
                )}
                    </div>
                    
                    <h1 className="PublicacionEmpleoNuevo-titulo-publicacion">{datos.tituloEmpleo}</h1> {/* Título del empleo */}
                    
                    <div className="PublicacionEmpleoNuevo-detalle">
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
