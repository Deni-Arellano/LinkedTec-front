import React, { useState } from "react";
import Texto from './Etiquetas';
import '../hojas-de-estilo/Editarpublicacion.css';
import { AiFillDelete } from "react-icons/ai";  // Importamos el ícono de bote de basura

const EditarPublicacion = () => {
    const [descripcion, setDescripcion] = useState('Descripcion de la publicacion');
    const [imagen, setImagen] = useState('https://via.placeholder.com/300');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Publicación editada:', { descripcion, imagen });
    };

    const handleEliminar = () => {
        console.log('Publicación eliminada');
        // Aquí puedes agregar la lógica para eliminar la publicación
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
                <div className="editar-publicacion-campo">
                    <Texto texto={'URL de Imagen:'} />
                    <input 
                        type="text" 
                        value={imagen} 
                        onChange={(e) => setImagen(e.target.value)} 
                        required 
                        className="editar-publicacion-input"
                    />
                </div>
                <img 
                    src={imagen} 
                    alt="Preview" 
                    className="editar-publicacion-imagen" 
                />
                <div className="editar-publicacion-botones">
                    <button type="submit" className="editar-publicacion-boton">Guardar Cambios</button>
                    <button 
                        type="button" 
                        className="editar-publicacion-eliminar-boton" 
                        onClick={handleEliminar}
                    >
                        <AiFillDelete size={20} /> {/* Icono de bote de basura */}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditarPublicacion;
