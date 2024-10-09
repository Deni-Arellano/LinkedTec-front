
import React, { useContext, useState } from 'react';
import { BsThreeDots } from "react-icons/bs";
import Etiquetas from '../../componetes/Etiquetas';
import '../components/publicacionempleo/PublicacionEmpleo.css';
import { usuarioContext } from '../../App';
import Axios from 'axios';

const PublicacionEmpleoNuevo = ({ datos, onEliminar }) => {
    console.log("Datos de la publicacion", datos);
    const { usuarioLog, setUsuarioLog } = useContext(usuarioContext);
    const [mostrarOpciones, setMostrarOpciones] = useState(false);

    const handleOpciones = () => {
        setMostrarOpciones(!mostrarOpciones);
    };

    const eliminarPublicacionEmpleo = async () => { //Elimioina el empleo seleccionadop al dar en Eliminar
        try {
            console.log("Eliminando publicación con id:", datos.id_empleo);
            const response = await Axios.delete(`http://localhost:3000/empleos/${datos.id_empleo}`);
            console.log(response.data);
            //MENSAJE DE ELIMINADO CON EXITO
            onEliminar(datos.id_empleo);
            setMostrarOpciones(!mostrarOpciones);
        } catch (err) {
            console.error('Error al eliminar la publicación:', err);
        }
    }

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
                            <button className="mostrar-publicacion-opcion-boton">Editar</button>
                            <button className="mostrar-publicacion-opcion-boton" onClick={eliminarPublicacionEmpleo}>Eliminar</button>
                        </div>
                    )}
                </div>

                <h1 className="PublicacionEmpleoNuevo-titulo-publicacion">{datos.tituloEmpleo}</h1>

                <div className="PublicacionEmpleoNuevo-detalle">
                    <h2>Detalles del Empleo:</h2>
                    <p><strong><Etiquetas texto="Empresa" />:</strong> {datos.empresa}</p>
                    <p><strong><Etiquetas texto="Salario" />:</strong> {datos.salario}</p>
                    <p><strong><Etiquetas texto="Descripción" />:</strong> {datos.descripcion}</p>
                    <p><strong><Etiquetas texto="Ubicación (Estado)" />:</strong> {datos.ubicacion}</p>
                    <p><strong><Etiquetas texto="Nivel de Inglés Requerido" />:</strong> {datos.nivelIngles}</p>
                </div>

                <div className="PublicacionEmpleoNuevo-boton-postularse-container">
                    <button className="PublicacionEmpleoNuevo-boton-postularse">Postularse</button>
                </div>
            </div>
        </div>
    );
};

export default PublicacionEmpleoNuevo;
