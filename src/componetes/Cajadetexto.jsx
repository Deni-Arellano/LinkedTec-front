import React from "react";
import '../hojas-de-estilo/Caja-de-texto.css'; // Asegúrate de que la ruta sea correcta

function Textbox({ id, placeholder, type = "text" }) {
    return (
        <div className="cajadetexto-form">
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                className="contenidostyle"
            />
        </div>
    );
}

export default Textbox;
