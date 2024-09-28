import React from 'react';
import '../hojas-de-estilo/DatosUsu_EsDoEg.css';
import { FaEnvelope, FaPhone, FaBirthdayCake, FaBriefcase, FaVenusMars } from 'react-icons/fa';  // Añadimos el icono de sexo

const DatosUsu_EsDoRec = () => {
    return (
        <div className="perfil-cuadro">
            <p><FaBriefcase className="icono"/> <strong>Carrera:</strong> Ingeniería en Sistemas</p>
            <p><strong>Biografía:</strong></p>
            <p className="biografia">zzzzzzzzzzzzzzzzzzzzzzzzzz zzzzzzzzzzzzzzzzzzzzzzzzzzzzz zzzzzzzzzzzzzzzz zzzzzzzzzzzzzzzz zzzzzzzzzzzzzzzzzzzz  zzzzzzzzzzz zzzzzzzzzzzzzzzzzz</p>

            <p><FaEnvelope className="icono"/> <strong>Correo:</strong> <a href="mailto:correo@gmail.com">correo@gmail.com</a></p>
            <p><FaPhone className="icono"/> <strong>Teléfono:</strong> +52 123456789</p>
            <p><FaBirthdayCake className="icono"/> <strong>Fecha de Nacimiento:</strong> 01/01/2060</p>
            <p><FaVenusMars className="icono"/> <strong>Sexo:</strong> Femenino</p> {/* Aquí incluimos el nuevo campo */}
        </div>
    );
}

export default DatosUsu_EsDoRec;
