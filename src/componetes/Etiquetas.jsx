import React from 'react';
import '../hojas-de-estilo/Etiquetas.css';

const Etiquetas = ({ tamano, texto, id }) => {
    return (
        <label
            className="etiqueta"
            style={{ fontSize: `${tamano}px` }}
            id={id}
        >
            {texto}
        </label>
    );
};

export default Etiquetas;