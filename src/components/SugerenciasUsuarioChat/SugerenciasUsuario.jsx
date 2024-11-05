import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SugerenciasUsuario.css';

// Datos del chat
const datosChat = {
    foto: 'https://www.w3schools.com/howto/img_avatar.png',
    nombre: 'Mayra Sánchez',
};

const SugerenciasUsuario = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log('click sugerencia usuario');
        
    };

    return (
        <div className='sugerencia-chat-usuario' onClick={handleClick}>
            <div className='sugerencia-chat-usuario-foto'>
                <img src={datosChat.foto} alt='foto-usuario' />
            </div>
            <div className='sugerencia-chat-usuario-info'>
                <h3 className='sugerencia-chat-usuario-nombre'>{datosChat.nombre}</h3>
            </div>
            
        </div>
    );
};

export default SugerenciasUsuario;
