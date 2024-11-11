import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import { usuarioContext } from '../../App';
import Swal from 'sweetalert2';
import SugerenciasUsuario from '../../components/SugerenciasUsuarioChat/SugerenciasUsuario.jsx';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion';
import './NuevoMensaje.css';

const NuevoMensaje = () => {
    const { usuarioLog } = useContext(usuarioContext);
    const navigate = useNavigate();
    const [usuarioBuscado, setUsuarioBuscado] = useState('');

    const handleBackClick = () => {
        console.log('Botón atrás clicado');
        navigate('/mensajes');
    };

    const [usuarios, setUsuarios] = useState([]);
    

    //Obtener los datos del usuario logeado
    const getUsuario = async () => {
        try {
            const response = await Axios.get(`http://localhost:3000/usuarios/`); 
            //Guardamos el nombre, apellido_paterno, apellido_materno y foto de cada usuario en la plataforma
            const datosUsuarios = [];
                
                for (let i = 0; i < response.data.length; i++) {
                    const usuario = response.data[i];
                    
                    datosUsuarios.push({
                        id: usuario.id,
                        nombre: usuario.nombre + ' ' + usuario.apellido_paterno + ' ' + usuario.apellido_materno,
                        foto: usuario.imagen_usuario || 'https://www.w3schools.com/howto/img_avatar.png', // Foto predeterminada si no tiene foto
                    });
                }
            setUsuarios(datosUsuarios);
            
        } catch (err) {
            console.error('Error al obtener el usuario:', err);
        }
    };

    useEffect(() => {
        getUsuario();
    }, []);

    const usuariosFiltrados = usuarios.filter((usuario) => {
        const nombreSinAcentos = usuario.nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        const busquedaSinAcentos = usuarioBuscado.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    
        return nombreSinAcentos.includes(busquedaSinAcentos);
    });
    

    return (
        <>
            <MenuNavegacion />
            <div className='nuevo-mensaje-contenedor-pagina'>
                <div className='nuevo-mensaje-contenedor-busqueda'>
                    <div className='nuevo-mensaje-busqueda-usuario'>
                        <span>Para:</span>
                        <input 
                        type='text' 
                        placeholder='Buscar usuario...'
                        value={usuarioBuscado}
                        onChange={(e) => setUsuarioBuscado(e.target.value)}
                         />
                    </div>

                    <div className='nuevo-mensaje-boton-atras'>
                        <button onClick={handleBackClick}>Atrás</button>
                    </div>


                </div>
                {usuariosFiltrados.map((usuario) => (
    
                    <SugerenciasUsuario
                        key={usuario.id}
                        datosChat={usuario}
                    />
                ))}
            </div>


        </>
    );
};

export default NuevoMensaje;
