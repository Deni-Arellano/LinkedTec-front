import React from 'react';
import BotonesRadio from '../componetes/Radio-button';
import Button from '../componetes/Button';    
import '../Diseño-de-paginas/Rol.css';
import logo from '../imagenes/Logo24.png';

const Pagina = () => {

  const handleNext = () => {
    alert('Has hecho clic en "Siguiente"');
  };

  return (
    <div className="contenedor-pagina">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="main-content">
        <h1>Definir Rol</h1>
        
        <div className="radio-group">
          <BotonesRadio />
        </div>
        <Button label="Siguiente" onClick={handleNext} />
      </main>
    </div>
  );
};

export default Pagina;
