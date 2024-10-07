import React, { useContext, useState, useEffect } from 'react';
import MenuNavegacion from "../componetes/MenuNavegacion";
import Crearpubli from "../componetes/Crear-Publicacion";
import '../hojas-de-estilo/Publicaciones.css';
import Axios from 'axios';

import {usuarioContext} from '../App';


const PubliUsuarios = () => {
    const {usuarioLog, setUsuarioLog} = useContext(usuarioContext);
    const [esReclutador, setEsReclutador] = useState(false);
    
    console.log("Usuario en Publicaciones: ", usuarioLog)

        // Obtiene los datos de un usuario por su id
        const getUsuarios = async (id) => {
            try {
                const response = await Axios.get(`http://localhost:3000/usuarios/${id}`);
                console.log("Datos del usuarioen el get:", response.data);
                return [response.data.nombre, response.data.apellido_paterno, response.data.apellido_materno, response.data.imagen_usuario, response.data.role];
            } catch (err) {
                console.error('Error al obtener el usuario:', err);
                return [];
            }
        };
    
        useEffect(() => {
            const verificarRolUsuario = async () => {
                const datosUsuario = await getUsuarios(usuarioLog);
                if (datosUsuario[4] === 'Reclutadores') {
                    setEsReclutador(true); 
                }
            };
            verificarRolUsuario();
        }, [usuarioLog]);


    return (
        <>
        <div className="Menu-principal">
            <MenuNavegacion/>
            
        </div>

        <div className="Crear-publicacion">
                {!esReclutador && ( //Si no es reclutador se mostrara el componente de craear publicacion
                    <Crearpubli />
                )}
            </div>

        </>
    )
}

export default PubliUsuarios;