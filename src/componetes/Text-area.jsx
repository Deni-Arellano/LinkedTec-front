import React from "react";
import '../hojas-de-estilo/Text-area.css';

function Textarea({ id, placeholder, rows = 4, cols = 50 }) {
    return (
        <div className="cajadetexto-form">
            <textarea
                id={id}
                placeholder={placeholder}
                rows={rows}
                cols={cols}
                className="contenidostyle"
            />
        </div>
    );
}

export default Textarea;
