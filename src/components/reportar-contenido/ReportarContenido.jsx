import React, { useState } from 'react';
import Etiquetas from '../componente-label/Etiquetas.jsx'; 
import CajaDeTexto from '../componente-caja-de-texto/CajaDeTexto.jsx';
import Button from '../boton/Boton.jsx'; 
import RadioButtons from '../componente-boton-de-radio/radio-boton.jsx'; // Reutilizamos los radio buttons
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ReportarContenido.css'; 

const ReportarContenido = ({ categoriaActual = 'Noticias' }) => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState(categoriaActual);  // Precargamos la categoría actual
    const [tipoReporte, setTipoReporte] = useState('');
    const [motivoReporte, setMotivoReporte] = useState('');
    const navigate = useNavigate();

    // Función para manejar el envío del reporte
    const handleSubmit = async () => {
        if (!titulo || !motivoReporte || !tipoReporte) {
            Swal.fire('Error', 'Por favor, llena todos los campos requeridos.', 'error');
            return;
        }

        try {
            const reporte = {
                titulo,
                descripcion,
                categoria_reporte: categoria,  // Aquí va la categoría seleccionada
                tipo_reporte: tipoReporte,
                motivo: motivoReporte
            };

            const response = await axios.post('http://localhost:3000/reportes', reporte);  // Enviar el reporte con POST

            if (response.status === 200) {
                Swal.fire('Éxito', 'Tu reporte ha sido enviado.', 'success');
                navigate(-1); // Volver a la página anterior
            } else {
                throw new Error('Error en el envío');
            }
        } catch (error) {
            Swal.fire('Error', 'Hubo un problema al enviar tu reporte.', 'error');
        }
    };

    const cerrarModal = () => {
        navigate(-1); // Volver a la página anterior
    };

    return (
        <div className="reportar-modal-overlay">
            <div className="reportar-modal">
                <Etiquetas tamano={20} texto="Reportar contenido" />

                <div className="reportar-input-group">
                    <Etiquetas tamano={14} texto="Título del reporte" />
                    <CajaDeTexto 
                        id="titulo-reporte" 
                        placeholder="Ingresa el título del reporte" 
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className="reportar-textbox"
                    />
                </div>

                <div className="reportar-input-group">
                    <Etiquetas tamano={14} texto="Descripción del problema" />
                    <CajaDeTexto 
                        id="descripcion-reporte" 
                        placeholder="Descripción del problema (opcional)" 
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="reportar-textarea"
                    />
                </div>

                <div className="reportar-input-group">
                    <Etiquetas tamano={14} texto="Categoría" />
                    <RadioButtons 
                        name="categoria_reporte"
                        options={[
                            { value: 'perfil', label: 'Perfil' },
                            { value: 'publicaciones', label: 'Publicaciones' },
                            { value: 'noticias', label: 'Noticias' },
                            { value: 'empleos', label: 'Empleos' },
                            { value: 'foros', label: 'Foros' },
                            { value: 'eventos', label: 'Eventos' },
                            { value: 'otros', label: 'Otros' }
                        ]}
                        selectedOption={categoria}  // Precargamos la categoría seleccionada
                        onChange={(e) => setCategoria(e.target.value)}  // Actualizamos la categoría
                    />
                </div>

                <div className="reportar-input-group">
                    <Etiquetas tamano={14} texto="Tipo de reporte" />
                    <select 
                        id="tipo-reporte"
                        value={tipoReporte}
                        onChange={(e) => setTipoReporte(e.target.value)}
                        className="reportar-select"
                    >
                        <option value="">--Seleccionar tipo de reporte--</option>
                        <option value="acoso">Acoso</option>
                        <option value="amenaza">Amenaza</option>
                        <option value="discriminacion">Discriminación</option>
                        <option value="difamacion">Difamación</option>
                        <option value="ofensa">Ofensa</option>
                        <option value="suplantacion">Suplantación de identidad</option>
                        <option value="fraude">Fraude</option>
                        <option value="otros">Otros</option>
                    </select>
                </div>

                <div className="reportar-input-group">
                    <Etiquetas tamano={14} texto="Motivo del reporte" />
                    <CajaDeTexto 
                        id="motivo-reporte" 
                        placeholder="Describe el motivo del reporte (requerido)" 
                        value={motivoReporte}
                        onChange={(e) => setMotivoReporte(e.target.value)}
                        className="reportar-textbox"
                    />
                </div>

                <div className="reportar-botones">
                    <Button texto="Cancelar" onClick={cerrarModal} />
                    <Button texto="Enviar Reporte" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
};

export default ReportarContenido;
