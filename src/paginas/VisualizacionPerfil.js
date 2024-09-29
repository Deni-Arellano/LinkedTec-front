import React, { useContext, useState,useEffect } from 'react';
import '../hojas-de-estilo/VisualizacionPerfil.css';
import MenuNavegacion from '../componetes/MenuNavegacion'; 
import FotoNombre from '../componetes/PerfilUsu_FotoNomb'; 
import DatosUsu_Rec from '../componetes/DatosUsu_Rec';
import DatosUsu_EsDoEg from '../componetes/DatosUsu_EsDoEg';
import {usuarioContext} from '../App';
import axios, { Axios } from 'axios';

const VisualizacionPerfil = () => {
    const {usuarioLog, setUsuarioLog} = useContext(usuarioContext);
    const [datosUsuario, setDatosUsuario] = useState('');
    const [datosPerfil, setDatosPerfil] = useState('');
    const [datosEncabezado, setDatosEncabezado] = useState('')


    //Obtener los datos del usuario logeado
    const getUsuario = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/usuarios/${usuarioLog}`);
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
        if (datosUsuario.role === 'Reclutador') {
            setDatosPerfil({
                biografia: datosUsuario.biografia,
                correo: datosUsuario.correo,
                telefono: datosUsuario.telefono,
                fecha: datosUsuario.fecha_nacimiento,
                sexo: datosUsuario.sexo,
                empresa: datosUsuario.empresa,
                giro: datosUsuario.giro_empresa
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
                foto: datosUsuario.imagen_usuario
            });
        } else if (datosUsuario.role === 'Estudiantes') {
            setDatosEncabezado({
                nombre: datosUsuario.nombre + " " + datosUsuario.apellido_paterno + " " + datosUsuario.apellido_materno,
                role: 'Estudiante',
                foto: datosUsuario.imagen_usuario
            });
        } else if (datosUsuario.role === 'Egresados') {
            setDatosEncabezado({
                nombre: datosUsuario.nombre + " " + datosUsuario.apellido_paterno + " " + datosUsuario.apellido_materno,
                role: 'Egresado',
                foto: datosUsuario.imagen_usuario
            });
        } else {
            setDatosEncabezado({
                nombre: datosUsuario.nombre + " " + datosUsuario.apellido_paterno + " " + datosUsuario.apellido_materno,
                role: 'Docente',
                foto: datosUsuario.imagen_usuario
            });
        }
        
    }, [datosUsuario]);



    

    return (
        <div className="VisualizacionPerfil-container">
        <MenuNavegacion />

        {/* Contenedor de PEDE con la clase para moverlo a la derecha */}
        <div className="VisualizacionPerfil-perfil-contenido">
            <div className="VisualizacionPerfil-pede-container">
                <FotoNombre datos={datosEncabezado} /> {/* Componente que muestra el nombre y la foto del usuario */}
            </div>

            {datosUsuario.role === 'Reclutadores' ? (
                <DatosUsu_Rec datos={datosPerfil} /> // Renderiza si es Reclutador
            ) : (
                <DatosUsu_EsDoEg datos={datosPerfil} /> // Renderiza si es Estudiante, Egresado o Docente
            )}
        </div>
    </div>
);
};

export default VisualizacionPerfil;