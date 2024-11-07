import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import { usuarioContext } from '../../App';
import Swal from 'sweetalert2';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion';
import EscribirMensaje from '../../components/escribir-mensaje/EscribirMensaje.jsx';
import './Chat.css';
import MensajeUsuario from '../../components/mensaje-usuario/MensajeUsuario.jsx';
import MensajeContacto from '../../components/mensaje-contacto/MensajeContacto.jsx';

const datosChat = {
    foto: 'https://www.w3schools.com/howto/img_avatar.png',
    nombre: 'Mayra Sánchez',
};

const Mensajes = () => {
    const { usuarioLog } = useContext(usuarioContext);
    const navigate = useNavigate();
    const textoPrueba = 'Hola, ¿cómo estás? Hola, ¿cómo estás? Hola, ¿cómo estás? Hola, ¿cómo estás? Hola, ¿cómo estás? Hola, ¿cómo estás? Hola, ¿cómo estás? Hola, ¿cómo estás? Hola, ¿cómo estás? Hola, ¿cómo estás? Hola, ¿cómo estás? Hola, ¿cómo estás? Hola, ¿cómo estás? Hola, ¿cómo estás? Hola, ¿cómo estás? Hola, ¿cómo estás? Hola, ¿cómo estás? Hola, ¿cómo estás? '; 
    const horaPrueba = '10:31 AM'

    return (
        <>
            <MenuNavegacion />
            <div className="conversacion-contenedor-pagina">
                <div className='conversacion-usuario-encabezado'>
                    <div className='conversacion-usuario-info'>
                        <div className='conversacion-usuario-foto'>
                            <img src={datosChat.foto} alt='foto-usuario' />
                        </div>
                        <div className='conversacion-usuario-info'>
                            <h3 className='conversacion-usuario-nombre'>{datosChat.nombre}</h3>
                        </div>

                    </div>


                </div>

                <div className='conversacion-usuario-mensajes'>
                    <MensajeContacto texto={'Hola'} hora={horaPrueba} />
                    <MensajeUsuario texto={textoPrueba} hora={horaPrueba} />
                    <MensajeContacto texto={textoPrueba} hora={horaPrueba} />
                    <MensajeUsuario texto={textoPrueba} hora={horaPrueba} />
                    <MensajeContacto texto={textoPrueba} hora={horaPrueba} />
                    
                    
                    
                </div>
                <div className='conversacion-usuario-input'>
                    <EscribirMensaje />
                </div>


            </div>
        </>
    );
};

export default Mensajes;
