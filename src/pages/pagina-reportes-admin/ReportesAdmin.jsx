import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuNavegacionAdmin from "../../components/menu-navegacion-administrador/MenuNavegacionAdmin";
import "./ReportesAdmin.css";

const ReportesAdmin = () => {
  const [reportes, setReportes] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [detalles, setDetalles] = useState(null);

  // Cargar reportes paginados al inicio
  useEffect(() => {
    fetchReportes(1, 10); // Página 1, límite 10
  }, []);

  const fetchReportes = async (pagina, limite) => {
    try {
      const response = await axios.get(
        `https://linked-back-production.up.railway.app/reportes/?pagina=${pagina}&limite=${limite}`
      );
      setReportes(response.data); // Asume que el backend retorna un arreglo de reportes
    } catch (error) {
      console.error("Error al cargar reportes:", error);
      alert("No se pudieron cargar los reportes.");
    }
  };

  const fetchDetallesReporte = async (id) => {
    try {
      const response = await axios.get(`https://linked-back-production.up.railway.app/reportes/${id}/detalles`);
      setDetalles(response.data);
    } catch (error) {
      console.error("Error al cargar los detalles del reporte:", error);
      alert("No se pudieron cargar los detalles del reporte.");
    }
  };

  const handleVerDetalles = (reporte) => {
    fetchDetallesReporte(reporte.id);
  };

  const handleEliminarContenido = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este contenido?")) {
      try {
        await axios.post(`https://linked-back-production.up.railway.app/reportes/${detalles.id}/aprobar`);
        alert("Contenido eliminado con éxito");
        setDetalles(null);
        fetchReportes(1, 10); // Recargar reportes
      } catch (error) {
        console.error("Error al eliminar contenido:", error);
        alert("No se pudo eliminar el contenido.");
      }
    }
  };

  const handleEstadoEnEspera = async () => {
    if (detalles) {
      try {
        await axios.post(`https://linked-back-production.up.railway.app/reportes/${detalles.id}/espera`);
        alert("El estado del reporte se cambió a 'En Espera'.");
        setDetalles(null);
        fetchReportes(1, 10); // Recargar reportes
      } catch (error) {
        console.error("Error al cambiar el estado:", error);
        alert("No se pudo cambiar el estado del reporte.");
      }
    }
  };

  const reportesFiltrados = reportes.filter((reporte) =>
    reporte.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="reportes-admin">
      <MenuNavegacionAdmin />
      <div className="contenedor-reportes">
        <h1>Gestión de Reportes</h1>
        <div className="barra-busqueda">
          <input
            type="text"
            placeholder="Buscar reportes..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <button onClick={() => fetchReportes(1, 10)}>Buscar</button>
        </div>
        {reportesFiltrados.length > 0 ? (
          <table className="tabla-reportes">
            <thead>
              <tr>
                <th>Título</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Tipo</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reportesFiltrados.map((reporte, index) => (
                <tr key={index}>
                  <td>{reporte.titulo}</td>
                  <td>{reporte.fecha}</td>
                  <td>{reporte.estado}</td>
                  <td>{reporte.tipo}</td>
                  <td>{reporte.categoria}</td>
                  <td>
                    <button onClick={() => handleVerDetalles(reporte)}>
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay reportes</p>
        )}
      </div>
      {detalles && (
        <div className="ventana-detalles">
          <div className="detalles-contenido">
            <h2>{detalles.titulo}</h2>
            <p><strong>Descripción:</strong> {detalles.descripcion}</p>
            <p><strong>Categoría:</strong> {detalles.categoria}</p>
            <p><strong>Tipo:</strong> {detalles.tipo}</p>
            <p><strong>Usuario que reportó:</strong> {detalles.usuario.nombre}</p>
            <p><strong>Usuario reportado:</strong> {detalles.usuarioReportado.nombre}</p>
            {detalles.contenidoReportado && (
              <p>
                <strong>Vista Previa:</strong>{" "}
                <a href={detalles.contenidoReportado.enlace_noticia} target="_blank" rel="noopener noreferrer">
                  {detalles.contenidoReportado.titulo_noticia}
                </a>
              </p>
            )}
            <button onClick={handleEliminarContenido}>
              Aprobar y Eliminar Contenido
            </button>
            <button onClick={handleEstadoEnEspera}>
              Poner en Espera
            </button>
            <button onClick={() => setDetalles(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportesAdmin;
