import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usuarioContext } from '../../App';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion';
import NuevoMensaje from '../../components/escribir-mensaje/EscribirMensaje.jsx';
import MensajeUsuario from '../../components/mensaje-usuario/MensajeUsuario';
import MensajeContacto from '../../components/mensaje-contacto/MensajeContacto';
import './Chat.css';

const Mensajes = () => {
    const { usuarioLog } = useContext(usuarioContext);
    const location = useLocation();
    const { idRemitente: inicialIdRemitente, idDestinatario: inicialIdDestinatario, nombre, foto } = location.state || { idRemitente: 0, idDestinatario: 0, nombre: 'Desconocido', foto: 'https://www.w3schools.com/howto/img_avatar.png' };
    
    let idRemitente = inicialIdRemitente; 
    let idDestinatario = inicialIdDestinatario; 
    
    if (inicialIdRemitente !== usuarioLog) { 
        idRemitente = usuarioLog; 
        idDestinatario = inicialIdRemitente; 
    }

    const [ws, setWs] = useState(null); 
    const [mensajes, setMensajes] = useState([]);

    // Declaramos las funciones fuera del useEffect
    const mostrarMensaje = useCallback((mensaje) => {
        const mensajeComponent = mensaje.id_remitente === usuarioLog
            ? <MensajeUsuario key={mensaje.id} texto={mensaje.mensaje} hora={new Date(mensaje.fecha_envio).toLocaleString('es-ES')} />
            : <MensajeContacto key={mensaje.id} texto={mensaje.mensaje} hora={new Date(mensaje.fecha_envio).toLocaleString('es-ES')} />;
    
        setMensajes((prevMensajes) => [...prevMensajes, mensajeComponent]);
    }, [usuarioLog]);
    
    const mostrarMensajesHistoricos = useCallback((mensajesHistoricos) => {
        const mensajesFormateados = mensajesHistoricos.map((mensaje) => {
            return mensaje.id_remitente === usuarioLog
                ? <MensajeUsuario key={mensaje.id} texto={mensaje.mensaje} hora={new Date(mensaje.fecha_envio).toLocaleString('es-ES')} />
                : <MensajeContacto key={mensaje.id} texto={mensaje.mensaje} hora={new Date(mensaje.fecha_envio).toLocaleString('es-ES')} />;
        });
        setMensajes(mensajesFormateados); // Reseteamos los mensajes previos y mostramos solo los nuevos.
    }, [usuarioLog]);

    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8080/?idUsuario=${usuarioLog}&idChat=${idDestinatario}`);
        setWs(socket);
    
        socket.onopen = () => {
            console.log('Conectado al servidor WebSocket');
        };
    
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Mensaje recibido:', data);

            if (data.mensajes) {
                mostrarMensajesHistoricos(data.mensajes);
            } else {
                mostrarMensaje(data);
            }
        };
    
        socket.onclose = () => {
            console.log('Desconectado del servidor WebSocket');
        };
    
        return () => {
            socket.close();
        };
    }, [usuarioLog, idDestinatario, mostrarMensaje, mostrarMensajesHistoricos]);
    

    const enviarMensaje = (contenido) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            const mensaje = {
                idCliente: usuarioLog,
                idChat: idDestinatario,
                mensaje: contenido
            };
            console.log('Enviando mensaje:', mensaje);
            ws.send(JSON.stringify(mensaje));
            //mostrarMensaje(mensaje); 
        } else {
            console.error("WebSocket no está conectado.");
        }
    };

    return (
        <>
            <MenuNavegacion />
            <div className="conversacion-contenedor-pagina">
                <div className='conversacion-usuario-encabezado'>
                    <div className='conversacion-usuario-info'>
                        <div className='conversacion-usuario-foto'>
                            <img src={foto} alt='foto-usuario' />
                        </div>
                        <div className='conversacion-usuario-info'>
                            <h3 className='conversacion-usuario-nombre'>{nombre}</h3>
                        </div>
                    </div>
                </div>
    
                <div className='conversacion-usuario-mensajes'>
                    {mensajes}
                </div>
    
                <div className='conversacion-usuario-input'>
                    <NuevoMensaje enviarMensaje={enviarMensaje} />
                </div>
            </div>
        </>
    );
};

export default Mensajes;
