import React, { useContext, useState, useEffect } from 'react';
import Textbox from '../components/componente-caja-de-texto/CajaDeTexto.jsx'; 
import Button from '../componetes/Button';
import RadioButtons from '../componete/Radio_buton.jsx';
import Fecha from '../componetes/Fecha';
import '../hojas-de-estilo/Estudiantes-registro.css'; 
import Logo from '../imagenes/Logo24.png'; 
import Textarea from '../componetes/Text-area.jsx';
import { useNavigate } from 'react-router-dom';  
import {usuarioContext} from '../App';
import Axios from 'axios';
import Swal from 'sweetalert2';

const Registro = () => {
  const {usuarioLog, setUsuarioLog} = useContext(usuarioContext);

  useEffect(() => {
    setUsuarioLog(null); // Restablece el contexto del usuario 
  }, [setUsuarioLog]);

  const navigate = useNavigate(); 
  const handleBack = () => {
    console.log("Navegando a /Rol");
    navigate('/Rol'); 
  };

  const handleNext = () => {
    console.log("Navegando a /codigo-verificacion");
    navigate('/codigo-verificacion'); 
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
  const [noControl, setNoControl] = useState('');
  const [carreraSeleccionada, setCarreraSeleccionada] = useState('');
  const [sexoSeleccionado, setSexoSeleccionado] = useState('');
  const [semestreSeleccionado, setSemestreSeleccionado] = useState('');

  const verificarusuarioexistente = async () => {
    try {
      const response = await Axios.get('https://linked-back-production.up.railway.app/usuarios');
      const usuarios = response.data;
      const correoExistente = usuarios.some((usuario) => usuario.correo === correo);
      if (correoExistente) {
        console.log('El correo ya está en uso.');
        Swal.fire({
          icon: "error",
          title: "Correo en uso",
          text: "El correo ya está registrado. Por favor, usa otro.",
        });
        return false;
      }
      const telefonoExistente = usuarios.some((usuario) => usuario.telefono === telefono);
      if (telefonoExistente) {
        console.log('El teléfono ya está en uso.');
        Swal.fire({
          icon: "error",
          title: "Teléfono en uso",
          text: "El teléfono ya está registrado. Por favor, usa otro.",
        });
        return false;
      }
      return true;

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
  const verificarNumeroControlExistente = async () => {
    try {
      const response = await Axios.get('https://linked-back-production.up.railway.app/usuarios/estudiantes');
      const usuarios = response.data;
      const controlExistente = usuarios.some((estudiantes) => estudiantes.no_control === noControl);
      if (controlExistente) {
        console.log('El número de control ya está en uso.');
        Swal.fire({
          icon: "error",
          title: "Número de control en uso",
          text: "El número de control ya está registrado. Por favor, usa otro.",
        });
        return false;
      }
  
      return true;
  
    } catch (error) {
      console.log("Error al verificar número de control existente:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error de verificación",
        text: "Hubo un error al verificar el número de control.",
      });
      return false;
    }
  };
  
  const add = async() => {
    console.log("Agregando estudiante");
    const usuarioValido = await verificarusuarioexistente();
    if (!usuarioValido) 
    {
      return; 
    }
    const nocontrolvalido = await verificarNumeroControlExistente();
    if (!nocontrolvalido) 
    {
      return; 
    }
    // Validaciones
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

    // Datos a enviar
    const datosEnviar = {
      'usuario': {
        'nombre': nombre,
        'apellido_paterno': apellidoPaterno,
        'apellido_materno': apellidoMaterno,
        'correo': correo,
        'contraseña': contraseña,
        'fecha_nacimiento': fechaNacimiento,
        'telefono': telefono,
        'sexo': sexoSeleccionado,
        'biografia': biografia,
        'role': 'Estudiantes',
        "imagen_usuario": ''
      },
      'estudiante': {
        'no_control': noControl,
        'carrera': carreraSeleccionada,
        'semestre': semestreSeleccionado
      }
    };

    Axios.post('https://linked-back-production.up.railway.app/usuarios/estudiantes', datosEnviar)
    .then((response) => {
      console.log("Respuesta del servidor:", response.data);
      setUsuarioLog(response.data.id); 
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "El estudiante ha sido registrado con éxito.",
      });
      handleNext();
    })
    .catch((error) => {
      if (error.message === 'Network Error') {
        Swal.fire({
          icon: "error",
          title: "Error de red",
          text: "No se pudo conectar al servidor. Verifica tu conexión.",
        });
        return;
      }

      if (error.response) {
        console.log("Error de respuesta del servidor:", error.response.data);
      }
    });
  }

  return (
    <div className="estudiantes-contenedor"> 
      <img src={Logo} alt="Logo" className="logo" /> 
      <h1>Registro de estudiante</h1>

      <div className="estudiantes-campo">  
        <label htmlFor="nombre">Nombre(s):</label>
        <Textbox 
          id="Nombre" 
          placeholder="Nombre(s)"
          value={nombre} 
          onChange={(e)=>{setNombre(e.target.value)}}/>
      </div>

      <div className="estudiantes-campo">
        <label htmlFor="apellidoPaterno">Apellido paterno:</label>
        <Textbox 
        id="ApellidoPaterno" 
        placeholder="Apellido paterno"
        value={apellidoPaterno}
        onChange={(e)=> setApellidoPaterno(e.target.value)}
         />
      </div>

      <div className="estudiantes-campo">
        <label htmlFor="apellidoMaterno">Apellido materno:</label>
        <Textbox 
          id="ApellidoMaterno" 
          placeholder="Apellido materno"
          value={apellidoMaterno}
          onChange={(e)=> setApellidoMaterno(e.target.value)}
          />
      </div>

      <div className="estudiantes-campo">
        <Fecha label="Fecha de Nacimiento" 
          value={fechaNacimiento}
          onChange={(e)=> setFechaNacimiento(e.target.value)}/>
      </div>

      <div className="estudiantes-campo">
        <label className="radio-buttons-label">Sexo</label>
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

      <div className="estudiantes-campo">
        <label htmlFor="telefono">Teléfono:</label>
        <Textbox 
          id="Telefono" 
          placeholder="Teléfono" 
          type="tel" 
          value={telefono}
          onChange={(e)=> setTelefono(e.target.value)}
          />
      </div>

      <div className="estudiantes-campo">
        <label htmlFor="correo">Correo:</label>
        <Textbox 
          id="Correo" 
          placeholder="Correo electrónico" 
          type="email" 
          value={correo}
          onChange={(e)=> setCorreo(e.target.value)}
          />
      </div>

      <div className="estudiantes-campo">
        <label htmlFor="contraseña">Contraseña:</label>
        <Textbox 
        id="Contraseña" 
        placeholder="Contraseña" 
        type="password"
        value={contraseña}
        onChange={(e)=> setContraseña(e.target.value)} 
         />
      </div>

      <div className="estudiantes-campo">
        <label htmlFor="confirmarContraseña">Confirmar contraseña:</label>
        <Textbox 
          id="ConfirmarContraseña" 
          placeholder="Confirmar contraseña" 
          type="password" 
          value={confirmarContraseña}
          onChange={(e)=> setConfirmarContraseña(e.target.value)}
          />
      </div>

      <div className="estudiantes-campo">
        <label htmlFor="biografia">Biografía:</label>
        <Textarea 
          id="Biografia" 
          name="Biografia" 
          placeholder="Biografía" 
          value={biografia}
          onChange={(e)=> setBiografia(e.target.value)}
          />
      </div>

      <div className="estudiantes-campo">
        <label htmlFor="noControl">No. control:</label>
        <Textbox 
          id="No.Control" 
          placeholder="Número de control" 
          value={noControl}
          onChange={(e)=> setNoControl(e.target.value)}
          />
      </div>

      <div className="estudiantes-campo">
        <label className="radio-buttons-label">Carrera</label>
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

      <div className="estudiantes-campo">
        <label className="radio-buttons-label">Semestre</label>
        <RadioButtons
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

      <div className="estudiantes-botones">  
        <Button texto="Atrás" onClick={handleBack} />
        <Button texto="Siguiente" onClick={add} />
      </div>
    </div>
  );
};

export default Registro;
