import React from 'react';
import '../hojas-de-estilo/RegistroExitoso.css';  // Asegúrate de que el archivo de estilos esté en la ruta correcta

const RegistroExitoso = () => {
  return (
    <div className="registro-exitoso-container">
      <h2>¡Registro Exitoso!</h2>
      <p>Gracias por registrarte. Ahora puedes acceder a todas las funcionalidades de LinkedTec.</p>
      <button className="boton-exito" onClick={() => window.location.href = "/login"}>Ir al Login</button>
    </div>
  );
}

export default RegistroExitoso;
