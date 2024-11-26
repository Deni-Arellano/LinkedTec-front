import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion'; 
import Button from '../../components/boton/Boton'; 
import Etiquetas from '../../components/componente-label/Etiquetas'; 
import BotonPublicar from '../../components/boton-publicar-noticia/BotonPublicarNoticia.jsx'; 
import './Noticias.css'; 
import axios from 'axios';
import { usuarioContext } from '../../App'; 
import Swal from 'sweetalert2';
import { BsThreeDots } from "react-icons/bs"; 

const Noticias = ({ openReportModal }) => {
    const navigate = useNavigate();
    const { usuarioLog } = useContext(usuarioContext); 

    /** 
     * Estados para gestionar datos de noticias, usuarios y navegación de la paginación
     */
    const [datosNoticias, setDatosNoticias] = useState([]); 
    const [usuarios, setUsuarios] = useState([]); 
    const [usuarioLogueado, setUsuarioLogueado] = useState(null); 
    const [paginaActual, setPaginaActual] = useState(1); 
    const [paginaSiguiente, setPaginaSiguiente] = useState(null);
    const [paginaAnterior, setPaginaAnterior] = useState(null); 
    const [totalPaginas, setTotalPaginas] = useState(1); 
    const [menuAbierto, setMenuAbierto] = useState(null); 

    /**
     * Función para obtener noticias de la API
     * pagina - Número de página a obtener
     */
    const getNoticias = async (pagina = 1) => {
        try {
            const response = await axios.get(`http://localhost:3000/noticias?pagina=${pagina}`);
            const { noticias, total_paginas, pagina_siguiente, pagina_anterior } = response.data;
            setDatosNoticias(noticias);  
            setTotalPaginas(total_paginas);  
            setPaginaSiguiente(pagina_siguiente.exists ? pagina_siguiente.url : null);  
            setPaginaAnterior(pagina_anterior.exists ? pagina_anterior.url : null);
        } catch (err) {
            console.error('Error al obtener las noticias:', err);
        }
    };

    /**
     * Función para obtener todos los usuarios de la API
     * Esto permite asociar el nombre del usuario con sus publicaciones
     */
    const getUsuarios = async () => {
        try {
            const response = await axios.get('http://localhost:3000/usuarios');
            setUsuarios(response.data); 
        } catch (err) {
            console.error('Error al obtener los usuarios:', err);
        }
    };

    /**
     * Función para obtener la información del usuario logueado
     * Utiliza el contexto `usuarioLog` para obtener el ID y luego busca el usuario correspondiente.
     */
    const getUsuarioLogueado = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/usuarios/${usuarioLog}`);
            setUsuarioLogueado(response.data); 
        } catch (err) {
            console.error('Error al obtener la información del usuario logueado:', err);
        }
    };

    /**
     * Función para verificar si el usuario puede publicar una noticia.
     * Permite la publicación solo para reclutadores y docentes.
     */
    const manejarPublicarNoticia = () => {
        if (usuarioLogueado && (usuarioLogueado.role === 'Reclutadores' || usuarioLogueado.role === 'Docentes')) {
            navigate('/registro-noticia');  
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Solo reclutadores y docentes pueden publicar noticias",
            });
        }
    };

    /**
     * Función para cambiar la página actual al número de página dado en la URL
     * url - URL de la página siguiente o anterior para navegar
     */
    const cambiarPagina = (url) => {
        if (url) {
            const pagina = new URL(url).searchParams.get('pagina');  
            setPaginaActual(Number(pagina));  
            getNoticias(pagina);  
        }
    };

    /**
     * Alterna la visibilidad del menú de opciones en cada tarjeta de noticia
     * id_noticia - ID de la noticia cuyo menú de opciones se abrirá/cerrará
     */
    const toggleMenu = (id_noticia) => {
        setMenuAbierto(menuAbierto === id_noticia ? null : id_noticia);
    };

    const manejarEliminar = (id_noticia) => {
        console.log(`Eliminar noticia con id: ${id_noticia}`);
    };

    const manejarEditar = (id_noticia) => {
        navigate(`/editar-noticia/${id_noticia}`);
    };

    /**
     * Abre el modal de reporte para la noticia seleccionada
     *id_noticia - ID de la noticia a reportar
     */
    const manejarReportar = (id_noticia) => {
        openReportModal(id_noticia);
    };

    /**
     * Obtiene el nombre completo del usuario que publicó la noticia
     * id_usuario - ID del usuario autor de la noticia
     * return usuario Nombre completo del usuario o 'Usuario desconocido' si no se encuentra
     */
    const obtenerNombreUsuario = (id_usuario) => {
        const usuario = usuarios.find(user => user.id === id_usuario);
        return usuario ? `${usuario.nombre} ${usuario.apellido_paterno} ${usuario.apellido_materno}` : 'Usuario desconocido';
    };

    const obtenerImagenUsuario =  (id_usuario) => {
        const usuario = usuarios.find(user => user.id === id_usuario);
         return usuario ? usuario.imagen_usuario : 'https://res.cloudinary.com/dsysk6y0t/image/upload/v1730349588/images/eqgqstpaupuljmog2yi0.jpg';
    }

    /**
     * useEffect para inicializar la carga de datos al cargar el componente:
     * Obtiene noticias, usuarios, y los datos del usuario logueado.
     */
    useEffect(() => {
        getNoticias(paginaActual);
        getUsuarios(); 
        getUsuarioLogueado();
    }, []);  

    return (
        <>
            <MenuNavegacion /> 
            <div className="PublicacionNoticiaNuevo-boton-flotante">
                <BotonPublicar onClick={manejarPublicarNoticia} />
            </div>
        
            <div className="PublicacionNoticia-noticias-contenedor">
                {datosNoticias.length > 0 ? (
                    datosNoticias.map((noticia) => (
                        <div className="tarjeta-noticia" key={noticia.id_noticia}>
                            <div className="tarjeta-noticia-header">
                                <div className="usuario-perfil">
                                    <img
                                        src={obtenerImagenUsuario(noticia.id_usuario)}
                                        alt="100x100"
                                        className="imagen-perfil"
                                    />
                                    <Etiquetas tamano={16} texto={obtenerNombreUsuario(noticia.id_usuario)} id={`usuario-${noticia.id_noticia}`}/>
                                </div>
                                <p>{new Date(noticia.fecha_noticia).toLocaleDateString()}</p>
                                
                                <BsThreeDots className="mostrar-datos-usuario-icono-tres-puntos" size={20} onClick={() => toggleMenu(noticia.id_noticia)} />
                                
                                {menuAbierto === noticia.id_noticia && (
                                    <div className="mostrar-datos-usuario-opciones-dropdown">
                                        {usuarioLogueado?.id === noticia.id_usuario ? (
                                            <>
                                                <button className="mostrar-datos-usuario-opcion-boton" onClick={() => manejarEditar(noticia.id_noticia)}>Editar</button>
                                                <button className="mostrar-datos-usuario-opcion-boton" onClick={() => manejarEliminar(noticia.id_noticia)}>Eliminar</button>
                                            </>
                                        ) : (
                                            <button className="mostrar-datos-usuario-opcion-boton" onClick={() => manejarReportar(noticia.id_noticia)}>Reportar</button> 
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="tarjeta-noticia-cuerpo">
                                <Etiquetas 
                                    tamano={24} 
                                    texto={noticia.titulo_noticia} 
                                    id={`titulo-${noticia.id_noticia}`} 
                                    className="titulo-centrado" 
                                />

                                <Etiquetas tamano={16} texto="Descripción:" id={`descripcion-label-${noticia.id_noticia}`} />
                                <p>{noticia.descripcion}</p>

                                <img 
                                    src={noticia.imagen_noticia || 'https://via.placeholder.com/600x400'} 
                                    alt="Imagen de noticia" 
                                    className="imagen-noticia" 
                                />
                                
                                <Etiquetas tamano={16} texto="Categoría:" id={`categoria-label-${noticia.id_noticia}`} />
                                <p>{noticia.categoria_noticia}</p>

                                <a 
                                    href={noticia.enlace_noticia} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="leer-mas"
                                >
                                    Leer más
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay noticias disponibles</p>
                )}
            </div>
            
            <div className="paginacion">
                <Button 
                    texto="Anterior" 
                    onClick={() => cambiarPagina(paginaAnterior)} 
                    disabled={!paginaAnterior}  
                />
                <span>Página {paginaActual} de {totalPaginas}</span>
                <Button 
                    texto="Siguiente" 
                    onClick={() => cambiarPagina(paginaSiguiente)} 
                    disabled={!paginaSiguiente}  
                />
            </div>
        </>
    );
};

export default Noticias;
