import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import { usuarioContext } from '../../App';
import Swal from 'sweetalert2';
import BotonNuevoMensaje from '../../components/boton-nuevo-mensaje/BotonNuevoMensaje.jsx';
import VistaChatUsuario from '../../components/vista-chat-usuario/VistaChatUsuario.jsx';
import SugerenciasUsuario from '../../components/SugerenciasUsuarioChat/SugerenciasUsuario.jsx';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion';
import './Mensajes.css';

const Mensajes = () => {
    const { usuarioLog } = useContext(usuarioContext);
    const navigate = useNavigate();

    return (
        <>
            <MenuNavegacion />
            <div className="mensajes-contenedor-pagina">
                <div className="encabezado-mensajes">
                    <h1 className='mensajes-titulo'>Mensajes</h1>
                    <BotonNuevoMensaje />
                </div>
                <div className='vista-chats'>
                    <VistaChatUsuario />
                    <SugerenciasUsuario />
                    
                    
                </div>

                
            </div>
        </>
    );
};

export default Mensajes;
