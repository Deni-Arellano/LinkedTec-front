import React from 'react';
import Button from '../componetes/Button';  // Ruta ajustada
import '../hojas-de-estilo/RegistroExitoso.css';

function RegistroExitoso() {
  return (
    <div className="registro-exitoso-container">
      <h1>Registro Exitoso</h1>
      <p>Tu cuenta ha sido creada con éxito.</p>
      <Button texto="Ir al Inicio" />
    </div>
  );
}

export default RegistroExitoso;
