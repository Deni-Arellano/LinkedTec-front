import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion'; 
import Etiquetas from '../../components/componente-label/Etiquetas';
import CajaDeTexto from '../../components/componente-caja-de-texto/CajaDeTexto.jsx';
import Button from '../../components/boton/Boton';
import './EditarPublicacionEmpleo.css';

const EditarPublicacionEmpleo = () => {
    const { idEmpleo } = useParams(); 
    const navigate = useNavigate(); 

    const [titulo, setTitulo] = useState(''); // Cambiado a 'titulo'
    const [empresa, setEmpresa] = useState(''); 
    const [salario, setSalario] = useState(''); 
    const [descripcion, setDescripcion] = useState(''); 
    const [ubicacion, setUbicacion] = useState(''); 
    const [nivelDeIngles, setNivelDeIngles] = useState('Avanzado'); // Cambiado a 'nivelDeIngles'

    useEffect(() => {
        axios.get(`http://localhost:3000/empleos/${idEmpleo}`)
            .then(response => {
                const empleo = response.data;
                setTitulo(empleo.titulo); // Cambiado a 'titulo'
                setEmpresa(empleo.empresa);
                setSalario(empleo.salario);
                setDescripcion(empleo.descripcion);
                setUbicacion(empleo.ubicacion);
                setNivelDeIngles(empleo.nivel_de_ingles || 'Avanzado'); // Cambiado a 'nivel_de_ingles'
            })
            .catch(error => {
                console.error('Error al cargar los datos del empleo:', error);
                Swal.fire('Error', 'No se pudieron cargar los datos del empleo.', 'error');
            });
    }, [idEmpleo]);

    const handleGuardarCambios = () => {
        if (!titulo || !empresa || !salario || !descripcion || !ubicacion) {
            Swal.fire('Error', 'Todos los campos deben ser completados.', 'error');
            return;
        }

        const datosActualizados = {
            "titulo": titulo, // Cambiado a 'titulo'
            "empresa": empresa,
            "salario": salario,
            "descripcion": descripcion,
            "ubicacion": ubicacion,
            "nivel_de_ingles": nivelDeIngles // Cambiado a 'nivel_de_ingles'
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
