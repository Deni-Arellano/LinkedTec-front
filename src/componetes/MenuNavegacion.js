import React, { useState } from 'react';
import '../hojas-de-estilo/MenuNavegacion.css';
import Button from './Button'; 
import Searchbar from './Searchbar'; 
import { VscAccount } from "react-icons/vsc"; 
import { AiFillAlert } from "react-icons/ai"; 
import { BiChat } from "react-icons/bi"; 
import logo from '../imagenes/Logo24.png';

const MenuNavegacion = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <div className="app">
            {/* Barra superior */}
            <header className="header">
                <img src={logo} alt="Logo" className="logo" />

                {/* Componente Searchbar */}
                <div className="search">
                    <Searchbar />
                </div>

                <div className="icons">
                    <BiChat className="icon" /> 
                    <AiFillAlert className="icon" /> 
                    <VscAccount className="icon" /> 
                </div>
                
            </header>
            
            {/* Menú lateral */}
            <aside className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
                <div className="profile">
                    <img src="ruta/de/imagen-de-perfil.jpg" alt="Perfil" className="profile-pic" /> 
                    <p className="profile-name">Guisselle Iñiguez</p>
                </div>

                <nav className="menu">
                    <button className="menu-button">Noticias</button>
                    <button className="menu-button">Empleos</button>
                    <button className="menu-button">Publicaciones</button>
                </nav>
            </aside>
        </div>
    );
};

export default MenuNavegacion;
