import React, { useState, useContext, useRef } from "react";
import Boton from './Button';
import Cajatexto from './Caja-de-texto.jsx';
import Texto from './Etiquetas';
import '../hojas-de-estilo/Crear-publicacion.css';
import Axios from "axios";
import { usuarioContext } from '../App';
import { BiImageAdd } from 'react-icons/bi';

const CrearPubli = () => {
    const { usuarioLog } = useContext(usuarioContext);
    //const usuarioLog=5;
    const [textoPubli, setTextoPubli] = useState('');
    
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);
    const [imagenSeleccionada, setImagenSeleccionada] = useState(false);//Para indicar si se ha subido una imagen o no

    const manejarCambioTexto = (e) => {
        setTextoPubli(e.target.value);
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        console.log(e.target.files);
        setImage(e.target.files[0]);
        setImagenSeleccionada(!!file);// cambia de estado si se ha seleccionado una imagen
    };

    // Envia la imagen al servidor
    const agregarImagen = async () => {
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await Axios.post('http://localhost:3000/imagenes/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            //console.log('Imagen subida:', response.data);
            //console.log('URL de la imagen:', response.data.fileName);
            return response.data.fileName; 
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            throw error; 
        }
    };

    const add = async () => {//Agrega la publicación
        console.log('Texto:', textoPubli);

        if (textoPubli.trim() === '' && image === null) {
            console.log('La descripción no puede estar vacia.');
            return;
        }
        
        let url = '';

        if (image) {
            try {
                url = await agregarImagen(); 
                console.log('URL de la imagen:', url);
            } catch (error) {
                console.error('Error al subir la imagen:', error);
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

        //console.log('Datos a enviar:', datosEnviar);
        console.log (datosEnviar.imagen, 'Linea imagen')

        Axios.post('http://localhost:3000/publicaciones', datosEnviar)
            .then((response) => {
                console.log("Respuesta del servidor:", response.data);
                setTextoPubli('');
                setImage(null);
                fileInputRef.current.value = ''
                setImagenSeleccionada(false);
            })
            .catch((error) => {
                if (error.response) {
                    console.log("Error de respuesta del servidor:", error.response.data);
                    console.log("Código de estado:", error.response.status);
                } else {
                    console.log("Error en la solicitud:", error.message);
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
                    onChange={manejarCambioTexto} />
                <input 
                type="file" 
                name='imagenPublicacion' 
                className="input-imagen-crear-publicacion" 
                onChange={handleImage}
                ref={fileInputRef} />

                
                <div className="boton-contenedor-crear-publicacion">
                    <button
                        type="button" 
                        className={`boton-imagen-crear-publicacion ${imagenSeleccionada ? 'imagen-seleccionada' : ''}`}
                        onClick={() => document.querySelector('.input-imagen-crear-publicacion').click()}
                    >
                        <BiImageAdd size={30} />
                    </button>
                    <div className="botones-derecha-crear-publicacion">
                        <Boton  texto='Publicar' className='boton-crear-publicacion' />
                        <Boton  type='button' texto='Cancelar' className='boton-crear-publicacion' onClick={(e) => { e.preventDefault(); cancelar(); 
    }}   />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CrearPubli;
