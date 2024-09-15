import React, { useState } from 'react';
import '../estilos/MenuNavegacion.css'; 
import { VscAccount } from "react-icons/vsc"; 
import { AiFillAlert } from "react-icons/ai"; 
import { BiChat } from "react-icons/bi"; 

const MenuNavegacion = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <div className="app">
            <header className="header">
                <img src="../imagenes/Logo24.png" alt="Logo" className="logo" /> 

                <div className="search">
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="search-input"
                    />
                </div>
                <div className="icons">
                    <BiChat className="icon" /> 
                    <AiFillAlert className="icon" /> 
                    <VscAccount className="icon" /> 
                </div>
                <button className="mobile-menu-button" onClick={toggleSidebar}>
                    ☰
                </button>
            </header>
            <aside className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
                <div className="profile">
                    <VscAccount className="profile-pic" /> 
                    <p className="profile-name">Guisselle Iñiguez</p>
                </div>

                <nav className="menu">
                    <button className="menu-button">Noticias</button>
                    <button className="menu-button">Empleos</button>
                    <button className="menu-button">Foros</button>
                </nav>
            </aside>
            <main className="content">
                <h1>Bienvenido</h1>
                <p>Aquí va el portal</p>
            </main>
        </div>
    );
};

export default MenuNavegacion;
