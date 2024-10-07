import React, { useState, useContext, useRef } from "react";
import Boton from './Button';
import Cajatexto from './Caja-de-texto.jsx';
import Texto from './Etiquetas';
import '../hojas-de-estilo/Crear-publicacion.css';
import Axios from "axios";
import { usuarioContext } from '../App';
import { BiImageAdd } from 'react-icons/bi';
import Swal from 'sweetalert2';

const CrearPubli = () => {
    const { usuarioLog } = useContext(usuarioContext);
    const [textoPubli, setTextoPubli] = useState('');
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);
    const [imagenSeleccionada, setImagenSeleccionada] = useState(false);

    const manejarCambioTexto = (e) => {
        setTextoPubli(e.target.value);
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        const validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

        if (file && !validExtensions.includes(file.type)) {
            Swal.fire('Error', 'Extensión de archivo no válida. Solo se permiten archivos .jpg, .jpeg y .png.', 'error');
            setImage(null);
            setImagenSeleccionada(false);
            fileInputRef.current.value = '';
            return;
        }

        if (file && file.size > 10 * 1024 * 1024) {
            Swal.fire('Error', 'El tamaño máximo de la imagen es 10 MB.', 'error');
            setImage(null);
            setImagenSeleccionada(false);
            fileInputRef.current.value = '';
            return;
        }

        setImage(e.target.files[0]);
        setImagenSeleccionada(!!file);
    };

    const agregarImagen = async () => {
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await Axios.post('http://localhost:3000/imagenes/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.fileName; 
        } catch (error) {
            Swal.fire('Error', 'Error al subir la imagen.', 'error');
            throw error; 
        }
    };

    const add = async () => {
        if (textoPubli.trim() === '' && image === null) {
            Swal.fire('Error', 'La descripción no puede estar vacía.', 'error');
            return;
        }

        if (textoPubli.length > 255) {
            Swal.fire('Error', 'La descripción es demasiado larga, máximo 255 caracteres.', 'error');
            return;
        }

        let url = '';

        if (image) {
            try {
                url = await agregarImagen(); 
            } catch (error) {
                return; 
            }
        }

        const datosEnviar = {
            "descripcion": textoPubli,
            "imagen": url || '',
            "fecha": new Date().toISOString(),
            "id_usuario": usuarioLog,
            "me_gusta": 0,
            "disgusta": 0
        };

        Axios.post('http://localhost:3000/publicaciones', datosEnviar)
            .then((response) => {
                Swal.fire('Éxito', 'Publicación creada con éxito.', 'success');
                setTextoPubli('');
                setImage(null);
                fileInputRef.current.value = '';
                setImagenSeleccionada(false);
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.data.error === '"imagen" is not allowed to be empty') {
                        Swal.fire('Error', 'Debes subir al menos una imagen.', 'error');
                    } else {
                        Swal.fire('Error', `Error en la solicitud: ${error.response.data}`, 'error');
                    }
                } else {
                    Swal.fire('Error', `Error en la solicitud: ${error.message}`, 'error');
                }
            });            
    };

    const publicar = (e) => {
        e.preventDefault(); 
        add();
    };

    const cancelar = () => {
        setTextoPubli('');
        setImage(null);
        fileInputRef.current.value = '';
        setImagenSeleccionada(false);
    };



    return (
        <div className="caja-crear-publicacion">
            <form className="estilo-caja-crear-publicacion" onSubmit={publicar}>
                <Texto tamano='20' texto='¿Qué estás pensando?' />
                <Cajatexto 
                    className='estilo-caja-texto' 
                    placeholder={'Ingresar texto...'} 
                    value={textoPubli} 
                    onChange={manejarCambioTexto} 
                />
                <input 
                    type="file" 
                    name='imagenPublicacion' 
                    className="input-imagen-crear-publicacion" 
                    onChange={handleImage}
                    ref={fileInputRef} 
                />
                
                <div className="boton-contenedor-crear-publicacion">
                    <button
                        type="button" 
                        className={`boton-imagen-crear-publicacion ${imagenSeleccionada ? 'imagen-seleccionada' : ''}`}
                        onClick={() => document.querySelector('.input-imagen-crear-publicacion').click()}
                    >
                        <BiImageAdd size={30} />
                    </button>
                    <div className="botones-derecha-crear-publicacion">
                        <Boton texto='Publicar' className='boton-crear-publicacion' />
                        <Boton 
                            type='button' 
                            texto='Cancelar' 
                            className='boton-crear-publicacion' 
                            onClick={(e) => { 
                                e.preventDefault(); 
                                cancelar(); 
                            }} 
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CrearPubli;
