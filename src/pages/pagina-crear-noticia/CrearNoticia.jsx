/**
 * Importaciones de React y otros componentes y dependencias necesarias para el formulario de creación de noticias.
 */
import React, { useState, useContext, useEffect } from 'react';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion';
import Etiquetas from '../../components/componente-label/Etiquetas';
import CajaDeTexto from '../../components/componente-caja-de-texto/CajaDeTexto.jsx';
import Button from '../../components/boton/Boton';
import RadioButtons from '../../components/componente-boton-de-radio/radio-boton.jsx';
import './CrearNoticia.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { usuarioContext } from '../../App';
/**
 * Se manejan los estados de cada componente de entrada
 */
const CrearNoticias = () => {

    const [titulo_noticia, setTitulonoticia] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenURL, setImagenURL] = useState('');
    const [enlace, setEnlace] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const { usuarioLog } = useContext(usuarioContext);
        /**
     * Para navegar entre las paginas
     */
    const navigate = useNavigate();
    /**
     * navegar a la pagina principal de noticias
     */
    const [socket, setSocket] = useState(null);

    /* Conectar al WebSocket al cargar el componente*/
    useEffect(() => {
        const ws = new WebSocket('wss://linked-back-spring-lake-433.fly.dev:9081');

        ws.onopen = () => {
            console.log('Conectado al servidor WebSocket');
            setSocket(ws);
        };

        ws.onclose = () => {
            console.log('Conexión WebSocket cerrada');
        };

        ws.onerror = (error) => {
            console.error('Error en WebSocket:', error);
        };

        /* Limpiar el WebSocket al desmontar el componente*/
        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
                console.log('WebSocket cerrado al desmontar');
            }
        };
    }, []);

    const handleBack = () => {
        navigate('/noticias');
    };
    /**
     * Comprobacion de datos en formato correcto y encapsulamiento de datos para enviar la solicitud
     * 
     */

    const add = () => {
        if (!titulo_noticia || !descripcion || !imagenURL || !enlace || !categoriaSeleccionada) {
            Swal.fire('Error', 'Por favor, completa todos los campos.', 'error');
            return;
        }
        if (descripcion.length<=10){
            Swal.fire('Error', 'Por favor, describe mejor la noticia.', 'error');
            return;

        }
        if (!/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(:[0-9]{1,5})?(\/.*)?$/.test(imagenURL)) {
            Swal.fire('Error', 'La imagen debe ser una URL válida, por favor revisa el enlace.', 'error');
            return;
        }

        if (!/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(:[0-9]{1,5})?(\/.*)?$/.test(enlace)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El URL de enlace no tiene un formato valido.",
                footer:'Intenta ingresarlo bien...'
              });
            return;
        }

        const datosNoticia = {
            "titulo_noticia": titulo_noticia,
            "descripcion": descripcion,
            "imagen_noticia": imagenURL,
            "enlace_noticia": enlace,
            "categoria_noticia": categoriaSeleccionada,
            "id_usuario": usuarioLog
        };

        axios.post('https://linked-back-spring-lake-433.fly.dev/noticias/', datosNoticia)
        .then((response) => {
            console.log(response);
            Swal.fire('Éxito', 'La noticia ha sido publicada con éxito.', 'success');
            const idNoticia = response.data.id_noticia;
            const datosNotificacion = {
                action: 'crear_notificacion_para_todos',
                data: {
                    tipo: 'noticia',
                    id_referencia_tipo: idNoticia,
                    mensaje: `Nueva noticia publicada: ${titulo_noticia}`,
                    id_creador: usuarioLog
                }
            };
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify(datosNotificacion));
                console.log('Datos de notificación enviados:', datosNotificacion);
            } else {
                console.error('WebSocket no está conectado');
                Swal.fire('Error', 'No se pudo enviar la notificación a través de WebSocket.', 'error');
            }

            handleBack();
        })
        .catch((error) => {
            console.error('Error en la solicitud:', error.response.data);
            Swal.fire('Error', `Error en la solicitud: ${error.response.data.message || 'Error al crear la noticia'}`, 'error');
        });
    };
    /**
    *  <MenuNavegacion />manda a llamar funcion de menu navegacion
    */

    /**
    * Componentes de formulario noticia como caja de texto,botones,radio buton
    */

    return (
        <>
            
            <MenuNavegacion />
            <div className="formulario-noticias-container">
                <div className="formulario-noticias-form">
                    <Etiquetas tamano={20} texto="Noticias" />
                    
                    <div className="formulario-noticias-input-group">
                        <Etiquetas tamano={14} texto="Titulo" />
                        <CajaDeTexto 
                            id="titulo-noticia" 
                            placeholder="Ingresa el título..."
                            value={titulo_noticia} 
                            onChange={(e) => setTitulonoticia(e.target.value)} 
                        />
                    </div>

                    <div className="formulario-noticias-input-group">
                        <Etiquetas tamano={14} texto="Descripcion" />
                        <textarea 
                            id="descripcion-noticia" 
                            placeholder="Descripcion..."
                            className="formulario-noticias-textarea" 
                            rows="5" 
                            value={descripcion} 
                            onChange={(e) => setDescripcion(e.target.value)} 
                        />
                    </div>

                    <div className="formulario-noticias-input-group">
                        <Etiquetas tamano={14} texto="Imagen (URL)" />
                        <CajaDeTexto 
                            id="imagen-url-noticia" 
                            placeholder="Ingresa la URL de la imagen..." 
                            value={imagenURL} 
                            onChange={(e) => setImagenURL(e.target.value)} 
                        />
                    </div>

                    <div className="formulario-noticias-input-group">
                        <Etiquetas tamano={14} texto="Enlace" />
                        <CajaDeTexto 
                            id="enlace-noticia" 
                            placeholder="Ingresa el enlace..." 
                            value={enlace} 
                            onChange={(e) => setEnlace(e.target.value)} 
                        />
                    </div>

                    <div className="formulario-noticias-input-group">
                        <Etiquetas tamano={14} texto="Categoría(Carrera)" />
                        <RadioButtons
                            name="categoria"
                            options={[
                                { value: 'ISC', label: 'ISC' },
                                { value: 'IE', label: 'IE' },
                                { value: 'IA', label: 'IA' },
                                { value: 'CP', label: 'CP' },
                                { value: 'II', label: 'II' },
                                { value: 'IGE', label: 'IGE' },
                            ]}
                            selectedOption={categoriaSeleccionada}  
                            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                        />
                    </div>
                    

                    <div className="formulario-noticias-botones">
                        <Button texto="Cancelar" onClick={handleBack} />
                        <Button texto="Publicar" onClick={add} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CrearNoticias;
