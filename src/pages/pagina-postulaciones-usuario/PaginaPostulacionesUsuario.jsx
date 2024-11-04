import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion';
import PostulacionUsuario from '../../components/componente-postulacion-usuario/Postulacion-usuario';
import './PaginaPostulacionesUsuario.css';
import { usuarioContext } from '../../App';
import axios from 'axios';

const PaginasPostulacionesUsuario = () => {
    const navigate = useNavigate();
    const { usuarioLog } = useContext(usuarioContext);
    const [datosPostulaciones, setDatosPostulaciones] = useState([]);
    const [componentesPostulaciones, setComponentesPostulaciones] = useState([]); 
    const [componentesPostulaciones, setComponentesPostulaciones] = useState([]);

    // Obtiene las postulaciones del usuario logueado
    // Obtiene todas las postulaciones del usuario con id 5
    const getPostulaciones = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/postulaciones/${usuarioLog.id}?pagina=1&limite=10`);
            console.log('Postulaciones:', response.data);
            setDatosPostulaciones(response.data.postulaciones || []);
        } catch (err) {
            console.error('Error al obtener las postulaciones:', err);
        }
    };

    const handleEliminarPostulacion = async (id_postulacion) => {
        try {
            await axios.delete(`http://localhost:3000/postulaciones/${id_postulacion}`);
            setDatosPostulaciones(prev => prev.filter(postulacion => postulacion.id_postulacion !== id_postulacion));
        } catch (error) {
            console.error('Error al eliminar la postulación:', error);
        }
    };

    useEffect(() => {
        if (usuarioLog) {
            getPostulaciones();
        }
    }, [usuarioLog]);

    return (
        <>
            <MenuNavegacion />
            <div className="PostulacionesUsuario-contenedor">
                {datosPostulaciones.length > 0 ? (
                    datosPostulaciones.map(postulacion => (
                        <PostulacionUsuario
                            key={postulacion.id_postulacion}
                            idPostulacion={postulacion.id_postulacion} // Pasamos el ID de la postulación
                            onEliminar={handleEliminarPostulacion}
                        />
                    ))
                ) : (
                    <div className="mensaje-sin-postulaciones">
                        <p>No hay postulaciones disponibles</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default PaginasPostulacionesUsuario;
