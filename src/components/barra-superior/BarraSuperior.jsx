import React from 'react';
import { BiChat } from 'react-icons/bi';
import { AiFillAlert } from 'react-icons/ai';
import { VscAccount } from 'react-icons/vsc';
import Searchbar from '../../componetes/Searchbar';  // Asegúrate de que la ruta sea correcta
import logo from '../../assets/Logo24.png';  // Ruta correcta para el logo

const BarraSuperior = () => {
    return (
        <header className="barra-superior">
            <img src={logo} alt="Logo" className="barra-superior-logo" />

            {/* Barra de búsqueda */}
            <div className="barra-superior-busqueda">
                <Searchbar />
            </div>

            {/* Íconos a la derecha */}
            <div className="barra-superior-iconos">
                <BiChat className="barra-superior-icono" />     {/* Icono de chat */}
                <AiFillAlert className="barra-superior-icono" />  {/* Icono de alerta */}
                <VscAccount className="barra-superior-icono" />   {/* Icono de cuenta */}
            </div>
        </header>
    );
};

export default BarraSuperior;
