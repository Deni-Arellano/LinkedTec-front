/**
 * Aqui estubo el panadero alv
 */




import React, { useState, useContext, useEffect } from 'react';
import './RegistroDocentes.css';
import Textbox from '../../components/componente-caja-de-texto/CajaDeTexto.jsx'; 
import Textarea from '../../componetes/Text-area.jsx'; 
import Button from '../../components/boton/Boton.jsx'; 
import RadioButtons from '../../components/componente-boton-de-radio/radio-boton.jsx'; 
import Fecha from '../../components/fecha/Fecha.jsx';
import Logo from '../../assets/Logo24.png'; 
import Label from '../../components/componente-label/Etiquetas.jsx';
import { useNavigate } from 'react-router-dom'; 
import Axios from 'axios'; 
import {usuarioContext} from '../../App';
import Swal from 'sweetalert2';

const RegistroDocentes = () => {
  const {usuarioLog, setUsuarioLog} = useContext(usuarioContext);

  useEffect(() => {
    setUsuarioLog(null); // Restablece el contexto del usuario
  }, [setUsuarioLog]);

  const navigate = useNavigate(); 
  const handleBack = () => {
    console.log("Navegando a /Rol");
    navigate('/rol'); 
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
  const [noEmpleado, setNoEmpleado] = useState('');
  const [academiaSeleccionada, setAcademiaSeleccionada] = useState('');
  const [sexoSeleccionado, setSexoSeleccionado] = useState('');
  const [nivelSeleccionado, setNivelSeleccionado] = useState('');

  const verificarUsuarioExistente = async () => {
    try {
      const response = await Axios.get('http://localhost:3000/usuarios');
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

const verificarDocenteExistente = async () => {
  let paginaActual = 1;
  const limite = 5; // El límite de resultados que usas en la API
  let existeDocente = false;

  try {
    while (true) {
      // Hacer la solicitud a la API, especificando el número de página y el límite
      const response = await Axios.get(`http://localhost:3000/usuarios/docentes?pagina=${paginaActual}&limite=${limite}`);
      const { docentes, exists_pagina_siguiente } = response.data;

      // Verificar si el número de empleado ya existe en la página actual
      const empleadoExistente = docentes.some((docente) => docente.numero_empleado === noEmpleado);
      
      if (empleadoExistente) {
        console.log('El número de empleado ya está en uso.');
        Swal.fire({
          icon: "error",
          title: "Número de empleado en uso",
          text: "El número de empleado ya está registrado. Por favor, usa otro.",
        });
        return false;
      }

      // Si no hay más páginas que revisar, salir del bucle
      if (!exists_pagina_siguiente) {
        break;
      }

      // Pasar a la siguiente página
      paginaActual++;
    }

    // Si no se encontró el número de empleado duplicado
    return true;

  } catch (error) {
    // Si la respuesta incluye un mensaje de error "Usuario no encontrado", tratarlo adecuadamente
    if (error.response && error.response.data && error.response.data.error === "Usuario no encontrado.") {
      console.log("Usuario no encontrado. No hay registros de docentes.");
      Swal.fire({
        icon: "info",
        title: "Usuario no encontrado",
        text: "No se encontraron registros de docentes.",
      });
      return true; // Si no hay registros, puedes considerar que es válido registrar el nuevo número
    }

    console.log("Error al verificar número de empleado existente:", error.message);
    Swal.fire({
      icon: "error",
      title: "Error de verificación",
      text: "Hubo un error al verificar el número de empleado.",
    });
    return false;
  }
};


  const add = async() => {
    console.log("Agregando docente");
    const usuarioValido = await verificarUsuarioExistente();
    if (!usuarioValido) 
    {
      return; 
    }
    const empleadoExistente = await verificarDocenteExistente();
      if (!empleadoExistente) 
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

    /*--------------------contraseña y confirmar-------------------------- */
    if (contraseña.length < 8 || contraseña.length > 12) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La contraseña debe contener entre 8 y 12 caracteres.",
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

    /*------------------No.empleado------------------------*/
    const regexNoEmpleado = /^\d{3}$/;
    if (!regexNoEmpleado.test(noEmpleado)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El No. de Empleado debe estar seguido de 3 dígitos.",
      });
      return;
    }

    /*-------------carrera,sexo,semestre----------------- */
    if (academiaSeleccionada === '') {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes seleccionar una academia.",
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

    if (nivelSeleccionado === '') {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes seleccionar un nivel de estudio.",
      });
      return;
    }

    // Datos a enviar
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
        "role": "Docentes", 
        "imagen_usuario": ""
      },
      "docente": {
        "ultimo_nivel_estudios": nivelSeleccionado,
        "numero_empleado": "RH" + noEmpleado,
        "academia": academiaSeleccionada
      }
    };

    console.log(datosEnviar);

    Axios.post('http://localhost:3000/usuarios/docentes', datosEnviar)
    .then((response) => {
      console.log("Respuesta del servidor:", response.data);
      setUsuarioLog(response.data.id);
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "El docente ha sido registrado con éxito.",
      });
      handleNext();
    })
    .catch((error) => {
      if (error.response) {
        console.log("Error de respuesta del servidor:", error.response.data);

        if (error.response.data.error === 'El correo ya está en uso.') {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El correo ya está en uso.",
            footer: "Ingresa otro diferente."
          });
          return;
        }

        if (error.response.data.error === 'El número de empleado ya está en uso.') {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Número de empleado ya en uso.",
            footer: "El número de empleado no debe de repetirse."
          });
          return;
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error en la solicitud",
          text: error.message,
        });
      }
    });
  }

  return (
    <div className="docentes-contenedor">  
      <img src={Logo} alt="Logo" className="logo" />
      <h1>Registro de docente</h1>

      <div className="docentes-campo">  
        <Label htmlFor="Nombr" texto="Nombre(s):" />
        <Textbox 
        id="Nombre" 
        placeholder="Nombre(s)" 
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="docentes-campo">
        <Label htmlFor="Appatern" texto="Apellido paterno:" />
        <Textbox 
        id="Appaterno" 
        placeholder="Apellido paterno" 
        value={apellidoPaterno}
        onChange={(e) => setApellidoPaterno(e.target.value)}
        />
      </div>

      <div className="docentes-campo">
        <Label htmlFor="Apmatern" texto="Apellido materno:" />
        <Textbox 
        id="Apmaterno" 
        placeholder="Apellido materno" 
        value={apellidoMaterno}
        onChange={(e) => setApellidoMaterno(e.target.value)}
        />
      </div>

      <div className="docentes-campo">
        <Fecha label="Fecha de nacimiento" 
        value={fechaNacimiento}
        onChange={(e) => setFechaNacimiento(e.target.value)}
        />
      </div>

      <div className="docentes-campo">
        <Label htmlFor="Sex" texto="Sexo" />
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

      <div className="docentes-campo">
        <Label htmlFor="Telefono" texto="Teléfono:" />
        <Textbox 
        id="Telefono" 
        placeholder="Teléfono" 
        type="tel" 
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        />
      </div>

      <div className="docentes-campo">
        <Label htmlFor="corre" texto="Correo:" />
        <Textbox 
        id="correo" 
        placeholder="Correo electrónico" 
        type="email" 
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        />
      </div>

      <div className="docentes-campo">
        <Label htmlFor="contraseña" texto="Contraseña:" />
        <Textbox 
        id="contraseña" 
        placeholder="Contraseña"
        type="password"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)} 
        />
      </div>

      <div className="docentes-campo">
        <Label htmlFor="Confirmarcontraseñ" texto="Confirmar contraseña:" />
        <Textbox 
        id="Confirmarcontraseña" 
        placeholder="Confirmar contraseña" 
        type="password" 
        value={confirmarContraseña}
        onChange={(e) => setConfirmarContraseña(e.target.value)}
        />
      </div>

      <div className="docentes-campo">
        <label htmlFor="biografia">Biografía:</label>
        <Textarea 
        id="Biografia" 
        name="Biografia" 
        placeholder="Biografía" 
        value={biografia}
        onChange={(e) => setBiografia(e.target.value)}
        />
      </div>

      <div className="docentes-campo">
        <Label htmlFor="noDocente" texto="No. Empleado:" />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{marginRight: '5px'}}>RH</span>
          <Textbox 
          id="numerodeempleado" 
          placeholder="Número RH" 
          value={noEmpleado}
          onChange={(e) => setNoEmpleado(e.target.value)}
          />
        </div>
      </div>

      <div className="docentes-campo">
        <Label htmlFor="Acade" texto="Academia" />
        <RadioButtons
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

      <div className="docentes-campo">
        <Label htmlFor="Ultimonivel" texto="Nivel de estudio" />
        <RadioButtons
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

      <div className="docentes-botones">  
        <Button texto="Atrás" onClick={handleBack} />
        <Button texto="Siguiente" onClick={add} />
      </div>
    </div>
  );
};

export default RegistroDocentes;
