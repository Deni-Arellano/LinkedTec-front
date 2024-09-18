import React from "react";
import '../hojas-de-estilo/Etiquetas.css';  // Asegúrate de que el CSS esté correctamente importado

function Label({ htmlFor, text }) {
    return (
        <label htmlFor={htmlFor} className="etiquetastyle">
            {text}
        </label>
    );
}

export default Label;
