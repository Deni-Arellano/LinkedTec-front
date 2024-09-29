import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import MenuNavegacion from '../componetes/MenuNavegacion'; 
import BotonPublicar from '../componetes/BotonPublicarEmpleo'; 
import PublicacionEmpleoNuevo from '../componetes/PublicacionEmpleo'; 
import '../hojas-de-estilo/PublicacionEmpleo.css'; 
import { usuarioContext } from '../App';
import axios from 'axios';


const datosFicticios = {
    tituloEmpleo: 'Desarrollador Frontend',
    empresa: 'Tech Inc.',
    salario: '$50,000 - $70,000',
    descripcion: 'Buscamos un desarrollador frontend con experiencia en React y habilidades sólidas en HTML, CSS y JavaScript.',
    ubicacion: 'Ciudad de México',
    nivelIngles: 'Avanzado',
    fotoPerfil: 'https://via.placeholder.com/100', 
    nombreUsuario: 'Juan Pérez' 
};

const PublicacionEmpleo = () => {
    const navigate = useNavigate();
    const { usuarioLog } = useContext(usuarioContext);
    const [datosEmpleos, setDatosEmpleos] = useState([]);
    const [componentesEmpleos, setComponentesEmpleos] = useState([]); 

    //Obtiene todos los empleos
    const getEmpleos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/empleos/');
            console.log("Datos de empleos:", response.data);
            setDatosEmpleos(response.data);
        } catch (err) {
            console.error('Error al obtener los empleos:', err);
        }
    };

    // Obtiene los datos de un usuario por su id
    const getUsuarios = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/usuarios/${id}`);
            console.log("Datos del usuario:", response.data);
            return [response.data.nombre, response.data.apellido_paterno, response.data.apellido_materno, response.data.imagen_usuario];
        } catch (err) {
            console.error('Error al obtener el usuario:', err);
            return [];
        }
    };

    //Obtiene los datos de los empleos al cargar la página
    useEffect(() => {
        getEmpleos();
    }, []);

    // Genera los componentes para cada empleo
    useEffect(() => {
        const generarComponentesEmpleos = async () => {
            const componentesEmpleosPromises = datosEmpleos.map(async (empleo) => {
                const datosUsuario = await getUsuarios(empleo.id_usuario); 

                return (
                    <PublicacionEmpleoNuevo
                        key={empleo.id}
                        datos={{
                            tituloEmpleo: empleo.titulo,
                            empresa: empleo.empresa,
                            salario: empleo.salario,
                            descripcion: empleo.descripcion,
                            ubicacion: empleo.ubicacion,
                            nivelIngles: empleo.nivel_de_ingles,
                            fotoPerfil: datosUsuario[3] || 'https://via.placeholder.com/100', 
                            nombreUsuario: `${datosUsuario[0] || ''} ${datosUsuario[1] || ''} ${datosUsuario[2] || ''}`
                        }}
                    />
                );
            });

            const componentes = await Promise.all(componentesEmpleosPromises); 
            setComponentesEmpleos(componentes); 
        };

        if (datosEmpleos.length > 0) {
            generarComponentesEmpleos();
        }
    }, [datosEmpleos]); 

    return (
        <>
            <MenuNavegacion /> 
            <div className="PublicacionEmpleoNuevo-boton-flotante">
                <BotonPublicar onClick={() => navigate('/FormularioPublicacionEmpleo')} />
            </div>
        
            <div className="PublicacionEmpleo-empleos-contenedor">
                
                {componentesEmpleos.length > 0 ? componentesEmpleos : <p>No hay empleos disponibles</p>}
            </div>
        </>
    );
};

export default PublicacionEmpleo;
