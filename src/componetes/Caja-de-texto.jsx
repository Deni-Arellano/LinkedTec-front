import React from "react";
import '../hojas-de-estilo/Cajadetexto.css';  // Asegúrate de que la ruta del CSS sea correcta

function CajaDeTexto() {
    return (
        <form className="cajadetexto-form">
            <input id="contenidostyle" type="text" placeholder="Ingresa tu texto..." />
        </form>
    );
}

export default CajaDeTexto;
