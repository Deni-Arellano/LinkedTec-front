import React from "react";
import '../hojas-de-estilo/Etiquetas.css';

function Label({ text }) {
    return (
        <form>
            <label id="etiquetastyle">{text}</label>
            {/* Esto en main se usa para editar el texto
            <Etiq text='Texto para editar'/> */}
        </form>
    );
}

export default Label;