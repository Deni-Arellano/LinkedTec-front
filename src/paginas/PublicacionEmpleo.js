import React from 'react';
import BarraSuperior from '../componetes/BarraSuperior';
import '../hojas-de-estilo/PaginaEmpleo.css'; 

const PublicacionEmpleo = ({ datos }) => {
    return (
        <>
            <BarraSuperior /> 
            <div className="publicacion-container">
                <div className="publicacion">
                    <div className="perfil">
                        <img src={datos.fotoPerfil} alt="Foto de Perfil" className="foto-perfil" />
                        <p className="nombre-usuario">{datos.nombreUsuario}</p>
                    </div>
                    <h1 className="titulo-publicacion">{datos.tituloEmpleo}</h1>
                    
                    <div className="detalle">
                        <h2>Detalles del Empleo:</h2>
                        <p><strong>Empresa:</strong> {datos.empresa}</p>
                        <p><strong>Salario:</strong> {datos.salario}</p>
                        <p><strong>Descripción:</strong> {datos.descripcion}</p>
                        <p><strong>Ubicación (Estado):</strong> {datos.ubicacion}</p>
                        <p><strong>Nivel de Inglés Requerido:</strong> {datos.nivelIngles}</p>
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
    fotoPerfil: 'https://via.placeholder.com/100', // URL de una imagen de perfil ficticia
    nombreUsuario: 'Juan Pérez'
};

export default function App() {
    return <PublicacionEmpleo datos={datosFicticios} />;
}
