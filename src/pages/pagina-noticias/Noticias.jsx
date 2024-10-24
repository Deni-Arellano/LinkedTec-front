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

const Noticias = () => {
    const navigate = useNavigate();
    const { usuarioLog } = useContext(usuarioContext); 
    const [datosNoticias, setDatosNoticias] = useState([]);
    const [usuarioLogueado, setUsuarioLogueado] = useState(null);
    const [paginaActual, setPaginaActual] = useState(1); 
    const [paginaSiguiente, setPaginaSiguiente] = useState(null);
    const [paginaAnterior, setPaginaAnterior] = useState(null);
    const [totalPaginas, setTotalPaginas] = useState(1); 
    const [menuAbierto, setMenuAbierto] = useState(null); // Para controlar qué menú está abierto

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

    const getUsuarioLogueado = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/usuarios/${usuarioLog}`);
            setUsuarioLogueado(response.data); 
        } catch (err) {
            console.error('Error al obtener la información del usuario logueado:', err);
        }
    };

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

    const cambiarPagina = (url) => {
        if (url) {
            const pagina = new URL(url).searchParams.get('pagina');  
            setPaginaActual(Number(pagina));  
            getNoticias(pagina);  
        }
    };

    const toggleMenu = (id_noticia) => {
        setMenuAbierto(menuAbierto === id_noticia ? null : id_noticia); // Cambiar entre abrir/cerrar el menú
    };

    const manejarEliminar = (id_noticia) => {
        // Función para manejar la eliminación de una noticia
        console.log(`Eliminar noticia con id: ${id_noticia}`);
    };

    const manejarEditar = (id_noticia) => {
        // Función para manejar la edición de una noticia
        console.log(`Editar noticia con id: ${id_noticia}`);
        navigate(`/editar-noticia/${id_noticia}`);
    };

    const manejarReportar = (id_noticia) => {
        navigate('/reportar-contenido');  
    };

    useEffect(() => {
        getNoticias(paginaActual);
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
                                        src={'https://via.placeholder.com/100x100.png?text=100+x+100'}
                                        alt="100x100"
                                        className="imagen-perfil"
                                    />
                                    <Etiquetas tamano={16} texto={noticia.usuario || 'Usuario desconocido'} id={`usuario-${noticia.id_noticia}`} />
                                </div>
                                <p>{new Date(noticia.fecha_noticia).toLocaleDateString()}</p>
                                
                                <div className="menu-opciones">
                                    <button className="menu-tres-puntos" onClick={() => toggleMenu(noticia.id_noticia)}>⋮</button>
                                    {menuAbierto === noticia.id_noticia && (
                                        <div className="menu-desplegable">
                                            {usuarioLogueado?.id_usuario === noticia.id_usuario ? (
                                                <>
                                                    <button onClick={() => manejarEditar(noticia.id_noticia)}>Editar</button>
                                                    <button onClick={() => manejarEliminar(noticia.id_noticia)}>Eliminar</button>
                                                </>
                                            ) : (
                                                <button onClick={() => manejarReportar(noticia.id_noticia)}>Reportar</button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="tarjeta-noticia-cuerpo">
                                <Etiquetas tamano={20} texto={noticia.titulo_noticia} id={`titulo-${noticia.id_noticia}`} className="titulo-centrado" />
                                <p><strong>Descripción:</strong> {noticia.descripcion}</p>
                                <img 
                                    src={noticia.imagen_noticia || 'https://via.placeholder.com/600x400'} 
                                    alt="Imagen de noticia" 
                                    className="imagen-noticia" 
                                />
                                <p><strong>Categoría:</strong> {noticia.categoria_noticia}</p>
                                <p>
                                    <a 
                                        href={noticia.enlace_noticia} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="leer-mas"
                                    >
                                        Leer más
                                    </a>
                                </p>
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
