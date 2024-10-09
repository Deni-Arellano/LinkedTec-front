import React from 'react';
import './Etiquetas.css';

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