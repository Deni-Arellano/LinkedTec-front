import React from "react";
import '../hojas-de-estilo/Caja-de-texto.css';  // Asegúrate de que la ruta del CSS sea correcta

function CajaDeTexto() {
    return (
        <form className="cajadetexto-form">
            <input id="contenidostyle" type="text" />  {/* Aquí eliminamos el placeholder */}
        </form>
    );
}

export default CajaDeTexto;
