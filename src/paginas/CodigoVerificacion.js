import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../hojas-de-estilo/CodigoVerificacion.css';
import Button from '../componetes/Button';

const CodigoVerificacion = () => {
  const [codigo, setCodigo] = useState(Array(6).fill(""));  // Inicializa correctamente el estado
  const navigate = useNavigate();  // Inicializa el hook de navegación

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;

    const newCodigo = [...codigo];  // Se usa correctamente 'codigo'
    newCodigo[index] = value;
    setCodigo(newCodigo);  // Actualiza el estado con setCodigo

    if (value !== "" && index < codigo.length - 1) {
      document.getElementById(`input-${index + 1}`).focus();
    }
  };
  const handleVerificar = () => {
    navigate('/registro-exitoso');  
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
            maxLength="1"  // Solo permito un carácter por input.
            value={num}
            onChange={(e) => handleInputChange(index, e.target.value)}  // 'handleInputChange' está definido
       
          />
        ))}
      </div>
      <Button texto="Verificar" onClick={handleVerificar} /> 
    </div>
  );
}

export default CodigoVerificacion;
