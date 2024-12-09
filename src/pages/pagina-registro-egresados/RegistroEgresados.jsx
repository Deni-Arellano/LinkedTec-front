import React, { useState, useContext, useEffect } from 'react';
import Textbox from '../../components/componente-caja-de-texto/CajaDeTexto.jsx';
import Textarea from '../../componetes/Text-area.jsx';
import Button from '../../components/boton/Boton.jsx';
import Fecha from '../../components/fecha/Fecha.jsx';
import './RegistroEgresados.css';
import Logo from '../../assets/Logo24.png';
import Label from '../../components/componente-label/Etiquetas.jsx';
import axios from 'axios';
import RadioButtons from '../../components/componente-boton-de-radio/radio-boton.jsx';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import {usuarioContext} from '../../App.js';
import { FaEye, FaEyeSlash } from 'react-icons/fa';  

const RegistroEgresado = () => {
  const {usuarioLog, setUsuarioLog} = useContext(usuarioContext);

  useEffect(() => {
    setUsuarioLog(null); // Restablece el contexto del usuario 
  }, [setUsuarioLog]);

  const navigate = useNavigate();

  const handleBack = () => {
    console.log('Navegando a /Rol');
    navigate('/rol');
  };

  const handleNext = () => {
    console.log('Navegando a /codigo-verificacion');
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
  const [Puesto, setPuesto] = useState('');
  const [AñoGraduacion, setAñoGraduacion] = useState('');
  const [sexoSeleccionado, setSexoSeleccionado] = useState('');
  const [carreraSeleccionada, setCarreraSeleccionada] = useState('');

  const validatePassword = () => {
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(contraseña)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial.",
      });
      return;
    }
  };
  

  const add = () => {
    console.log('Agregando egresado');

    validatePassword();

    if (!nombre) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El nombre no debe quedar vacío.",
      });
      return;
    }

    const Caracteres_especialesn = /^[A-Za-z.\s]+$/;
    if (!Caracteres_especialesn.test(nombre)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El nombre solo puede contener letras, espacios y puntos.",
      });
      return;
    }

    if (nombre.length >= 50) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El nombre no debe exceder los 50 caracteres.",
      });
      return;
    }

    if (!apellidoPaterno) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El apellido paterno no debe quedar vacío.",
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

    if (apellidoPaterno.length >= 50) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El apellido paterno no debe exceder los 50 caracteres.",
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

    if (!fechaNacimiento) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La fecha de nacimiento no debe quedar vacía.",
      });
      return;
    }

    const obtenerAño = new Date(fechaNacimiento).getFullYear();
    if (obtenerAño <= 1950) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El año de nacimiento debe ser mayor a 1950.",
      });
      return;
    }

    const añoActual = new Date().getFullYear();
    const edad = añoActual - obtenerAño;
    if (edad <= 17) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes tener al menos 17 años.",
      });
      return;
    }

    if (!sexoSeleccionado) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Se debe ingresar el sexo.",
      });
      return;
    }

    if (!telefono) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El teléfono no debe quedar vacío.",
      });
      return;
    }

    if (telefono.length < 10 || telefono.length > 15) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El teléfono debe tener entre 10 y 15 dígitos.",
      });
      return;
    }

    if (!/^\d+$/.test(telefono)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El teléfono debe contener solo dígitos.",
      });
      return;
    }

    if (!correo) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El correo no debe quedar vacío.",
      });
      return;
    }

    if (correo.length > 40) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El correo no debe tener más de 40 caracteres.",
      });
      return;
    }

    const obtenerEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!obtenerEmail.test(correo)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El formato del correo no es válido.",
      });
      return;
    }

    if (!contraseña) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La contraseña no debe quedar vacía.",
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

    if (contraseña.length < 8 || contraseña.length > 20) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La contraseña debe tener entre 8 y 12 caracteres.",
      });
      return;
    }


    if (!carreraSeleccionada) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La carrera no debe quedar vacía.",
      });
      return;
    }

    if (!AñoGraduacion) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El año de graduación no debe quedar vacío.",
      });
      return;
    }

    if (AñoGraduacion.length > 4) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El año de graduación no debe tener más de 4 caracteres.",
      });
      return;
    }

    if (AñoGraduacion <= 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El año de graduación debe ser mayor a 0.",
      });
      return;
    }

    if (!/^\d{4}$/.test(AñoGraduacion)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El año de graduación debe ser un número entero de 4 dígitos.",
      });
      return;
    }

    if (!Puesto) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El puesto no debe quedar vacío.",
      });
      return;
    }

    if (Puesto.length > 50) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El puesto no debe tener más de 50 caracteres.",
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
        "role": "Egresados", 
        "imagen_usuario": "https://res.cloudinary.com/dsysk6y0t/image/upload/v1730346904/images/co7yy9sanbmzkzh6oaje.png"
      },
      "egresado": {
        "carrera": carreraSeleccionada,
        "año_graduacion": AñoGraduacion,
        "puesto": Puesto
      }
    };

    console.log(datosEnviar);

    axios.post('https://linked-back-production.up.railway.app/usuarios/egresados', datosEnviar)
    .then((response) => {
      console.log("Respuesta del servidor:", response.data);
      setUsuarioLog(response.data.usuario.id);
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "El egresado ha sido registrado con éxito.",
      });
      handleNext();
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.data.message === 'El correo ya está en uso') {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El correo ya está en uso.",
            footer: "Ingresa otro diferente."
          });
        }
        if (error.response.status === 404) {
          Swal.fire({
            icon: "error",
            title: "Not found",
            text: "El recurso solicitado no existe.",
          });
        }

        if (error.response.status === 500) {
          Swal.fire({
            icon: "error",
            title: "Error del servidor",
            text: "Error general del servidor.",
          });
        }

        if (error.response.status === 422) {
          Swal.fire({
            icon: "error",
            title: "Error semántico",
            text: "La solicitud contiene errores semánticos.",
          });
        }

        console.log("Error de respuesta del servidor:", error.response.data);
        console.log("Código de estado:", error.response.status);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error en la solicitud",
          text: error.message,
        });
      }
    });
  };
  const [mostrarContraseña, setMostrarContraseña] = useState(false);  // Estado para controlar visibilidad
  const [MostrarConfirmarContraseña, setMostrarConfirmarContraseña] = useState(false);  // Estado para controlar visibilidad


  return (
    <div className="registro-egresado">
      <div className="egresado-contenedor">
        <img src={Logo} alt="Logo" className="logo" />
        <h1>Registro de egresado</h1>

        <div className="egresado-campo">
          <Label htmlFor="Nombre" texto='Nombre(s):'/>
          <Textbox 
            id="Nombre" 
            placeholder="Nombre(s)" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="egresado-campo">
          <Label htmlFor="ApellidoPaterno" texto='Apellido paterno:'/>
          <Textbox 
            id="ApellidoPaterno" 
            placeholder="Apellido paterno"
            value={apellidoPaterno} 
            onChange={(e) => setApellidoPaterno(e.target.value)}
          />
        </div>

        <div className="egresado-campo">
          <Label htmlFor="ApellidoMaterno" texto='Apellido materno:'/>
          <Textbox 
            id="ApellidoMaterno" 
            placeholder="Apellido materno" 
            value={apellidoMaterno}
            onChange={(e) => setApellidoMaterno(e.target.value)}
          />
        </div>

        <div className="egresado-campo">
          <Fecha label="Fecha de Nacimiento" 
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
          />
        </div>

        <div className="egresado-campo">
          <Label className="radio-buttons-label" texto='Sexo'/>
          <RadioButtons
            name="Sexo"
            options={[
              { value: 'Masculino', label: 'Masculino' },
              { value: 'Femenino', label: 'Femenino' },
              { value: 'Otro', label: 'Otro' },
            ]}
            selectedOption={sexoSeleccionado}  
            onChange={(e) => setSexoSeleccionado(e.target.value)}
          />
        </div>

        <div className="egresado-campo">
          <Label htmlFor="Telefono" texto='Teléfono'/>
          <Textbox 
            id="Telefono" 
            placeholder="Teléfono" 
            type="tel" 
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>

        <div className="egresado-campo">
          <Label htmlFor="Correo" texto='Correo:'/>
          <Textbox 
            id="Correo" 
            placeholder="Correo electrónico" 
            type="email" 
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div className="egresado-campo">
        <Label htmlFor="contraseña" texto="Contraseña:" />
        <div className="egresado-input-container">
          <Textbox 
            id="contraseña" 
            placeholder="Contraseña"
            type={mostrarContraseña ? "text" : "password"}  
            value={contraseña}
            className="egresado-textbox"  
            onChange={(e) => setContraseña(e.target.value)} 
          />
          <span 
            className="egresado-eye-icon" 
            onClick={() => setMostrarContraseña(!mostrarContraseña)}
          >
            {mostrarContraseña ? <FaEyeSlash /> : <FaEye />} 
          </span>
        </div>
      </div>
      <div className="egresado-campo">
        <Label htmlFor="Confirmarcontraseñ" texto="Confirmar contraseña:" />
        <div className="egresado-input-container">
          <Textbox 
            id="Confirmarcontraseña" 
            placeholder="Confirmar contraseña"
            type={MostrarConfirmarContraseña ? "text" : "password"} 
            value={confirmarContraseña}
            className="egresado-textbox"  
            onChange={(e) => setConfirmarContraseña(e.target.value)} 
          />
          <span 
            className="egresado-eye-icon" 
            onClick={() => setMostrarConfirmarContraseña(!MostrarConfirmarContraseña)}
          >
            {MostrarConfirmarContraseña ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>

        <div className="egresado-campo">
          <Label htmlFor="biografia" texto='Biografía:'/>
          <Textarea 
            id="Biografia"  
            placeholder="Biografía" 
            value={biografia}
            onChange={(e) => setBiografia(e.target.value)}
          />
        </div>

        <div className="egresado-campo">
          <Label className="radio-buttons-label" texto='Carrera'/>
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

        <div className="egresado-campo">
          <Label htmlFor="AñoGraduacion" texto='Año de graduación:'/>
          <Textbox 
            id="AñodeGraduacion"  
            placeholder="Año de graduación" 
            value={AñoGraduacion}
            onChange={(e) => setAñoGraduacion(e.target.value)}
          />
        </div>

        <div className="egresado-campo">
          <Label htmlFor="Puesto" texto='Puesto:'/>
          <Textbox 
            id="Puesto"  
            placeholder="Puesto en la empresa"
            value={Puesto}
            onChange={(e) => setPuesto(e.target.value)}
          />
        </div>

        <div className="botones">
          <Button texto="Atrás" onClick={handleBack} />
          <Button texto="Siguiente" onClick={add} />
        </div>
      </div>
    </div>
  );
};

export default RegistroEgresado;
