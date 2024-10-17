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
import './EditarReclutador.css'


const EditarReclutador = () => {
    const { usuarioLog, setUsuarioLog } = useContext(usuarioContext);
    const navigate = useNavigate();

    const handleBack = () => {
        console.log("Navegando a /Perfil");
        navigate('/perfil');
    };
    const [datosUsuario, setDatosUsuario] = useState('');

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

    //Obtener los datos del usuario logeado
    const getUsuario = async () => {
        try {
            const response = await Axios.get(`http://localhost:3000/usuarios/${usuarioLog}`);
            console.log(response.data);
    
            const usuario = response.data;
            setDatosUsuario(usuario);
            
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



    const editarUsuario = async (event) => {
        event.preventDefault();

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

        try {
            await Axios.patch(`http://localhost:3000/usuarios/reclutadores/${usuarioLog}`, datosEnviar);
            Swal.fire('Guardado', 'El usuario ha sido actualizado', 'success');
            handleBack();
        } catch (error) {
            if (error.response) {
                Swal.fire('Error', `Error de respuesta del servidor: ${error.response.data}`, 'error');
            } else {
                Swal.fire('Error', `Error en la solicitud: ${error.message}`, 'error');
            }
        }
    }

    return (
        <>
            <MenuNavegacion />
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
                                    type="password"
                                    value={contraseña}
                                    onChange={(e) => setContraseña(e.target.value)}
                                />
                            </div>
                            <div className='editar-reclutador-confirmar-contraseña'>
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

                                <Label htmlFor="nombreEmpresa" texto="Nombre de la empresa:"/>
                                <Textbox
                                    id="NombredelaEmpresa"
                                    placeholder="Nombre de la empresa"
                                    value={nombreEmpresa}
                                    onChange={(e) => setNombreEmpresa(e.target.value)}
                                />

                                <Label htmlFor="sede" texto="Sede:"/>
                                <Textbox
                                    id="Sede"
                                    placeholder="Sede"
                                    value={sede}
                                    onChange={(e) => setSede(e.target.value)}
                                />
                            </div>
                            <div className='editar-reclutador-giro'>
                                <Label className="reclutador-radio-buttons-label" texto="Giro:"/>
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
                                <Button texto="Guardar" onClick={editarUsuario}/>
                                <Button texto="Cancelar" onClick={handleBack} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default EditarReclutador;