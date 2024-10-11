import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion'; 
import BotonPublicar from '../../components/boton-publicar-noticia/BotonPublicarNoticia.jsx'; 
import PublicacionNoticiaNuevo from '../../components/publicacion-noticia/PublicacionNoticia'; 
import './Noticias.css'; 
import { usuarioContext } from '../../App';
import axios from 'axios';
import Swal from 'sweetalert2';

const Noticias = () => {
    const navigate = useNavigate();
    const { usuarioLog } = useContext(usuarioContext);
    const [datosNoticias, setDatosNoticias] = useState([]);
    const [componentesNoticias, setComponentesNoticias] = useState([]); 
    const getNoticias = async () => {
        try {
            const response = await axios.get('http://localhost:3000/noticias/');
            setDatosNoticias(response.data);
        } catch (err) {
            console.error('Error al obtener las noticias:', err);
        }
    };
    const getUsuarios = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/usuarios/${id}`);
            return [response.data.nombre, response.data.apellido_paterno, response.data.apellido_materno, response.data.imagen_usuario];
        } catch (err) {
            console.error('Error al obtener el usuario:', err);
            return [];
        }
    };
    useEffect(() => {
        getNoticias();
    }, []);

    useEffect(() => {
        const generarComponentesNoticias = async () => {
            const componentesNoticiasPromises = datosNoticias.map(async (noticia) => {
                const datosUsuario = await getUsuarios(noticia.id_usuario); 

            return (
                    <PublicacionNoticiaNuevo
                        key={noticia.id_noticia}
                        datos={{
                            id_noticia: noticia.id_noticia,
                            titulo: noticia.titulo,
                            descripcion: noticia.descripcion,
                            enlace: noticia.enlace,
                            categoria: noticia.categoria,
                            fotoPerfil: datosUsuario[3] || 'https://via.placeholder.com/100', 
                            nombreUsuario: `${datosUsuario[0] || ''} ${datosUsuario[1] || ''} ${datosUsuario[2] || ''}`
                        }}

                        onEliminar={id => {
                            setDatosNoticias(prevNoticias => prevNoticias.filter(noticia => noticia.id_noticia !== id));
                        }}
                    />
                );
            });

            const componentes = await Promise.all(componentesNoticiasPromises); 
            setComponentesNoticias(componentes); 
        };

        generarComponentesNoticias();
       
    }, [datosNoticias]); 
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
                {componentesNoticias.length > 0 ? componentesNoticias : <p>No hay noticias</p>}
            </div>
        </>
    );
};

export default Noticias;
