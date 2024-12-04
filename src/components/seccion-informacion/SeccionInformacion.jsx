import React from 'react';
import './SeccionInformacion.css';  // Asegúrate de tener estilos adecuados
import TargetaInformacion from '../targeta-informacion/TargetaInformacion';

const SeccionInformacion = ({ nombreSeccion, datosSeccion }) => {
    if (!datosSeccion || Object.keys(datosSeccion).length === 0) {
        return <p>No hay datos disponibles.</p>;
    }

    // Definir un icono por defecto
    const defaultIcon = "📊";  // Puedes cambiar el icono aquí si es necesario

    return (
        <div className="seccion-informacion">
            <h3>{nombreSeccion}</h3>
            <div className="info-cards">
                {/* Iteramos sobre los datos y mostramos las tarjetas dinámicamente */}
                {Object.entries(datosSeccion).map(([key, value]) => (
                    <TargetaInformacion
                        key={key}
                        icon={defaultIcon}  // Usamos el icono por defecto
                        title={key}  // Usamos la clave del objeto como título
                        value={value}  // Usamos el valor del objeto como valor
                    />
                ))}
            </div>
        </div>
    );
};

export default SeccionInformacion;
