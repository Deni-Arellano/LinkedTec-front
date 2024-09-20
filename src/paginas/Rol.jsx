import React from 'react';
import RadioButtons from '../componetes/Radio_buton.jsx';    
import Button from '../componetes/Button.jsx';
import '../hojas-de-estilo/Rol.css';
import logo from '../imagenes/Logo24.png';

const Pagina = () => {

  const handleNext = () => {
    alert('Has hecho clic en "Siguiente"');
  };

  const handleBack = () => {
    alert('Has hecho clic en "Atrás"');
  };

  const opcionesRol = [
    { value: 'admin', label: 'Estudiante' },
    { value: 'user', label: 'Docente' },
    { value: 'guest', label: 'Reclutador' },
    { value: 'guest', label: 'Egresado' }
  ];

  return (
    <div className="contenedor-pagina">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="main-content">
        
        
        <div className="radio-group">
          <RadioButtons 
            label="Selecciona tu rol"
            name="rol" 
            options={opcionesRol} 
          />
        </div>

        <div className="botones">
          <Button texto="Atrás" onClick={handleBack} />
          <Button texto="Siguiente" onClick={handleNext} />
        </div>
      </main>
    </div>
  );
};

export default Pagina;
