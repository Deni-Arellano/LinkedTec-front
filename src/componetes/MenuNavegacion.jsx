import React, { useState } from 'react';
import '../hojas-de-estilo/MenuNavegacion.css';
import Searchbar from './Searchbar';
import { VscAccount } from "react-icons/vsc";
import { AiFillAlert } from "react-icons/ai";
import { BiChat } from "react-icons/bi";
import logo from '../imagenes/Logo24.png';
import { useNavigate } from 'react-router-dom';

const MenuNavegacion = () => {
    const [sidebarVisible] = useState(false);
    const navigate = useNavigate();

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
                    <p className="MenuNavegacion-usuario-publicacion-empleo">Guisselle Iñiguez</p>
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
