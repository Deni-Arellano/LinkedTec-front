import React, { useState, useRef, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import './CodigoVerificacion.css';
import Button from '../../components/componente-button/Button';
import { usuarioContext } from '../../App';


const CodigoVerificacion = () => {

  const { usuarioLog} = useContext(usuarioContext);
  //console.log("Usuario en verificacion: ", usuarioLog)
  const [codigo, setCodigo] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;

    const newCodigo = [...codigo];
    newCodigo[index] = value;
    setCodigo(newCodigo);

    if (value !== "" && index < codigo.length - 1) {
      inputsRef.current[index + 1].focus(); // Usa ref para enfocar el siguiente input
    }
  };

  const handleVerificar = () => {
    if (codigo.every(num => num !== "")) {
      navigate('/registro-exitoso');
    } else {
      alert("Por favor completa todos los campos.");
    }
  };

  return (
    <div className="CodigoVerificacion-verificacion-container">
      <h2 className="CodigoVerificacion-titulo-verificacion">¡Se ha enviado un código a tu correo!</h2>
      <div className="CodigoVerificacion-codigo-inputs">
        {codigo.map((num, index) => (
          <input
            key={index}
            ref={(el) => inputsRef.current[index] = el}  // Asigna la ref a cada input
            className="CodigoVerificacion-codigo-input"
            type="text"
            maxLength="1"
            value={num}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <Button texto="Verificar" onClick={handleVerificar} />
    </div>
  );
}

export default CodigoVerificacion;
