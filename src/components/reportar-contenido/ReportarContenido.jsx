import React, { useState, useContext, useEffect } from 'react';
import Etiquetas from '../componente-label/Etiquetas.jsx'; 
import CajaDeTexto from '../componente-caja-de-texto/CajaDeTexto.jsx';
import Button from '../boton/Boton.jsx'; 
import RadioButtons from '../componente-boton-de-radio/radio-boton.jsx';
import Swal from 'sweetalert2';
import axios from 'axios';
import './ReportarContenido.css'; 
import { usuarioContext } from '../../App';

const ReportarContenido = ({ categoriaActual, id_noticia, onClose }) => {
    /** 
     * Estados para manejar los valores de título, descripción, categoría, tipo de reporte, y usuario 
     */
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState(categoriaActual);
    const [tipoReporte, setTipoReporte] = useState('');
    const [idUsuario, setIdUsuario] = useState(null);
    const { usuarioLog } = useContext(usuarioContext);

    /**
     * Efecto para obtener información sobre la noticia específica a partir de `id_noticia`.
     * Realiza una solicitud GET para obtener los datos de la noticia y guarda el ID del usuario
     * que publicó la noticia para referenciarlo en el reporte.
     */
    useEffect(() => {
      const obtenerUsuarioNoticia = async () => {
        try {
          const response = await axios.get(`https://linked-back-spring-lake-433.fly.dev/noticias/${id_noticia}`);
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

    /**
     * Función para manejar el envío del reporte.
     * Valida que todos los campos necesarios estén llenos y cumplen con los requisitos de longitud.
     * Si la validación es exitosa, envía una solicitud POST para crear un nuevo reporte en el servidor.
     */
    const handleSubmit = () => {
        if (titulo.trim() === '') {
            Swal.fire('Error', 'Por favor, ingresa el título del reporte.', 'error');
            return;
        }
        if (tipoReporte.trim() === '') {
            Swal.fire('Error', 'Por favor, selecciona el tipo de reporte.', 'error');
            return;
        }
        if (titulo.length > 255) {
            Swal.fire("Error", "El título debe contener menos de 255 caracteres.");
            return;
        }
        if (descripcion.trim() === '') {
            Swal.fire('Error', 'Por favor, ingresa una descripción.', 'error');
            return;
        }
        if (descripcion.length < 10) {
            Swal.fire('Error', 'La descripción debe tener al menos 10 caracteres.', 'error');
            return;
        }
        if (descripcion.length > 500) {
            Swal.fire('Error', 'La descripción debe tener menos de 500 caracteres.', 'error');
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

        axios.post('https://linked-back-spring-lake-433.fly.dev/reportes', reporte)
            .then((response) => {
                console.log(response);
                Swal.fire('Éxito', 'Tu reporte ha sido enviado con éxito.', 'success');
                onClose(); 
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
              <Button texto="Cancelar" onClick={onClose} />
              <Button texto="Enviar Reporte" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      );
};

export default ReportarContenido;
