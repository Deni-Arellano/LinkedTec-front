import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usuarioContext } from '../../App';
import BotonNuevoMensaje from '../../components/boton-nuevo-mensaje/BotonNuevoMensaje.jsx';
import VistaChatUsuario from '../../components/vista-chat-usuario/VistaChatUsuario.jsx';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion';
import './Mensajes.css';

const Mensajes = () => {
    const { usuarioLog } = useContext(usuarioContext);
    const navigate = useNavigate();

    const [socket, setSocket] = useState(null);
    const [estadoConexion, setEstadoConexion] = useState('No conectado');
    const [chats, setChats] = useState([]);
    const [cargando, setCargando] = useState(true); 

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
                    setChats(data.datos);
                    setCargando(false);
                    //console.log('Datos de chat:', data.datos);
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
            <div className='contenedor-toda-pagina-mensajes'>
            <MenuNavegacion />

            <div className="mensajes-contenedor-pagina">
                <div className="encabezado-mensajes">
                    <h1 className='mensajes-titulo'>Mensajes</h1>
                    <BotonNuevoMensaje />
                </div>

                
                <div className='vista-chats'>
                    {cargando ? (
                        <p className='cargando-chats'>Cargando...</p>
                    ) : (
                        chats.map((chat) => (
                            <VistaChatUsuario
                                key={chat.id}
                                datosChat={{
                                    idChat: chat.id,
                                    idRemitente: chat.id_remitente,
                                    idDestinatario: chat.id_destinatario,
                                    nombre: chat.usuario.nombre + ' ' + chat.usuario.apellido,
                                    foto: chat.usuario.imagen_usuario,
                                    mensaje: chat.mensaje,
                                    fecha: new Date(chat.fecha_envio).toLocaleString()
                                }}
                            />
                        ))
                    )}
                </div>
            </div>
            </div>
        </>
    );
};

export default Mensajes;
