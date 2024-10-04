import React, { useState, useContext, useEffect } from 'react';
import Textbox from '../componetes/Caja-de-texto.jsx';
import Textarea from '../componetes/Text-area.jsx';
import Button from '../componetes/Button';
import RadioButtons from '../componetes/Radio_buton.jsx';
import Fecha from '../componetes/Fecha.jsx';
import '../hojas-de-estilo/Egresados-registro.css';
import Logo from '../imagenes/Logo24.png';
import { useNavigate } from 'react-router-dom';
import Label from '../componetes/Etiquetas';
import axios from 'axios';
import {usuarioContext} from '../App';
import VentanaEmergente from '../componetes/VentanaEmergete'; // Importamos la ventana emergente

const RegistroEgresado = () => {
  const {usuarioLog, setUsuarioLog} = useContext(usuarioContext);

  useEffect(() => {
    setUsuarioLog(null); // Restablece el contexto del usuario 
  }, [setUsuarioLog]);

  const navigate = useNavigate();

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

  // Estados para la ventana emergente
  const [mensajeError, setMensajeError] = useState('');
  const [mostrarVentana, setMostrarVentana] = useState(false);

  const handleNext = () => {
    console.log('Navegando a /codigo-verificacion');
    navigate('/codigo-verificacion');
  };

  const add = () => {
    if (contraseña !== confirmarContraseña) {
      setMensajeError("Las contraseñas no coinciden");
      setMostrarVentana(true);
      return; 
    }

    if ([nombre].some(field => !field)) {
      setMensajeError("El nombre no debe quedar vacio");
      setMostrarVentana(true);
      return;
    }

    if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
      setMensajeError("El nombre no debe contener números ni caracteres especiales.");
      setMostrarVentana(true);
      return;
    }
    
    if ([apellidoPaterno].some(field => !field)) {
      setMensajeError("El apellido paterno no debe quedar vacío.");
      setMostrarVentana(true);
      return;
    }
    
    if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(apellidoPaterno)) {
      setMensajeError("El apellido paterno no debe contener números ni caracteres especiales.");
      setMostrarVentana(true);
      return;
    }
    
    if (apellidoMaterno && !/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]*$/.test(apellidoMaterno)) {
      setMensajeError("El apellido materno no debe contener números ni caracteres especiales.");
      setMostrarVentana(true);
      return;
    }

    if (!fechaNacimiento) {
      setMensajeError("La fecha de nacimiento no debe quedar vacía.");
      setMostrarVentana(true);
      return;
    }

    const obtenerAño = new Date(fechaNacimiento).getFullYear();
    if (obtenerAño <= 1950) {
      setMensajeError("El año de nacimiento debe ser mayor a 1950.");
      setMostrarVentana(true);
      return;
    }

    const añoActual = new Date().getFullYear();
    const edad = añoActual - obtenerAño;
    if (edad <= 17) {
      setMensajeError("Debes tener al menos 17 años.");
      setMostrarVentana(true);
      return;
    }

    if (!sexoSeleccionado) {
      setMensajeError("Se debe ingresar el sexo.");
      setMostrarVentana(true);
      return;
    }

    if ([telefono].some(field => !field)) {
      setMensajeError("El teléfono no debe quedar vacio.");
      setMostrarVentana(true);
      return;
    }

    if (!/^\d+$/.test(telefono)) {
      setMensajeError("El teléfono debe contener solo dígitos.");
      setMostrarVentana(true);
      return;
    }

    if (!correo) {
      setMensajeError("El correo no debe quedar vacio.");
      setMostrarVentana(true);
      return;
    }

    const obtenerEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!obtenerEmail.test(correo)) {
      setMensajeError("El formato del correo no es válido.");
      setMostrarVentana(true);
      return;
    }

    if (!contraseña) {
      setMensajeError("La contraseña no debe quedar vacia.");
      setMostrarVentana(true);
      return;
    }

    if (contraseña.length < 8 || contraseña.length > 12) {
      setMensajeError("La contraseña debe tener entre 8 y 12 caracteres.");
      setMostrarVentana(true);
      return;
    }

    const regexContraseña = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@._\-#$%&*]).{7,12}$/;
    if (!regexContraseña.test(contraseña)) {
      setMensajeError("La contraseña debe incluir letras, números y caracteres especiales.");
      setMostrarVentana(true);
      return;
    }

    if (!carreraSeleccionada) {
      setMensajeError("La carrera no debe quedar vacia.");
      setMostrarVentana(true);
      return;
    }

    if (!AñoGraduacion) {
      setMensajeError("El año de graduacion no debe quedar vacio.");
      setMostrarVentana(true);
      return;
    }

    if (!/^\d{4}$/.test(AñoGraduacion)) {
      setMensajeError("El año de graduación debe ser un número entero de 4 dígitos.");
      setMostrarVentana(true);
      return;
    }

    if (!Puesto) {
      setMensajeError("El puesto no debe quedar vacio.");
      setMostrarVentana(true);
      return;
    }

    // Si pasa todas las validaciones, se sigue con el registro.
    const datosEnviar = {
      // ...datos a enviar
    };

    // Envío de datos al servidor
    axios.post('http://localhost:3000/usuarios/egresados', datosEnviar)
    .then((response) => {
      setUsuarioLog(response.data.usuario.id);
      handleNext();
    })
    .catch((error) => {
      setMensajeError("Error en el servidor: " + error.message);
      setMostrarVentana(true);
    });
  }

  return (
    <div className="registro-egresado">
      {/* ...Formulario... */}
      
      <Button texto="Registrar" onClick={add} />
      
      {mostrarVentana && <VentanaEmergente mensaje={mensajeError} onClose={() => setMostrarVentana(false)} />}
    </div>
  );
}

export default RegistroEgresado;
