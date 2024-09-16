import React from 'react';
import BotonesRadio from '../componetes/Radio-button';
import '../hojas-de-estilo/Rol.css';
import logo from '../imagenes/Logo24.png';

const Pagina = () => {
  return (
    <div className="contenedor-pagina">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <main className="main-content">
        <h1>Definir Rol</h1>
        <BotonesRadio />
      </main>
    </div>
  );
};

export default Pagina;
