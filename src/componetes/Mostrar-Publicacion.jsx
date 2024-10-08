import React, { useState, useEffect, useContext } from "react";
import Texto from './Etiquetas';
import '../hojas-de-estilo/mostrar-publicacion.css';
import { BsThreeDots } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { MdAddComment } from "react-icons/md";
import Axios from 'axios';
import CrearComentario from './CrearComentario';
import { usuarioContext } from '../App';
import { useNavigate } from 'react-router-dom';
import '../hojas-de-estilo/Comentario.css';


const MostrarPubli = ({ datos, onEliminar }) => {
    const { usuarioLog } = useContext(usuarioContext);
    //console.log("datos m,ostrar publio:", datos);
    const [mostrarOpciones, setMostrarOpciones] = useState(false);
    const [mostrarCrearComentario, setMostrarCrearComentario] = useState(false);
    const [comentariosPublicacion, setComentariosPublicacion] = useState([]);
    const navigate = useNavigate();

    const handleOpciones = () => {
        setMostrarOpciones(!mostrarOpciones);
    };

    const toggleCrearComentario = () => {
        setMostrarCrearComentario(!mostrarCrearComentario);
    };

    const formatFecha = (fechaString) => {
        const fecha = new Date(fechaString);
        return fecha.toLocaleDateString();
    };

    const eliminarPublicacion = async () => {
        try {
            console.log("Eliminando publicación con id:", datos.id_publicacion);
            const response = await Axios.delete(`http://localhost:3000/publicaciones/${datos.id_publicacion}`);
            console.log(response.data);
            onEliminar(datos.id_publicacion);
            handleOpciones();
            setMostrarCrearComentario(false);
            setMostrarOpciones(false);
        } catch (err) {
            console.error('Error al eliminar la publicación:', err);
        }
    };

    

    const getComentariosPublicacion = async (id_publicacion) => {
        try {
            const response = await Axios.get(`http://localhost:3000/publicaciones/comentarios/${id_publicacion}`);
            console.log(response.data);
            setComentariosPublicacion(response.data);
        } catch (err) {
            console.error('Error al obtener los comentarios:', err);
        }
    };

    // Función que se ejecuta cuando se agrega un nuevo comentario
    const agregarComentario = () => {
        getComentariosPublicacion(datos.id_publicacion);
        
    };

    const editarPublicacion = () => {
        navigate('/EditarPublicacion', {
            state: {
                descripcion: datos.descripcion,
                imagen: datos.imagen,
                id_publicacion: datos.id_publicacion
            }});
    };





    useEffect(() => {
        getComentariosPublicacion(datos.id_publicacion);
    }, [datos.id_publicacion]);

    



    return (
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
                        <button className="mostrar-publicacion-opcion-boton" onClick={editarPublicacion}>Editar</button>
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
                    src={ "https://via.placeholder.com/300"} //datos.imagen ||
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
                        onComentarioAgregado={agregarComentario} 
                    />
                    
                )}
                
                {mostrarCrearComentario && comentariosPublicacion.length > 0 && comentariosPublicacion.map(comentario => (
                    console.log("comentario:", comentario),
                    <div className="mostrar-comentario" key={comentario.id_comentario}>
                        <div className="mostrar-comentario-header">
                            <img
                                src={comentario.fotoPerfil || "https://via.placeholder.com/50"}
                                alt="Profile"
                                className="mostrar-imagen-perfil-comentario"
                            />
                            <Texto className='textoComentario' texto={comentario.nombre+ ' ' + comentario.apellido_paterno + ' ' + comentario.apellido_materno} />
                        </div>
                        <div className="fecha-comentario">
                            <Texto tamano={11} texto={formatFecha(comentario.fecha)} />
                        </div>
                        <div className="comentario-contenido">
                            <div className="comentario-texto">
                                <div className="comentario-descripcion">
                                    <Texto texto={comentario.texto } />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MostrarPubli;
