import React from 'react';
import '../hojas-de-estilo/Menu-navegacion.css';
import Searchbar from '../componetes/Searchbar';  // Asegúrate de que la ruta sea correcta
import { VscAccount } from "react-icons/vsc";  // Ícono de cuenta
import { AiFillAlert } from "react-icons/ai";  // Ícono de alerta
import { BiChat } from "react-icons/bi";       // Ícono de chat
import logo from '../imagenes/Logo24.png';     // Ruta de tu logo

const BarraSuperior = () => {
    return (
        <header className="header">
            <img src={logo} alt="Logo" className="logo" />

            {/* Barra de búsqueda */}
            <div className="search">
                <Searchbar />
            </div>

            {/* Íconos a la derecha */}
            <div className="icons">
                <BiChat className="icon" />     {/* Icono de chat */}
                <AiFillAlert className="icon" />  {/* Icono de alerta */}
                <VscAccount className="icon" />   {/* Icono de cuenta */}
            </div>
        </header>
    );
};

export default BarraSuperior;
