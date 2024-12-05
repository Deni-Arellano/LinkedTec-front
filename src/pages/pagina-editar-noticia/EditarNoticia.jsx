import React, { useEffect, useState } from 'react';
import Axios from 'axios'; 
import Swal from 'sweetalert2';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion';
import Cajatexto from '../../components/componente-caja-de-texto/CajaDeTexto';
import ImageUploader from '../../components/subir-imagen/ImageUploader';
import RadioButtons from '../../components/componente-boton-de-radio/radio-boton';
import { usuarioContext } from '../../App'; 
import { useContext } from 'react';
import './EditatNoticia.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const EditarNoticia = () => {
    const { usuarioLog } = useContext(usuarioContext); 
    const {id_noticia} = useParams();
    const navigate = useNavigate();


    const [tituloNoticia, setTituloNoticia] = useState('');
    const [descripcionNoticia, setDescripcionNoticia] = useState('');
    const [imagenNoticia, setImagenNoticia] = useState('');
    const [imagenFile, setImagenFile] = useState(null); 
    const [enlaceNoticia, setEnlaceNoticia] = useState('');
    const [categoriaNoticia, setCategoriaNoticia] = useState('');
    const [idNoticia, setIdNoticia] = useState(3);
    const [idUsuario] = useState(1);
    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => { 
        cargarDatosNoticia();
    }, []);

    const cargarDatosNoticia = async () => {
        try {

            setIdNoticia(id_noticia);
            const noticiaResponse = await Axios.get(`https://linked-back-spring-lake-433.fly.dev/noticias/${idNoticia}`);
            const noticia = noticiaResponse.data;
            
            if (noticia) {
                setTituloNoticia(noticia.titulo_noticia);
                setDescripcionNoticia(noticia.descripcion);
                setImagenNoticia(noticia.imagen_noticia);
                setEnlaceNoticia(noticia.enlace_noticia);
                setCategoriaNoticia(noticia.categoria_noticia);
            }
        } catch (error) {
            console.error('Error al obtener los datos de la noticia:', error);
            mostrarError('Error al cargar los datos de la noticia');
        }
    };

    const handleImageSelected = (file) => {
        setImagenFile(file); 
        const reader = new FileReader();
        reader.onloadend = () => setImagenNoticia(reader.result); 
        reader.readAsDataURL(file);
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

        setIsLoading(true);
        let imagenUrl = imagenNoticia; 

        if (imagenFile) {
            try {
                const formData = new FormData();
                formData.append('imagen', imagenFile);
                const response = await Axios.post('https://linked-back-spring-lake-433.fly.dev/subidas/subir-imagen', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                imagenUrl = response.data.data.secure_url;
            } catch (error) {
                mostrarError('No se pudo subir la imagen');
                setIsLoading(false);
                return;
            }
        }

        try {
            const noticiaData = {
                titulo_noticia: tituloNoticia,
                descripcion: descripcionNoticia,
                imagen_noticia: imagenUrl,
                enlace_noticia: enlaceNoticia,
                categoria_noticia: categoriaNoticia,
                id_usuario: idUsuario
            };

            await Axios.patch(`https://linked-back-spring-lake-433.fly.dev/noticias/${idNoticia}`, noticiaData);
            mostrarExito('La noticia se ha actualizado correctamente');
            navegarPaginaPrincipalNoticias();

        } catch (error) {
            mostrarError('No se pudo guardar la noticia');
        } finally {
            setIsLoading(false);
        }
    };

    const navegarPaginaPrincipalNoticias = () => {
        navigate('/noticias');
    }



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
                    <RadioButtons
                        label="Categoría"
                        name="categoria_noticia"
                        options={[
                            { label: 'ISC', value: 'ISC' },
                            { label: 'IEM', value: 'IEM' },
                            { label: 'CP', value: 'CP' },
                            { label: 'IA', value: 'IA' },
                            { label: 'II', value: 'II' },
                            { label: 'IGE', value: 'IGE' },
                        ]}
                        selectedOption={categoriaNoticia}
                        onChange={(e) => setCategoriaNoticia(e.target.value)}
                    />
                </div>
                <div className='contenedor-boton'>
                    <button
                        className="boton-cancelar"
                        onClick={() => window.history.back()}
                    >
                        Cancelar    
                    </button>

                    <button 
                        className="boton-guardar"
                        onClick={handleGuardar}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>



            </div>
        </>
    );
}

export default EditarNoticia;
