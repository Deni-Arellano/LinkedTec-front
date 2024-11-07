import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import { usuarioContext } from '../../App';
import Swal from 'sweetalert2';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion';
import EscribirMensaje from '../../components/escribir-mensaje/EscribirMensaje.jsx';
import './Chat.css';

const datosChat = {
    foto: 'https://www.w3schools.com/howto/img_avatar.png',
    nombre: 'Mayra Sánchez',
};

const Mensajes = () => {
    const { usuarioLog } = useContext(usuarioContext);
    const navigate = useNavigate();

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
                    <h1>Mensajes</h1>
                </div>
                <div className='conversacion-usuario-input'>
                    <EscribirMensaje />
                </div>


            </div>
        </>
    );
};

export default Mensajes;
