
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import MenuNavegacion from '../componetes/MenuNavegacion'; 
import BotonPublicar from '../componetes/BotonPublicarEmpleo'; 
import PublicacionEmpleoNuevo from '../componetes/PublicacionEmpleo'; 
import '../hojas-de-estilo/PublicacionEmpleo.css'; 

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

const PublicacionEmpleo = () => {
    const navigate = useNavigate();

    return (
        <>
            <MenuNavegacion /> 
            <div className="PublicacionEmpleoNuevo-boton-flotante">
                <BotonPublicar onClick={() => navigate('/FormularioPublicacionEmpleo')} />
            </div>
            <PublicacionEmpleoNuevo datos={datosFicticios} /> 
        </>
    );
};

export default PublicacionEmpleo;
