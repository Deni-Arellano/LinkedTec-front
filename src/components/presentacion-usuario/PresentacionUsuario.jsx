import React from 'react';
import './PresentacionUsuario.css'; 
import BotonSeguidos from '../boton-seguidos/BotonSeguidos'; 
import { useContext } from 'react';
import {usuarioContext} from '../../App';
const FotoNombre = ({datos, usuariosSeguidos, id_usuario}) => {
    const {usuarioLog} = useContext(usuarioContext);

    return (
        <div className="nombre-usuario">
            <img src={datos.foto} alt="Foto de perfil" className="foto-perfil"/>
            <div className="info-usuario">
                <h2>{datos.nombre}</h2>
                <p className="carrera">{datos.role}</p>
                {usuarioLog!=id_usuario?(
                    <button>Seguir de prueba</button>
                ):null} 
                <BotonSeguidos numSeguidos={usuariosSeguidos.total} datosSeguidos={usuariosSeguidos} id_usuario={id_usuario}/>
                
            </div>
        </div>
    );
}

export default FotoNombre;
