import React, { useState, useContext, useEffect, useRef,useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import { usuarioContext } from '../../App';
import Swal from 'sweetalert2';
import Textbox from '../../components/componente-caja-de-texto/CajaDeTexto.jsx';
import Textarea from '../../components/componente-text-area/text-area.jsx';
import Label from '../../components/componente-label/Etiquetas.jsx';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion';
import './Postulacion.css';
import { GrDocumentPdf } from "react-icons/gr";



const Postulacion = () => {
    const { usuarioLog } = useContext(usuarioContext);
    const navigate = useNavigate();

    // Estados para los datos de la postulación
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const CV = useRef(null); 
    const [fileSelected, setFileSelected] = useState(false);

    const location = useLocation();
    const { id_empleo } = location.state || {};

    // Función para regresar a las publicaciones de empleos
    const handleBack = () => {
        console.log("Navegando a /empleos");
        navigate('/empleos');
    };

    // Función para manejar el cambio de archivo CV
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            //console.log("Archivo seleccionado: ", file.name);
            //console.log(file.type)
            if (file.type !=='application/pdf'){
                excepciones('Selecciona un archivo PDF')
                setFileSelected(false)
            }else{
                setFileSelected(true);

            }
            
        }else{
            setFileSelected(false)
        }
    };


    // Obtener los datos del usuario logeado
    const getUsuario = useCallback(async () => {
        try {
            const response = await Axios.get(`https://linked-back-spring-lake-433.fly.dev/usuarios/${usuarioLog}`);
            // Si el usuario no es un egresado o estudiante, redirige a la página de publicaciones empleo
            if (response.data.role !== 'Egresados' && response.data.role !== 'Estudiantes') {
                navigate('/empleos');
            }
            
            const usuario = response.data;
            // Asignar los valores obtenidos a los estados
            setNombre(usuario.nombre + ' ' + usuario.apellido_paterno + ' ' + usuario.apellido_materno);
            setCorreo(usuario.correo);
        } catch (err) {
            if (usuarioLog === null) {
                navigate('/empleos');
            
        }}
    }, [usuarioLog, navigate]);
    // Se ejecuta al cargar la página y obtiene los datos del usuario logeado
    useEffect(() => {
        getUsuario();
    }, [getUsuario]);

    const excepciones = (mensaje) => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: mensaje
        });

    }

    const confirmarPostulacion = async () => {
        const resultado = await Swal.fire({
            icon: "question",
            title: "¿Deseas continuar con la postulación?",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "No"
        });
    
        if (resultado.isConfirmed) {
            postularse();
        } 
    };   
    
    const subirArchivo = async () => {
        const archivo = CV.current.files[0];
        
        const formData = new FormData();
        formData.append('archivo', archivo);

        try {
            const respuesta = await Axios.post('https://linked-back-spring-lake-433.fly.dev/subidas/subir-archivo', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            return { 
                success: true, 
                data: respuesta.data.data}; 
            
        } catch (error) {
            //console.log(error)
            return {
                success: false,
                mensaje: error.response?.data?.mensaje || 'Error al subir el archivo.'
            };
        }
    }


    const postularse = async () => {

        if (!fileSelected) {
            excepciones('Debes seleccionar un archivo PDF');
            return;
        }

        const file = CV.current.files[0];
        if (file) {
            //console.log(file.size);
            const tamañofile = (file.size / (1024 * 1024)).toFixed(2); // Convierte el tamaño a MB
            //console.log("El tamaño del archivo es: " + tamañofile + " MB");
            if (tamañofile > 5) {
                excepciones("El archivo es demasiado grande. Debe ser menor a 5MB.");
                setFileSelected(false); 
                return;
            }
        }

        if (!nombre) {
            excepciones('El nombre no puede estar vacío');
            return;
        }

        if (!correo) {
            excepciones('El correo no puede estar vacío');
            return;
        }

        if (correo.length > 40) {
            excepciones('El correo no puede tener más de 40 caracteres');
            return;
        }

        const obtenerEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!obtenerEmail.test(correo)) {
            excepciones('El formato del correo no es válido');
            return;
        }
            

        if (!descripcion) {
            excepciones('La descripción no puede estar vacía');
            return;
        }

        if (descripcion.length > 500) {
            excepciones('La descripción no puede tener más de 500 caracteres');
            return;
        }


        if (!fileSelected) {
            excepciones('Debes seleccionar un archivo PDF');
            return;
        }

        //Subir archivo
        const resultadoSubirPDF= await subirArchivo()

        if (resultadoSubirPDF.success){
            
        } else{
            excepciones(resultadoSubirPDF.mensaje)
            return;
        }

        //Datos para mandar al backend
        const datosEnviar={
            "id_usuario": usuarioLog, 
            "id_empleo": id_empleo,
            "descripcion_personal": descripcion,
            "cv": {
              "id_recurso": resultadoSubirPDF.data.asset_id,              
              "id_publico": resultadoSubirPDF.data.public_id,
              "formato": "pdf",
              "tipo_recurso": "archivo",
              "fecha_creacion": resultadoSubirPDF.data.created_at,
              "url_segura": resultadoSubirPDF.data.secure_url,
              "carpeta": "files",
              "nombre_original": resultadoSubirPDF.data.original_filename,
              "tipo_subida": "archivo"
            },
            "id_estado": 1
          }

        console.log('Datos a enviar', datosEnviar)

        //Petición para agregar postulación   
        try {
            await Axios.post(`https://linked-back-spring-lake-433.fly.dev/postulaciones/`, datosEnviar);
            Swal.fire('Postulación realizada', 'La postulación ha sido realizada con éxito', 'success');
            handleBack();
        } catch (error) {
            
            if (error.response) {
                excepciones(error.response.data.error);
            }
        }
        


        
    };

    return (
        <>  
        <div className='postulacion-contenedor-global'>
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
                            
                            <input value={nombre} placeholder='Nombre' disabled className='postulacion-inputs' />
                            

                        </div>
                        <div className='postulacion-general'>
                            <Label texto='Correo' />
                            
                            <input value={correo} placeholder='Correo' disabled  className='postulacion-inputs'/>
                            
                        </div>
                        <div className='postulacion-general'>
                            <Label texto='Descripción' />
                            <Textarea className='text-area-postulacion' value={descripcion} placeholder='Descripción personal' onChange={(e) => setDescripcion(e.target.value)} />
                        </div>


                        <div className='botones-postulacion'>
                            <button type="button" className="postulacion-boton-cancelar" onClick={handleBack}>Cancelar</button>
                            <button type="button" className="postulacion-boton-postularse" onClick={confirmarPostulacion}>Postularse</button>     
                        </div>
                    </div>

                </div>
            </div>
            </div>

        </>
    );
};

export default Postulacion;
