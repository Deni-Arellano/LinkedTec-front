import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion'; 
import BotonPublicar from '../../components/boton-publicar-noticia/BotonPublicarNoticia.jsx'; 
import PublicacionNoticiaNuevo from '../../components/publicacion-noticia/PublicacionNoticia'; 
import './Noticias.css'; 
import axios from 'axios';

const Noticias = () => {
    const navigate = useNavigate();
    const [datosNoticias, setDatosNoticias] = useState([]);

    const getNoticias = async () => {
        try {
            const response = await axios.get('http://localhost:3000/noticias/');
            setDatosNoticias(response.data); 
        } catch (err) {
            console.error('Error al obtener las noticias:', err);
        }
    };
    useEffect(() => {
        getNoticias();
    }, []); 

    const manejarPublicarNoticia = () => {
        navigate('/registro-noticia');  
    };

    return (
        <>
            <MenuNavegacion /> 
            <div className="PublicacionNoticiaNuevo-boton-flotante">
                <BotonPublicar onClick={manejarPublicarNoticia} />
            </div>
        
            <div className="PublicacionNoticia-noticias-contenedor">
                {datosNoticias.length > 0 ? (
                    datosNoticias.map((noticia) => (
                        <PublicacionNoticiaNuevo
                            key={noticia.id_noticia}
                            datos={{
                                id_noticia: noticia.id_noticia,
                                titulo: noticia.titulo_noticia,         
                                descripcion: noticia.descripcion,
                                enlace: noticia.enlace_noticia,           
                                categoria: noticia.categoria_noticia,    
                                imagen: noticia.imagen_noticia          
                            }}
                        />
                    ))
                ) : (
                    <p>No hay noticias</p>
                )}
            </div>
        </>
    );
};

export default Noticias;
