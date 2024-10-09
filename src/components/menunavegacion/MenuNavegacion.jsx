import React, { useState, useContext, useEffect } from 'react';
import './MenuNavegacion.css';
import Searchbar from '../../components/componente-searchbar/SearchBar';
import { VscAccount } from "react-icons/vsc";
import { AiFillAlert } from "react-icons/ai";
import { BiChat } from "react-icons/bi";
import logo from '../../assets/Logo24.png';
import { useNavigate } from 'react-router-dom';
import {usuarioContext} from '../../App';
import Axios from 'axios';

const MenuNavegacion = () => {
    const [sidebarVisible] = useState(false);
    const {usuarioLog, setUsuarioLog} = useContext(usuarioContext);
    const [datosUsuario, setDatosUsuario] = useState('');
    
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener los datos del usuario logeado
        const getUsuario = async () => {
            try {
                const response = await Axios.get(`http://localhost:3000/usuarios/${usuarioLog}`);
                console.log("Servidor dice", response.data);
                setDatosUsuario(response.data);
            } catch (err) {
                console.error('Error al obtener el usuario:', err);
            }
        };

       
        if (usuarioLog) {
            getUsuario();
        }
    }, [usuarioLog]); 

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
                    <button className="MenuNavegacion-icon-button">
                        <AiFillAlert className="MenuNavegacion-icon" />
                    </button>
                    <button className="MenuNavegacion-icon-button" onClick={() => navigate('/Perfil')}>
                        <VscAccount className="MenuNavegacion-icon" />
                    </button>
                </div>
            </header>
            
            <aside className={`MenuNavegacion-sidebar ${sidebarVisible ? 'MenuNavegacion-visible' : ''}`}>
                <div className="MenuNavegacion-perfil">
                    <img src="https://via.placeholder.com/100" alt="Perfil" className="MenuNavegacion-foto-perfil" />
                    <p className="MenuNavegacion-usuario-publicacion-empleo">{datosUsuario.nombre + " " + datosUsuario.apellido_paterno + " " + datosUsuario.apellido_materno}</p>
                </div>

                <nav className="MenuNavegacion-menu">
                    <button className="MenuNavegacion-menu-button">Noticias</button>
                    <button className="MenuNavegacion-menu-button" onClick={() => navigate('/publicacion-empleo')}>Empleos</button>
                    <button className="MenuNavegacion-menu-button" onClick={() => navigate('/publi-usuarios')}>Publicaciones</button>
                    <button className="MenuNavegacion-menu-button">Foro</button>
                </nav>
            </aside>
            
            <div className="MenuNavegacion-content">
                {/* Aquí va el contenido */}
            </div>
        </div>
    );
};

export default MenuNavegacion;
