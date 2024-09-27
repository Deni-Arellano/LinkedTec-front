import React, { useState } from "react";
import Texto from './Etiquetas';
import '../hojas-de-estilo/Editarpublicacion.css';

const EditarPublicacion = () => {
    const [descripcion, setDescripcion] = useState('Descripcion de la publicacion');
    const [imagen, setImagen] = useState('https://via.placeholder.com/300');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica para guardar la publicación editada
        console.log('Publicación editada:', { descripcion, imagen });
    };

    return (
        <div className="Editar-publicacion">
            <h2>Editar Publicación</h2>
            <form onSubmit={handleSubmit}>
                <div className="editar-publicacion-campo">
                    <label>Descripción:</label>
                    <textarea 
                        value={descripcion} 
                        onChange={(e) => setDescripcion(e.target.value)} 
                        required 
                    />
                </div>
                <div className="editar-publicacion-campo">
                    <label>URL de Imagen:</label>
                    <input 
                        type="text" 
                        value={imagen} 
                        onChange={(e) => setImagen(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="editar-publicacion-boton">Guardar Cambios</button>
            </form>
        </div>
    );
}

export default EditarPublicacion;
