import React from 'react';
import './TargetaInformacion.css'; // Archivo para estilos

const TargetaInformacion = ({ icon, title, value }) => {
    return (
        <div className="info-card">
            <div className="info-card-icon">{icon}</div>
            <div className="info-card-info">
                <h3 className="info-card-title">{title}</h3>
                <p className="info-card-value">{value}</p>
            </div>
        </div>
    );
};

export default TargetaInformacion;
