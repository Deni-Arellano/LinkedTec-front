import React, { useState, useRef } from "react";
import Texto from './Etiquetas';
import '../hojas-de-estilo/Editarpublicacion.css';
import { AiFillDelete } from "react-icons/ai";  
import Axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';  // Importar SweetAlert2



const EditarPublicacion = () => {
    const location = useLocation();
    const datos = location.state;
    const fileInputRef = useRef(null);
    const [descripcion, setDescripcion] = useState(datos.descripcion || '');
    const [image, setImage] = useState(null); 
    const [file, setFile] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleBack = () => {
        navigate('/Perfil');
    };

    const handleImageChange = (event) => {
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

    const eliminarPublicacion = async () => {
        try {
            const resultado = await Swal.fire({
                title: '¿Estás seguro?',
                text: "Esta acción eliminará la publicación permanentemente.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
                reverseButtons: true
            });

            if (resultado.isConfirmed) {
                await Axios.delete(`http://localhost:3000/publicaciones/${datos.id_publicacion}`);
                Swal.fire(
                    'Eliminado',
                    'La publicación ha sido eliminada.',
                    'success'
                );
                handleBack();
            }
        } catch (err) {
            Swal.fire('Error', 'Error al eliminar la publicación.', 'error');
        }
    };

    const editarPublicacion = async (event) => {
        let imagen = null;
        if (file) {
            imagen = await agregarImagen();
        } else {
            imagen = datos.imagen;
        }

        const datosEnviar = {
            "descripcion": descripcion,
            "imagen": imagen || datos.imagen
        };

        try {
            await Axios.patch(`http://localhost:3000/publicaciones/${datos.id_publicacion}`, datosEnviar);
            Swal.fire('Guardado', 'La publicación ha sido actualizada.', 'success');
            handleBack();
        } catch (error) {
            if (error.response) {
                Swal.fire('Error', `Error de respuesta del servidor: ${error.response.data}`, 'error');
            } else {
                Swal.fire('Error', `Error en la solicitud: ${error.message}`, 'error');
            }
        }
    };

    const agregarImagen = async () => {
        if (!file) {
            Swal.fire('Advertencia', 'No se ha seleccionado ninguna imagen.', 'warning');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await Axios.post('http://localhost:3000/imagenes/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.fileName; 
        } catch (error) {
            Swal.fire('Error', 'Error al subir la imagen.', 'error');
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
