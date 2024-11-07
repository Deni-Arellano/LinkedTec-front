import React, { useState, useEffect, useContext, useRef } from "react";
import Texto from '../componente-label/Etiquetas.jsx';
import './MostrarPublicacion.css';
import { BsThreeDots } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { MdAddComment } from "react-icons/md";
import Axios from 'axios';
import CrearComentario from '../crear-comentario/CrearComentario.jsx';
import { usuarioContext } from '../../App.js';
import { useNavigate } from 'react-router-dom';
import '../componente-mostrar-comentario/MostrarComentario.css';

const MostrarPubli = ({ datos, onEliminar }) => {
    const { usuarioLog } = useContext(usuarioContext);
    const [mostrarOpciones, setMostrarOpciones] = useState(false);
    const [mostrarCrearComentario, setMostrarCrearComentario] = useState(false);
    const [comentariosPublicacion, setComentariosPublicacion] = useState([]);
    const [meGusta, setMeGusta] = useState(datos.meGusta || 0);
    const [disgusta, setDisgusta] = useState(datos.disgusta || 0);
    const ws = useRef(null);
    const navigate = useNavigate();

    const conectarWebSocket = () => {
        ws.current = new WebSocket('ws://localhost:8082');

        ws.current.onopen = () => {
            console.log("Conectado al servidor de WebSocket de reacciones");
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'actualizacion_reaccion') {
                if (data.reaccion === 'me_gusta') {
                    setMeGusta(data.conteo);
                } else if (data.reaccion === 'disgusta') {
                    setDisgusta(data.conteo);
                }
            }
        };

        ws.current.onerror = (error) => {
            console.error("Error en WebSocket:", error);
        };

        ws.current.onclose = () => {
            console.log("WebSocket desconectado, reintentando en 3 segundos...");
            setTimeout(conectarWebSocket, 3000);
        };
    };

    useEffect(() => {
        conectarWebSocket();
        return () => {
            if (ws.current) ws.current.close();
        };
    }, []);

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
            const response = await Axios.delete(`http://localhost:3000/publicaciones/${datos.id_publicacion}`);
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
            setComentariosPublicacion(response.data.comentarios || []);
        } catch (err) {
            console.error('Error al obtener los comentarios:', err);
        }
    };

    const agregarComentario = () => {
        getComentariosPublicacion(datos.id_publicacion);
    };

    const editarPublicacion = () => {
        navigate('/editar-publicacion', {
            state: {
                descripcion: datos.descripcion,
                imagen: datos.imagen,
                id_publicacion: datos.id_publicacion
            }
        });
    };

    const reaccionar = async (tipo_reaccion, cancelar = false) => {
        try {
            const response = await Axios.post('http://localhost:3000/reaccionar', {
                id_publicacion: datos.id_publicacion,
                tipo_reaccion: tipo_reaccion,
                cancelar: cancelar ? "true" : "",
                id_usuario: usuarioLog // ID del usuario que está reaccionando
            });
    
            // Actualizar contadores localmente para un feedback inmediato
            if (tipo_reaccion === 'me_gusta') {
                setMeGusta((prev) => cancelar ? prev - 1 : prev + 1);
            } else if (tipo_reaccion === 'disgusta') {
                setDisgusta((prev) => cancelar ? prev - 1 : prev + 1);
            }
        } catch (err) {
            console.error('Error al enviar la reacción:', err);
        }
    };

    useEffect(() => {
        if (ws.current) {
            ws.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'actualizacion_reaccion' && data.id_publicacion === datos.id_publicacion) {
                    if (data.reaccion === 'me_gusta') {
                        setMeGusta(data.conteo);
                    } else if (data.reaccion === 'disgusta') {
                        setDisgusta(data.conteo);
                    }
                }
            };
        }
    }, [datos.id_publicacion]);

    const handleLike = () => {
        reaccionar('me_gusta');
    };

    const handleDislike = () => {
        reaccionar('disgusta');
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
                    src={ datos.imagen || "https://via.placeholder.com/300"} //
                    alt="Post" 
                    className="mostrar-publicacion-imagen" 
                />
            </div>
            <div className="mostrar-publicacion-botones">
                <button className="mostrar-publicacion-megusta" onClick={handleLike}>
                    <AiFillLike size={30} /> {meGusta}
                </button>
                <button className="mostrar-publicacion-medisgusta" onClick={handleDislike}>
                    <AiFillDislike size={30} /> {disgusta}
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
                                    <Texto texto={comentario.texto} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MostrarPubli;
