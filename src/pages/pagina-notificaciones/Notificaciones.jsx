import React, { useState, useEffect, useContext } from 'react';
import Button from '../../components/boton/Boton';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion';
import './Notificaciones.css';
import { usuarioContext } from '../../App';

/**
 * Componente NotificationSystem
 * Administra y muestra notificaciones en tiempo real mediante WebSocket.
 */
const NotificationSystem = () => {
    const { usuarioLog } = useContext(usuarioContext); // Obtener el contexto del usuario logueado
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        let ws;

        /**
         * Conecta al WebSocket para recibir notificaciones en tiempo real.
         * Se intenta reconectar en caso de cierre o error.
         */
        const connectWebSocket = () => {
            ws = new WebSocket(`wss://linked-back-spring-lake-433.fly.dev/notificaciones?id_usuario=${usuarioLog}`);

            ws.onopen = () => {
                console.log(`Conexión WebSocket establecida para el ID de usuario: ${usuarioLog}`);
                iniciarPing(ws);
            };

            /**
             * Procesa los mensajes recibidos a través del WebSocket.
             * Convierte los datos en objetos de notificación y los almacena en el estado.
             *
             * @param {MessageEvent} event - El mensaje recibido del WebSocket.
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
                            priority: getNotificationPriority(notif.tipo),
                            icon: getNotificationIcon(notif.tipo),
                        }));
                        setNotifications(formattedNotifications);
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
     * Envía mensajes de ping al servidor WebSocket en intervalos regulares.
     *
     * @param {WebSocket} ws - La conexión WebSocket actual.
     */
    const iniciarPing = (ws) => {
        const pingInterval = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: 'ping' }));
            }
        }, 100);
    };

    /**
     * Capitaliza la primera letra de una cadena.
     *
     * @param {string} string - La cadena a capitalizar.
     * @returns {string} - La cadena con la primera letra en mayúscula.
     */
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    /**
     * Genera el mensaje de notificación basado en el tipo de notificación y el creador.
     *
     * @param {Object} notif - La notificación recibida.
     * @returns {string} - El mensaje formateado.
     */
    const formatMessage = (notif) => {
        if (notif.creador === usuarioLog) {
            return `Tu ${notif.tipo} fue publicado: "${notif.mensaje}"`;
        } else {
            return `Se ha publicado una nueva ${notif.tipo}: "${notif.mensaje}"`;
        }
    };

    /**
     * Asigna prioridad a la notificación basada en su tipo.
     *
     * @param {string} tipo - El tipo de notificación.
     * @returns {string} - La prioridad de la notificación (low, medium, high).
     */
    const getNotificationPriority = (tipo) => {
        const priorities = {
            "me_gusta": "low",
            "postulacion": "medium",
            "empleo": "high",
            "noticia": "medium",
            "seguimiento": "low"
        };
        return priorities[tipo] || "low";
    };

    /**
     * Asigna un ícono a la notificación basado en su tipo.
     *
     * @param {string} tipo - El tipo de notificación.
     * @returns {string} - El ícono representativo de la notificación.
     */
    const getNotificationIcon = (tipo) => {
        const icons = {
            "me_gusta": "👍",
            "postulacion": "✅",
            "empleo": "💼",
            "noticia": "📰",
            "seguimiento":"➕"
        };
        return icons[tipo] || "🔔";
    };

    /**
     * Renderiza la lista de notificaciones.
     * Muestra un mensaje en caso de no haber notificaciones.
     *
     * @returns {JSX.Element} - Elementos JSX de las notificaciones o un mensaje de vacío.
     */
    const renderNotifications = () => {
        return notifications.length > 0 ? (
            notifications.map((notification) => (
                <div 
                    key={notification.id} 
                    className={`notification-item priority-${notification.priority}`}
                >
                    <div className="notification-icon">{notification.icon}</div>
                    <div className="notification-content">
                        <div className="notification-title">{notification.tipo}</div>
                        <div className="notification-message">{notification.mensaje}</div>
                        <div className="notification-time">{notification.fecha_creacion}</div>
                    </div>
                </div>
            ))
        ) : (
            <p>No hay notificaciones</p>
        );
    };

    /**
     * Marca todas las notificaciones como leídas.
     */
    const MarcarTodoLeido = () => {
        setNotifications(notifications.map((notification) => ({ ...notification, read: true })));
    };

    /**
     * Elimina todas las notificaciones del estado.
     */
    const Limpiartodo = () => {
        setNotifications([]);
    };

    return (
        <>
            <MenuNavegacion /> 
            <div className="notification-container">
                <div className="notification-header">
                    <h2 className="etiqueta">Notificaciones</h2>
                    <span className="notification-count">{notifications.filter(n => !n.read).length}</span>
                </div>
                
                <div id="notificaciones" className="notification-list">
                    {renderNotifications()}
                </div>

                <div className="acciones-notificacion">
                    <Button texto="Limpiar todo" onClick={Limpiartodo} className="action-button clear-all" />
                    <Button texto="Marcar todos como leído" onClick={MarcarTodoLeido} className="action-button clear-all" />
                </div>
            </div>
        </>
    );
};

export default NotificationSystem;
