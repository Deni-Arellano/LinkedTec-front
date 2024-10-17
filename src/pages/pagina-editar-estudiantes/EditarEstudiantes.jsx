import React, {useState, useEffect, useContext} from 'react';
import Cajatexto from '../../components/componente-caja-de-texto/CajaDeTexto';
import Label from '../../components/componente-label/Etiquetas';
import Radio from '../../components/componente-boton-de-radio/radio-boton';
import Fecha from '../../components/fecha/Fecha';
import Button from '../../components/boton/Boton';
import Textarea from '../../componetes/Text-area';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion';
import { useNavigate } from 'react-router-dom';
import {usuarioContext} from '../../App';
import Swal from 'sweetalert2';
import Axios from 'axios'; 
import './EditarEstudiantes.css';

const EditEstudiante = () => {
    const {usuarioLog, setUsuarioLog} = useContext(usuarioContext);

    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [sexoSeleccionado, setSexoSeleccionado] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [telefono, setTelefono] = useState('');
    const [noControl, setNoControl] = useState('');
    const [biografia, setBiografia] = useState('');
    const [carreraSeleccionada, setCarreraSeleccionada] = useState('');
    const [semestreSeleccionado, setSemestreSeleccionado] = useState('');

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const response = await Axios.get(`http://localhost:3000/usuarios/estudiantes/${usuarioLog}`);
                const data = response.data;

                console.log(data)
                
                setNombre(data.nombre);
                setApellidoPaterno(data.apellido_paterno);
                setApellidoMaterno(data.apellido_materno);
                setFechaNacimiento(data.fecha_nacimiento);
                setTelefono(data.telefono);
                setCorreo(data.correo);
                setContraseña(data.contraseña);
                setBiografia(data.biografia);
                setNoControl(data.no_control);
                setCarreraSeleccionada(data.carrera);
                setSexoSeleccionado(data.sexo);
                setSemestreSeleccionado(data.semestre);
            } catch (error) {
                console.error('Error al obtener los datos del estudiante', error);
                Swal.fire('Error', 'No se pudieron cargar los datos del estudiante.', 'error');
            }
        };

        obtenerDatos();
    }, []);

    const navigate = useNavigate(); 
    const handleBack = () => {
        navigate('/perfil'); 
    };

    const modificar = async() => {
        console.log('modificado')
    }

    return (
        <>
        <MenuNavegacion/>
        <div className='fondo-editar-estudiante'>
        <div className='editar-estudiante-contenedor'>
            <h1 className='editar-titulo-estudiante'>Editar estudiante</h1>

            <div className="editar-estudiante-campo-nombre">  
                <Label texto="Nombre(s):" />
                <Cajatexto 
                id="Nombre" 
                placeholder="Nombre(s)" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                />
            </div>

            <div className="editar-estudiante-contenedor-apellidos">
                <div className="editar-estudiante-campo">
                    <Label texto="Apellido paterno:" />
                    <Cajatexto
                        id="editar-Appaterno"
                        placeholder="Apellido paterno"
                        value={apellidoPaterno}
                        onChange={(e) => setApellidoPaterno(e.target.value)}
                    />
                </div>
                <div className="editar-estudiante-campo">
                    <Label texto="Apellido materno:" />
                    <Cajatexto
                        id="editar-Apmaterno"
                        placeholder="Apellido materno"
                        value={apellidoMaterno}
                        onChange={(e) => setApellidoMaterno(e.target.value)}
                    />
                </div>
            </div>

            <div className='editar-estudiante-fecha-sexo'>
                <div className="editar-estudiante-campo-fecha">
                    <Fecha label="Fecha de nacimiento" 
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                    />
                </div>

                <div className="editar-estudiante-campo-sexo">
                    <Label texto="Sexo" />
                    <Radio
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

            <div className="editar-estudiante-campo">
                <Label texto="Correo electrónico:" />
                <Cajatexto
                placeholder="Correo electrónico" 
                type="email" 
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                />
            </div>

            <div className='editar-estudiante-password-editarpassword'>
                <div className="editar-estudiante-campo-password">
                    <Label htmlFor="contraseña" texto="Contraseña:" />
                    <Cajatexto 
                    id="contraseña" 
                    placeholder="Contraseña"
                    type="password"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)} 
                    />
                </div>

                <div className="editar-estudiante-campo-confirmar-password">
                    <Label htmlFor="Confirmarcontraseñ" texto="Confirmar contraseña:" />
                    <Cajatexto 
                    id="Confirmarcontraseña" 
                    placeholder="Confirmar contraseña" 
                    type="password" 
                    value={confirmarContraseña}
                    onChange={(e) => setConfirmarContraseña(e.target.value)}
                    />
                </div>
            </div>

            <div className='editar-estudiante-telefono-numControl'>
                <div className="editar-estudiante-campo">
                    <Label texto="Teléfono:" />
                    <Cajatexto
                    placeholder="Teléfono" 
                    type="tel" 
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    />
                </div>

                <div className="editar-estudiante-campo">
                    <Label texto="No. Control:" />
                    <Cajatexto
                    placeholder="No. Control" 
                    value={noControl}
                    onChange={(e) => setNoControl(e.target.value)}
                    />
                </div>
            </div>

            <div className="editar-estudiante-campo">
                <Label texto="Biografía:" />
                <Textarea 
                name="Biografia" 
                placeholder="Biografía" 
                value={biografia}
                onChange={(e) => setBiografia(e.target.value)}
                />
            </div>

            <div className='editar-estudiante-carrera-semestre'>
                <div className="editar-estudiante-campo">
                <Label texto='Carrera' />
                    <Radio
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

                <div className="editar-estudiante-campo">
                    <Label texto='Semestre' />
                    <Radio
                    name="Semestre"
                    options={[
                        { value: 'I', label: 'I' },
                        { value: 'II', label: 'II' },
                        { value: 'III', label: 'III' },
                        { value: 'IV', label: 'IV' },
                        { value: 'V', label: 'V' },
                        { value: 'VI', label: 'VI' },
                        { value: 'VII', label: 'VII' },
                        { value: 'VIII', label: 'VIII' },
                        { value: 'IX', label: 'IX' },
                    ]}
                    selectedOption={semestreSeleccionado}  
                    onChange={(e) => setSemestreSeleccionado(e.target.value)}
                    />
                </div>
            </div>

            <div className="editar-estudiantes-botones">  
                <Button texto="Atrás" />
                <Button texto="Guardar cambios" />
            </div>

        </div>
    </div>
    </>
    )
}

export default EditEstudiante;