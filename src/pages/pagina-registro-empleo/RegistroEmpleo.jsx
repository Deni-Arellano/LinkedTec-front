import React, { useContext, useState } from 'react';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion'; 
import Etiquetas from '../../components/componente-label/Etiquetas'; 
import CajaDeTexto from '../../components/componente-caja-de-texto/CajaDeTexto.jsx';
import Button from '../../components/boton/Boton'; 
import { usuarioContext } from '../../App';
import './RegistroEmpleo.css';


import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PaginaFormulario = () => {
    const { usuarioLog, setUsuarioLog } = useContext(usuarioContext);

    const [usuarioCreador, setUsuarioCreador] = useState(usuarioLog);
    const [tituloEmpleo, settituloEmpleo] = useState('');
    const [empresa, setempresa] = useState('');
    const [salario, setSalario] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [Ubicacion, setUbicacion] = useState('');
    const [nivelIngles, setNivelIngles] = useState('Avanzado');

    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/empleos');
    };

    const add = () => {
        if (!tituloEmpleo) {
            Swal.fire('Error', 'El título de empleo no debe estar vacío.', 'error');
            return;
        }

        if (tituloEmpleo.length > 50) {
            Swal.fire('Error', 'El título de empleo no debe tener más de 50 caracteres.', 'error');
            return;
        }

        if (!empresa) {
            Swal.fire('Error', 'El campo Empresa no debe estar vacío.', 'error');
            return;
        }

        if (!salario) {
            Swal.fire('Error', 'El campo Salario no debe estar vacío.', 'error');
            return;
        }

        if (salario.length > 9) {
            Swal.fire('Error', 'El salario no debe tener más de 9 cifras.', 'error');
            return;
        }

        if (!/^\d+$/.test(salario)) {
            Swal.fire('Error', 'El salario debe contener solo dígitos.', 'error');
            return;
        }

        if (!descripcion) {
            Swal.fire('Error', 'La descripción no debe estar vacía.', 'error');
            return;
        }

        if (descripcion.length > 5000) {
            Swal.fire('Error', 'La descripción no debe tener más de 5000 caracteres.', 'error');
            return;
        }

        if (!Ubicacion) {
            Swal.fire('Error', 'La ubicación no debe estar vacía.', 'error');
            return;
        }

        if (Ubicacion.length > 100) {
            Swal.fire('Error', 'La ubicación no debe tener más de 100 caracteres.', 'error');
            return;
        }

        const datosEnviar = {
            "titulo": tituloEmpleo,
            "empresa": empresa,
            "salario": salario,
            "descripcion": descripcion,
            "ubicacion": Ubicacion,
            "nivel_de_ingles": nivelIngles,
            "id_usuario": usuarioCreador
        };

        axios.post('http://localhost:3000/empleos/', datosEnviar)
        .then((response) => {
            Swal.fire('Éxito', 'El empleo ha sido publicado con éxito.', 'success');
            handleBack();
        })
        .catch((error) => {
            if (error.response) {
                if (error.response.status === 400) {
                    Swal.fire('Error', 'Solicitud inválida o no puede ser procesada.', 'error');
                } else if (error.response.status === 404) {
                    Swal.fire('Error', 'El recurso solicitado no existe.', 'error');
                } else if (error.response.status === 500) {
                    Swal.fire('Error', 'Error interno del servidor.', 'error');
                } else if (error.response.status === 422) {
                    Swal.fire('Error', 'La solicitud contiene errores semánticos.', 'error');
                } else if (error.response.status === 403) {
                    Swal.fire('Error', 'Solo los reclutadores pueden subir empleos.', 'error');
                } else {
                    Swal.fire('Error', `Error: ${error.response.data}`, 'error');
                }
            } else {
                Swal.fire('Error', `Error en la solicitud: ${error.message}`, 'error');
            }
        });
    };

    return (
        <>
            <MenuNavegacion /> {/* Barra de navegación */}
            <div className="fromularioempleoo-container">
                <div className="fromularioempleoo-form">
                    <Etiquetas tamano={20} texto="+ Nuevo empleo" id="fromularioempleoo-titulo-publicacion-empleo" />
                    &nbsp;

                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Título empleo:" />
                        <CajaDeTexto 
                            id="fromularioempleoo-titulo-empleo" 
                            value={tituloEmpleo} 
                            onChange={(e) => settituloEmpleo(e.target.value)} 
                        />
                    </div>

                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Empresa:" />
                        <CajaDeTexto 
                            id="fromularioempleoo-empresa" 
                            value={empresa} 
                            onChange={(e) => setempresa(e.target.value)} 
                        />
                    </div>

                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Salario:" />
                        <CajaDeTexto 
                            id="fromularioempleoo-salario" 
                            placeholder="$" 
                            value={salario} 
                            onChange={(e) => setSalario(e.target.value)} 
                        />
                    </div>

                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Descripción:" />
                        <textarea 
                            id="fromularioempleoo-descripcion" 
                            className="fromularioempleoo-descripcion-textarea" 
                            rows="5" 
                            cols="50"
                            value={descripcion} 
                            onChange={(e) => setDescripcion(e.target.value)} 
                        />
                    </div>

                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Ubicación (estado):" />
                        <CajaDeTexto 
                            id="fromularioempleoo-ubicacion" 
                            value={Ubicacion} 
                            onChange={(e) => setUbicacion(e.target.value)} 
                        />
                    </div>

                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Nivel de inglés requerido:" />
                        <select 
                            id="fromularioempleoo-nivel-ingles" 
                            className="fromularioempleoo-dropdown" 
                            value={nivelIngles} 
                            onChange={(e) => setNivelIngles(e.target.value)}
                        >
                            <option value="Avanzado">Avanzado</option>
                            <option value="Intermedio">Intermedio</option>
                            <option value="Básico">Básico</option>
                            <option value="No aplica">No aplica</option>
                        </select>
                    </div>

                    <Button texto="Publicar empleo" onClick={add} />
                </div>
            </div>
        </>
    );
};

export default PaginaFormulario;
