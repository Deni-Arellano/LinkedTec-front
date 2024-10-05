import React, { useState,useContext } from "react";
import Texto from './Etiquetas';
import '../hojas-de-estilo/mostrar-publicacion.css';
import { BsThreeDots } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { MdAddComment } from "react-icons/md";
import Axios from 'axios';
import CrearComentario from './CrearComentario';
import {usuarioContext} from '../App';


const MostrarPubli = ({ datos, onEliminar }) => {
    //const {usuarioLog, setUsuarioLog} = useContext(usuarioContext);
    const usuarioLog = 11;
    const [mostrarOpciones, setMostrarOpciones] = useState(false);
    const [mostrarCrearComentario, setMostrarCrearComentario] = useState(false);

    const handleOpciones = () => {
        setMostrarOpciones(!mostrarOpciones);//Para cambiar de estado mostrar opciones

    };

    const toggleCrearComentario = () => {
        setMostrarCrearComentario(!mostrarCrearComentario); // Cambia el estado  para saber si se muestra o no el come
    };

    const formatFecha = (fechaString) => {
        const fecha = new Date(fechaString);
        return fecha.toLocaleDateString(); 
    };

    const eliminarPublicacion = async () => { //Elimina el empleo seleccionadop al dar en Eliminar
        try {
            console.log("Eliminando publicación con id:", datos.id_publicacion);
            const response = await Axios.delete(`http://localhost:3000/publicaciones/${datos.id_publicacion}`);
            console.log(response.data);
            //MENSAJE DE ELIMINADO CON EXITO
            onEliminar(datos.id_publicacion);
            handleOpciones();
            setMostrarCrearComentario(!mostrarCrearComentario);
        } catch (err) {
            console.error('Error al eliminar la publicación:', err);
        }
    }

    return (
        console.log("Datos de la publicacion", datos),
        <div className="Mostrar-publicacion">
            <div className="mostrar-publicacion-header">
                <img 
                    src={datos.fotoPerfil || "https://via.placeholder.com/50"} 
                    alt="Profile" 
                    className="mostrar-publicacion-imagen-perfil" 
                />
                <Texto texto={datos.nombreUsuario} />
                
                <BsThreeDots className="mostrar-publicacion-icono-tres-puntos" size={20} onClick={handleOpciones} />
                {mostrarOpciones && (
                    <div className="mostrar-publicacion-opciones-dropdown">
                        <button className="mostrar-publicacion-opcion-boton">Editar</button>
                        <button className="mostrar-publicacion-opcion-boton" onClick={eliminarPublicacion}>Eliminar</button>
                    </div>
                )}
            </div>
            <div className="Fecha-mostrar-publicacion">
                <Texto tamano={15} texto={`Publicado el: ${formatFecha(datos.fecha) || ''}`} />
            </div>
            <div className="mostrar-publicacion-contenido">
                <div className="mostrar-publicacion-texto">
                    <div className="mostrar-publicacion-descripcion">
                        <Texto texto={datos.descripcion} />
                    </div>
                </div>
                <img 
                    src={datos.imagen || "https://via.placeholder.com/300"} 
                    alt="Post" 
                    className="mostrar-publicacion-imagen" 
                />
            </div>
            <div className="mostrar-publicacion-botones">
                <button className="mostrar-publicacion-megusta">
                    <AiFillLike size={30} /> {datos.meGusta || 0}
                </button>
                <button className="mostrar-publicacion-medisgusta">
                    <AiFillDislike size={30} /> {datos.disgusta || 0}
                </button>
                <button className="mostrar-publicacion-comentar" onClick={toggleCrearComentario}>
                    <MdAddComment size={30} />
                    
                </button>
                
            </div>
            <div className="mostrar-publicacion-comentario">
                {mostrarCrearComentario && (

                <CrearComentario  
                    id_publicacion={datos.id_publicacion} 
                    idUsuario={usuarioLog} 
                    />)}
                </div> 
        </div>
        
        
    );
}

export default MostrarPubli;
