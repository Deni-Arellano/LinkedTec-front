import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../hojas-de-estilo/CodigoVerificacion.css';
import Button from '../componetes/Button';

const CodigoVerificacion = () => {
  const [codigo, setCodigo] = useState(Array(6).fill(""));  // Inicializo un array vacío con 6 posiciones
  const navigate = useNavigate();  // Para la navegación entre páginas

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;  // Evito que se ingrese más de un carácter

    const newCodigo = [...codigo];  // Hago una copia del array
    newCodigo[index] = value;  // Actualizo el valor en el índice específico
    setCodigo(newCodigo);  // Actualizo el estado con el nuevo array

    // Si el valor no está vacío y no es el último input, muevo el foco al siguiente input
    if (value !== "" && index < codigo.length - 1) {
      document.getElementById(`input-${index + 1}`).focus();
    }
  };

  const handleVerificar = () => {
    // Navego a la página de éxito de registro
    navigate('/registro-exitoso');
  };

  return (
    <div className="CodigoVerificacion-verificacion-container">
      <h2 className="CodigoVerificacion-titulo-verificacion">¡Se ha enviado un código a tu correo!</h2>
      <div className="CodigoVerificacion-codigo-inputs">
        {codigo.map((num, index) => (
          <input
            key={index}
            id={`input-${index}`}
            type="text"
            maxLength="1"  // Solo permito un carácter por input.
            value={num}
            onChange={(e) => handleInputChange(index, e.target.value)}  // Manejo el cambio del input
            className="CodigoVerificacion-codigo-input"
          />
        ))}
      </div>
      <Button texto="Verificar" onClick={handleVerificar} className="CodigoVerificacion-btn" />
    </div>
  );
}

export default CodigoVerificacion;
