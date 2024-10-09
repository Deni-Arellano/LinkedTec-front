import React from 'react';
import Button from '../../componetes/Button'; // Asegúrate de que la ruta esté correcta
import './registro-exitoso.css';  // Asegúrate de que el archivo de estilos esté en la ruta correcta
import { useNavigate } from 'react-router-dom';

const RegistroExitoso = () => {
  const navigate = useNavigate(); 
  const handleNavigate = () => {
    console.log("Navegando a /Publicaiones");
    navigate('/publicaciones'); 
  };
  return (
    <div className="RegistroExitoso-container">
      <h2 className="RegistroExitoso-h2">¡Registro Exitoso!</h2>
      <p className="RegistroExitoso-p">Gracias por registrarte. Ahora puedes acceder a todas las funcionalidades de LinkedTec.</p>
      <Button className="RegistroExitoso-boton-exito" texto="Ingresar" onClick={handleNavigate} />
    </div>
  );
}

export default RegistroExitoso;
