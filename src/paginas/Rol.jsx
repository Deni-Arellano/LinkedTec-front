import React from 'react';
import RadioButtons from '../componetes/Radio-button';    
import Button from '../componetes/Button';
import '../Diseño-de-paginas/Rol.css';
import logo from '../imagenes/Logo24.png';

const Pagina = () => {

  const handleNext = () => {
    alert('Has hecho clic en "Siguiente"');
  };

  const handleBack = () => {
    alert('Has hecho clic en "Atrás"');
  };

  const opcionesRol = [
    { value: 'admin', label: 'Administrador' },
    { value: 'user', label: 'Usuario' },
    { value: 'guest', label: 'Invitado' }
  ];

  return (
    <div className="contenedor-pagina">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="main-content">
        <h1>Definir Rol</h1>
        
        <div className="radio-group">
          <RadioButtons 
            label="Selecciona tu rol" 
            name="rol" 
            options={opcionesRol} 
          />
        </div>

        <div className="botones">
          <Button label="Atrás" onClick={handleBack} />
          <Button label="Siguiente" onClick={handleNext} />
        </div>
      </main>
    </div>
  );
};

export default Pagina;
