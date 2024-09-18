import React from 'react';
import '../hojas-de-estilo/Button.css';  

const Button = ({ texto }) => {
  return (
    <button type="submit" className="btn">
      {texto}
    </button>
  );
};

export default Button;
