import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SugerenciasUsuario.css';



const SugerenciasUsuario = ({datosChat}) => {
    const defaultChat = {
        id: 0,
        nombre: 'Desconocido',
        foto: 'https://www.w3schools.com/howto/img_avatar.png',
        
    };

    const {id,nombre, foto} = datosChat || defaultChat;
    
    const handleClick = () => {
        console.log('click sugerencia usuario', id);
    
        
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
