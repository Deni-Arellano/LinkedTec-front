import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion';
import BotonPublicar from '../../components/boton-publicar-empleo/BotonPublicarEmpleo';
import BotonPostulaciones from '../../components/boton-postulaciones/BotonPostulaciones';
import PublicacionEmpleoNuevo from '../../components/publicacion-empleo/PublicacionEmpleo';
import './empleos.css';
import { usuarioContext } from '../../App';
import axios from 'axios';
import Swal from 'sweetalert2';

const PublicacionEmpleo = () => {
    const navigate = useNavigate();
    const { usuarioLog } = useContext(usuarioContext);
    const [datosEmpleos, setDatosEmpleos] = useState([]);
    const [componentesEmpleos, setComponentesEmpleos] = useState([]);

    // Obtiene todos los empleos
    const getEmpleos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/empleos/');
            setDatosEmpleos(response.data);
        } catch (err) {
            console.error('Error al obtener los empleos:', err);
        }
    };

    // Obtiene los datos de un usuario por su id
    const getUsuarios = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/usuarios/${id}`);
            return [response.data.nombre, response.data.apellido_paterno, response.data.apellido_materno, response.data.imagen_usuario, response.data.role];
        } catch (err) {
            console.error('Error al obtener el usuario:', err);
            return [];
        }
    };

    // Ejecuta `getEmpleos` al cargar la página
    useEffect(() => {
        getEmpleos();
    }, []);

    // Genera componentes para cada empleo
    useEffect(() => {
        const generarComponentesEmpleos = async () => {
            const componentesEmpleosPromises = datosEmpleos.empleos.map(async (empleo) => {
                const datosUsuario = await getUsuarios(empleo.id_usuario);

                return (
                    <PublicacionEmpleoNuevo
                        key={empleo.id_empleo}
                        datos={{
                            id_empleo: empleo.id_empleo,
                            tituloEmpleo: empleo.titulo,
                            empresa: empleo.empresa,
                            salario: empleo.salario,
                            descripcion: empleo.descripcion,
                            ubicacion: empleo.ubicacion,
                            nivelIngles: empleo.nivel_de_ingles,
                            fotoPerfil: datosUsuario[3] || 'https://via.placeholder.com/100',
                            nombreUsuario: `${datosUsuario[0] || ''} ${datosUsuario[1] || ''} ${datosUsuario[2] || ''}`,
                            id_usuario: empleo.id_usuario,
                        }}
                        onEliminar={(id) => {
                            setDatosEmpleos((prevEmpleos) => ({
                                ...prevEmpleos,
                                empleos: prevEmpleos.empleos.filter((empleo) => empleo.id_empleo !== id),
                            }));
                        }}
                    />
                );
            });

            const componentes = await Promise.all(componentesEmpleosPromises);
            setComponentesEmpleos(componentes);
        };

        if (datosEmpleos && datosEmpleos.empleos) {
            generarComponentesEmpleos();
        }
    }, [datosEmpleos]);

    // Función para manejar la navegación a la página de postulaciones
    const manejarVerPostulaciones = () => {
        navigate('/pagina-postulaciones-usuario');
    };

    // Función para publicar un empleo
    const manejarPublicarEmpleo = async () => {
        const datosUsuario = await getUsuarios(usuarioLog);
        if (datosUsuario[4] === 'Reclutadores') {
            navigate('/registro-empleo');
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No puedes crear un empleo porque no eres reclutador.",
            });
        }
    };

    return (
        <>
            <MenuNavegacion />
            <div className="PublicacionEmpleoNuevo-boton-flotante">
                <BotonPublicar onClick={manejarPublicarEmpleo} />
                <BotonPostulaciones onClick={manejarVerPostulaciones} />
            </div>

            <div className="PublicacionEmpleo-empleos-contenedor">
                {componentesEmpleos.length > 0 ? componentesEmpleos : <p>No hay empleos disponibles</p>}
            </div>
        </>
    );
};

export default PublicacionEmpleo;
