import React from 'react';
import '../hojas-de-estilo/Button.css'; // Asegúrate de que la ruta sea correcta

const Button = ({ onClick, label }) => {
    return (
        <button className="custom-button" onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;
s