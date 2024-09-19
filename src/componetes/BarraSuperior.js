import React from 'react';
import { BiChat } from 'react-icons/bi';
import { AiFillAlert } from 'react-icons/ai';
import { VscAccount } from 'react-icons/vsc';
import Searchbar from './Searchbar';  // Asegúrate de que la ruta sea correcta
import logo from '../imagenes/Logo24.png';  // Ruta correcta para el logo

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
