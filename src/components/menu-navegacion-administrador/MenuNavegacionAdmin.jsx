import React, { useState, useContext, useEffect } from 'react';
import './MenuNavegacionAdmin.css';
import { useNavigate } from 'react-router-dom';
import { usuarioContext } from '../../App';
import Axios from 'axios';
import logo from '../../assets/Logo24.png';

const MenuNavegacionAdmin = () => {
    const [sidebarVisible] = useState(false);
    const [notificacionesVisible, setNotificacionesVisible] = useState(false); 
    const { usuarioLog } = useContext(usuarioContext);
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
        <div className="MenuNavegacionAdmin-app">
            <header className="MenuNavegacionAdmin-barrasuperiordeMenuNavegacion">
                <img 
                    src={logo} 
                    alt="Logo" 
                    className="MenuNavegacionAdmin-logo" 
                    onClick={() => navigate('/')} 
                    style={{ cursor: 'pointer' }}
                />
            </header>
            
            <aside className={`MenuNavegacionAdmin-sidebar ${sidebarVisible ? 'MenuNavegacion-visible' : ''}`}>
                <div className="MenuNavegacionAdmin-perfil">
                    <img src={datosUsuario.imagen_usuario} alt="Perfil" className="MenuNavegacionAdmin-foto-perfil" />
                    <p className="MenuNavegacionAdmin-usuario-publicacion-empleo">{datosUsuario.nombre} {datosUsuario.apellido_paterno} {datosUsuario.apellido_materno}</p>
                </div>

                <nav className="MenuNavegacionAdmin-menu">
                    <button 
                        className="MenuNavegacionAdmin-menu-button" 
                        onClick={() => navigate('/pagina-reportes-admin')}
                    >
                        Reportes
                    </button>
                    <button 
                        className="MenuNavegacionAdmin-menu-button" 
                        onClick={() => navigate('/dashboard')}
                    >
                        Dashboard
                    </button>
                </nav>
            </aside>
            
            <div className="MenuNavegacionAdmin-content">
            </div>

            {notificacionesVisible && (
                <div className="modal-overlay" onClick={toggleNotificaciones}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        {/* Componente Notificaciones */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuNavegacionAdmin;
