import React, { useContext, useState } from 'react';
import { BsThreeDots } from "react-icons/bs";
import Etiquetas from '../componente-label/Etiquetas';
import './PublicacionEmpleo.css';
import { usuarioContext } from '../../App';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const PublicacionEmpleoNuevo = ({ datos, onEliminar }) => {
    const { usuarioLog, setUsuarioLog } = useContext(usuarioContext);
    const [mostrarOpciones, setMostrarOpciones] = useState(false);
    const navigate = useNavigate(); // Hook para navegar

    const handleOpciones = () => {
        setMostrarOpciones(!mostrarOpciones);
    };

    const eliminarPublicacionEmpleo = async () => {
        try {
            console.log("Eliminando publicación con id:", datos.id_empleo);
            const response = await Axios.delete(`http://localhost:3000/empleos/${datos.id_empleo}`);
            console.log(response.data);
            onEliminar(datos.id_empleo); // Llama a la función onEliminar para actualizar la lista
            setMostrarOpciones(!mostrarOpciones);
        } catch (err) {
            console.error('Error al eliminar la publicación:', err);
        }
    };

    const editarPublicacionEmpleo = () => {
        // Navega a la página de edición, pasando el ID del empleo en la URL
        navigate(`/editar-publicacion-empleo/${datos.id_empleo}`);
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
                            <button 
                                className="mostrar-publicacion-opcion-boton" 
                                onClick={editarPublicacionEmpleo} // Llama a la función para navegar a la página de edición
                            >
                                Editar
                            </button>
                            <button 
                                className="mostrar-publicacion-opcion-boton" 
                                onClick={eliminarPublicacionEmpleo}
                            >
                                Eliminar
                            </button>
                        </div>
                    )}
                </div>

                <h1 className="PublicacionEmpleoNuevo-titulo-publicacion">{datos.tituloEmpleo}</h1>

                <div className="PublicacionEmpleoNuevo-detalle">
                    <h2>Detalles del empleo:</h2>
                    <p><strong><Etiquetas texto="Empresa" />:</strong> {datos.empresa}</p>
                    <p><strong><Etiquetas texto="Salario" />:</strong> {datos.salario}</p>
                    <p><strong><Etiquetas texto="Descripción" />:</strong> {datos.descripcion}</p>
                    <p><strong><Etiquetas texto="Ubicación (estado)" />:</strong> {datos.ubicacion}</p>
                    <p><strong><Etiquetas texto="Nivel de inglés requerido" />:</strong> {datos.nivelIngles}</p>
                </div>

                <div className="PublicacionEmpleoNuevo-boton-postularse-container">
                    <button className="PublicacionEmpleoNuevo-boton-postularse">Postularse</button>
                </div>
            </div>
        </div>
    );
};

export default PublicacionEmpleoNuevo;
