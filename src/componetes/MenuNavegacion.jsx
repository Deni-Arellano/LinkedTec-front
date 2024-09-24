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
        <div className="menu-navegacion app">
            {/* Barra superior */}
            <header className="header">
                <img 
                    src={logo} 
                    alt="Logo" 
                    className="logo" // Cambiado de "logo-Menu" a "logo"
                    onClick={() => navigate('/')} 
                    style={{ cursor: 'pointer' }}
                />

                <div className="search">
                    <Searchbar />
                </div>

                <div className="icons">
                    <button className="icon-button">
                        <BiChat className="icon" />
                    </button>
                    <button className="icon-button">
                        <AiFillAlert className="icon" />
                    </button>
                    <button className="icon-button" onClick={() => navigate('/Perfil')}>
                        <VscAccount className="icon" />
                    </button>
                </div>
            </header>
            
            <aside className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
                <div className="perfil"> {/* Cambiado de "profile" a "perfil" */}
                    <img src="https://via.placeholder.com/100" alt="Perfil" className="foto-perfil" /> {/* Cambiado de "profile-pic" a "foto-perfil" */}
                    <p className="usuario-publicacion-empleo">Guisselle Iñiguez</p> {/* Cambiado de "profile-name" a "usuario-publicacion-empleo" */}
                </div>

                <nav className="menu">
                    <button className="menu-button">Noticias</button>
                    <button className="menu-button" onClick={() => navigate('/publicacion-empleo')}>Empleos</button>
                    <button className="menu-button" onClick={() => navigate('/publi-usuarios')}>Publicaciones</button>
                    <button className="menu-button">Foro</button>
                </nav>
            </aside>
            
            <div className="content">
                {/* Aquí va el contenido */}
            </div>
        </div>
    );
};

export default MenuNavegacion;
