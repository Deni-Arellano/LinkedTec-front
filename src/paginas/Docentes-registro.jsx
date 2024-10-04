import React, { useState, useContext, useEffect } from 'react';
import Textbox from '../componetes/Caja-de-texto.jsx'; 
import Textarea from '../componetes/Text-area.jsx'; 
import Button from '../componetes/Button'; 
import RadioButtons from '../componetes/Radio_buton.jsx'; 
import Fecha from '../componetes/Fecha.jsx';
import Logo from '../imagenes/Logo24.png'; 
import Label from '../componetes/Etiquetas';
import '../hojas-de-estilo/Docentes-registro.css';
import { useNavigate } from 'react-router-dom'; 
import Axios from 'axios'; 
import { usuarioContext } from '../App';
import VentanaEmergente from '../componetes/VentanaEmergente.jsx'; // Importamos la ventana emergente

const RegistroDocentes = () => {
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

  // Estados para los campos
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

  // Estados para manejar la ventana emergente
  const [mostrarVentana, setMostrarVentana] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  const abrirVentana = (mensaje) => {
    setMensajeError(mensaje);
    setMostrarVentana(true);
  };

  const cerrarVentana = () => {
    setMostrarVentana(false);
  };

  const add = () => {
    console.log("Agregando docente");

    // Validaciones
    if (nombre.length < 2 || nombre.length > 50) {
      abrirVentana("El nombre debe tener entre 2 y 50 caracteres.");
      return;
    }

    const Caracteres_especialesn = /^[A-Za-z\s]+$/;
    if (!Caracteres_especialesn.test(nombre)) {
      abrirVentana("El nombre solo puede contener letras.");
      return;
    }

    if (nombre.trim() === '') {
      abrirVentana("El nombre no debe estar vacío.");
      return;
    }

    if (nombre.trim().length === 0) {
      abrirVentana("El nombre no puede tener solo espacios vacíos.");
      return;
    }

    if (/[\s]{2,}/.test(nombre)) {
      abrirVentana("El nombre no puede tener más de dos espacios vacíos.");
      return;
    }

    /* Validaciones adicionales para apellido, fecha de nacimiento, teléfono, correo, etc. */
    
    const fechaIngresada = new Date(fechaNacimiento);
    const anioNacimiento = fechaIngresada.getFullYear();
    const fechaActual = new Date();
    const edad = fechaActual.getFullYear() - anioNacimiento;
    const haCumplidoAnios = (fechaActual.getMonth() > fechaIngresada.getMonth()) ||
      (fechaActual.getMonth() === fechaIngresada.getMonth() && fechaActual.getDate() >= fechaIngresada.getDate());
    const edadReal = haCumplidoAnios ? edad : edad - 1;

    if (anioNacimiento <= 1950) {
      abrirVentana('El año de nacimiento debe ser mayor a 1950.');
      return;
    }

    if (edadReal < 17) {
      abrirVentana('Debes tener al menos 17 años.');
      return;
    }

    if (telefono.trim() === '') {
      abrirVentana('El teléfono no puede estar vacío.');
      return;
    }

    if (telefono.length < 10 || telefono.length > 15) {
      abrirVentana('El teléfono debe tener entre 10 y 15 caracteres.');
      return;
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      abrirVentana('Introduzca un correo electrónico válido.');
      return;
    }

    const regexContraseña = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@._\-#$%&*]).{7,12}$/;
    if (!regexContraseña.test(contraseña)) {
      abrirVentana("La contraseña debe incluir letras, números y caracteres especiales.");
      return;
    }

    if (contraseña !== confirmarContraseña) {
      abrirVentana("Las contraseñas no coinciden.");
      return;
    }

    const regexNoEmpleado = /^\d{3}$/;
    if (!regexNoEmpleado.test(noEmpleado)) {
      abrirVentana("El No. de Empleado debe comenzar con 'RH' y estar seguido de 3 dígitos.");
      return;
    }

    if (academiaSeleccionada === '') {
      abrirVentana("Debes seleccionar una academia.");
      return;
    }

    if (sexoSeleccionado === '') {
      abrirVentana("Debes seleccionar un sexo.");
      return;
    }

    if (nivelSeleccionado === '') {
      abrirVentana("Debes seleccionar un nivel de estudios.");
      return;
    }

    // Preparar los datos para enviar
    const datosEnviar = {
      usuario: {
        nombre,
        apellido_paterno: apellidoPaterno,
        apellido_materno: apellidoMaterno,
        correo,
        contraseña,
        fecha_nacimiento: fechaNacimiento,
        telefono,
        sexo: sexoSeleccionado,
        biografia,
        role: "Docentes",
        imagen_usuario: ""
      },
      docente: {
        ultimo_nivel_estudios: nivelSeleccionado,
        numero_empleado: "RH" + noEmpleado,
        academia: academiaSeleccionada
      }
    };

    // Envío de datos a la API
    Axios.post('http://localhost:3000/usuarios/docentes', datosEnviar)
      .then((response) => {
        console.log("Respuesta del servidor:", response.data);
        setUsuarioLog(response.data.id);
        handleNext();
      })
      .catch((error) => {
        if (error.response) {
          abrirVentana("Error en la respuesta del servidor: " + error.response.data);
        } else {
          abrirVentana("Error en la solicitud: " + error.message);
        }
      });
  };

  return (
    <div className="docentes-contenedor">
      <img src={Logo} alt="Logo" className="logo" />
      <h1>Registro de docente</h1>

      <div className="docentes-campo">
        <Label htmlFor="Nombre" texto="Nombre(s):" />
        <Textbox
          id="Nombre"
          placeholder="Nombre(s)"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="docentes-campo">
        <Label htmlFor="Appaterno" texto="Apellido paterno:" />
        <Textbox
          id="Appaterno"
          placeholder="Apellido paterno"
          value={apellidoPaterno}
          onChange={(e) => setApellidoPaterno(e.target.value)}
        />
      </div>

      <div className="docentes-campo">
        <Label htmlFor="Apmaterno" texto="Apellido materno:" />
        <Textbox
          id="Apmaterno"
          placeholder="Apellido materno"
          value={apellidoMaterno}
          onChange={(e) => setApellidoMaterno(e.target.value)}
        />
      </div>

      <div className="docentes-campo">
        <Fecha
          label="Fecha de nacimiento"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
        />
      </div>

      <div className="docentes-campo">
        <Label htmlFor="Sexo" texto="Sexo" />
        <RadioButtons
          name="Sexo"
          options={[
            { value: 'Femenino', label: 'Femenino' },
            { value: 'Masculino', label: 'Masculino' },
            { value: 'Otro', label: 'Otro' }
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
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>

      <div className="docentes-campo">
        <Label htmlFor="Correo" texto="Correo electrónico:" />
        <Textbox
          id="Correo"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </div>

      <div className="docentes-campo">
        <Label htmlFor="Contraseña" texto="Contraseña:" />
        <Textbox
          id="Contraseña"
          placeholder="Contraseña"
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />
      </div>

      <div className="docentes-campo">
        <Label htmlFor="ConfirmarContraseña" texto="Confirmar contraseña:" />
        <Textbox
          id="ConfirmarContraseña"
          placeholder="Confirmar contraseña"
          type="password"
          value={confirmarContraseña}
          onChange={(e) => setConfirmarContraseña(e.target.value)}
        />
      </div>

      <div className="docentes-campo">
        <Label htmlFor="Biografia" texto="Biografía:" />
        <Textarea
          id="Biografia"
          placeholder="Cuéntanos más sobre ti..."
          value={biografia}
          onChange={(e) => setBiografia(e.target.value)}
        />
      </div>

      <div className="docentes-campo">
        <Label htmlFor="NoEmpleado" texto="No. de Empleado:" />
        <Textbox
          id="NoEmpleado"
          placeholder="No. de Empleado"
          value={noEmpleado}
          onChange={(e) => setNoEmpleado(e.target.value)}
        />
      </div>

      <div className="docentes-campo">
        <Label htmlFor="Academia" texto="Academia:" />
        <RadioButtons
          name="Academia"
          options={[
            { value: 'Ciencias Computacionales', label: 'Ciencias Computacionales' },
            { value: 'Matemáticas', label: 'Matemáticas' },
            { value: 'Física', label: 'Física' },
            { value: 'Química', label: 'Química' }
          ]}
          selectedOption={academiaSeleccionada}
          onChange={(e) => setAcademiaSeleccionada(e.target.value)}
        />
      </div>

      <div className="docentes-campo">
        <Label htmlFor="Nivel" texto="Último nivel de estudios:" />
        <RadioButtons
          name="Nivel"
          options={[
            { value: 'Licenciatura', label: 'Licenciatura' },
            { value: 'Maestría', label: 'Maestría' },
            { value: 'Doctorado', label: 'Doctorado' }
          ]}
          selectedOption={nivelSeleccionado}
          onChange={(e) => setNivelSeleccionado(e.target.value)}
        />
      </div>

      <div className="docentes-botones">
        <Button texto="Atrás" onClick={handleBack} />
        <Button texto="Siguiente" onClick={add} />
      </div>

      {mostrarVentana && (
        <VentanaEmergente mensaje={mensajeError} onClose={cerrarVentana} />
      )}
    </div>
  );
};

export default RegistroDocentes;
