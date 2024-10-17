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
     
    const modificar = async () => {
        try {
            // Verificar que las contraseñas coincidan
            if (contraseña !== confirmarContraseña) {
                Swal.fire('Error', 'Las contraseñas no coinciden.', 'error');
                return;
            }

            if (nombre.length < 2 || nombre.length > 50) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "El nombre debe tener entre 2 y 50 caracteres.",
                });
                return;
            }
        
            const Caracteres_especialesn = /^[A-Za-z\s]+$/; 
            if (!Caracteres_especialesn.test(nombre)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El nombre solo puede contener letras.",
            });
            return;
            }
        
            if (nombre.trim() === '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El nombre no debe estar vacío.",
            });
            return;
            }
        
            if (/[\s]{2,}/.test(nombre)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El nombre no puede tener más de un espacio vacío consecutivo.",
            });
            return;
            }
        
            /*--------------------apellido paterno-------------------------*/
            if (apellidoPaterno.length < 2 || apellidoPaterno.length > 50) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El apellido paterno debe tener entre 2 y 50 caracteres.",
            });
            return;
            }
        
            if (apellidoPaterno.trim() === '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El apellido paterno no puede estar vacío.",
            });
            return;
            }

            if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(apellidoPaterno)) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "El apellido paterno no debe contener números ni caracteres especiales.",
                });
                return;
              }

              if (apellidoMaterno && !/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]*$/.test(apellidoMaterno)) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "El apellido materno no debe contener números ni caracteres especiales.",
                });
                return;
              }

              if (apellidoMaterno.length >= 50) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "El apellido materno no debe exceder los 50 caracteres.",
                });
                return;
              }
        
            /*--------------------fecha-------------------------*/
            const fechaIngresada = new Date(fechaNacimiento); 
            const anioNacimiento = fechaIngresada.getFullYear(); 
            const fechaActual = new Date(); 
            const edad = fechaActual.getFullYear() - anioNacimiento; 
            const haCumplidoAnios = (fechaActual.getMonth() > fechaIngresada.getMonth()) ||
            (fechaActual.getMonth() === fechaIngresada.getMonth() && fechaActual.getDate() >= fechaIngresada.getDate());
            const edadReal = haCumplidoAnios ? edad : edad - 1;
        
            if (anioNacimiento <= 1950) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'El año de nacimiento debe ser mayor a 1950.',
            });
            return;
            }
        
            if (edadReal < 17) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'Debes tener al menos 17 años.',
            });
            return;
            }
            if (fechaNacimiento.trim()==='')
            {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'La fecha no puede estar vacía.',
            });
            return;
            }
        
        
            /*------------------telefono---------------*/
            if (telefono.trim() === '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'El teléfono no puede estar vacío.',
            });
            return;
            }
        
            if (telefono.length < 10 || telefono.length > 15) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'El teléfono debe tener entre 10 y 15 caracteres.',
            });
            return;
            }
        
            /*------------------correo---------------*/
            if (correo.trim() === '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'El correo no puede estar vacío.',
            });
            return;
            }
        
            const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexCorreo.test(correo)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'Introduzca un correo electrónico válido.',
            });
            return;
            }
        
            if (correo.length > 40) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El correo es demasiado largo",
            });
            return;
            }
        
            /*--------------------contraseña y confirmar-------------------------- */
            if (contraseña.length < 8 || contraseña.length > 12) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "La contraseña debe contener entre 8 y 12 caracteres",
            });
            return;
            }
        
            const regexContraseña = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@._\-#$%&*]).{7,12}$/;
            if (!regexContraseña.test(contraseña)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "La contraseña debe incluir letras, números y caracteres especiales.",
            });
            return;
            }
        
            if (contraseña !== confirmarContraseña) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Las contraseñas no coinciden.",
            });
            return;
            }
        
            /*------------------No.control------------------------*/
            const regexNoControl = /^Z\d{8}$/;
            if (!regexNoControl.test(noControl)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El No. de Control debe comenzar con 'Z' y estar seguido de 8 dígitos.",
            });
            return;
            }
        
            /*-------------carrera,sexo,semestre----------------- */
            if (carreraSeleccionada === '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debes seleccionar una carrera.",
            });
            return;
            }
        
            if (sexoSeleccionado === '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debes seleccionar un sexo.",
            });
            return;
            }
        
            if (semestreSeleccionado === '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debes seleccionar un semestre.",
            });
            return;
            }
    
            // Crear el objeto con los datos actualizados
            const datosActualizados = {
                "usuario": {
                    "nombre": nombre,
                    "apellido_paterno": apellidoPaterno,
                    "apellido_materno": apellidoMaterno,
                    "fecha_nacimiento": fechaNacimiento,
                    "sexo": sexoSeleccionado,
                    "correo": correo,
                    "contraseña": contraseña,
                    "telefono": telefono,
                    "no_control": noControl,
                    "biografia": biografia,
                    },
                "estudiante": {
                    "carrera": carreraSeleccionada,
                    "semestre": semestreSeleccionado
                }
            };
    
            // Realizar la solicitud patch para actualizar los datos
            try {
                await Axios.patch(`http://localhost:3000/usuarios/estudiantes/${usuarioLog}`, datosActualizados);
    
                // Mostrar mensaje de éxito
                Swal.fire('Éxito', 'Los datos del estudiante han sido actualizados.', 'success');
    
                // Redireccionar a perfil
                navigate('/perfil');
    
            } catch (error) {
                console.error('Error al actualizar los datos del estudiante', error);
                Swal.fire('Error', 'No se pudieron guardar los cambios.', 'error');
            }
    
            } catch (error) {
                console.log("Error al verificar usuario existente:", error.message);
                Swal.fire({
                    icon: "error",
                    title: "Error de verificación",
                    text: "Hubo un error al verificar el correo o el teléfono.",
                });
                return false;
            }
    };    

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
                <Button texto="Atrás"  onClick={handleBack}/>
                <Button texto="Guardar cambios" onClick={modificar}/>
            </div>

        </div>
    </div>
    </>
    )
}

export default EditEstudiante;