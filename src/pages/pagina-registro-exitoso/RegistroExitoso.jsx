import React from 'react';
<<<<<<< HEAD:src/paginas/RegistroExitoso.js
import Button from '../components/boton/Boton'; // Asegúrate de que la ruta esté correcta
import '../hojas-de-estilo/RegistroExitoso.css';  // Asegúrate de que el archivo de estilos esté en la ruta correcta
=======
import Button from '../../componetes/Button'; // Asegúrate de que la ruta esté correcta
import './RegistroExitoso.css';  // Asegúrate de que el archivo de estilos esté en la ruta correcta
>>>>>>> 8cb730ed57b0b12203837d233e53fc9c88d57a1d:src/pages/pagina-registro-exitoso/RegistroExitoso.jsx
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
