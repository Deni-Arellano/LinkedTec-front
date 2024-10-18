/**
 * Importaciones de React y otros componentes y dependencias necesarias para el formulario de creación de noticias.
 */
import React, { useState, useContext } from 'react';
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

        if (enlace.length>=255){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El URL de el enlace es demasiado largo.",
                footer:'Intenta con menos de 255 caracteres'
              });
              return;

        }
        if (imagenURL.length>=255){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El URL de la imagen es demasiado largo.",
                footer:'Intenta con menos de 255 caracteres'
              });
              return;

        }
        
        
        /**
        * Se encapsulan los datos a enviar
        */
        const datosEnviar = {
            "titulo_noticia": titulo_noticia,
            "descripcion": descripcion,
            "imagen_noticia": imagenURL,  
            "enlace_noticia": enlace,
            "categoria_noticia": categoriaSeleccionada,
            "id_usuario": usuarioLog
        };


        console.log('Datos enviados:', datosEnviar);
        /**
        * Se realiza la solicitud al servidor para enviar los datos si no existe ningun error
        */
        axios.post('http://localhost:3000/noticias/', datosEnviar)
        .then((response) => {
            console.log(response);
            Swal.fire('Éxito', 'La noticia ha sido publicada con éxito.', 'success');
            handleBack();
        })
        .catch((error) => {
            if (error.response) {
                console.error('Error en la solicitud:', error.response.data);
                Swal.fire('Error', `Error en la solicitud: ${error.response.data.message || 'Error al crear la noticia'}`, 'error');
            }
            else {
                console.error('Error:', error.message);
                Swal.fire('Error', `Error en la solicitud: ${error.message}`, 'error');
            }

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
