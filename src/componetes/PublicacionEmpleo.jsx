
import React, { useContext, useState } from 'react';
import { BsThreeDots } from "react-icons/bs";
import Etiquetas from '../componetes/Etiquetas';
import '../hojas-de-estilo/PublicacionEmpleo.css';
import { usuarioContext } from '../App';

const PublicacionEmpleoNuevo = ({ datos }) => {
    const { usuarioLog, setUsuarioLog } = useContext(usuarioContext);
    const [mostrarOpciones, setMostrarOpciones] = useState(false);

    const handleOpciones = () => {
        setMostrarOpciones(!mostrarOpciones);
    };

    return (
        <div className="PublicacionEmpleoNuevo-publicacion-container">
            <div className="PublicacionEmpleoNuevo-publicacion">
                <div className="PublicacionEmpleoNuevo-header">
                    <div className="PublicacionEmpleoNuevo-perfil">
                        <img src={datos.fotoPerfil} alt="Foto de Perfil" className="PublicacionEmpleoNuevo-foto-perfil" />
                        <p className="PublicacionEmpleoNuevo-usuario-publicacion-empleo">{datos.nombreUsuario}</p>
                    </div>

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

                <h1 className="PublicacionEmpleoNuevo-titulo-publicacion">{datos.tituloEmpleo}</h1>

                <div className="PublicacionEmpleoNuevo-detalle">
                    <h2>Detalles del Empleo:</h2>
                    <p><strong><Etiquetas texto="Empresa" />:</strong> {datos.empresa}</p>
                    <p><strong><Etiquetas texto="Salario" />:</strong> {datos.salario}</p>
                    <p><strong><Etiquetas texto="Descripción" />:</strong> {datos.descripcion}</p>
                    <p><strong><Etiquetas texto="Ubicación (Estado)" />:</strong> {datos.ubicacion}</p>
                    <p><strong><Etiquetas texto="Nivel de Inglés Requerido" />:</strong> {datos.nivelIngles}</p>
                </div>

                <div className="PublicacionEmpleoNuevo-boton-postularse-container">
                    <button className="PublicacionEmpleoNuevo-boton-postularse">Postularse</button>
                </div>
            </div>
        </div>
    );
};

export default PublicacionEmpleoNuevo;
