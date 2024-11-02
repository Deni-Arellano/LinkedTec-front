import React, { useEffect, useState } from 'react';
import { usuarioContext } from '../../App';
import Axios from 'axios'; 
import Swal from 'sweetalert2';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion';
import Cajatexto from '../../components/componente-caja-de-texto/CajaDeTexto';
import ImageUploader from '../../components/subir-imagen/ImageUploader';
import './EditatNoticia.css';

const EditarNoticia = () => {
    const [tituloNoticia, setTituloNoticia] = useState('');
    const [descripcionNoticia, setDescripcionNoticia] = useState('');
    const [imagenNoticia, setImagenNoticia] = useState('');
    const [enlaceNoticia, setEnlaceNoticia] = useState('');
    const [fechaNoticia, setFechaNoticia] = useState('');
    const [categoriaNoticia, setCategoriaNoticia] = useState('');
    const [idNoticia] = useState(3);
    const [idUsuario] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => { 
        cargarDatosNoticia();
    }, []);

    const cargarDatosNoticia = async () => {
        try {
            const noticiaResponse = await Axios.get(`http://localhost:3000/noticias/${idNoticia}`);
            const noticia = noticiaResponse.data;
            
            if (noticia) {
                setTituloNoticia(noticia.titulo_noticia);
                setDescripcionNoticia(noticia.descripcion);
                setImagenNoticia(noticia.imagen_noticia);
                setEnlaceNoticia(noticia.enlace_noticia);
                setFechaNoticia(noticia.fecha_noticia);
                setCategoriaNoticia(noticia.categoria_noticia);
            }
        } catch (error) {
            console.error('Error al obtener los datos de la noticia:', error);
            mostrarError('Error al cargar los datos de la noticia');
        }
    };

    const handleImageSelected = async (file) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('imagen', file);
            
            const response = await Axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            if (response.data && response.data.url) {
                setImagenNoticia(response.data.url);
            } else {
                throw new Error('No se recibió la URL de la imagen');
            }
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            mostrarError('No se pudo subir la imagen');
        } finally {
            setIsLoading(false);
        }
    };

    const mostrarError = (mensaje) => {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: mensaje
        });
    };

    const mostrarExito = (mensaje) => {
        Swal.fire({
            icon: "success",
            title: "¡Éxito!",
            text: mensaje
        });
    };

    const handleGuardar = async () => {
        if (isLoading) {
            mostrarError('Por favor espere a que se termine de subir la imagen');
            return;
        }

        try {
            const noticiaData = {
                titulo_noticia: tituloNoticia,
                descripcion: descripcionNoticia,
                imagen_noticia: imagenNoticia,
                enlace_noticia: enlaceNoticia,
                fecha_noticia: fechaNoticia,
                categoria_noticia: categoriaNoticia,
                id_usuario: idUsuario
            };

            await Axios.put(`http://localhost:3000/noticias/${idNoticia}`, noticiaData);
            mostrarExito('La noticia se ha actualizado correctamente');
        } catch (error) {
            console.error('Error al guardar la noticia:', error);
            mostrarError('No se pudo guardar la noticia');
        }
    };

    return (
        <>
            <MenuNavegacion/>
            <div className='contenedor-editar-noticia'>
                <h1>Editar Noticia</h1>
                
                <div className="campo-formulario">
                    <label>Título de la noticia</label>
                    <Cajatexto
                        id="titulo_noticia"
                        placeholder="Ingrese el título"
                        value={tituloNoticia}
                        onChange={(e) => setTituloNoticia(e.target.value)}
                    />
                </div>

                <div className="campo-formulario">
                    <label>Descripción</label>
                    <Cajatexto
                        id="descripcion_noticia"
                        placeholder="Ingrese la descripción"
                        value={descripcionNoticia}
                        onChange={(e) => setDescripcionNoticia(e.target.value)}
                    />
                </div>

                <div className="campo-formulario">
                    <label>Imagen de la noticia</label>
                    <ImageUploader 
                        initialImage={imagenNoticia}
                        onImageSelected={handleImageSelected}
                    />
                    {isLoading && <p className="loading-text">Subiendo imagen...</p>}
                </div>

                <div className="campo-formulario">
                    <label>Enlace de la noticia</label>
                    <Cajatexto
                        id="enlace_noticia"
                        placeholder="Ingrese el enlace"
                        value={enlaceNoticia}
                        onChange={(e) => setEnlaceNoticia(e.target.value)}
                    />
                </div>

                <div className="campo-formulario">
                    <label>Fecha de la noticia</label>
                    <Cajatexto
                        id="fecha_noticia"
                        placeholder="Ingrese la fecha"
                        value={fechaNoticia}
                        onChange={(e) => setFechaNoticia(e.target.value)}
                    />
                </div>

                <div className="campo-formulario">
                    <label>Categoría</label>
                    <Cajatexto
                        id="categoria_noticia"
                        placeholder="Ingrese la categoría"
                        value={categoriaNoticia}
                        onChange={(e) => setCategoriaNoticia(e.target.value)}
                    />
                </div>

                <button 
                    className="boton-guardar"
                    onClick={handleGuardar}
                    disabled={isLoading}
                >
                    {isLoading ? 'Guardando...' : 'Guardar'}
                </button>
            </div>
        </>
    );
}

export default EditarNoticia;