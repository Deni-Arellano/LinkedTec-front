import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import { usuarioContext } from '../../App';
import Swal from 'sweetalert2';
import BotonNuevoMensaje from '../../components/boton-nuevo-mensaje/BotonNuevoMensaje.jsx';
import VistaChatUsuario from '../../components/vista-chat-usuario/VistaChatUsuario.jsx';
import SugerenciasUsuario from '../../components/SugerenciasUsuarioChat/SugerenciasUsuario.jsx';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion';
import './Mensajes.css';

const Mensajes = () => {
    const { usuarioLog } = useContext(usuarioContext);
    const navigate = useNavigate();

    const [socket, setSocket] = useState(null);
    const [estadoConexion, setEstadoConexion] = useState('No conectado');
    const [chats, setChats] = useState([]);
   
    
    //Establece la conexion con el websocket
    useEffect(() => {
       
        const socket = new WebSocket(`ws://localhost:8083/?idUsuario=${usuarioLog}`);

        
        socket.addEventListener('open', () => {
            console.log('Conectado al servidor WebSocket');
            setEstadoConexion('Conectado');
            
            socket.send(JSON.stringify({ tipo: 'obtenerDatosChat', usuarioLog }));
        });

        
        socket.addEventListener('message', (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.tipo === 'datosChat' || data.tipo === 'datosChatActualizados') {
                    console.log('Datos de chat recibidos:', data.datos);
                    setChats(data.datos);
                } else if (data.tipo === 'nuevoMensaje' || data.tipo === 'mensajeEnviado') {
                    
                    console.log('Nuevo mensaje:', data.mensaje);
                } else if (data.tipo === 'error') {
                    console.error('Error del servidor:', data.mensaje);
                }
            } catch (error) {
                console.error('Error al procesar el mensaje:', error);
            }
        });

        
        socket.addEventListener('close', () => {
            console.log('Desconectado del servidor WebSocket');
            setEstadoConexion('No conectado');
        });

       
        socket.addEventListener('error', (event) => {
            console.error('Error en la conexión WebSocket:', event);
            setEstadoConexion('Error de conexión');
        });

        
        return () => {
            socket.close();
            console.log('Conexión WebSocket cerrada');
        };
    }, [usuarioLog, navigate]); 


    return (
        <>
            <MenuNavegacion />

            <div className="mensajes-contenedor-pagina">
                <div className="encabezado-mensajes">
                    <h1 className='mensajes-titulo'>Mensajes</h1>
                    <BotonNuevoMensaje />
                </div>
                <div className='vista-chats'>
                    {chats.map((chat) => (
                        <VistaChatUsuario
                            key={chat.id}
                            datosChat={{
                                nombre: chat.usuario.nombre,
                                foto: chat.usuario.imagen_usuario,
                                mensaje: chat.mensaje,
                                fecha: new Date(chat.fecha_envio).toLocaleString()
                            }}
                        />
                    ))}
                    
                    
                    
                    
                </div>

                
            </div>
        </>
    );
};

export default Mensajes;
