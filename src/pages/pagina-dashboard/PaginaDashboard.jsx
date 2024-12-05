import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CloudinaryDashboard from "../../components/cloudinary-dashboard/CloudinaryDashboard";
import ReportesDashboard from "../../components/reportes-dashboard/ReportesDashboard";
import './PaginaDashboard.css';
import MenuNavegacionAdmin from "../../components/menu-navegacion-administrador/MenuNavegacionAdmin";

const PaginaDashboard = () => {
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

    // Variables no utilizadas
    // const [datosValores, setDatosValores] = useState([]);
    // const [datosPublicaciones, setDatosPublicaciones] = useState([]);
    // const [datosNoticias, setDatosNoticias] = useState([]);
    // const [datosEmpleos, setDatosEmpleos] = useState([]);
    // const [datosUsuarios, setDatosUsuarios] = useState([]);
    // const [datosReportes, setDatosReportes] = useState([]);
    // const [datosReportesPorTipo, setDatosReportesPorTipo] = useState([]);
    // const [datosReportesPOrMes, setDatosReportesPorMes] = useState([]);
    // const [datosPublicacionesPorMes, setDatosPublicacionesPorMes] = useState([]);
    // const [datosNoticiasPorMes, setDatosNoticiasPorMes] = useState([]);

    useEffect(() => {
        // Función para obtener datos de la API
        const fetchData = async () => {
            const respuesta = await consultarApi();
            asignarDatos(respuesta);
        };

        fetchData();


        const intervalId = setInterval(fetchData, 60000);

        return () => clearInterval(intervalId);
    }, []);

    const consultarApi = async () => {
        try {
            const respuesta = await axios.get('https://linked-back-spring-lake-433.fly.dev/estadisticas/');
            return respuesta.data;
        } catch (error) {
            console.error(error);
        }
    };

    const asignarDatos = (datos) => {

        setDatosCloudinary(datos.cloudinary);
        setDatosReportesTotal(datos.reportes);
    };

    return (
        <div>
            <MenuNavegacionAdmin />
            <div className="dashboard-container">
                <h1>Dashboard</h1>
                <ReportesDashboard data={datosReportesTotal} />
                <h1>Información acerca de Cloudinary</h1>
                <CloudinaryDashboard data={datosCloudinary} />
            </div>
        </div>
    );
};

export default PaginaDashboard;
