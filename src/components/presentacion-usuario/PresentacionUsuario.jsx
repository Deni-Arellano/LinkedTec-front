import React from 'react';
import './PresentacionUsuario.css'; 
import BotonSeguidos from '../boton-seguidos/BotonSeguidos'; 
const FotoNombre = ({datos, usuariosSeguidos}) => {
    
    return (
        <div className="nombre-usuario">
            <img src={datos.foto} alt="Foto de perfil" className="foto-perfil"/>
            <div className="info-usuario">
                <h2>{datos.nombre}</h2>
                <p className="carrera">{datos.role}</p>
                <BotonSeguidos numSeguidos={usuariosSeguidos.total} datosSeguidos={usuariosSeguidos}/>
            </div>
        </div>
    );
}

export default FotoNombre;
