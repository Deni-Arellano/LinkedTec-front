import React from "react";
import './text-area.css';

function Textarea({ id, placeholder, rows = 4, cols = 50, value, onChange }) {
    return (
        <div className="cajadetexto-form">
            <textarea
                id={id}
                placeholder={placeholder}
                rows={rows}
                cols={cols}
                className="contenidostyle"
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default Textarea;
