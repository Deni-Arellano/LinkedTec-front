import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import { usuarioContext } from '../../App';
import Swal from 'sweetalert2';
import SugerenciasUsuario from '../../components/SugerenciasUsuarioChat/SugerenciasUsuario.jsx';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion';
import './NuevoMensaje.css';

const NuevoMensaje = () => {
    const { usuarioLog } = useContext(usuarioContext);
    const navigate = useNavigate();

    const handleBackClick = () => {
        console.log('Botón atrás clicado');
        navigate('/mensajes');
    };


    return (
        <>
            <MenuNavegacion />
            <div className='nuevo-mensaje-contenedor-pagina'>
                <div className='nuevo-mensaje-contenedor-busqueda'>
                    <div className='nuevo-mensaje-busqueda-usuario'>
                        <span>Para:</span>
                        <input type='text' placeholder='Buscar usuario...' />
                    </div>

                    <div className='nuevo-mensaje-boton-atras'>
                        <button onClick={handleBackClick}>Atrás</button>
                    </div>


                </div>
                <SugerenciasUsuario />
            </div>


        </>
    );
};

export default NuevoMensaje;
