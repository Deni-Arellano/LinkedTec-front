import React, { useState } from 'react';
import '../hojas-de-estilo/Fecha.css';  // Ruta corregida

const Fecha = () => {
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    return (
        <div className="fecha-container">
            <label htmlFor="fecha-input" className="fecha-label">Selecciona una fecha:</label>
            <input
                type="date"
                id="fecha-input"
                value={selectedDate}
                onChange={handleDateChange}
                className="fecha-input"
            />
        </div>
    );
};

export default Fecha;
