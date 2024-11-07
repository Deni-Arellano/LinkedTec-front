import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VistaChatUsuario.css';

const datosChat = {
    foto: 'https://www.w3schools.com/howto/img_avatar.png',
    nombre: 'Juan Pérez Mayorga',
    mensaje: 'Hola, ¿cómo estás? Solo quería decirte que me encantó nuestro último proyecto.',
    fecha: '2023-04-06'
};

const VistaChatUsuario = () => {
    const navigate = useNavigate();


    const recortarMensaje = (mensaje, maxCaracteres) => {
        return mensaje.length > maxCaracteres ? mensaje.substring(0, maxCaracteres) + '...' : mensaje;
    };

    const handleClick = () => {
        console.log('click chat usuario');
        
    };

    return (
        <div className='chat-usuario' onClick={handleClick}>
            <div className='chat-usuario-foto'>
                <img src={datosChat.foto} alt='foto-usuario' />
            </div>
            <div className='chat-usuario-info'>
                <h3 className='chat-usuario-nombre'>{datosChat.nombre}</h3>
                <p className='chat-usuario-mensaje'>{recortarMensaje(datosChat.mensaje, 100)}</p>
            </div>
            <div className='chat-usuario-fecha'>{datosChat.fecha}</div>
        </div>
    );
};

export default VistaChatUsuario;
