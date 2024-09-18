import React from 'react';
import '../hojas-de-estilo/MenuNavegacion.css';
import Searchbar from './Searchbar'; // Importa el componente Searchbar
import { VscAccount } from "react-icons/vsc"; 
import { AiFillAlert } from "react-icons/ai"; 
import { BiChat } from "react-icons/bi"; 
import logo from '../imagenes/Logo24.png';

const BarraSuperior = () => {
    return (
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
    );
};

export default BarraSuperior;
