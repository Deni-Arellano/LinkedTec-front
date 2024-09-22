import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación
import MenuNavegacion from '../componetes/MenuNavegacion';
import Etiquetas from '../componetes/Etiquetas';
import BotonPublicar from '../componetes/BotonPublicarEmpleo'; // Importamos el botón
import '../hojas-de-estilo/PublicacionEmpleo.css'; 

const PublicacionEmpleo = ({ datos }) => {
    const navigate = useNavigate(); // Hook para navegar a otras páginas

    return (
        <>
            <MenuNavegacion />
            
            {/* Botón Publicar justo debajo del menú de navegación */}
            <div className="boton-flotante">
                <BotonPublicar onClick={() => navigate('/FormularioPublicacionEmpleo')} /> {/* Redirige al formulario */}
            </div>
            
            <div className="publicacion-container">
                <div className="publicacion">
                    <div className="perfil">
                        <img src={datos.fotoPerfil} alt="Foto de Perfil" className="foto-perfil" />
                        <p className="nombre-usuario">{datos.nombreUsuario}</p>
                    </div>
                    
                    <h1 className="titulo-publicacion">{datos.tituloEmpleo}</h1>
                    
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

// Datos ficticios para mostrar
const datosFicticios = {
    tituloEmpleo: 'Desarrollador Frontend',
    empresa: 'Tech Inc.',
    salario: '$50,000 - $70,000',
    descripcion: 'Buscamos un desarrollador frontend con experiencia en React y habilidades sólidas en HTML, CSS y JavaScript.',
    ubicacion: 'Ciudad de México',
    nivelIngles: 'Avanzado',
    fotoPerfil: 'https://via.placeholder.com/100',
    nombreUsuario: 'Juan Pérez'
};

export default function App() {
    return <PublicacionEmpleo datos={datosFicticios} />;
}
