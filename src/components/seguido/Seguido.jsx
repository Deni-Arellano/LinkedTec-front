import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Seguido.css';

const Seguido = ({ datosUsuario }) => {
    const navigate = useNavigate();

    const defaultChat = {
        id: 0,
        nombre: 'Desconocido',
        foto: 'https://www.w3schools.com/howto/img_avatar.png',
        rol: 'Desconocido'
    };

    //Funcion para convertir el rol a singular
    const convertirRolASingular = (rol) => {
        const rolesEnPlural = {
            Estudiantes: 'Estudiante',
            Docentes: 'Docente',
            Reclutadores: 'Reclutador',
            Egresados: 'Egresado'
        };

        return rolesEnPlural[rol] || rol;
    };

    const { id, nombre, foto, rol } = datosUsuario || defaultChat;

    const manejarClick = () => {
        console.log('Se hizo clic en un usuario seguido');//FALTA LA FUNCIONALIDAD DE MANEJAR AL PERFIL DEL USUARIO
        console.log(id);
        navigate(`/Perfil`, { state: { id_usuario_externo: id }, key: id });
    };

    return (
        <div className='sugerencia-chat-usuario' onClick={manejarClick}>
            <div className='sugerencia-chat-usuario-foto'>
                <img src={foto} alt='foto' />
            </div>
            <div className='sugerencia-chat-usuario-info'>
                <h3 className='sugerencia-chat-usuario-nombre'>{nombre}</h3>
                <p className='sugerencia-chat-usuario-rol'>{convertirRolASingular(rol)}</p>
            </div>
        </div>
    );
};

export default Seguido;
