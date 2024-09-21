import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import '../hojas-de-estilo/CodigoVerificacion.css';
import Button from '../componetes/Button';  // Asegúrate de que la ruta sea correcta

const CodigoVerificacion = () => {
  const [codigo, setCodigo] = useState(Array(6).fill(""));
  const navigate = useNavigate();  // Inicializa el hook de navegación

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;

    const newCodigo = [...codigo];
    newCodigo[index] = value;
    setCodigo(newCodigo);

    if (value !== "" && index < codigo.length - 1) {
      document.getElementById(`input-${index + 1}`).focus();
    }
  };

  const handleVerificar = () => {
    // Aquí puedes agregar lógica para verificar el código si lo deseas
    // Si todo es correcto, redirige a la página de éxito
    navigate('/registro-exitoso');  // Redirige a RegistroExitoso
  };

  return (
    <div className="verificacion-container">
      <h2 className="titulo-verificacion">¡Se ha enviado un código a tu correo!</h2>
      <div className="codigo-inputs">
        {codigo.map((num, index) => (
          <input
            key={index}
            id={`input-${index}`}
            type="text"
            maxLength="1"
            value={num}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className="codigo-input"
          />
        ))}
      </div>
      <Button texto="Verificar" onClick={handleVerificar} />  {/* Maneja el click para redirigir */}
    </div>
  );
}

export default CodigoVerificacion;
