import React, { useState, useEffect } from 'react';
import './VisualizarPostuComoReclutador.css';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { LuFilterX } from "react-icons/lu";
import Button from '../../components/boton/Boton.jsx';
import SearchBar from '../../components/componente-searchbar-buscar-postulantes-como-reclutador/ComponenteSearchbarBuscarPostulantesComoReclutador.jsx';
import DataTable from 'react-data-table-component';
import Texto from '../../components/componente-label/Etiquetas.jsx';
import Swal from 'sweetalert2';

const TablaPostuVerReclutador = () => {
    const { idEmpleo } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]); 
    const [searchTerm, setSearchTerm] = useState('');
    const [sortDirection, setSortDirection] = useState('asc'); 
    const [filterStatus, setFilterStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        Axios.get(`https://linked-back-spring-lake-433.fly.dev/postulaciones/empleo/${idEmpleo}?pagina=${currentPage}&limite=10`)
            .then(response => {
                setData(response.data.postulaciones);
                setFilteredData(response.data.postulaciones);
                setTotalPages(response.data.total_paginas);
            })
            .catch(error => {
                console.error("Error al obtener los postulantes:", error);
            });
    }, [idEmpleo, currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleBack = () => {
        navigate('/empleos');
    };

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        filterData(term, filterStatus);
    };

    const handleSort = () => {
        const sortedData = [...filteredData].sort((a, b) => {
            const dateA = new Date(a.fecha_creacion);
            const dateB = new Date(b.fecha_creacion);
            return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        });

        setFilteredData(sortedData);
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); 
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setFilterStatus('');
        setFilteredData(data);
    };

    const filterData = (term, status) => {
        const filtered = data.filter(postulante =>
            (term === '' || postulante.nombre_usuario.toLowerCase().includes(term.toLowerCase())) &&
            (status === '' || postulante.estado === status)
        );
        setFilteredData(filtered);
    };

    const filterByStatus = (status) => {
        setFilterStatus(status);
        filterData(searchTerm, status);
    };

    const columns = [
        {
            name: "Nombre del postulante",
            selector: row => row.nombre_usuario,
            width: '600px',
            cell: row => <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{row.nombre_usuario}</div> 
        },
        {
            name: "Correo electrónico",
            selector: row => row.correo_usuario,
            width: '550px',
            cell: row => <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{row.correo_usuario}</div> 
        },
        {
            name: <>Fecha de<br />postulación</>,
            selector: row => row.fecha_creacion,
            width: '200px',
            cell: row => {
                const fecha = new Date(row.fecha_creacion);
                const opciones = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                    timeZone: 'UTC'  
                };
                
                return (
                    <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                        {fecha.toLocaleString('es-ES', opciones)}
                    </div>
                );
            }            
        },
        {
            name: "Estado",
            selector: row => row.estado,
            width: '140px'
        },
        {
            name: "Acción",
            cell: row => <Button texto={"Ver"} onClick={() => infoPostulante(row.id_usuario)} />
        }
    ];

    const infoPostulante = async (id_usuario) => {
        try {
            // Realiza la solicitud para obtener la información del postulante
            const response = await Axios.get(`https://linked-back-spring-lake-433.fly.dev/postulaciones/postulante/${idEmpleo}/${id_usuario}`);
            
            // Obtiene la información del postulante
            const { nombre_usuario, correo_usuario, fecha_postulacion, estado, descripcion, cv } = response.data;
    
            // Muestra la información en un modal de SweetAlert con comboBox y botón de confirmación
            Swal.fire({
                title: '<label>Información del postulante</label>',
                html: `
                    <div class='ContenedorTextoMostrarInformacionPostulacionPopup'>
                        <strong class='TextoMostrarInformacionPostulacionPopup'>Nombre:</strong> ${nombre_usuario} <br><br>
                        <strong class='TextoMostrarInformacionPostulacionPopup'>Correo:</strong> ${correo_usuario} <br><br>
                        <strong class='TextoMostrarInformacionPostulacionPopup'>Fecha de Postulación:</strong> ${new Date(fecha_postulacion).toLocaleDateString()} <br><br>
                        <strong class='TextoMostrarInformacionPostulacionPopup'>Descripción:</strong> ${descripcion} <br><br>
                        <strong class='TextoMostrarInformacionPostulacionPopup'>CV:</strong> <a href="${cv}" target="_blank">Ver CV</a> <br><br>
        
                        <label for="estado" class='TextoMostrarInformacionPostulacionPopup'>Editar estado del Postulante:</label>
                        <select id="estado" class="swal2-select" style="width: 350px;">
                            <option value="Pendiente" ${estado === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                            <option value="Aceptado" ${estado === 'Aceptado' ? 'selected' : ''}>Aceptado</option>
                            <option value="No Aceptado" ${estado === 'No Aceptado' ? 'selected' : ''}>No Aceptado</option>
                        </select>
                    </div>
                `,
                showCloseButton: true,
                closeButtonHtml: 'X',
                showConfirmButton: true,
                confirmButtonText: 'Confirmar',
                focusConfirm: false,
                preConfirm: () => {
                    const estadoSeleccionado = document.getElementById('estado').value;
                    console.log('Estado seleccionado:', estadoSeleccionado);
                }
            });
    
        } catch (error) {
            console.error('Error al obtener la información del postulante:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo obtener la información del postulante.',
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
        }
    }; 

    const customStyles = {
        rows: {
            style: {
                fontSize: '16px',
                borderTop: '1px solid #000000', 
                borderBottom: '1px solid #000000',
                backgroundColor: "#f8f8f8"
            },
        },
        headCells: {
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#FFFFFF',
                backgroundColor: '#35548b',
                borderTop: '1px solid #000000',  
                borderLeft: '1px solid #000000', 
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000' 
            },
        },
        cells: {
            style: {
                fontSize: '16px',
                borderLeft: '1px solid #000000', 
                borderRight: '1px solid #000000', 
                padding: '8px',
            },
        },
    };

    return (
        <div className='ContenedorVisuaReclutador'>
            <div className='barra-busqueda-y-filtros-postulador'>
                <SearchBar 
                    className='barra-busqueda-ver-postulados'
                    value={searchTerm} 
                    onChange={handleSearch}
                />
                <div className="botones-filtros-postulador">
                    <Texto texto={'Filtros:'}></Texto>
                    <Button texto={"Recientes"} onClick={handleSort} />
                    <Button texto={"Antiguos"} onClick={handleSort} />
                    <Button texto={"No Aceptados"} onClick={() => filterByStatus("No Aceptado")} />
                    <Button texto={"Aceptados"} onClick={() => filterByStatus("Aceptado")} />
                    <Button texto={"Pendientes"} onClick={() => filterByStatus("Pendiente")} />

                    <div>
                        <Button texto={<LuFilterX />} onClick={handleClearFilters} />
                    </div>
                </div>
            </div>
            <div className='TablaContenedoraVisuaReclutador'>
                {filteredData.length > 0 ? (
                    <DataTable
                        columns={columns}
                        data={filteredData}
                        customStyles={customStyles}
                        fixedHeader
                    />
                ) : (
                    <p className='mensajesindatosverpostulacionesreclutador'>No hay postulantes.</p>
                )}
            </div>

            <div className="paginacionverpostulacionesreclutador">
                <Button 
                    texto="Anterior" 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1} // Deshabilita si es la primera página
                />
                <span>Página {currentPage} de {totalPages}</span>
                <Button 
                    texto="Siguiente" 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages} // Deshabilita si es la última página
                />
            </div>


            <div className='botones'>
                <Button texto="Regresar" onClick={handleBack} />
            </div>
        </div>
    );
}

export default TablaPostuVerReclutador;
