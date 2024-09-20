import React, { useState } from "react";
import '../hojas-de-estilo/CodigoVerificacion.css'; // Ruta corregida para los estilos
import Button from '../componetes/Button'; // Asegúrate de que la ruta sea correcta

const CodigoVerificacion = () => {
  const [codigo, setCodigo] = useState(Array(6).fill(""));

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;

    const newCodigo = [...codigo];
    newCodigo[index] = value;
    setCodigo(newCodigo);

    if (value !== "" && index < codigo.length - 1) {
      document.getElementById(`input-${index + 1}`).focus();
    }
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
      {/* Aquí usamos tu componente Button */}
      <Button texto="Verificar" />
    </div>
  );
};

export default CodigoVerificacion;
