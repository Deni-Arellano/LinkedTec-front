import React from 'react';
import './Boton.css';  

const Button = ({ texto, onClick }) => {
  return (
    <button type="submit" className="btn" onClick={onClick}>
      {texto}
    </button>
  );
};

export default Button;
