import React, { useState, useContext, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { usuarioContext } from '../../App';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion';
import NuevoMensaje from '../../components/escribir-mensaje/EscribirMensaje.jsx';
import MensajeUsuario from '../../components/mensaje-usuario/MensajeUsuario';
import MensajeContacto from '../../components/mensaje-contacto/MensajeContacto';
import './Chat.css';
import Swal from 'sweetalert2';

const Chat = () => {
    const { usuarioLog } = useContext(usuarioContext);
    const location = useLocation();
    const { idRemitente: inicialIdRemitente, idDestinatario: inicialIdDestinatario, nombre, foto } = location.state || { idRemitente: 0, idDestinatario: 0, nombre: 'Desconocido', foto: 'https://www.w3schools.com/howto/img_avatar.png' };
    
    const idDestinatario = inicialIdRemitente === usuarioLog ? inicialIdDestinatario : inicialIdRemitente;
    
    const [ws, setWs] = useState(null);
    const [mensajes, setMensajes] = useState([]);
    const mensajesRef = useRef(null);
    
    //Muestra los mensajes en el chat
    const mostrarMensaje = useCallback((mensaje) => {

        if (mensaje.id_destinatario === idDestinatario || mensaje.id_remitente === idDestinatario) {
            const mensajeComponent = mensaje.id_remitente === usuarioLog
                ? <MensajeUsuario key={mensaje.id} texto={mensaje.mensaje} hora={new Date(mensaje.fecha_envio).toLocaleString('es-ES')} />
                : <MensajeContacto key={mensaje.id} texto={mensaje.mensaje} hora={new Date(mensaje.fecha_envio).toLocaleString('es-ES')} />;
            
            setMensajes((prevMensajes) => [...prevMensajes, mensajeComponent]);
        }
    }, [usuarioLog, idDestinatario]);
    
    //Renderiza los mensajes historicos
    const mostrarMensajesHistoricos = useCallback((mensajesHistoricos) => {
        const mensajesFormateados = mensajesHistoricos.map((mensaje) => (
            mensaje.id_remitente === usuarioLog
                ? <MensajeUsuario key={mensaje.id} texto={mensaje.mensaje} hora={new Date(mensaje.fecha_envio).toLocaleString('es-ES')} />
                : <MensajeContacto key={mensaje.id} texto={mensaje.mensaje} hora={new Date(mensaje.fecha_envio).toLocaleString('es-ES')} />
        ));
        setMensajes(mensajesFormateados);
    }, [usuarioLog]);

    //Conecta al servidor WebSocket
    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8080/?idUsuario=${usuarioLog}&idChat=${idDestinatario}`);
        setWs(socket);
    
        socket.onopen = () => {
            //console.log('Conectado al servidor WebSocket chat');
            
        };

        socket.onerror = (error) => {
            console.error('Error en WebSocket:', error);
            //excepciones("Hubo un error al conectar al servidor. Intenta nuevamente.");
        };
    
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            //console.log('Mensaje recibido:', data);

            if (data.error) {
                excepciones(`Error al recibir el mensaje: ${data.error}`);
            } else if (data.mensajes) {
                mostrarMensajesHistoricos(data.mensajes);
            } else {
                mostrarMensaje(data);
            }
        };

        socket.onclose = () => {
            //console.log('Desconectado del servidor WebSocket chat');
        };
    
        return () => {
            socket.close();
        };
    }, [usuarioLog, idDestinatario, mostrarMensaje, mostrarMensajesHistoricos]);

    //Mantiene el scroll en la parte inferior del chat
    useEffect(() => {
        setTimeout(() => {
          if (mensajesRef.current) {
            mensajesRef.current.scrollIntoView({
              
              block: 'end',
              inline: 'nearest',
            });
            window.scrollBy(0, 100);
          }
        }, 50);  
      }, [mensajes]);
      
    //Envia un mensaje al servidor WebSocket
    const enviarMensaje = (contenido) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            const mensaje = {
                idCliente: usuarioLog,
                idChat: idDestinatario,
                mensaje: contenido
            };
            //console.log('Enviando mensaje:', mensaje);
            ws.send(JSON.stringify(mensaje));
        } else {
            //console.error("WebSocket no está conectado.");
            excepciones("No se pudo enviar el mensaje.");
        }
    };

    //Muestra un mensaje de error
    const excepciones = (mensaje) => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: mensaje
        });

    }

    return (
        <>
            <div className="chat-contenedor-toda-pagina">
            <MenuNavegacion />
            <div className="conversacion-contenedor-pagina">
                <div className="conversacion-usuario-encabezado">
                    <div className="conversacion-usuario-info">
                        <div className="conversacion-usuario-foto">
                            <img src={foto} alt="foto-usuario" />
                        </div>
                        <div>
                            <h3 className="conversacion-usuario-nombre">{nombre}</h3>
                        </div>
                    </div>
                </div>
    
                <div className="conversacion-usuario-mensajes"  ref={mensajesRef}>
                    {mensajes}
                </div>
    
                <div className="conversacion-usuario-input">
                    <NuevoMensaje enviarMensaje={enviarMensaje} />
                </div>
                
            </div>
            </div>
        </>
    );
};

export default Chat;
