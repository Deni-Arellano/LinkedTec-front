import React, { useContext, useState,useEffect } from 'react';
import '../hojas-de-estilo/VisualizacionPerfil.css';
import MenuNavegacion from '../componetes/MenuNavegacion'; 
import FotoNombre from '../componetes/PerfilUsu_FotoNomb'; 
import DatosUsu_Rec from '../componetes/DatosUsu_Rec';
import DatosUsu_EsDoEg from '../componetes/DatosUsu_EsDoEg';
import {usuarioContext} from '../App';
import Axios from 'axios';
import MostrarPublicacion from '../componetes/Mostrar-Publicacion';
import CrearComentario from '../componetes/CrearComentario';
import Comentario from '../componetes/Comentario';


const VisualizacionPerfil = () => {
    //const {usuarioLog, setUsuarioLog} = useContext(usuarioContext);
    const usuarioLog=1;
    const [datosUsuario, setDatosUsuario] = useState('');
    const [datosPerfil, setDatosPerfil] = useState('');
    const [datosEncabezado, setDatosEncabezado] = useState('')
    const [datosPublicaciones, setDatosPublicaciones] = useState([]);
    const [componentesPublicaciones, setComponentesPublicaciones] = useState([]);


    //Obtener los datos del usuario logeado
    const getUsuario = async () => {
        try {
            const response = await Axios.get(`http://localhost:3000/usuarios/${usuarioLog}`);
            //console.log("Servidor dice")
            console.log(response.data);
            setDatosUsuario(response.data);
            
        } catch (err) {
            console.error('Error al obtener el usuario:', err);
        }
    };

    //Se ejacuta al cagar la pagina y obtiene los datos del usuario logeado
    useEffect(() => {
        getUsuario();
    }, []);

    //Actualiza los datos del perfil dependiendo su rol
    useEffect(() => {
        const urlApi = 'http://localhost:3000'
        if (datosUsuario.role === 'Reclutadores') {
            setDatosPerfil({
                biografia: datosUsuario.biografia,
                correo: datosUsuario.correo,
                telefono: datosUsuario.telefono,
                fecha: datosUsuario.fecha_nacimiento,
                sexo: datosUsuario.sexo,
                empresa: datosUsuario.nombre_empresa,
                giro: datosUsuario.giro
            });
            console.log("Datos del perfil");
            console.log(datosPerfil);

        } else if (datosUsuario.role === 'Estudiantes' || datosUsuario.role === 'Egresados') {
            setDatosPerfil({
                carrera: datosUsuario.carrera,
                biografia: datosUsuario.biografia,
                correo: datosUsuario.correo,
                telefono: datosUsuario.telefono,
                fecha: datosUsuario.fecha_nacimiento,
                sexo: datosUsuario.sexo
            });
            console.log("Datos del perfil");
            console.log(datosPerfil);
        } else {
            setDatosPerfil({
                carrera: datosUsuario.academia,
                biografia: datosUsuario.biografia,
                correo: datosUsuario.correo,
                telefono: datosUsuario.telefono,
                fecha: datosUsuario.fecha_nacimiento,
                sexo: datosUsuario.sexo
            });
            console.log("Datos del perfil");
            console.log(datosPerfil);
        }
        if (datosUsuario.role === 'Reclutadores') {
            setDatosEncabezado({
                nombre: datosUsuario.nombre + " " + datosUsuario.apellido_paterno + " " + datosUsuario.apellido_materno,
                role: 'Reclutador',
                foto: urlApi+datosUsuario.imagen_usuario
            });
        } else if (datosUsuario.role === 'Estudiantes') {
            setDatosEncabezado({
                nombre: datosUsuario.nombre + " " + datosUsuario.apellido_paterno + " " + datosUsuario.apellido_materno,
                role: 'Estudiante',
                foto: urlApi+datosUsuario.imagen_usuario
            });
        } else if (datosUsuario.role === 'Egresados') {
            setDatosEncabezado({
                nombre: datosUsuario.nombre + " " + datosUsuario.apellido_paterno + " " + datosUsuario.apellido_materno,
                role: 'Egresado',
                foto: urlApi+datosUsuario.imagen_usuario
            });
        } else {
            setDatosEncabezado({
                nombre: datosUsuario.nombre + " " + datosUsuario.apellido_paterno + " " + datosUsuario.apellido_materno,
                role: 'Docente',
                foto: urlApi+datosUsuario.imagen_usuario
            });
        }
        
    }, [datosUsuario]);

    //Extrae todas las publicaciones que hizo el usuario
    const getPublicacionesUsu = async () => {
        try {
            const response = await Axios.get(`http://localhost:3000/publicaciones/usuario/${usuarioLog}`);
            console.log("Datos de publicaciones:", response.data);
            setDatosPublicaciones(response.data);
            console.log('http://localhost:3000' + response.data[0].imagen);
        } catch (err) {
            console.error('Error al obtener los empleos:', err);
        }
    };  

    useEffect(() => {
        getPublicacionesUsu();
    }, []);


    // Genera los componentes para cada publicacióion
    useEffect(() => {
        const generarComponentesPublicaciones = async () => {
            const componentesPublicacionesPromises = datosPublicaciones.map(async (publicacion) => {
                console.log("Datos de la publicacionñññññ", publicacion);
                return (
                    <MostrarPublicacion
                        key={publicacion.id_publicacion}
                        datos={{
                            descripcion: publicacion.descripcion,
                            imagen:publicacion.imagen,  
                            fecha: publicacion.fecha,
                            meGusta: publicacion.me_gusta,
                            disgusta: publicacion.disgusta,
                            fotoPerfil: datosUsuario.imagen_usuario || 'https://via.placeholder.com/100', 
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


    return (
        <div className="VisualizacionPerfil-container">
            <MenuNavegacion />

            <div className="VisualizacionPerfil-perfil-contenido">
                <div className="VisualizacionPerfil-pede-container">
                    <FotoNombre datos={datosEncabezado} />
                </div>

                {datosUsuario.role === 'Reclutadores' ? (
                    <DatosUsu_Rec datos={datosPerfil} />
                ) : (
                    <DatosUsu_EsDoEg datos={datosPerfil} />

                )}


                {/* Contenedor de publicaciones */}
                <div className='conenedorPublicaciones-Usuario'>
                    {componentesPublicaciones} 
                </div>


            </div>


        </div>
    );
};

export default VisualizacionPerfil;