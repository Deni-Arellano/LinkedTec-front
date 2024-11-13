import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VistaChatUsuario.css';

const VistaChatUsuario = ({ datosChat }) => {
    const navigate = useNavigate();

    const defaultChat = {
        idChat: 0,
        idRemitente: 0, 
        idDestinatario: 0,
        nombre: 'Desconocido',
        foto: 'https://www.w3schools.com/howto/img_avatar.png',
        mensaje: 'No hay mensaje',
        fecha: 'Fecha no disponible',
    };

    const {idChat,idRemitente,idDestinatario, nombre, foto, mensaje, fecha } = datosChat || defaultChat;


    const recortarMensaje = (mensaje, maxCaracteres) => {
        return mensaje.length > maxCaracteres ? mensaje.substring(0, maxCaracteres) + '...' : mensaje;
    };

    const handleClick = () => {
        console.log('click chat usuario',idChat);
        navigate('/chat', { state: { idRemitente,idDestinatario, nombre, foto } });
    };

    return (
        <div className='chat-usuario' onClick={handleClick}>
            <div className='chat-usuario-foto'>
                <img src={foto} alt='foto' />
            </div>
            <div className='chat-usuario-info'>
                <h3 className='chat-usuario-nombre'>{nombre}</h3>
                <p className='chat-usuario-mensaje'>{recortarMensaje(mensaje, 100)}</p>
            </div>
            <div className='chat-usuario-fecha'>{fecha}</div>
        </div>
    );
};

export default VistaChatUsuario;
