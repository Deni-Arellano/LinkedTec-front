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
    const [haReaccionado, setHaReaccionado] = useState(false);  // Bandera que recibimos del backend
    const [tipoReaccionActual, setTipoReaccionActual] = useState(null);
    const ws = useRef(null);
    const navigate = useNavigate();

    const conectarWebSocket = () => {
        ws.current = new WebSocket('ws://localhost:8082');
    
        ws.current.onopen = () => {
            console.log("Conectado al servidor de WebSocket de reacciones");
        };
    
        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'actualizacion_reaccion' && data.id_publicacion === datos.id_publicacion) {
                // Asegura que solo actualice los contadores de la publicación actual
                setMeGusta(data.me_gusta);
                setDisgusta(data.disgusta);
                setHaReaccionado(data.haReaccionado); // Mantener la bandera de reacción
                setTipoReaccionActual(data.tipo_reaccion); // Actualizar el tipo de reacción actual si es necesario
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

    const reaccionar = async (tipo_reaccion) => {
        const esReaccionIgual = tipoReaccionActual === tipo_reaccion;
        const esReaccionDiferente = tipoReaccionActual && tipoReaccionActual !== tipo_reaccion;
    
        // Ajusta las reacciones en el frontend
        if (tipo_reaccion === 'me_gusta') {
            if (esReaccionIgual) {
                setMeGusta(prev => prev - 1); // Disminuir "me gusta"
            } else {
                if (esReaccionDiferente) setDisgusta(prev => prev - 1); // Deshacer "disgusta" si está activo
                setMeGusta(prev => prev + 1); // Incrementar "me gusta"
            }
        } else if (tipo_reaccion === 'disgusta') {
            if (esReaccionIgual) {
                setDisgusta(prev => prev - 1); // Disminuir "disgusta"
            } else {
                if (esReaccionDiferente) setMeGusta(prev => prev - 1); // Deshacer "me gusta" si está activo
                setDisgusta(prev => prev + 1); // Incrementar "disgusta"
            }
        }
    
        // Actualiza el tipo de reacción actual y bandera de haReaccionado
        setTipoReaccionActual(esReaccionIgual ? null : tipo_reaccion);
        setHaReaccionado(!esReaccionIgual);
    
        try {
            const response = await Axios.post('http://localhost:3000/reaccionar', {
                id_publicacion: datos.id_publicacion,
                tipo_reaccion: tipo_reaccion,
                cancelar: esReaccionIgual ? "true" : "", // Cancela si la reacción es igual
                id_usuario: usuarioLog
            });
    
            // Asegúrate de que la respuesta tiene el objeto 'publicacion'
            if (response.data && response.data.publicacion) {
                const { me_gusta, disgusta, haReaccionado } = response.data.publicacion;
    
                // Actualiza los contadores y el estado de reacción basados en los datos de la respuesta
                setMeGusta(me_gusta);
                setDisgusta(disgusta);
                setHaReaccionado(haReaccionado);
                setTipoReaccionActual(tipo_reaccion);
            }
        } catch (err) {
            console.error('Error al enviar la reacción:', err);
            // Revertir cambios en caso de error
            setTipoReaccionActual(esReaccionIgual ? tipo_reaccion : null);
            setHaReaccionado(!esReaccionIgual);
        }
    };    

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
                    src={ datos.imagen || "https://via.placeholder.com/300"} 
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
            {mostrarCrearComentario && (
                <CrearComentario
                    idPublicacion={datos.id_publicacion}
                    agregarComentario={agregarComentario}
                    setMostrarCrearComentario={setMostrarCrearComentario}
                />
            )}
            <div className="mostrar-comentarios">
                {comentariosPublicacion.map((comentario, index) => (
                    <div key={index} className="mostrar-comentario">
                        <div className="mostrar-comentario-header">
                            <img 
                                src={comentario.foto_perfil_usuario || "https://via.placeholder.com/50"}
                                alt="Imagen de perfil"
                                className="mostrar-comentario-imagen-perfil"
                            />
                            <Texto tamano={11} texto={comentario.nombreUsuario} />
                        </div>
                        <div className="mostrar-comentario-contenido">
                            <Texto texto={comentario.texto} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MostrarPubli;
