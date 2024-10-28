import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion'; 
import PostulacionUsuario from '../../components/componente-postulacion-usuario/Postulacion-usuario'; 
import './PaginaPostulacionesUsuario.css'; 
import { usuarioContext } from '../../App';
import axios from 'axios';
import Swal from 'sweetalert2';

const PaginasPostulacionesUsuario = () => {
    const navigate = useNavigate();
    const { usuarioLog } = useContext(usuarioContext);
    const [datosPostulaciones, setDatosPostulaciones] = useState([]);
    const [componentesPostulaciones, setComponentesPostulaciones] = useState([]); 

    // Obtiene todas las postulaciones del usuario con id 5
    const getPostulaciones = async () => {
        try {
            // Solo obtén postulaciones del usuario con id 5
            const response = await axios.get('http://localhost:3000/postulaciones/5?pagina=1&limite=10');
            console.log('Postulaciones:', response.data); // Verifica qué datos obtienes aquí
            setDatosPostulaciones(response.data); // Guarda los datos específicos de este usuario
        } catch (err) {
            console.error('Error al obtener las postulaciones:', err);
        }
    };

    // Obtiene los datos de un usuario por su id, en este caso id 5
    const getUsuarios = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/usuarios/${id}`);
            console.log('Usuario:', response.data); // Verifica los datos del usuario
            return [response.data.nombre, response.data.apellido_paterno, response.data.apellido_materno, response.data.imagen_usuario, response.data.role];
        } catch (err) {
            console.error('Error al obtener el usuario:', err);
            return [];
        }
    };

    // Obtiene los datos de las postulaciones al cargar la página
    useEffect(() => {
        getPostulaciones();
    }, []);

    // Genera los componentes para cada postulación
    useEffect(() => {
        const generarComponentesPostulaciones = async () => {
            const componentesPostulacionesPromises = datosPostulaciones.postulaciones.map(async (postulacion) => {
                // Solo muestra la postulación con id 1
                if (postulacion.id_postulacion === 1) {
                    const datosUsuario = await getUsuarios(postulacion.id_usuario); 

                    return (
                        <PostulacionUsuario
                            key={postulacion.id_postulacion}
                            datos={{
                                id_postulacion: postulacion.id_postulacion,
                                tituloEmpleo: postulacion.titulo,
                                empresa: postulacion.empresa,
                                salario: postulacion.salario,
                                descripcion: postulacion.descripcion,
                                ubicacion: postulacion.ubicacion,
                                nivelIngles: postulacion.nivel_de_ingles,
                                fotoPerfil: datosUsuario[3] || 'https://via.placeholder.com/100', 
                                nombreUsuario: `${datosUsuario[0] || ''} ${datosUsuario[1] || ''} ${datosUsuario[2] || ''}`
                            }}

                            onEliminar={id => {
                                setDatosPostulaciones(prevPostulaciones => ({
                                    ...prevPostulaciones,
                                    postulaciones: prevPostulaciones.postulaciones.filter(postulacion => postulacion.id_postulacion !== id)
                                }));
                            }}
                        />
                    );
                }
            });

            const componentes = await Promise.all(componentesPostulacionesPromises); 
            console.log('Componentes generados:', componentes); // Verifica si los componentes se generan
            setComponentesPostulaciones(componentes.filter(Boolean)); // Filtra valores nulos
        };

        if (datosPostulaciones && datosPostulaciones.postulaciones) {
            generarComponentesPostulaciones();
        }
        
    }, [datosPostulaciones]);

    return (
        <>
            <MenuNavegacion />
            <div className="PostulacionesUsuario-contenedor">
                {componentesPostulaciones.length > 0 ? (
                    componentesPostulaciones
                ) : (
                    <div className="mensaje-sin-postulaciones">
                        <p>No hay postulaciones disponibles</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default PaginasPostulacionesUsuario;
