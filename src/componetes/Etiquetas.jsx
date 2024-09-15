import React from "react";
import '../hojas-de-estilo/Etiquetas.css';  // Asegúrate de que la ruta del CSS sea correcta

function Etiquetas({ text }) {
    return (
        <form>
            <label id="etiquetastyle">{text}</label>
        </form>
    );
}

export default Etiquetas;
