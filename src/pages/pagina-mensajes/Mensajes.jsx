import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import { usuarioContext } from '../../App';
import Swal from 'sweetalert2';
import Textbox from '../../components/componente-caja-de-texto/CajaDeTexto.jsx';
import Textarea from '../../components/componente-text-area/text-area.jsx';
import Label from '../../components/componente-label/Etiquetas.jsx';
import BotonNuevoMensaje from '../../components/boton-nuevo-mensaje/BotonNuevoMensaje.jsx';
import VistaChatUsuario from '../../components/vista-chat-usuario/VistaChatUsuario.jsx';
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
                    
                    
                </div>

                
            </div>
        </>
    );
};

export default Mensajes;
