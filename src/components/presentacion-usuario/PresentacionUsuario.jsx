import React from 'react';
import './PresentacionUsuario.css'; 
import BotonSeguidos from '../boton-seguidos/BotonSeguidos'; 
import BotonSeguir from '../../components/boton-seguimiento-en-perfil/BotonSeguirPerfil';
import { useContext } from 'react';
import {usuarioContext} from '../../App';
const FotoNombre = ({datos, usuariosSeguidos, id_usuario}) => {
    const {usuarioLog} = useContext(usuarioContext);//Este es el usuario Loggeado
    //NOTA id_usuario es el id del usuario que vas a seguir
    return (
        <div className="nombre-usuario-presentacion-usuario">
            <img src={datos.foto} alt="Foto de perfil" className="foto-perfil-presentacion-usuario"/>
            <div className="info-usuario-presentacion-usuario">
                <h2>{datos.nombre}</h2>
                <p className="role-presentacion-usuario">{datos.role}</p>
                <div className='botones-seguimiento-presentacion-usuario-presentacion-usuario'>{usuarioLog != id_usuario ? (
                    <BotonSeguir />
                ) : null}
                    <BotonSeguidos numSeguidos={usuariosSeguidos.total} datosSeguidos={usuariosSeguidos} id_usuario={id_usuario} />
                </div>
                
                
            </div>
        </div>
    );
}

export default FotoNombre;
