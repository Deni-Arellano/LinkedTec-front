import React, { useContext, useState, useEffect } from 'react';
import Textbox from '../componetes/Caja-de-texto'; 
import Button from '../componetes/Button';
import RadioButtons from '../componetes/Radio_buton.jsx';
import Fecha from '../componetes/Fecha';
import '../hojas-de-estilo/Estudiantes-registro.css'; 
import Logo from '../imagenes/Logo24.png'; 
import Textarea from '../componetes/Text-area.jsx';
import { useNavigate } from 'react-router-dom';  
import { usuarioContext } from '../App';
import Axios from 'axios';
import VentanaEmergente from '../componetes/VentanaEmergente'; 

const Registro = () => {
  const { usuarioLog, setUsuarioLog } = useContext(usuarioContext);

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

  // Estados para la ventana emergente
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const add = () => {
    console.log("Agregando estudiante");
    console.log("Nombre: " + nombre);
    console.log("Apellido Paterno: " + apellidoPaterno);
    console.log("Apellido Materno: " + apellidoMaterno);
    console.log("Fecha de Nacimiento: " + fechaNacimiento);
    console.log("Teléfono: " + telefono);
    console.log("Correo: " + correo);
    console.log("Contraseña: " + contraseña);
    console.log("Confirmar Contraseña: " + confirmarContraseña);
    console.log("Biografía: " + biografia);
    console.log("No. Control: " + noControl);
    console.log("Carrera: " + carreraSeleccionada);
    console.log("Sexo: " + sexoSeleccionado);
    console.log("Semestre: " + semestreSeleccionado);

    // Validación del Nombre
    if (nombre.length < 2 || nombre.length > 50) {
      setErrorMessage("El nombre debe tener entre 2 y 50 caracteres.");
      setShowPopup(true);
      return;
    }

    const Caracteres_especialesn = /^[A-Za-z\s]+$/;
    if (!Caracteres_especialesn.test(nombre)) {
      setErrorMessage("El nombre solo puede contener letras.");
      setShowPopup(true);
      return;
    }

    if (nombre.trim() === '') {
      setErrorMessage("El nombre no debe estar vacío.");
      setShowPopup(true);
      return;
    }

    if (nombre.trim().length === 0) {
      setErrorMessage("El nombre no puede tener solo espacios vacíos.");
      setShowPopup(true);
      return;
    }

    if (/[\s]{2,}/.test(nombre)) {
      setErrorMessage("El nombre no puede tener más de dos espacios vacíos.");
      setShowPopup(true);
      return;
    }

    /*--------------------apellido paterno-------------------------*/

    if (apellidoPaterno.length < 2 || apellidoPaterno.length > 50) {
      setErrorMessage("El apellido paterno debe tener entre 2 y 50 caracteres.");
      setShowPopup(true);
      return;
    }
    if (apellidoPaterno.trim() === '') {
      setErrorMessage("El apellido paterno no puede estar vacío.");
      setShowPopup(true);
      return;
    }

    /*--------------------fecha-------------------------*/
    const fechaIngresada = new Date(fechaNacimiento);
    const anioNacimiento = fechaIngresada.getFullYear();

    const fechaActual = new Date();
    const edad = fechaActual.getFullYear() - anioNacimiento;
    const haCumplidoAnios =
      fechaActual.getMonth() > fechaIngresada.getMonth() ||
      (fechaActual.getMonth() === fechaIngresada.getMonth() &&
        fechaActual.getDate() >= fechaIngresada.getDate());
    const edadReal = haCumplidoAnios ? edad : edad - 1;

    if (anioNacimiento <= 1950) {
      setErrorMessage("El año de nacimiento debe ser mayor a 1950.");
      setShowPopup(true);
      return;
    }
    if (edadReal < 17) {
      setErrorMessage("Debes tener al menos 17 años.");
      setShowPopup(true);
      return;
    }

    /*------------------teléfono---------------*/
    if (telefono.trim() === '') {
      setErrorMessage("Error: El teléfono no puede estar vacío.");
      setShowPopup(true);
      return;
    }
    if (telefono.length < 10 || telefono.length > 15) {
      setErrorMessage("Error: El teléfono debe tener entre 10 y 15 caracteres.");
      setShowPopup(true);
      return;
    }

    /*------------------correo---------------*/
    if (correo.trim() === '') {
      setErrorMessage("Error: El correo no puede estar vacío.");
      setShowPopup(true);
      return;
    }
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexCorreo.test(correo)) {
      setErrorMessage("Introduzca un correo electrónico válido.");
      setShowPopup(true);
      return;
    }

    /*--------------------contraseña y confirmar-------------------------- */

    if (contraseña.length < 8 || contraseña.length > 12) {
      setErrorMessage("La contraseña debe contener entre 8 y 12 caracteres.");
      setShowPopup(true);
      return;
    }
    const regexContraseña = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@._\-#$%&*]).{7,12}$/;

    if (!regexContraseña.test(contraseña)) {
      setErrorMessage("La contraseña debe incluir letras, números y caracteres especiales.");
      setShowPopup(true);
      return;
    }
    if (contraseña !== confirmarContraseña) {
      setErrorMessage("Las contraseñas no coinciden.");
      setShowPopup(true);
      return;
    }

    /*------------------No.control------------------------*/
    const regexNoControl = /^Z\d{8}$/;
    if (!regexNoControl.test(noControl)) {
      setErrorMessage("Error: El No. de Control debe comenzar con 'Z' y estar seguido de 8 dígitos.");
      setShowPopup(true);
      return;
    }

    /*-------------carrera,sexo,semestre----------------- */
    if (carreraSeleccionada === '') {
      setErrorMessage("Error: Debes seleccionar una carrera.");
      setShowPopup(true);
      return;
    }

    if (sexoSeleccionado === '') {
      setErrorMessage("Error: Debes seleccionar un sexo.");
      setShowPopup(true);
      return;
    }

    if (semestreSeleccionado === '') {
      setErrorMessage("Error: Debes seleccionar un semestre.");
      setShowPopup(true);
      return;
    }

    // Si todas las validaciones pasan, continúa con el envío de datos
    const datosEnviar = {
      usuario: {
        nombre: nombre,
        apellido_paterno: apellidoPaterno,
        apellido_materno: apellidoMaterno,
        correo: correo,
        contraseña: contraseña,
        fecha_nacimiento: fechaNacimiento,
        telefono: telefono,
        sexo: sexoSeleccionado,
        biografia: biografia,
        role: 'Estudiantes',
        imagen_usuario: '',
      },
      estudiante: {
        no_control: noControl,
        carrera: carreraSeleccionada,
        semestre: semestreSeleccionado,
      },
    };

    console.log(datosEnviar);

    Axios.post('http://localhost:3000/usuarios/estudiantes', datosEnviar)
      .then((response) => {
        // Muestra los datos devueltos por el servidor y agrega el id al contexto
        console.log("Respuesta del servidor:", response.data);
        setUsuarioLog(response.data.id); // Guarda el ID para usarlo como referencia en las demás páginas
        console.log("Usuario guardado sin actualizar:", usuarioLog);
        handleNext();
      })
      .catch((error) => {
        if (error.message === 'Network Error') {
          setErrorMessage("Error de red: No se pudo conectar al servidor. Verifica tu conexión.");
          setShowPopup(true);
          return;
        }

        if (error.response) {
          setErrorMessage(`Error de respuesta del servidor: ${error.response.data}`);
          setShowPopup(true);
          console.log("Error de respuesta del servidor:", error.response.data);
          console.log("Código de estado:", error.response.status);
        } else {
          setErrorMessage(`Error en la solicitud: ${error.message}`);
          setShowPopup(true);
          console.log("Error en la solicitud:", error.message);
        }
      });
  };

  return (
    <div className="estudiantes-contenedor"> 
      <img src={Logo} alt="Logo" className="logo" /> 
      <h1>Registro de estudiante</h1>

      {/* Ventana Emergente para Mostrar Errores */}
      {showPopup && (
        <VentanaEmergente
          mensaje={errorMessage}
          onClose={() => setShowPopup(false)}
        />
      )}

      <div className="estudiantes-campo">  
        <label htmlFor="nombre">Nombre(s):</label>
        <Textbox 
          id="Nombre" 
          placeholder="Nombre(s)"
          value={nombre} 
          onChange={(e)=>{setNombre(e.target.value)}}
        />
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
        <Fecha 
          label="Fecha de Nacimiento" 
          value={fechaNacimiento}
          onChange={(e)=> setFechaNacimiento(e.target.value)}
        />
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
