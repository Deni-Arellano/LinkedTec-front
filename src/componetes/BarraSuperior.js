import React from 'react';
import '../estilos/MenuNavegacion.css'; // Usamos los mismos estilos
import { VscAccount } from "react-icons/vsc";
import { AiFillAlert } from "react-icons/ai";
import { BiChat } from "react-icons/bi";

const BarraSuperior = () => {
    return (
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
        </header>
    );
};

export default BarraSuperior;
