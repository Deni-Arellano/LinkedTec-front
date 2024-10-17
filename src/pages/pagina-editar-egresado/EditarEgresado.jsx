import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { usuarioContext } from '../../App';
import Textbox from '../../components/componente-caja-de-texto/CajaDeTexto.jsx';
import Button from '../../components/boton/Boton.jsx';
import RadioButtons from '../../components/componente-boton-de-radio/radio-boton.jsx';
import Fecha from '../../components/fecha/Fecha.jsx';
import Textarea from '../../components/componente-text-area/text-area.jsx';
import Label from '../../components/componente-label/Etiquetas.jsx';
import Swal from 'sweetalert2';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion';
import './EditarEgresado.css'


const EditarEgresado = () => {
    const { usuarioLog, setUsuarioLog } = useContext(usuarioContext);
    const navigate = useNavigate();
    const handleBack = () => {
        console.log("Navegando a /Perfil");
        navigate('/perfil');
    };

    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [biografia, setBiografia] = useState('');
    const [Puesto, setPuesto] = useState('');
    const [AñoGraduacion, setAñoGraduacion] = useState('');
    const [sexoSeleccionado, setSexoSeleccionado] = useState('');
    const [carreraSeleccionada, setCarreraSeleccionada] = useState('');



    return (
        <>
            <MenuNavegacion />
            <div className='editar-egresado-contenedor-pagina'>
                <div className="editar-egresado-contenedor">
                    
                        <h1 className='editar-titulo-egresado'>Editar egresado</h1>
                    
                    <div className='formulario-editar-egresado'>
                        <div className='editar-egresado-general'>
                            <Label htmlFor="Nombre" texto="Nombre(s):" />
                            <Textbox
                                id="Nombre"
                                placeholder="Nombre(s)"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                        <div className='editar-egresado-apellidos editar-egresado-general'>
                            <div className='editar-egresado-apellido-paterno'>
                                <Label htmlFor="Appaterno" texto="Apellido paterno:" />
                                <Textbox
                                    id="Appaterno"
                                    placeholder="Apellido paterno"
                                    value={apellidoPaterno}
                                    onChange={(e) => setApellidoPaterno(e.target.value)}
                                />
                            </div>
                            <div className='editar-egresado-apellido-materno'>
                                <Label htmlFor="Apmaterno" texto="Apellido materno:" />
                                <Textbox
                                    id="Apmaterno"
                                    placeholder="Apellido materno"
                                    value={apellidoMaterno}
                                    onChange={(e) => setApellidoMaterno(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='editar-egresado-fecha-sexo editar-egresado-general'>
                            <div className='editar-egresado-fecha'>
                            <Fecha
                                label="Fecha de nacimiento"
                                value={fechaNacimiento}
                                onChange={(e) => setFechaNacimiento(e.target.value)}
                            />
                            </div>

                            <div className='editar-egresado-sexo'>
                            
                                <Label htmlFor="Sex" texto="Sexo:" />
                                <RadioButtons
                                    name="Sexo"
                                    options={[
                                        { value: 'Femenino', label: 'Femenino' },
                                        { value: 'Masculino', label: 'Masculino' },
                                        { value: 'Otro', label: 'Otro' },
                                    ]}
                                    selectedOption={sexoSeleccionado}
                                    onChange={(e) => setSexoSeleccionado(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='editar-egresado-correo editar-egresado-general'>
                            <Label htmlFor="correo" texto="Correo:" />
                            <Textbox
                                id="correo"
                                placeholder="Correo electrónico"
                                type="email"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                            />
                        </div>
                        <div className='editar-egresado-contraseñas editar-egresado-general'>
                            <div className='editar-egresado-contraseña'>
                                <Label htmlFor="contraseña" texto="Contraseña:" />
                                <Textbox
                                    id="contraseña"
                                    placeholder="Contraseña"
                                    type="password"
                                    value={contraseña}
                                    onChange={(e) => setContraseña(e.target.value)}
                                />
                            </div>
                            <div className='editar-egresado-confirmar-contraseña'>
                                <Label htmlFor="Confirmarcontraseña" texto="Confirmar contraseña:" />
                                <Textbox
                                    id="Confirmarcontraseña"
                                    placeholder="Confirmar contraseña"
                                    type="password"
                                    value={confirmarContraseña}
                                    onChange={(e) => setConfirmarContraseña(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='editar-egresado-telefono editar-egresado-general'>
                            <Label htmlFor="Telefono" texto="Teléfono:" />
                            <Textbox
                                id="Telefono"
                                placeholder="Teléfono"
                                type="tel"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                            />
                        </div>
                        <div className='editar-egresado-biografia editar-egresado-general'>
                            <Label htmlFor="biografia" texto="Biografía" />
                            <Textarea
                                id="Biografia"
                                name="Biografia"
                                placeholder="Biografía"
                                value={biografia}
                                onChange={(e) => setBiografia(e.target.value)}
                            />
                        </div>
                        <div className='editar-egresado-carrera-anio-puesto editar-egresado-general'>
                            <div className='editar-egresado-carrera'>

                                <Label className="radio-buttons-label" texto='Carrera' />
                                <RadioButtons
                                    name="Carrera"
                                    options={[
                                        { value: 'ISC', label: 'ISC' },
                                        { value: 'IE', label: 'IE' },
                                        { value: 'IGE', label: 'IGE' },
                                        { value: 'CP', label: 'CP' },
                                        { value: 'II', label: 'II' },
                                        { value: 'IA', label: 'IA' },
                                    ]}
                                    selectedOption={carreraSeleccionada}
                                    onChange={(e) => setCarreraSeleccionada(e.target.value)}
                                />
                            </div>
                            <div className='editar-egresado-anio-puesto'>
                                <Label htmlFor="AnoGraduacion" texto='Año de graduación:' />
                                <Textbox
                                    id="AnoGraduacion"
                                    placeholder="Año de Graduación"
                                    value={AñoGraduacion}
                                    onChange={(e) => setAñoGraduacion(e.target.value)}
                                />
                                <Label htmlFor="Puesto" texto='Puesto:' />
                                <Textbox
                                    id="Puesto"
                                    placeholder="Puesto en la empresa"
                                    value={Puesto}
                                    onChange={(e) => setPuesto(e.target.value)}
                                />
                            </div>
                            
                        </div>
                        <div className="botones-editar-egresado">
                            <div className="boton-editar-egresado">
                                <Button texto="Guardar" />
                                <Button texto="Cancelar" onClick={handleBack} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
      
    );

}

export default EditarEgresado;