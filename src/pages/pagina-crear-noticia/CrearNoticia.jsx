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

const CrearNoticias = () => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenURL, setImagenURL] = useState(''); 
    const [enlace, setEnlace] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(''); 
    const { usuarioLog } = useContext(usuarioContext); 
    
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/noticias');
    };

    const add = () => {
        if (!titulo) {
            Swal.fire('Error', 'El título no debe estar vacío.', 'error');
            return;
        }

        if (!descripcion) {
            Swal.fire('Error', 'La descripción no debe estar vacía.', 'error');
            return;
        }

        if (!enlace) {
            Swal.fire('Error', 'El enlace no debe estar vacío.', 'error');
            return;
        }

        const datosEnviar = {
            "titulo": titulo,  // Corregido
            "descripcion": descripcion,
            "imagen_noticia": imagenURL,  
            "enlace_noticia": enlace,
            "categoria_noticia": categoriaSeleccionada,
            "id_usuario": usuarioLog
        };
        console.log(datosEnviar)

        axios.post('http://localhost:3000/noticias/', datosEnviar)
        .then((response) => {
            console.log(response)
            Swal.fire('Éxito', 'La noticia ha sido publicada con éxito.', 'success');
            handleBack();
        })
        .catch((error) => {
            console.log(response)
            Swal.fire('Error', `Error en la solicitud: ${error.message}`, 'error');
        });
    };

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
                            value={titulo} 
                            onChange={(e) => setTitulo(e.target.value)} 
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
                        <Etiquetas tamano={14} texto="Categoría" />
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
