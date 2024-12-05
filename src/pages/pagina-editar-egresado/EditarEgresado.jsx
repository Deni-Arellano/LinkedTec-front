import React, { useState, useContext, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importar iconos de react
import Axios from 'axios';// Importar Axios para realizar peticiones al backend
import { usuarioContext } from '../../App'; // Importa el contexto de usuario para obtener el id del usuario logeado
import Swal from 'sweetalert2'; // Importar sweetalert2 para mostrar alertas
// Importa los componentes de la página
import Textbox from '../../components/componente-caja-de-texto/CajaDeTexto.jsx';
import Button from '../../components/boton/Boton.jsx';
import RadioButtons from '../../components/componente-boton-de-radio/radio-boton.jsx';
import Fecha from '../../components/fecha/Fecha.jsx';
import Textarea from '../../components/componente-text-area/text-area.jsx';
import Label from '../../components/componente-label/Etiquetas.jsx';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion';
// Importa la hoja de estilos
import './EditarEgresado.css'



const EditarEgresado = () => {
    const { usuarioLog, setUsuarioLog } = useContext(usuarioContext); // Obtiene el id del usuario logeado
    const navigate = useNavigate(); // Hook para navegación


    //Función para regresar a la pagina de perfil
    const handleBack = () => {
        console.log("Navegando a /Perfil");
        navigate('/perfil');
    };

    //Estados para los datos del usuario al ingresar a la página
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

    //Estados para mostrar o no la contraseña
    const [mostrarContraseña, setMostrarContraseña] = useState(false);
    const [MostrarConfirmarContraseña, setMostrarConfirmarContraseña] = useState(false);

    //Obtener los datos del usuario logeado
    const getUsuario = async () => {
        //Petición para obtener los datos del usuario
        try {
            const response = await Axios.get(`https://linked-back-spring-lake-433.fly.dev/usuarios/${usuarioLog}`);

            //Si el usuario no es un egresado, redirige a la página de perfil
            if (response.data.role !== 'Egresados') {
                navigate('/perfil');}    

            const usuario = response.data;
            
            //Asignar los valores obtenidos a los estados
            setNombre(usuario.nombre);
            setApellidoPaterno(usuario.apellido_paterno);
            setApellidoMaterno(usuario.apellido_materno);
            setFechaNacimiento(usuario.fecha_nacimiento);
            setTelefono(usuario.telefono);
            setCorreo(usuario.correo);
            setContraseña(usuario.contraseña);
            setConfirmarContraseña(usuario.contraseña);
            setBiografia(usuario.biografia);
            setPuesto(usuario.puesto);
            setAñoGraduacion(usuario.año_graduacion);
            setSexoSeleccionado(usuario.sexo);
            setCarreraSeleccionada(usuario.carrera);

        } catch (err) {
            console.error('Error al obtener el usuario:', err);
        }
    };

    //Se ejacuta al cagar la pagina y obtiene los datos del usuario logeado
    useEffect(() => {
        getUsuario();
    }, []);

    //Función para validar la contraseña
    const validatePassword = () => {

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(contraseña)) {
            excepciones("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial.(@, $, !, %, *, ?, &)");
            return;
        }
    };

    //Función para mostrar excepciones
    const excepciones = (mensaje) => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: mensaje
        });

    }

    //Función para editar el usuario
    const editarUsuario = async (event) => {
        event.preventDefault();

        //Excepciones para validar los campos 
        if (contraseña !== confirmarContraseña) {
            excepciones("Las contraseñas no coinciden.")
            return;
        }
        validatePassword();

        if (!nombre) {
            excepciones("El nombre no debe quedar vacío.");
            return;
        }

        if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ.\s]+$/.test(nombre)) {
            excepciones("El nombre no debe contener números ni caracteres especiales.");
            return;
        }

        if (nombre.length >= 50) {
            excepciones("El nombre no debe exceder los 50 caracteres.");
            return;
        }

        if (!apellidoPaterno) {
            excepciones("El apellido paterno no debe quedar vacío.");
            return;
        }

        if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(apellidoPaterno)) {
            excepciones("El apellido paterno no debe contener números ni caracteres especiales.");
            return;
        }

        if (apellidoPaterno.length >= 50) {
            excepciones("El apellido paterno no debe exceder los 50 caracteres.");
            return;
        }

        if (apellidoMaterno && !/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]*$/.test(apellidoMaterno)) {
            excepciones("El apellido materno no debe contener números ni caracteres especiales.");
            return;
        }

        if (apellidoMaterno.length >= 50) {
            excepciones("El apellido materno no debe exceder los 50 caracteres.");
            return;
        }

        if (!fechaNacimiento) {
            excepciones("La fecha de nacimiento no debe quedar vacía.");
            return;
        }

        const obtenerAño = new Date(fechaNacimiento).getFullYear();
        if (obtenerAño <= 1950) {
            excepciones("El año de nacimiento debe ser mayor a 1950.");
            return;
        }

        const añoActual = new Date().getFullYear();
        const edad = añoActual - obtenerAño;
        if (edad <= 17) {
            excepciones("Debes tener al menos 17 años.");
            return;
        }

        if (!sexoSeleccionado) {
            excepciones("Se debe ingresar el sexo.");
            return;
        }

        if (!telefono) {
            excepciones("El teléfono no debe quedar vacío.");
            return;
        }

        if (telefono.length < 10 || telefono.length > 15) {
            excepciones("El teléfono debe tener entre 10 y 15 dígitos.");
            return;
        }

        if (!/^\d+$/.test(telefono)) {
            excepciones("El teléfono debe contener solo dígitos.");
            return;
        }

        if (!correo) {
            excepciones("El correo no debe quedar vacío.");
            return;
        }

        if (correo.length > 40) {
            excepciones("El correo no debe tener más de 40 caracteres.");
            return;
        }

        const obtenerEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!obtenerEmail.test(correo)) {
            excepciones("El formato del correo no es válido.");
            return;
        }

        if (!contraseña) {
            excepciones("La contraseña no debe quedar vacía.");
            return;
        }

        if (contraseña.length < 8 || contraseña.length > 20) {
            excepciones("La contraseña debe tener entre 8 y 20 caracteres.");
            return;
        }


        if (!carreraSeleccionada) {
            excepciones("La carrera no debe quedar vacía.");
            return;
        }

        if (!AñoGraduacion) {
            excepciones("El año de graduación no debe quedar vacío.");
            return;
        }

        if (AñoGraduacion.length > 4) {
            excepciones("El año de graduación no debe tener más de 4 caracteres.");
            return;
        }

        if (AñoGraduacion <= 0) {
            excepciones("El año de graduación debe ser mayor a 0.");
            return;
        }

        if (!/^\d{4}$/.test(AñoGraduacion)) {
            excepciones("El año de graduación debe ser un número entero de 4 dígitos.");
            return;
        }

        if (!Puesto) {
            excepciones("El puesto no debe quedar vacío.");
            return;
        }

        if (Puesto.length > 50) {
            excepciones("El puesto no debe tener más de 50 caracteres.");
            return;
        }

        //Datos a enviar al backend
        const datosEnviar = {
            "usuario": {
                "nombre": nombre,
                "apellido_paterno": apellidoPaterno,
                "apellido_materno": apellidoMaterno,
                "correo": correo,
                "contraseña": contraseña,
                "fecha_nacimiento": fechaNacimiento,
                "telefono": telefono,
                "sexo": sexoSeleccionado,
                "biografia": biografia,
                "role": "Egresados"
            },
            "egresado": {
                "carrera": carreraSeleccionada,
                "año_graduacion": AñoGraduacion,
                "puesto": Puesto
            }
        };

        //Petición para editar el usuario
        try {
            await Axios.patch(`https://linked-back-spring-lake-433.fly.dev/usuarios/egresados/${usuarioLog}`, datosEnviar);
            Swal.fire('Guardado', 'El usuario ha sido actualizado con éxito', 'success');
            handleBack();
        } catch (error) {

            if (error.response) {
                excepciones(error.response.data.message);
            }
        }}




        return (
            <>  
            <div className='editar-egresado-contenedor-global'>
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
                                        type={mostrarContraseña ? "text" : "password"}
                                        value={contraseña}
                                        onChange={(e) => setContraseña(e.target.value)}
                                    />
                                    <span
                                        className="reclutador-eye-icon"
                                        onClick={() => setMostrarContraseña(!mostrarContraseña)}
                                    >
                                        {mostrarContraseña ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                <div className='editar-egresado-confirmar-contraseña'>
                                    <Label htmlFor="Confirmarcontraseña" texto="Confirmar contraseña:" />
                                    <Textbox
                                        id="Confirmarcontraseña"
                                        placeholder="Confirmar contraseña"
                                        type={MostrarConfirmarContraseña ? "text" : "password"}
                                        value={confirmarContraseña}
                                        onChange={(e) => setConfirmarContraseña(e.target.value)}
                                    />
                                    <span
                                        className="reclutador-eye-icon"
                                        onClick={() => setMostrarConfirmarContraseña(!MostrarConfirmarContraseña)}
                                    >
                                        {MostrarConfirmarContraseña ? <FaEyeSlash /> : <FaEye />}
                                    </span>
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
                                        placeholder="Año de graduación"
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
                                    <Button texto="Guardar" onClick={editarUsuario} />
                                    <Button texto="Cancelar" onClick={handleBack} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </>

        );

    }

    export default EditarEgresado;