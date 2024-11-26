import React, {useEffect, useState} from 'react';
import SeccionInformacion from "../../components/seccion-informacion/SeccionInformacion";
import axios from 'axios';

import Grafica from "../../components/grafica/Grafica";
import GraficaReportes from "../../components/grafica/GraficaReportes";
import GraficaPorMes from "../../components/grafica/GraficaPorMes";
import CloudinaryDashboard from "../../components/cloudinary-dashboard/CloudinaryDashboard";
import ReportesDashboard from "../../components/reportes-dashboard/ReportesDashboard";
import './PaginaDashboard.css';

const cloudName = 'dsysk6y0t';  // Reemplaza con tu nombre de cuenta en Cloudinary
const apiKey = '558681395524128';  // Reemplaza con tu API key
const apiSecret = 'SOTK8MjlL-1fU41ERjFoghAQ2rU';  // Reemplaza con tu API secret


const PaginaDashboard = () => {

    const [datosValores, setDatosValores] = useState([]);
    const [datosPublicaciones, setDatosPublicaciones] = useState([]);
    const [datosNoticias, setDatosNoticias] = useState([]);
    const [datosEmpleos, setDatosEmpleos] = useState([]);
    const [datosUsuarios, setDatosUsuarios] = useState([]);
    const [datosReportes, setDatosReportes] = useState([]);

    const [datosReportesPorTipo, setDatosReportesPorTipo] = useState([]);
    const [datosReportesPOrMes, setDatosReportesPorMes] = useState([]);
    const [datosPublicacionesPorMes, setDatosPublicacionesPorMes] = useState([]);
    const [datosNoticiasPorMes, setDatosNoticiasPorMes] = useState([]);


    const [datosReportesTotal, setDatosReportesTotal] = useState({
        reportes: {
            totalReportes: 0,
            totalReportesSinAtender: 0,
            totalReportesAtendidos: 0,
            reportesEnEspera: 0,
            promedioDiario: 0,
        },
        reportesPorTipo: [],
        reportesPorMes: [],
    });



    const [datosCloudinary, setDatosCloudinary] = useState({});




    useEffect(() => {
        // Función que obtiene datos de la API
        const fetchData = async () => {
            const respuesta = await consultarApi();
            asignarDatos(respuesta); // Asignamos los datos a los estados correspondientes
        }

        fetchData(); // Cargar los datos cuando el componente se monte

        // Configuramos la actualización periódica
        const intervalId = setInterval(fetchData, 10000000); // Actualiza cada 5 segundos

        // Limpiamos el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId);

    }, []); // Solo se ejecuta una vez al montar el componente

    const consultarApi = async () => {
        try {
            const respuesta = await axios.get('http://localhost:3000/estadisticas/');
            return respuesta.data; // Retorna los datos
        } catch (error) {
            console.error(error);
        }
    };

    const asignarDatos = (datos) => {


        //Asignacion de datos para mostrar en targetitas
        setDatosPublicaciones(datos.valores.publicaciones);
        setDatosNoticias(datos.valores.noticias);
        setDatosEmpleos(datos.valores.empleos);
        setDatosUsuarios(datos.valores.usuarios);
        setDatosReportes(datos.valores.reportes);

        //Asignacion de datos para grafica
        setDatosReportesPorTipo(datos.datosGraficar.reportes.reportesPorTipo);
        setDatosReportesPorMes(datos.datosGraficar.reportes.reportesPorMes);

        setDatosPublicacionesPorMes(datos.datosGraficar.publicaciones.totalPublicacionesPorMes);
        setDatosNoticiasPorMes(datos.datosGraficar.noticias.totalNoticiasPorMes);

        setDatosCloudinary(datos.cloudinary);
        setDatosReportesTotal(datos.reportes);

    };



    return (
        <div>

            <h1>Dashboard</h1>

            {/*<div className="Reportes">*/}
            {/*    <h2>Reportes</h2>*/}

            {/*    /!* Contenedor para las gráficas *!/*/}
            {/*    <div className="graficas-container">*/}
            {/*        <div className="grafica-container">*/}
            {/*            <GraficaReportes*/}
            {/*                data={datosReportesPorTipo}*/}
            {/*                tipoGrafica="barras"*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div className="grafica-container">*/}
            {/*            <GraficaPorMes*/}
            {/*                data={datosReportesPOrMes}*/}
            {/*                tipoGrafica="lineas"*/}
            {/*                categoryKey="mes"*/}
            {/*                valueKey="cantidad"*/}
            {/*                titulo="Reportes por Mes"*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    /!* Contenedor para las tarjetas *!/*/}
            {/*    <div className="tarjetas-container">*/}
            {/*        <SeccionInformacion*/}
            {/*            nombreSeccion="Reportes"*/}
            {/*            datosSeccion={datosReportes}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</div>*/}

            <ReportesDashboard data={datosReportesTotal} />

            <h1>Informacion acerca de cloudinary</h1>
            <CloudinaryDashboard data={datosCloudinary} />

            {/*<SeccionInformacion nombreSeccion="Publicaciones" datosSeccion={datosPublicaciones}/>*/}
            {/*<SeccionInformacion nombreSeccion="Noticias" datosSeccion={datosNoticias}/>*/}
            {/*<SeccionInformacion nombreSeccion="Empleos" datosSeccion={datosEmpleos}/>*/}
            {/*<SeccionInformacion nombreSeccion="Usuarios" datosSeccion={datosUsuarios}/>*/}


            {/*<GraficaPorMes*/}
            {/*    data={datosPublicacionesPorMes}*/}
            {/*    tipoGrafica="lineas"*/}
            {/*    categoryKey="mes"*/}
            {/*    valueKey="cantidad"*/}
            {/*    titulo="Publicaciones por Mes"*/}
            {/*/>*/}
            {/*<GraficaPorMes*/}
            {/*    data={datosNoticiasPorMes}*/}
            {/*    tipoGrafica="lineas"*/}
            {/*    categoryKey="mes"*/}
            {/*    valueKey="cantidad"*/}
            {/*    titulo="Noticias por Mes"*/}
            {/*/>*/}


        </div>
    );
};

export default PaginaDashboard;
