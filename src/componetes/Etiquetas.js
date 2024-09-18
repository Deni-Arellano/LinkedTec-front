import React from 'react';

const Etiquetas = ({ tamano, texto }) => {
    const estilo = {
        fontSize: `${tamano}px`,
        fontWeight: 'bold',
        color: '#012a6f', // Asegúrate de que el color sea visible
        marginBottom: '10px',
    };

    return <label style={estilo}>{texto}</label>;
};

export default Etiquetas;
