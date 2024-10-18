import React from "react";
import './CajaDeTexto.css';

function Textbox({ id, placeholder, type = "text", value, onChange }) {
    return (
        <div className="cajadetexto-form">
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="contenidostyle"  
            />
        </div>
    );
}


export default Textbox;
