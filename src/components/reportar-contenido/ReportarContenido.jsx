import React, { useState, useContext, useEffect } from 'react';
import Etiquetas from '../componente-label/Etiquetas.jsx'; 
import CajaDeTexto from '../componente-caja-de-texto/CajaDeTexto.jsx';
import Button from '../boton/Boton.jsx'; 
import RadioButtons from '../componente-boton-de-radio/radio-boton.jsx';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './ReportarContenido.css'; 
import { usuarioContext } from '../../App';

const ReportarContenido = ({ categoriaActual }) => {
    const { id_noticia } = useParams(); 
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState(categoriaActual);
    const [tipoReporte, setTipoReporte] = useState('');
    const [idUsuario, setIdUsuario] = useState(null);
    const { usuarioLog } = useContext(usuarioContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        const obtenerUsuarioNoticia = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/noticias/${id_noticia}`);
                const noticia = response.data;
                setIdUsuario(noticia.id_usuario); 
            } catch (error) {
                console.error('Error al obtener la noticia:', error);
                Swal.fire('Error', 'No se pudo cargar la información de la noticia.', 'error');
            }
        };

        if (id_noticia) {
            obtenerUsuarioNoticia();
        }
    }, [id_noticia]);

    /*Manejo de el envio del reporte*/
    const handleSubmit = () => {
        if (titulo.trim()==='' ) {
            Swal.fire('Error', 'Por favor, ingresa el titulo de reporte.', 'error');
            return;
        }
        if(tipoReporte.trim()==='')
        {
            Swal.fire('Error','Porfavor ayudanos a ingresar el tipo de reporte','error')
        }
        if (titulo.length>255)
            {
                Swal.fire("Error","Porfavor el titulo debe de contener menos de 255 caracteres ")
                return;
            }
        if (descripcion.trim() === '')
        {
            Swal.fire('Error', 'Por favor ingresa una descripcion a la noticia', 'error');
            return;
        }
        if(descripcion.length < 10)
        {
            Swal.fire('Error', 'Por favor la descripcion debe de tener mas de 10 caracteres', 'error');
            return;
        }
        if(descripcion.length>500)
            {
                Swal.fire('Error', 'Por favor la descripcion debe de tener menos de 500 caracteres', 'error');
                return;
            }
            if (categoria.trim()==='')
                {
                    Swal.fire("Error","Porfavor elige una categoria de reporte ")
                    return;
                }
        if (!tipoReporte) {
            Swal.fire('Error', 'Por favor, elige el tipo de reporte.', 'error');
            return;
        }
        if (tipoReporte.trim()==='')
            {
                Swal.fire("Error","Porfavor el titulo debe de contener menos de 255 caracteres ")
                return;
            }

        const reporte = {
            "id_usuario": idUsuario,
            "tipo_reporte": tipoReporte,
            "categoria_reporte": categoria,
            "descripcion": descripcion,
            "id_elemento_reportado": id_noticia,
            "titulo_reporte": titulo
        };

        axios.post('http://localhost:3000/reportes', reporte)
            .then((response) => {
                console.log(response);
                Swal.fire('Éxito', 'Tu reporte ha sido enviado con éxito.', 'success');
                navigate(-1);
            })
            .catch((error) => {
                if (error.response) {
                    console.error('Error en la solicitud:', error.response.data);
                    Swal.fire('Error', `Error en la solicitud: ${error.response.data.message || 'Error al enviar el reporte'}`, 'error');
                } else {
                    console.error('Error:', error.message);
                    Swal.fire('Error', `Error en la solicitud: ${error.message}`, 'error');
                }
            });
    };

    const cerrarModal = () => {
        navigate(-1);
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
                        placeholder="Descripción de reporte" 
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
                            { value: 'publicaciones', label: 'Publicaciones' },
                            { value: 'noticias', label: 'Noticias' },
                            { value: 'empleos', label: 'Empleos' }
                        ]}
                        selectedOption={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
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
                        <option value="discriminación">Discriminación</option>
                        <option value="difamación">Difamación</option>
                        <option value="ofensa">Ofensa</option>
                        <option value="suplantación de identidad">Suplantación de identidad</option>
                        <option value="fraude">Fraude</option>
                        <option value="otros">Otros</option>
                    </select>
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
