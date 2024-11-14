import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SugerenciasUsuario.css';
import { usuarioContext } from '../../App';

const SugerenciasUsuario = ({datosChat}) => {
    const navigate = useNavigate();
    const { usuarioLog } = useContext(usuarioContext);
    
    const defaultChat = {
        id: 0,
        nombre: 'Desconocido',
        foto: 'https://www.w3schools.com/howto/img_avatar.png',
        
    };

    const {id,nombre, foto} = datosChat || defaultChat;
    const idRemitente = usuarioLog;
    const idDestinatario = id;
    //console.log('Datos de chat:',usuarioLog, id, nombre, foto);
    
    const handleClick = () => {
        //console.log('click sugerencia usuario', id);
        //console.log(usuarioLog, id, nombre, foto);
        navigate('/chat', { state: { idRemitente, idDestinatario, nombre, foto } });
    
        
    };

    return (
        <div className='sugerencia-chat-usuario' onClick={handleClick}>
            <div className='sugerencia-chat-usuario-foto'>
                <img src={foto} alt='foto' />
            </div>
            <div className='sugerencia-chat-usuario-info'>
                <h3 className='sugerencia-chat-usuario-nombre'>{nombre}</h3>
            </div>
            
        </div>
    );
};

export default SugerenciasUsuario;
