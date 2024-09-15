import React from 'react';
import '../hojas-de-estilo/Button.css';  // Asegúrate de que la ruta del CSS sea correcta

const Button = ({ texto }) => {
  return (
    <button type="submit" className="btn">
      {texto}
    </button>
  );
};

export default Button;
