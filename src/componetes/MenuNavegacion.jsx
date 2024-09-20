import React, { useState } from 'react';
import '../hojas-de-estilo/MenuNavegacion.css';
import Searchbar from './Searchbar'; 
import { VscAccount } from "react-icons/vsc"; 
import { AiFillAlert } from "react-icons/ai"; 
import { BiChat } from "react-icons/bi"; 
import logo from '../imagenes/Logo24.png';

const MenuNavegacion = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    return (
        <div className="app">
            {/* Barra superior */}
            <header className="header">
                <img src={logo} alt="Logo" className="logo" />

                <div className="search">
                    <Searchbar />
                </div>

                <div className="icons">
                    {/* Iconos como botones */}
                    <button className="icon-button">
                        <BiChat className="icon" />
                    </button>
                    <button className="icon-button">
                        <AiFillAlert className="icon" />
                    </button>
                    <button className="icon-button">
                        <VscAccount className="icon" />
                    </button>
                </div>
            </header>
            
            {/* Menú lateral */}
            <aside className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
                <div className="profile">
                    <img src="https://via.placeholder.com/100" alt="Perfil" className="profile-pic" />
                    <p className="profile-name">Guisselle Iñiguez</p>
                </div>

                <nav className="menu">
                    <button className="menu-button">Noticias</button>
                    <button className="menu-button">Empleos</button>
                    <button className="menu-button">Publicaciones</button>
                    <button className="menu-button">Foro</button>
                </nav>
            </aside>
            
            {/* Contenido principal */}
            <div className="content">
                {/* Aquí va el contenido */}
            </div>
        </div>
    );
};

export default MenuNavegacion;
