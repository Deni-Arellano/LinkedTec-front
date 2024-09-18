import React from "react";
import '../hojas-de-estilo/Cajadetexto.css';

function textbox () {
    return (
        <form className="cajadetexto-form">
            <input id="contenidostyle" type="text" placeholder="Ingresar texto..."/>
        </form>
    );
}

export default textbox;