import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { usuarioContext } from '../../App';
import Swal from 'sweetalert2';
import Textbox from '../../components/componente-caja-de-texto/CajaDeTexto.jsx';
import Button from '../../components/boton/Boton.jsx';
import Textarea from '../../components/componente-text-area/text-area.jsx';
import Label from '../../components/componente-label/Etiquetas.jsx';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion';
import './Postulacion.css';
import { GrDocumentPdf } from "react-icons/gr";

const Postulacion = () => {
    const { usuarioLog, setUsuarioLog } = useContext(usuarioContext);
    const navigate = useNavigate();

    // Estados para los datos de la postulación
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const CV = useRef(null); 
    const [fileSelected, setFileSelected] = useState(false);

    // Función para regresar a las publicaciones de empleos
    const handleBack = () => {
        console.log("Navegando a /empleos");
        navigate('/empleos');
    };

    // Función para manejar el cambio de archivo CV
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("Archivo seleccionado: ", file.name);
            setFileSelected(true);
        }
    };

    // Obtener los datos del usuario logeado
    const getUsuario = async () => {
        try {
            const response = await Axios.get(`http://localhost:3000/usuarios/${usuarioLog}`);
            //console.log('Usuario:', response.data.role);
            // Si el usuario no es un egresado o estudiante, redirige a la página de publicaciones empleo
            if (response.data.role !== 'Egresados' && response.data.role !== 'Estudiantes') {
                navigate('/empleos');
            }
            
            const usuario = response.data;
            // Asignar los valores obtenidos a los estados
            setNombre(usuario.nombre + ' ' + usuario.apellido_paterno + ' ' + usuario.apellido_materno);
            setCorreo(usuario.correo);
        } catch (err) {
            console.error('Error al obtener el usuario:', err);
        }
    };

    // Se ejecuta al cargar la página y obtiene los datos del usuario logeado
    useEffect(() => {
        getUsuario();
    }, []);

    return (
        <>
            <MenuNavegacion />
            <div className="postulacion-contenedor-pagina">
                <div className="postulacion-contenedor">
                    <h1 className='postulacion-titulo'>Postulación de empleo</h1>
                    <div className='formulario-postulacion'>
                        <div className='postulacion-general'>
                            <Label texto='CV' />
                            <button
                                className={`boton-subir-cv ${fileSelected ? 'cv-seleccionado' : ''}`}
                                onClick={() => CV.current?.click()}>
                                <GrDocumentPdf className='icono-pdf-cv' /> Adjuntar CV
                            </button>
                            <input
                                type='file'
                                className='subir-cv'
                                onChange={handleFileChange}
                                ref={CV}
                            />
                        </div>

                        <div className='postulacion-general'>
                            <Label texto='Nombre' />
                            <Textbox value={nombre} placeholder='Nombre' disabled />

                        </div>
                        <div className='postulacion-general'>
                            <Label texto='Correo' />
                            <Textbox value={correo} placeholder='Correo' disabled />
                        </div>
                        <div className='postulacion-general'>
                            <Label texto='Descripción' />
                            <Textarea className='text-area-postulacion' value={descripcion} placeholder='Descripción personal' onChange={(e) => setDescripcion(e.target.value)} />
                        </div>


                        <div className='botones-postulacion'>
                            <button type="button" className="postulacion-boton-postularse">Postularse</button>
                            <button type="button" className="postulacion-boton-cancelar" onClick={handleBack}>Cancelar</button>
                        </div>
                    </div>

                </div>
            </div>

        </>
    );
};

export default Postulacion;
