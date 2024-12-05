import React, { useContext, useState, useEffect } from 'react';
import { BsThreeDots } from "react-icons/bs";
import Etiquetas from '../componente-label/Etiquetas';
import './PublicacionEmpleo.css';
import { usuarioContext } from '../../App';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import Swal from 'sweetalert2';

const PublicacionEmpleoNuevo = ({ datos, onEliminar }) => {
    const { usuarioLog } = useContext(usuarioContext);
    const [mostrarOpciones, setMostrarOpciones] = useState(false);
    const navigate = useNavigate(); // Hook para navegar
    const [esEstudianteEgresado, setEsEstudianteEgresado] = useState(true);

    
    
    const handleOpciones = () => {
        if (datos.id_usuario != usuarioLog) {
            //console.log("No puedes editar ni eliminar esta publicación");
            setMostrarOpciones(false);

        }else{
            setMostrarOpciones(!mostrarOpciones);
            //console.log("Mostrar opciones:", mostrarOpciones);
        }
    };

    const eliminarPublicacionEmpleo = async () => {
        try {
            console.log("Eliminando publicación con id:", datos.id_empleo);
            const response = await Axios.delete(`https://linked-back-spring-lake-433.fly.dev/empleos/${datos.id_empleo}`);
            console.log(response.data);
            onEliminar(datos.id_empleo); // Llama a la función onEliminar para actualizar la lista
            setMostrarOpciones(!mostrarOpciones);
            Swal.fire({
                icon: 'success',
                title: 'Empleo eliminado',
                text: 'La publicación de empleo ha sido eliminada exitosamente.'
            });
        } catch (err) {
            console.error('Error al eliminar la publicación:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo eliminar la publicación. Intente de nuevo.'
            });
        }
    };

    const editarPublicacionEmpleo = () => {
        // Navegar a la página de edición pasando todos los datos de la publicación como estado
        navigate(`/editar-publicacion-empleo/`, { state: datos });
    };

    const postularse = () => {
        navigate('/postulacion', { state: { id_empleo: datos.id_empleo } });
    };

    // Obtener los datos del usuario logeado
    const getUsuario = async () => {
        try {

            const response = await Axios.get(`https://linked-back-spring-lake-433.fly.dev/usuarios/${usuarioLog}`);
            //console.log('Usuario:', response.data.role);
            // Si el usuario no es un egresado o estudiante, redirige a la página de publicaciones empleo
            if (response.data.role !== 'Egresados' &&  response.data.role !== 'Estudiantes') {
                setEsEstudianteEgresado(false);                
            }
            
        } catch (err) {
            console.error('Error al obtener el usuario:', err);
        }
    };

    // Se ejecuta al cargar la página y obtiene los datos del usuario logeado
    useEffect(() => {
        getUsuario();
    }, []);
        


    const mostrarPostulantesSiendoReclutador = () => {
        navigate(`/postulantes-empleo/${datos.id_empleo}`, { state: datos });
    };

    return (
        <div className="PublicacionEmpleoNuevo-publicacion-container">
            <div className="PublicacionEmpleoNuevo-publicacion">
                <div className="PublicacionEmpleoNuevo-header">
                    <div className="PublicacionEmpleoNuevo-perfil">
                        <img src={datos.fotoPerfil} alt="Foto de Perfil" className="PublicacionEmpleoNuevo-foto-perfil" />
                        <p className="PublicacionEmpleoNuevo-usuario-publicacion-empleo">{datos.nombreUsuario}</p>
                    </div>

                    <BsThreeDots 
                        className="PublicacionEmpleoNuevo-icono-tres-puntos" 
                        size={20} 
                        onClick={handleOpciones} 
                    />
                    {mostrarOpciones && (
                        <div className="mostrar-publicacion-opciones-dropdown">
                            <button 
                                className="mostrar-publicacion-opcion-boton" 
                                onClick={editarPublicacionEmpleo}
                            >
                                Editar
                            </button>
                            <button 
                                className="mostrar-publicacion-opcion-boton" 
                                onClick={eliminarPublicacionEmpleo}
                            >
                                Eliminar
                            </button>
                            <button className='mostrar-publicacion-opcion-boton' onClick={mostrarPostulantesSiendoReclutador}>
                                Mostrar Postulantes
                            </button>
                        </div>
                    )}
                </div>

                <h1 className="PublicacionEmpleoNuevo-titulo-publicacion">{datos.tituloEmpleo}</h1>

                <div className="PublicacionEmpleoNuevo-detalle">
                    <h2>Detalles del empleo:</h2>
                    <p><strong><Etiquetas texto="Empresa" />:</strong> {datos.empresa}</p>
                    <p><strong><Etiquetas texto="Salario" />:</strong> {datos.salario}</p>
                    <p><strong><Etiquetas texto="Descripción" />:</strong> {datos.descripcion}</p>
                    <p><strong><Etiquetas texto="Ubicación (estado)" />:</strong> {datos.ubicacion}</p>
                    <p><strong><Etiquetas texto="Nivel de inglés requerido" />:</strong> {datos.nivelIngles}</p>
                </div>

                <div className="PublicacionEmpleoNuevo-boton-postularse-container">
                    {esEstudianteEgresado && (<button className="PublicacionEmpleoNuevo-boton-postularse" onClick={postularse}>Postularse</button>)}
                    
                    
                </div>
            </div>
        </div>
    );
};

export default PublicacionEmpleoNuevo;
