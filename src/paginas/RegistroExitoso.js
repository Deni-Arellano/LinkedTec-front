import React from 'react';
import Button from '../componetes/Button'; // Asegúrate de que la ruta esté correcta
import '../hojas-de-estilo/RegistroExitoso.css';  // Asegúrate de que el archivo de estilos esté en la ruta correcta
import { useNavigate } from 'react-router-dom';

const RegistroExitoso = () => {
  const navigate = useNavigate(); 
  const handleNavigate = () => {
    console.log("Navegando a /Login");
    navigate('/publi-usuarios'); 
  };
  return (
    <div className="registro-exitoso-container">
      <h2>¡Registro Exitoso!</h2>
      <p>Gracias por registrarte. Ahora puedes acceder a todas las funcionalidades de LinkedTec.</p>
      <Button texto="Ingresar" onClick={handleNavigate}/>
    </div>
  );
}

export default RegistroExitoso;
