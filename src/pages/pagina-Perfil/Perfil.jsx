import React, { useContext, useState,useEffect } from 'react';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion'; 
import FotoNombre from '../../components/presentacion-usuario/PresentacionUsuario';
import DatosUsu_Rec from '../../components/cuadro-informacion-reclutador/DatosUsuarioReclutador';
import DatosUsu_EsDoEg from '../../components/cuadro-informacion-usuario/DatosUsuario';
import {usuarioContext} from '../../App';
import Axios from 'axios';
import MostrarPublicacion from '../../components/componente-mostrar-publicacion/MostrarPublicacion';

import {useLocation} from 'react-router-dom';
import './perfil.css';

const VisualizacionPerfil = () => {
    const {usuarioLog} = useContext(usuarioContext);

    //const usuarioLog = 5;
    const [datosUsuario, setDatosUsuario] = useState('');
    const [datosPerfil, setDatosPerfil] = useState('');
    const [datosEncabezado, setDatosEncabezado] = useState('')
    const [datosPublicaciones, setDatosPublicaciones] = useState([]);
    const [componentesPublicaciones, setComponentesPublicaciones] = useState([]);
    const urlApi = 'https://linked-back-production.up.railway.app/imagenes/'; //Completa la url para las imagenes
    const [usuariosSeguidos, setUsuariosSeguidos] = useState([]);

    const location = useLocation();
    const id_usuario_externo = location.state||{};
    const id_externo=id_usuario_externo.id_usuario_externo;
    
    const id_usuario = id_externo || usuarioLog;

   

    //Se ejacuta al cagar la pagina y obtiene los datos del usuario logeado
    useEffect(() => {
        //Obtener los datos del usuario logeado
        const getUsuario = async () => {
            try {
                const response = await Axios.get(`https://linked-back-production.up.railway.app/usuarios/${id_usuario}`);
                //console.log("Servidor dice")
                //console.log(response.data);
                setDatosUsuario(response.data);

            } catch (err) {
                console.error('Error al obtener el usuario:', err);
            }
        };
        getUsuario();
    }, [id_usuario]);

    //Actualiza los datos del perfil dependiendo su rol
    useEffect(() => {
        
        if (datosUsuario.role === 'Reclutadores') {
            setDatosPerfil({
                id: datosUsuario.id,
                biografia: datosUsuario.biografia,
                correo: datosUsuario.correo,
                telefono: datosUsuario.telefono,
                fecha: datosUsuario.fecha_nacimiento,
                sexo: datosUsuario.sexo,
                empresa: datosUsuario.nombre_empresa,
                giro: datosUsuario.giro,
                rol:'Reclutador'
            });
            //console.log("Datos del perfil");
            //console.log(datosPerfil);

        } else if (datosUsuario.role === 'Estudiantes') {
            setDatosPerfil({
                id: datosUsuario.id,
                carrera: datosUsuario.carrera,
                biografia: datosUsuario.biografia,
                correo: datosUsuario.correo,
                telefono: datosUsuario.telefono,
                fecha: datosUsuario.fecha_nacimiento,
                sexo: datosUsuario.sexo,
                rol:'Estudiante'
            });
            //console.log("Datos del perfil");
            //console.log(datosPerfil);
        }else if (datosUsuario.role === 'Egresados') {
            setDatosPerfil({
                id: datosUsuario.id,
                carrera: datosUsuario.carrera,
                biografia: datosUsuario.biografia,
                correo: datosUsuario.correo,
                telefono: datosUsuario.telefono,
                fecha: datosUsuario.fecha_nacimiento,
                sexo: datosUsuario.sexo,
                rol:'Egresado'
            });
            //console.log("Datos del perfil");
            //console.log(datosPerfil);
        } else {
            setDatosPerfil({
                id: datosUsuario.id,
                carrera: datosUsuario.academia,
                biografia: datosUsuario.biografia,
                correo: datosUsuario.correo,
                telefono: datosUsuario.telefono,
                fecha: datosUsuario.fecha_nacimiento,
                sexo: datosUsuario.sexo,
                rol:'Docente'
            });
            //console.log("Datos del perfil");
            //console.log(datosPerfil);
        }
        if (datosUsuario.role === 'Reclutadores') {
            setDatosEncabezado({
                id: datosUsuario.id,
                nombre: datosUsuario.nombre + " " + datosUsuario.apellido_paterno + " " + datosUsuario.apellido_materno,
                role: 'Reclutador',
                foto: datosUsuario.imagen_usuario

            });
        } else if (datosUsuario.role === 'Estudiantes') {
            setDatosEncabezado({
                id: datosUsuario.id,
                nombre: datosUsuario.nombre + " " + datosUsuario.apellido_paterno + " " + datosUsuario.apellido_materno,
                role: 'Estudiante',
                foto: datosUsuario.imagen_usuario
            });
        } else if (datosUsuario.role === 'Egresados') {
            setDatosEncabezado({
                id: datosUsuario.id,
                nombre: datosUsuario.nombre + " " + datosUsuario.apellido_paterno + " " + datosUsuario.apellido_materno,
                role: 'Egresado',
                foto: datosUsuario.imagen_usuario
            });
        }else if (datosUsuario.role === 'Docentes') {
            setDatosEncabezado({
                id: datosUsuario.id,
                nombre: datosUsuario.nombre + " " + datosUsuario.apellido_paterno + " " + datosUsuario.apellido_materno,
                role: 'Docente',
                foto: datosUsuario.imagen_usuario
            });
        } else {
            setDatosEncabezado({
                id: datosUsuario.id,
                nombre: datosUsuario.nombre + " " + datosUsuario.apellido_paterno + " " + datosUsuario.apellido_materno,
                role: 'Indefinido',
                foto: urlApi+datosUsuario.imagen_usuario
            });
        }


        
    }, [datosUsuario]);

    

    //Extrae todas las publicaciones que hizo el usuario
    useEffect(() => {
        const getPublicacionesUsu = async () => {
            try {
                const response = await Axios.get(`https://linked-back-production.up.railway.app/publicaciones/usuario/${id_usuario}`);
                setDatosPublicaciones(response.data.publicaciones);
                if (response.data.publicaciones && response.data.publicaciones.length > 0) {
                    setDatosPublicaciones(response.data.publicaciones);

                } else {
                    
                    setDatosPublicaciones([]);
                    console.log("No se encontraron publicaciones para este usuario.");
                    
                }
            } catch (err) {
                console.error('Error al obtener las publicaciones:', err);
                setDatosPublicaciones([]);
            }
        };

        getPublicacionesUsu();
    }, [id_usuario]);

    // Genera los componentes para cada publicacióion
    useEffect(() => {
        const generarComponentesPublicaciones = async () => {
            const componentesPublicacionesPromises = datosPublicaciones.map(async (publicacion) => {
                return (
                    <MostrarPublicacion
                        key={publicacion.id_publicacion}
                        datos={{
                            descripcion: publicacion.descripcion,
                            imagen:publicacion.imagen,  
                            fecha: publicacion.fecha,
                            meGusta: publicacion.me_gusta,
                            disgusta: publicacion.disgusta,
                            fotoPerfil: datosUsuario.imagen_usuario || 'https://res.cloudinary.com/dsysk6y0t/image/upload/v1729878506/images/cvaawi9imiuzbninnmj8.jpg', 
                            nombreUsuario: `${datosUsuario.nombre || ''} ${datosUsuario.apellido_paterno || ''} ${datosUsuario.apellido_materno || ''}`,
                            id_publicacion: publicacion.id_publicacion
                        }}
                        
                        onEliminar={id => {
                            setDatosPublicaciones(prevPublicaciones => prevPublicaciones.filter(publicacion => publicacion.id_publicacion !== id));
                        }}
                    />
                );
            });

            const componentes = await Promise.all(componentesPublicacionesPromises);
            setComponentesPublicaciones(componentes); 
        };
    
       
            generarComponentesPublicaciones();
        
    }, [datosPublicaciones, datosUsuario]);

    

    useEffect(() => {
        //Obtiene los usuarios seguidos por el usuario logeado
        const UsuariosSeguidos = async () => {
            try {
                const response = await Axios.get(`https://linked-back-production.up.railway.app/seguimientos/usuarios/${id_usuario}/seguidos?pagina=1&limite=10`);
                setUsuariosSeguidos(response.data);
            } catch (err) {
                console.error('Error al obtener los usuarios seguidos:', err);
                setUsuariosSeguidos([]);
            }
        };
        UsuariosSeguidos();
    }, [id_usuario]);


    return (
        <div className="VisualizacionPerfil-container">
            <MenuNavegacion />
            <div className="VisualizacionPerfil-perfil-contenido">
                <div className="VisualizacionPerfil-pede-container">
                    <FotoNombre datos={datosEncabezado} usuariosSeguidos={usuariosSeguidos} id_usuario={id_usuario}/>
                
                </div>

                {datosUsuario?.role === 'Reclutadores' ? (
                    
                    <DatosUsu_Rec datos={datosPerfil} />
                ) : (
                    <DatosUsu_EsDoEg datos={datosPerfil} />
                )}

                {/* Contenedor de publicaciones */}
                <div className='conenedorPublicaciones-Usuario'>
                    {datosPublicaciones.length > 0 ? (
                        componentesPublicaciones
                    ) : (
                        <p>No hay publicaciones disponibles.</p>
                    )}
                </div>




                
            </div>
        </div>
    );
};

export default VisualizacionPerfil;