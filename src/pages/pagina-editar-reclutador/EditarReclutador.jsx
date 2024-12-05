import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa hook para navegación
import { usuarioContext } from '../../App'; // Importa el contexto de usuario para obtener el id del usuario logeado
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importar iconos de react
import Axios from 'axios'; // Importar Axios para realizar peticiones al backend
// Importa los componentes de la página
import Textbox from '../../components/componente-caja-de-texto/CajaDeTexto.jsx';
import Button from '../../components/boton/Boton.jsx';
import RadioButtons from '../../components/componente-boton-de-radio/radio-boton.jsx';
import Fecha from '../../components/fecha/Fecha.jsx';
import Textarea from '../../components/componente-text-area/text-area.jsx';
import Label from '../../components/componente-label/Etiquetas.jsx';
import Swal from 'sweetalert2';
import MenuNavegacion from '../../components/menunavegacion/MenuNavegacion';
// Importa la hoja de estilos
import './EditarReclutador.css'


const EditarReclutador = () => {
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
    const [nombreEmpresa, setNombreEmpresa] = useState('');
    const [sede, setSede] = useState('');
    const [sexoSeleccionado, setSexoSeleccionado] = useState('');
    const [giroSeleccionado, setGiroSeleccionado] = useState('');

    //Estados para mostrar o no la contraseña
    const [mostrarContraseña, setMostrarContraseña] = useState(false);
    const [MostrarConfirmarContraseña, setMostrarConfirmarContraseña] = useState(false);

    //Obtener los datos del usuario logeado
    const getUsuario = async () => {
        //Petición para obtener los datos del usuario
        try {
            const response = await Axios.get(`https://linked-back-spring-lake-433.fly.dev/usuarios/${usuarioLog}`);
            //console.log(response.data);

            //Si el usuario no es un reclutador, redirige a la página de perfil
            if (response.data.role !== 'Reclutadores') {
                navigate('/perfil');
            }

            const usuario = response.data;

            //Asigna los valores del usuario a los estados
            setNombre(usuario.nombre);
            setApellidoPaterno(usuario.apellido_paterno);
            setApellidoMaterno(usuario.apellido_materno);
            setFechaNacimiento(usuario.fecha_nacimiento);
            setTelefono(usuario.telefono);
            setCorreo(usuario.correo);
            setContraseña(usuario.contraseña);
            setConfirmarContraseña(usuario.contraseña);
            setBiografia(usuario.biografia);
            setNombreEmpresa(usuario.nombre_empresa);
            setSede(usuario.sede);
            setSexoSeleccionado(usuario.sexo);
            setGiroSeleccionado(usuario.giro);

        } catch (err) {
            console.error('Error al obtener el usuario:', err);
        }
    };

    //Se ejacuta al cagar la pagina y obtiene los datos del usuario logeado
    useEffect(() => {
        getUsuario();
    }, []);

    //Función para mostrar excepciones
    const excepciones = (mensaje) => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: mensaje
        });

    }

    //Función para editar los datos del usuario
    const editarUsuario = async (event) => {
        event.preventDefault();

        //Excepciones para validar los datos
        if (contraseña !== confirmarContraseña) {
            excepciones("Las contraseñas no coinciden.");
            return;
        }

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

        if (apellidoPaterno.length >= 50) {
            excepciones("El apellido paterno no debe exceder los 50 caracteres.");
            return;
        }

        if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(apellidoPaterno)) {
            excepciones("El apellido paterno no debe contener números ni caracteres especiales.");
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
            excepciones("El sexo no debe quedar vacío.");
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
            excepciones("El formato del correo no es válido.")
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

        const regexContraseña = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,20}$/;
        if (!regexContraseña.test(contraseña)) {
            excepciones("La contraseña no cumple con los requisitos.");
            return;
        }

        if (biografia.length >= 255) {
            excepciones("La biografía no debe exceder los 255 caracteres.");
            return;
        }

        if (!nombreEmpresa) {
            excepciones("El nombre de la empresa no debe quedar vacío.");
            return;
        }

        if (!sede) {
            excepciones("La sede no debe quedar vacía.");
            return;
        }

        if (!giroSeleccionado) {
            excepciones("El giro no debe quedar vacío.");
            return;
        }

        //Datos a enviar al backend
        const datosEnviar = {
            "usuario": {
                "nombre": nombre,
                "apellido_paterno": apellidoPaterno,
                "apellido_materno": apellidoMaterno,
                "correo": correo,
                "contrasena": contraseña,
                "fecha_nacimiento": fechaNacimiento,
                "telefono": telefono,
                "sexo": sexoSeleccionado,
                "biografia": biografia,
                "role": "Reclutadores",
            },
            "reclutador": {
                "nombre_empresa": nombreEmpresa,
                "sector_comercial": giroSeleccionado,
                "sede": sede,
                "giro": giroSeleccionado
            }
        };

        //Petición para editar los datos del usuario
        try {
            await Axios.patch(`https://linked-back-spring-lake-433.fly.dev/usuarios/reclutadores/${usuarioLog}`, datosEnviar);
            Swal.fire('Guardado', 'El usuario ha sido actualizado con éxito', 'success');
            handleBack();
        } catch (error) {
            if (error.response) {
                excepciones(error.response.data.message);
            }

    }}

    return (
        <>  
            <div className='editar-reclutador-contenedor-global'>
                <MenuNavegacion/>
            <div className='editar-reclutador-contenedor-pagina'>
                <div className="editar-reclutador-contenedor">

                    <h1 className='editar-titulo-reclutador'>Editar reclutador</h1>

                    <div className='formulario-editar-reclutador'>
                        <div className='editar-reclutador-general'>
                            <Label htmlFor="Nombre" texto="Nombre(s):" />
                            <Textbox
                                id="Nombre"
                                placeholder="Nombre(s)"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                        <div className='editar-reclutador-apellidos editar-reclutador-general'>
                            <div className='editar-reclutador-apellido-paterno'>
                                <Label htmlFor="Appaterno" texto="Apellido paterno:" />
                                <Textbox
                                    id="Appaterno"
                                    placeholder="Apellido paterno"
                                    value={apellidoPaterno}
                                    onChange={(e) => setApellidoPaterno(e.target.value)}
                                />
                            </div>
                            <div className='editar-reclutador-apellido-materno'>
                                <Label htmlFor="Apmaterno" texto="Apellido materno:" />
                                <Textbox
                                    id="Apmaterno"
                                    placeholder="Apellido materno"
                                    value={apellidoMaterno}
                                    onChange={(e) => setApellidoMaterno(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='editar-reclutador-fecha-sexo editar-reclutador-general'>
                            <div className='editar-reclutador-fecha'>
                                <Fecha
                                    label="Fecha de nacimiento"
                                    value={fechaNacimiento}
                                    onChange={(e) => setFechaNacimiento(e.target.value)}
                                />
                            </div>

                            <div className='editar-reclutador-sexo'>

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
                        <div className='editar-reclutador-correo editar-reclutador-general'>
                            <Label htmlFor="correo" texto="Correo:" />
                            <Textbox
                                id="correo"
                                placeholder="Correo electrónico"
                                type="email"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                            />
                        </div>
                        <div className='editar-reclutador-contraseñas editar-reclutador-general'>
                            <div className='editar-reclutador-contraseña'>
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
                            <div className='editar-reclutador-confirmar-contraseña'>
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
                        <div className='editar-reclutador-telefono editar-reclutador-general'>
                            <Label htmlFor="Telefono" texto="Teléfono:" />
                            <Textbox
                                id="Telefono"
                                placeholder="Teléfono"
                                type="tel"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                            />
                        </div>
                        <div className='editar-reclutador-biografia editar-reclutador-general'>
                            <Label htmlFor="biografia" texto="Biografía" />
                            <Textarea
                                id="Biografia"
                                name="Biografia"
                                placeholder="Biografía"
                                value={biografia}
                                onChange={(e) => setBiografia(e.target.value)}
                            />
                        </div>
                        <div className='editar-reclutador-empresa-sede-giro editar-reclutador-general'>
                            <div className='editar-reclutador-empresa-sede'>

                                <Label htmlFor="nombreEmpresa" texto="Nombre de la empresa:" />
                                <Textbox
                                    id="NombredelaEmpresa"
                                    placeholder="Nombre de la empresa"
                                    value={nombreEmpresa}
                                    onChange={(e) => setNombreEmpresa(e.target.value)}
                                />

                                <Label htmlFor="sede" texto="Sede:" />
                                <Textbox
                                    id="Sede"
                                    placeholder="Sede"
                                    value={sede}
                                    onChange={(e) => setSede(e.target.value)}
                                />
                            </div>
                            <div className='editar-reclutador-giro'>
                                <Label className="reclutador-radio-buttons-label" texto="Giro:" />
                                <RadioButtons
                                    name="Giro"
                                    options={[
                                        { value: 'Comercial', label: 'Comercial' },
                                        { value: 'Servicio', label: 'Servicio' },
                                        { value: 'Manufacturera', label: 'Manufactura' },
                                        { value: 'Agricultura', label: 'Agricultura' },
                                    ]}
                                    selectedOption={giroSeleccionado}
                                    onChange={(e) => setGiroSeleccionado(e.target.value)}
                                />
                            </div>

                        </div>
                        <div className="botones-editar-reclutador">
                            <div className="boton-editar-reclutador">
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

export default EditarReclutador;