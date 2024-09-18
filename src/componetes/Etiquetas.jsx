import React from 'react';
import '../hojas-de-estilo/Etiquetas.css';

const Etiquetas = ({ tamano, texto }) => {
    return (
        <label
            className="etiqueta"
            style={{ fontSize: `${tamano}px` }}
        >
            {texto}
        </label>
    );
};

export default Etiquetas;