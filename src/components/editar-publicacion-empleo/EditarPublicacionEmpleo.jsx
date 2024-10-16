import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion'; 
import Etiquetas from '../../components/componente-label/Etiquetas';
import CajaDeTexto from '../../components/componente-caja-de-texto/CajaDeTexto.jsx';
import Button from '../../components/boton/Boton';
import './EditarPublicacionEmpleo.css';

const EditarPublicacionEmpleo = () => {
    const { idEmpleo } = useParams(); 
    const location = useLocation();  // Obtener los datos pasados desde la publicación
    const navigate = useNavigate(); 

    const datos = location.state; // Capturar los datos de la publicación

    // Asegúrate de que los datos estén presentes antes de inicializar los estados
    useEffect(() => {
        if (!datos) {
            Swal.fire('Error', 'No se recibieron los datos de la publicación.', 'error');
            navigate('/empleos');  // Redirige si no hay datos
        }
    }, [datos, navigate]);

    // Inicializamos los estados con los datos recibidos de la publicación
    const [titulo, setTitulo] = useState(datos?.tituloEmpleo || ''); 
    const [empresa, setEmpresa] = useState(datos?.empresa || ''); 
    const [salario, setSalario] = useState(datos?.salario || ''); 
    const [descripcion, setDescripcion] = useState(datos?.descripcion || ''); 
    const [ubicacion, setUbicacion] = useState(datos?.ubicacion || ''); 
    const [nivelDeIngles, setNivelDeIngles] = useState(datos?.nivelIngles || 'Avanzado');
    const [image, setImage] = useState(datos?.fotoPerfil || null); // Cargar la imagen de la publicación

    // Función para manejar el cambio de imagen
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Esto previsualiza la imagen seleccionada
            };
            reader.readAsDataURL(file); // Lee el archivo de imagen seleccionado
        }
    };

    const handleGuardarCambios = () => {
        if (!titulo || !empresa || !salario || !descripcion || !ubicacion) {
            Swal.fire('Error', 'Todos los campos deben ser completados.', 'error');
            return;
        }

        const datosActualizados = {
            "titulo": titulo,
            "empresa": empresa,
            "salario": salario,
            "descripcion": descripcion,
            "ubicacion": ubicacion,
            "nivel_de_ingles": nivelDeIngles,
            "fotoPerfil": image // Añadir la imagen al objeto de datos
        };

        axios.patch(`http://localhost:3000/empleos/${idEmpleo}`, datosActualizados)
            .then(response => {
                Swal.fire('Éxito', 'La publicación de empleo ha sido actualizada.', 'success');
                navigate('/empleos'); 
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
                    <Etiquetas tamano={20} texto="Editar publicación de empleo" id="fromularioempleoo-titulo-publicacion-empleo" className="texto-transformar" />
                    &nbsp;

                    {/* Campo para Título de empleo */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Título empleo:" className="texto-transformar" />
                        <CajaDeTexto
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Escribe el título del empleo"
                        />
                    </div>

                    {/* Campo para Empresa */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Empresa:" className="texto-transformar" />
                        <CajaDeTexto
                            value={empresa}
                            onChange={(e) => setEmpresa(e.target.value)}
                            placeholder="Nombre de la empresa"
                        />
                    </div>

                    {/* Campo para Salario */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Salario:" className="texto-transformar" />
                        <CajaDeTexto
                            value={salario}
                            onChange={(e) => setSalario(e.target.value)}
                            placeholder="Salario del puesto"
                        />
                    </div>

                    {/* Campo para Descripción */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Descripción:" className="texto-transformar" />
                        <textarea
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            placeholder="Descripción del empleo"
                            rows="5"
                            className="fromularioempleoo-descripcion-textarea"
                        />
                    </div>

                    {/* Campo para Ubicación */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Ubicación (estado):" className="texto-transformar" />
                        <CajaDeTexto
                            value={ubicacion}
                            onChange={(e) => setUbicacion(e.target.value)}
                            placeholder="Ubicación del empleo"
                        />
                    </div>

                    {/* Selección de Nivel de Inglés */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Nivel de inglés requerido:" className="texto-transformar" />
                        <select
                            value={nivelDeIngles}
                            onChange={(e) => setNivelDeIngles(e.target.value)}
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
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </div>

                    {/* Botones */}
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
