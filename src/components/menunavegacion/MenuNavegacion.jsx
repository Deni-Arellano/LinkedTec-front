import React, { useState, useContext, useEffect } from 'react';
import './MenuNavegacion.css';
import Searchbar from '../../components/componente-searchbar/Searchbar';
import { VscAccount } from "react-icons/vsc";
import { AiFillAlert } from "react-icons/ai";
import { BiChat } from "react-icons/bi";
import logo from '../../assets/Logo24.png';
import { useNavigate } from 'react-router-dom';
import { usuarioContext } from '../../App';
import Axios from 'axios';
import NotificacionesFlotante from '../notificaciones-flotante/NotificacionesFlotante';

const MenuNavegacion = () => {
    const [sidebarVisible] = useState(false);
    const [notificacionesVisible, setNotificacionesVisible] = useState(false); 
    const { usuarioLog, setUsuarioLog } = useContext(usuarioContext);
    const [datosUsuario, setDatosUsuario] = useState('');
    
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener los datos del usuario logeado
        const getUsuario = async () => {
            try {
                const response = await Axios.get(`http://localhost:3000/usuarios/${usuarioLog}`);
                
                setDatosUsuario(response.data);
            } catch (err) {
                console.error('Error al obtener el usuario:', err);
            }
        };

       
        if (usuarioLog) {
            getUsuario();
        }
    }, [usuarioLog]); 

    const toggleNotificaciones = () => {
        setNotificacionesVisible(!notificacionesVisible);
    };

    return (
        <div className="MenuNavegacion-app">
            {/* Barra superior */}
            <header className="MenuNavegacion-barrasuperiordeMenuNavegacion">
                <img 
                    src={logo} 
                    alt="Logo" 
                    className="MenuNavegacion-logo" 
                    onClick={() => navigate('/')} 
                    style={{ cursor: 'pointer' }}
                />

                <div className="MenuNavegacion-search">
                    <Searchbar />
                </div>

                <div className="MenuNavegacion-icons">
                    <button className="MenuNavegacion-icon-button">
                        <BiChat className="MenuNavegacion-icon" />
                    </button>
                    <button className="MenuNavegacion-icon-button" onClick={toggleNotificaciones}>
                        <AiFillAlert className="MenuNavegacion-icon" />
                    </button>
                    <button className="MenuNavegacion-icon-button" onClick={() => navigate('/Perfil')}>
                        <VscAccount className="MenuNavegacion-icon" />
                    </button>
                </div>
            </header>
            
            <aside className={`MenuNavegacion-sidebar ${sidebarVisible ? 'MenuNavegacion-visible' : ''}`}>
                <div className="MenuNavegacion-perfil">
                    <img src={datosUsuario.imagen_usuario} alt="Perfil" className="MenuNavegacion-foto-perfil" />
                    <p className="MenuNavegacion-usuario-publicacion-empleo">{datosUsuario.nombre + " " + datosUsuario.apellido_paterno + " " + datosUsuario.apellido_materno}</p>
                </div>

                <nav className="MenuNavegacion-menu">
                    <button className="MenuNavegacion-menu-button" onClick={() => navigate('/noticias')}>Noticias</button>
                    <button className="MenuNavegacion-menu-button" onClick={() => navigate('/empleos')}>Empleos</button>
                    <button className="MenuNavegacion-menu-button" onClick={() => navigate('/publicaciones')}>Publicaciones</button>
                    <button className="MenuNavegacion-menu-button">Foro</button>
                    <button className="MenuNavegacion-menu-button" onClick={() => navigate('/notificaciones')}>Notificaciones</button>
                </nav>
            </aside>
            
            <div className="MenuNavegacion-content">
                {/* Aquí va el contenido */}
            </div>

            {notificacionesVisible && (
                <div className="modal-overlay" onClick={toggleNotificaciones}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <NotificacionesFlotante onClose={toggleNotificaciones} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuNavegacion;
