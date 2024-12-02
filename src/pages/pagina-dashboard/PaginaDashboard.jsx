import React, {useEffect, useState} from 'react';
import axios from 'axios';


import CloudinaryDashboard from "../../components/cloudinary-dashboard/CloudinaryDashboard";
import ReportesDashboard from "../../components/reportes-dashboard/ReportesDashboard";
import './PaginaDashboard.css';
import MenuNavegacionAdmin  from "../../components/menu-navegacion-administrador/MenuNavegacionAdmin";




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
            <MenuNavegacionAdmin />
            <div className="dashboard-container">
                <h1>Dashboard</h1>
                <ReportesDashboard data={datosReportesTotal} />
                <h1>Informacion acerca de cloudinary</h1>
                <CloudinaryDashboard data={datosCloudinary} />
            </div>
        </div>
    );
};

export default PaginaDashboard;
