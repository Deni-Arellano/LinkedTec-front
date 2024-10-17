import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom'; // Hooks para la navegación y parámetros de la URL
import axios from 'axios'; // Librería para hacer peticiones HTTP
import Swal from 'sweetalert2'; // Librería para mostrar alertas
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion'; 
import Etiquetas from '../../components/componente-label/Etiquetas';
import CajaDeTexto from '../../components/componente-caja-de-texto/CajaDeTexto.jsx';
import Button from '../../components/boton/Boton';
import './EditarPublicacionEmpleo.css';

const EditarPublicacionEmpleo = () => {
    const { idEmpleo } = useParams(); // Obtiene el parámetro 'idEmpleo' de la URL
    const location = useLocation();  // Obtiene los datos de la publicación pasados a través de la navegación
    const navigate = useNavigate();  // Hook para manejar la navegación entre rutas

    const datos = location.state; // Captura los datos de la publicación desde el estado pasado por la navegación

    // Efecto que se ejecuta al cargar el componente, verifica si se recibieron datos, si no, muestra un error
    useEffect(() => {
        if (!datos) {
            Swal.fire('Error', 'No se recibieron los datos de la publicación.', 'error');
            navigate('/empleos');  // Redirige a la página de empleos si no hay datos
        }
    }, [datos, navigate]);

    // Estados inicializados con los valores recibidos de la publicación o vacíos por defecto
    const [titulo, setTitulo] = useState(datos?.tituloEmpleo || ''); 
    const [empresa, setEmpresa] = useState(datos?.empresa || ''); 
    const [salario, setSalario] = useState(datos?.salario || ''); 
    const [descripcion, setDescripcion] = useState(datos?.descripcion || ''); 
    const [ubicacion, setUbicacion] = useState(datos?.ubicacion || ''); 
    const [nivelDeIngles, setNivelDeIngles] = useState(datos?.nivelIngles || 'Avanzado');
    const [image, setImage] = useState(datos?.fotoPerfil || null); // Estado para la imagen seleccionada

    // Función para manejar el cambio de imagen
    const handleImageChange = (event) => {
        const file = event.target.files[0]; // Captura el archivo seleccionado
        if (file) {
            const reader = new FileReader(); // Utiliza FileReader para leer el archivo
            reader.onloadend = () => {
                setImage(reader.result); // Establece la imagen como una URL base64 para previsualizarla
            };
            reader.readAsDataURL(file); // Lee el archivo como un Data URL
        }
    };

    // Función para guardar los cambios de la publicación de empleo
    const handleGuardarCambios = () => {
        // Verifica si todos los campos obligatorios están completos
        if (!titulo || !empresa || !salario || !descripcion || !ubicacion) {
            Swal.fire('Error', 'Todos los campos deben ser completados.', 'error');
            return;
        }

        // Objeto con los datos actualizados que se enviará al backend
        const datosActualizados = {
            "titulo": titulo,
            "empresa": empresa,
            "salario": salario,
            "descripcion": descripcion,
            "ubicacion": ubicacion,
            "nivel_de_ingles": nivelDeIngles,
            "fotoPerfil": image // Incluye la imagen seleccionada
        };

        // Realiza una petición PATCH para actualizar los datos en el servidor
        axios.patch(`http://localhost:3000/empleos/${idEmpleo}`, datosActualizados)
            .then(response => {
                Swal.fire('Éxito', 'La publicación de empleo ha sido actualizada.', 'success');
                navigate('/empleos'); // Redirige a la página de empleos después de la actualización exitosa
            })
            .catch(error => {
                console.error('Error al actualizar la publicación:', error);
                Swal.fire('Error', 'No se pudo actualizar la publicación.', 'error');
            });
    };

    return (
        <>
            <MenuNavegacion /> {/* Barra de navegación */}
            <div className="fromularioempleoo-container">
                <div className="fromularioempleoo-form">
                    
                    {/* Formulario para editar la publicación de empleo */}
                    <Etiquetas tamano={20} texto="Editar publicación de empleo" id="fromularioempleoo-titulo-publicacion-empleo" className="texto-transformar" />
                    &nbsp;

                    {/* Campo para Título de empleo */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Título empleo:" className="texto-transformar" />
                        <CajaDeTexto
                            value={titulo} // El valor del campo de texto es el estado 'titulo'
                            onChange={(e) => setTitulo(e.target.value)} // Actualiza el estado cuando cambia el valor del campo
                            placeholder="Escribe el título del empleo"
                        />
                    </div>

                    {/* Campo para Empresa */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Empresa:" className="texto-transformar" />
                        <CajaDeTexto
                            value={empresa} // El valor del campo de texto es el estado 'empresa'
                            onChange={(e) => setEmpresa(e.target.value)} // Actualiza el estado cuando cambia el valor del campo
                            placeholder="Nombre de la empresa"
                        />
                    </div>

                    {/* Campo para Salario */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Salario:" className="texto-transformar" />
                        <CajaDeTexto
                            value={salario} // El valor del campo de texto es el estado 'salario'
                            onChange={(e) => setSalario(e.target.value)} // Actualiza el estado cuando cambia el valor del campo
                            placeholder="Salario del puesto"
                        />
                    </div>

                    {/* Campo para Descripción */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Descripción:" className="texto-transformar" />
                        <textarea
                            value={descripcion} // El valor del campo de texto es el estado 'descripcion'
                            onChange={(e) => setDescripcion(e.target.value)} // Actualiza el estado cuando cambia el valor del campo
                            placeholder="Descripción del empleo"
                            rows="5"
                            className="fromularioempleoo-descripcion-textarea"
                        />
                    </div>

                    {/* Campo para Ubicación */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Ubicación (estado):" className="texto-transformar" />
                        <CajaDeTexto
                            value={ubicacion} // El valor del campo de texto es el estado 'ubicacion'
                            onChange={(e) => setUbicacion(e.target.value)} // Actualiza el estado cuando cambia el valor del campo
                            placeholder="Ubicación del empleo"
                        />
                    </div>

                    {/* Selección de Nivel de Inglés */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Nivel de inglés requerido:" className="texto-transformar" />
                        <select
                            value={nivelDeIngles} // El valor del menú desplegable es el estado 'nivelDeIngles'
                            onChange={(e) => setNivelDeIngles(e.target.value)} // Actualiza el estado cuando se selecciona un valor diferente
                            className="fromularioempleoo-dropdown"
                        >
                            <option value="Avanzado">Avanzado</option>
                            <option value="Intermedio">Intermedio</option>
                            <option value="Básico">Básico</option>
                            <option value="No aplica">No aplica</option>
                        </select>
                    </div>

                    {/* Imagen cargada */}
                    <div className="fromularioempleoo-input-group">
                        {image && <img src={image} alt="Imagen de perfil" className="fromularioempleoo-imagen-preview" />} 
                        <input type="file" accept="image/*" onChange={handleImageChange} /> {/* Campo para seleccionar una nueva imagen */}
                    </div>

                    {/* Botones para guardar cambios o cancelar */}
                    <div className="fromularioempleoo-botones">
                        <Button texto="Guardar cambios" className="texto-transformar" onClick={handleGuardarCambios} />
                        <Button texto="Cancelar" className="texto-transformar" onClick={() => navigate('/empleos')} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditarPublicacionEmpleo;
