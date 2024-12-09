import React, { useState, useEffect, useContext } from 'react';
import './NotificacionesFlotante.css';
import { usuarioContext } from '../../App';

/**
 * Componente NotificacionesFlotante
 * Muestra una lista de notificaciones en un panel flotante.
 * Se conecta a un WebSocket para recibir notificaciones en tiempo real.
 *
 * @param {Function} onClose - Callback para cerrar el panel de notificaciones.
 */
function NotificacionesFlotante({ onClose }) {
    const { usuarioLog } = useContext(usuarioContext);
    const [menuVisible, setMenuVisible] = useState(false);
    const [notificaciones, setNotificaciones] = useState([]);

    useEffect(() => {
        let ws;

        /**
         * Conecta al WebSocket para recibir notificaciones.
         * Reconecta en caso de cierre o error.
         */
        const connectWebSocket = () => {
            ws = new WebSocket(`wss://linked-back-production.up.railway.app:9081?id_usuario=${usuarioLog}`);

            ws.onopen = () => {
                console.log(`Conexión WebSocket establecida para el ID de usuario: ${usuarioLog}`);
                iniciarPing(ws);
            };

            /**
             * Procesa los mensajes recibidos del WebSocket.
             * Formatea y almacena las notificaciones en el estado.
             *
             * @param {MessageEvent} event - Mensaje recibido del WebSocket.
             */
            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.type === 'notificaciones') {
                        const formattedNotifications = data.notificaciones.map((notif) => ({
                            id: notif.id_notificacion,
                            tipo: capitalizeFirstLetter(notif.tipo),
                            mensaje: formatMessage(notif),
                            creador: notif.creador,
                            fecha_creacion: new Date(notif.fecha_creacion).toLocaleString(),
                            leida: false,
                        }));
                        setNotificaciones(formattedNotifications);
                    }
                } catch (error) {
                    console.error('Error procesando el mensaje:', error);
                }
            };

            ws.onclose = () => {
                console.log("Conexión WebSocket cerrada. Intentando reconectar...");
                setTimeout(connectWebSocket, 5000);
            };

            ws.onerror = (error) => {
                console.error("Error en la conexión WebSocket:", error);
                ws.close();
            };
        };

        connectWebSocket();

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [usuarioLog]);

    /**
     * Envía un mensaje de ping periódicamente al servidor WebSocket.
     *
     * @param {WebSocket} ws - La conexión WebSocket.
     */
    const iniciarPing = (ws) => {
        const pingInterval = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: 'ping' }));
            }
        }, 100);
    };

    /**
     * Capitaliza la primera letra de una cadena de texto.
     *
     * @param {string} string - La cadena a capitalizar.
     * @returns {string} - La cadena con la primera letra en mayúscula.
     */
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    /**
     * Formatea el mensaje de notificación basado en el tipo y creador.
     *
     * @param {Object} notif - El objeto de notificación.
     * @returns {string} - El mensaje formateado.
     */
    const formatMessage = (notif) => {
        const tipoCapitalizado = capitalizeFirstLetter(notif.tipo);
        if (notif.creador === usuarioLog) {
            return `Tu ${tipoCapitalizado} fue publicado: "${notif.mensaje}"`;
        } else {
            return `Se ha publicado una nueva ${tipoCapitalizado}: "${notif.mensaje}"`;
        }
    };

    /**
     * Alterna la visibilidad del menú de opciones.
     *
     * @param {Event} e - Evento de clic.
     */
    const toggleMenu = (e) => {
        e.stopPropagation();
        setMenuVisible(!menuVisible);
    };

    /**
     * Marca todas las notificaciones como leídas.
     * Oculta el menú de opciones.
     */
    const marcarLeidas = () => {
        setNotificaciones(notificaciones.map(notif => ({ ...notif, leida: true })));
        setMenuVisible(false);
    };

    /**
     * Limpia todas las notificaciones del estado.
     * Oculta el menú de opciones.
     */
    const limpiarNotificaciones = () => {
        setNotificaciones([]);
        setMenuVisible(false);
    };

    const emojiNotificacion = {
        'Empleo': '💼',
        'Noticia': '📰',
    };

    return (
        <div className="notificaciones-flotante-panel">
            <div className="notificaciones-flotante-panel-contenido">
                <div className="notificaciones-flotante-encabezado">
                    <h2>Notificaciones <span className="notificaciones-flotante-contador">{notificaciones.length}</span></h2>
                    <button className="boton-menu-notificacion-flotante" onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="white">
                            <circle cx="12" cy="5" r="1.5" />
                            <circle cx="12" cy="12" r="1.5" />
                            <circle cx="12" cy="19" r="1.5" />
                        </svg>
                    </button>

                    {menuVisible && (
                        <div className="notificaciones-flotante-opciones-menu">
                            <div className="notificaciones-flotante-opcion-menu" onClick={marcarLeidas}>Marcar como leídas</div>
                            <div className="notificaciones-flotante-opcion-menu" onClick={limpiarNotificaciones}>Limpiar notificaciones</div>
                        </div>
                    )}
                    <button onClick={onClose} className="cerrar-notificacion-flotante">Cerrar</button>
                </div>

                <div className="notificaciones-flotante-contenido">
                    {notificaciones.length > 0 ? (
                        <div className="notificaciones-flotante-lista">
                            {notificaciones.map(notif => (
                                <div key={notif.id} className={`notificaciones-flotante-elemento ${notif.leida ? 'leida' : 'no-leida'}`}>
                                    <div className={`notificaciones-flotante-avatar emoji-avatar ${notif.tipo.toLowerCase()}`}>
                                        <span>{emojiNotificacion[notif.tipo]}</span>
                                    </div>
                                    <div className="contenido-mensaje">
                                        <p className="texto-notificacion">{notif.mensaje}</p>
                                        <span className="tiempo-notificacion">{notif.fecha_creacion}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="notificaciones-flotante-estado-vacio">
                            <p>No hay notificaciones</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NotificacionesFlotante;
