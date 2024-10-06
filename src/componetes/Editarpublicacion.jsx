import React, { useState, useRef } from "react";
import Texto from './Etiquetas';
import '../hojas-de-estilo/Editarpublicacion.css';
import { AiFillDelete } from "react-icons/ai";  
import Axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";



const EditarPublicacion = () => {
    const location = useLocation();
    const datos = location.state;
    const fileInputRef = useRef(null);
    const [descripcion, setDescripcion] = useState(datos.descripcion || '');
    const [image, setImage] = useState(null); 
    const [datosEnviar, setDatosEnviar] = useState({});
    const [file, setFile] = useState(null);

    console.log("Datos de la publicación a editar:", datos);

    
    
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleBack = () => {
        console.log("Navegando a /Perfil");
        navigate('/Perfil');
    };

    const handleImageChange = (event) => {//Para que se cambie la imagen de previsualizacion
        setFile(event.target.files[0]);
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); 
            };
            reader.readAsDataURL(file);
        } else {
            setImage(null); 
        }
    };

    const eliminarPublicacion = async () => {//Opcion de eliminar la publicacion que está siendo editada
        try {
            console.log("Eliminando publicación con id:", datos.id_publicacion);
            const response = await Axios.delete(`http://localhost:3000/publicaciones/${datos.id_publicacion}`);
            console.log(response.data);
            handleBack();
        } catch (err) {
            console.error('Error al eliminar la publicación:', err);
        }
    };

    const editarPublicacion = async (event) => {
        console.log("Editando publicación con id:", datos.id_publicacion);
        let imagen= null;
        if (file) { 
            imagen = await agregarImagen();
        } else {
            console.log("No se ha seleccionado ninguna imagen.");
            imagen=datos.imagen;
        }

        console.log("Continuamos editando la publicacion");
        const datosEnviar = {
            "descripcion": descripcion,
            "imagen": imagen || datos.imagen 
        };

        console.log("Datos a enviar:", datosEnviar);
        console.log(datos.id_publicacion);

        Axios.patch(`http://localhost:3000/publicaciones/${datos.id_publicacion}`, datosEnviar)
            .then((response) => {
                console.log("Respuesta del servidor:", response.data);
                handleBack();
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

    // Envia la imagen al servidor
    const agregarImagen = async (event) => {
        if (!file) {
            console.log("No se ha seleccionado ninguna imagen.");
            return;
        }

        const formData = new FormData();
        formData.append('image', file); 
        //console.log('Imagen seleccionada:', file);

        try {
            const response = await Axios.post('http://localhost:3000/imagenes/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Imagen subida:', response.data);
            console.log('URL de la imagen:', response.data.fileName);
            return response.data.fileName; 
        } catch (error) {
            console.error('Error al subir la imagen:', error);
        }
    };
    return (
        <div className="Editar-publicacion">
            <div className="editar-publicacion-header">
                <Texto texto={'Editar Publicación'} />
            </div>
            <form onSubmit={handleSubmit} className="editar-publicacion-formulario">
                <div className="editar-publicacion-campo">
                    <Texto texto={'Descripción:'} />
                    <textarea 
                        value={descripcion} 
                        onChange={(e) => setDescripcion(e.target.value)} 
                        required 
                        className="editar-publicacion-textarea"
                    />
                </div>

                <button type="button" className="editar-publicacion-boton" onClick={() => fileInputRef.current?.click()}>
                    Cambiar imagen
                </button>

                <div className="editar-publicacion-campo" id='input-subir-nueva-imagen'>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="editar-publicacion-input"
                        ref={fileInputRef}
                    />
                </div>

                {image && (
                    <img
                        src={image}
                        alt="Preview"
                        className="editar-publicacion-imagen"
                    />
                )}

                <div className="editar-publicacion-botones">
                    <button type="submit" className="editar-publicacion-boton" onClick={editarPublicacion}>Guardar</button>
                    <button type="button" className="editar-publicacion-boton" onClick={handleBack}>Cancelar</button>
                    <button 
                        type="button" 
                        className="editar-publicacion-eliminar-boton" 
                        onClick={eliminarPublicacion}
                    >
                        <AiFillDelete size={20} />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditarPublicacion;
