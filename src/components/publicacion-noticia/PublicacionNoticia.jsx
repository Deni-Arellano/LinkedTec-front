import React, { useContext, useState } from 'react';
import { BsThreeDots } from "react-icons/bs";
import Etiquetas from '../componente-label/Etiquetas';
import { usuarioContext } from '../../App';
import Axios from 'axios';

const PublicacionNoticiaNuevo = ({ datos, onEliminar }) => {
    const { usuarioLog, setUsuarioLog } = useContext(usuarioContext);
    const [mostrarOpciones, setMostrarOpciones] = useState(false);

    const handleOpciones = () => {
        setMostrarOpciones(!mostrarOpciones);
    };

    const eliminarPublicacionNoticia = async () => { 
        try {
            console.log("Eliminando publicación con id:", datos.id_noticia);
            const response = await Axios.delete(`http://localhost:3000/noticias/${datos.id_noticia}`);
            console.log(response.data);
            onEliminar(datos.id_noticia); 
            setMostrarOpciones(!mostrarOpciones);
        } catch (err) {
            console.error('Error al eliminar la publicación:', err);
        }
    }

    return (
        <div className="PublicacionNoticiaNuevo-publicacion-container">
            <div className="PublicacionNoticiaNuevo-publicacion">
                <div className="PublicacionNoticiaNuevo-header">
                    <div className="PublicacionNoticiaNuevo-perfil">
                        <img src={datos.fotoPerfil} alt="Foto de Perfil" className="PublicacionNoticiaNuevo-foto-perfil" />
                        <p className="PublicacionNoticiaNuevo-usuario-publicacion-noticia">{datos.nombreUsuario}</p>
                    </div>

                    <BsThreeDots 
                        className="PublicacionNoticiaNuevo-icono-tres-puntos" 
                        size={20} 
                        onClick={handleOpciones} 
                    />
                    
                    {mostrarOpciones && (
                        <div className="mostrar-publicacion-opciones-dropdown">
                            <button className="mostrar-publicacion-opcion-boton">Editar</button>
                            <button className="mostrar-publicacion-opcion-boton" onClick={eliminarPublicacionNoticia}>Eliminar</button>
                        </div>
                    )}
                </div>

                <h1 className="PublicacionNoticiaNuevo-titulo-publicacion">{datos.titulo}</h1>

                <div className="PublicacionNoticiaNuevo-detalle">
                    <h2>Detalles de la Noticia:</h2>
                    <p><strong><Etiquetas texto="Descripción" />:</strong> {datos.descripcion}</p>
                    <p><strong><Etiquetas texto="Enlace" />:</strong> <a href={datos.enlace} target="_blank" rel="noopener noreferrer">{datos.enlace}</a></p>
                    <p><strong><Etiquetas texto="Categoría" />:</strong> {datos.categoria}</p>
                </div>
            </div>
        </div>
    );
};

export default PublicacionNoticiaNuevo;
