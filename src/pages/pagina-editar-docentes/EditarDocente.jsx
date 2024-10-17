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
import './EditarDocente.css';

const EditDocente = () => {
    const {usuarioLog, setUsuarioLog} = useContext(usuarioContext);

    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [biografia, setBiografia] = useState('');
    const [noEmpleado, setNoEmpleado] = useState('');
    const [academiaSeleccionada, setAcademiaSeleccionada] = useState('');
    const [sexoSeleccionado, setSexoSeleccionado] = useState('');
    const [nivelSeleccionado, setNivelSeleccionado] = useState('');

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const response = await Axios.get(`http://localhost:3000/usuarios/docentes/${usuarioLog}`);
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
                setNoEmpleado(data.numero_empleado);
                setAcademiaSeleccionada(data.academia);
                setSexoSeleccionado(data.sexo);
                setNivelSeleccionado(data.ultimo_nivel_estudios);
            } catch (error) {
                console.error('Error al obtener los datos del docente', error);
                Swal.fire('Error', 'No se pudieron cargar los datos del docente.', 'error');
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
        <div className='fondo-editar-docente'>

        <div className="editar-docentes-contenedor">
            <h1 className='editar-titulo-docente'>Editar docente</h1>

            <div className="editar-docentes-campo-nombre">  
                <Label texto="Nombre(s):" />
                <Cajatexto 
                id="Nombre" 
                placeholder="Nombre(s)" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                />
            </div>

            <div className="editar-docentes-contenedor-apellidos">
                <div className="editar-docentes-campo">
                    <Label texto="Apellido paterno:" />
                    <Cajatexto
                        id="editar-Appaterno"
                        placeholder="Apellido paterno"
                        value={apellidoPaterno}
                        onChange={(e) => setApellidoPaterno(e.target.value)}
                    />
                </div>
                <div className="editar-docentes-campo">
                    <Label texto="Apellido materno:" />
                    <Cajatexto
                        id="editar-Apmaterno"
                        placeholder="Apellido materno"
                        value={apellidoMaterno}
                        onChange={(e) => setApellidoMaterno(e.target.value)}
                    />
                </div>
            </div>

            <div className='editar-docentes-fecha-sexo'>
                <div className="editar-docentes-campo-fecha">
                    <Fecha label="Fecha de nacimiento" 
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                    />
                </div>

                <div className="editar-docentes-campo-sexo">
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
        
            <div className="editar-docentes-campo">
                <Label texto="Correo electrónico:" />
                <Cajatexto
                placeholder="Correo electrónico" 
                type="email" 
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                />
            </div>

            <div className='editar-docentes-password-editarpassword'>
                <div className="editar-docentes-campo-password">
                    <Label htmlFor="contraseña" texto="Contraseña:" />
                    <Cajatexto 
                    id="contraseña" 
                    placeholder="Contraseña"
                    type="password"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)} 
                    />
                </div>

                <div className="editar-docentes-campo-confirmar-password">
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

            <div className='editar-docentes-telefono-numEmpleado'>
                <div className="editar-docentes-campo">
                    <Label texto="Teléfono:" />
                    <Cajatexto
                    placeholder="Teléfono" 
                    type="tel" 
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    />
                </div>

                <div className="editar-docentes-campo">
                    <Label texto="No. Empleado:" />
                    <Cajatexto
                    placeholder="Número RH" 
                    value={noEmpleado}
                    onChange={(e) => setNoEmpleado(e.target.value)}
                    />
                </div>

            </div>

            <div className="editar-docentes-campo">
                <Label texto="Biografía:" />
                <Textarea 
                name="Biografia" 
                placeholder="Biografía" 
                value={biografia}
                onChange={(e) => setBiografia(e.target.value)}
                />
            </div>

            <div className='editar-docentes-academia-nivelestudio'>
                <div className="editar-docentes-campo-academia">
                    <Label texto="Academia" />
                    <Radio
                    name="Academia"
                    options={[
                        { value: 'ISC', label: 'ISC' },
                        { value: 'IE', label: 'IE' },
                        { value: 'IGE', label: 'IGE' },
                        { value: 'CP', label: 'CP' },
                        { value: 'II', label: 'II' },
                        { value: 'IA', label: 'IA' },
                    ]}
                    selectedOption={academiaSeleccionada}  
                    onChange={(e) => setAcademiaSeleccionada(e.target.value)}
                    />
                </div>

                <div className="editar-docentes-campo-nivelestudio">
                    <Label texto="Nivel de estudio" />
                    <Radio
                    name="Ultimoniveldeestudios"
                    options={[
                        { value: 'Doctorado', label: 'Doctorado' },
                        { value: 'Maestría', label: 'Maestría' },
                        { value: 'Licenciatura', label: 'Licenciatura' },
                    ]}
                    selectedOption={nivelSeleccionado}  
                    onChange={(e) => setNivelSeleccionado(e.target.value)}
                    />
                </div>
            </div>

            <div className="editar-docente-botones">  
                <Button texto="Atrás" onClick={handleBack} />
                <Button texto="Guardar cambios" onClick={modificar} />
            </div>

        </div>
    </div>
    </>
    )
}

export default EditDocente;