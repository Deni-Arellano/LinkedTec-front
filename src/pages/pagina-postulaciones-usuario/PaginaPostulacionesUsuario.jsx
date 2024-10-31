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

    const getPostulaciones = async () => {
        try {
            const response = await axios.get('http://localhost:3000/postulaciones/5?pagina=1&limite=10');
            console.log('Postulaciones:', response.data);
            setDatosPostulaciones(response.data.postulaciones || []); // Aseguramos que sea un arreglo
        } catch (err) {
            console.error('Error al obtener las postulaciones:', err);
        }
    };

    useEffect(() => {
        getPostulaciones();
    }, []);

    return (
        <>
            <MenuNavegacion />
            <div className="PostulacionesUsuario-contenedor">
                {datosPostulaciones.length > 0 ? (
                    datosPostulaciones.map(postulacion => (
                        <PostulacionUsuario
                            key={postulacion.id_postulacion}
                            datos={{
                                id_postulacion: postulacion.id_postulacion,
                                tituloEmpleo: postulacion.titulo,
                                empresa: postulacion.empresa,
                                salario: postulacion.salario,
                                descripcion: postulacion.descripcion,
                                ubicacion: postulacion.ubicacion,
                                nivelIngles: postulacion.nivel_de_ingles,
                                fotoPerfil: postulacion.fotoPerfil || 'https://via.placeholder.com/100',
                                nombreUsuario: `${postulacion.nombreUsuario || ''}`
                            }}
                            onEliminar={id => {
                                setDatosPostulaciones(prev => prev.filter(p => p.id_postulacion !== id));
                            }}
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
