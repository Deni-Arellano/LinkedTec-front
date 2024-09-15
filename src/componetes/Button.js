import React from 'react';
import '../hojas-de-estilo/Button.css';  // Asegúrate de que el archivo CSS esté en la ruta correcta

const Button = ({ texto }) => {
  return (
    <button type="submit" className="btn">
      {texto}
    </button>
  );
};

export default Button;
