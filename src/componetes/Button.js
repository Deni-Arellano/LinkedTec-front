import React from 'react';
import '../hojas-de-estilo/Button.css';  // Ruta corregida

const Button = ({ onClick, label }) => {
    return (
        <button className="custom-button" onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;
