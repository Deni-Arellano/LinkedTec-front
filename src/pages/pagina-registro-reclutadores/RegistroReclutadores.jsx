import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import Textbox from '../../componetes/Caja-de-texto.jsx'; 
import Button from '../../componetes/Button.jsx'; 
import RadioButtons from '../../componetes/Radio_buton.jsx'; 
import Fecha from '../../componetes/Fecha.jsx'; 
import './RegistroReclutadores.css'; 
import Logo from '../../imagenes/Logo24.png'; 
import Textarea from '../../componetes/Text-area.jsx';
import axios from 'axios';
import {usuarioContext} from '../../App';
import Swal from 'sweetalert2';

const RegistroReclutador = () => {
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
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [sede, setSede] = useState('');
  const [sexoSeleccionado, setSexoSeleccionado] = useState('');
  const [giroSeleccionado, setGiroSeleccionado] = useState('');

  const add = () => {
    console.log("Agregando reclutador");

    if (contraseña !== confirmarContraseña) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las contraseñas no coinciden.",
      });
      return; 
    }

    if (!nombre) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El nombre no debe quedar vacío.",
      });
      return;
    }

    if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El nombre no debe contener números ni caracteres especiales.",
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

    if (apellidoPaterno.length >= 50) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El apellido paterno no debe exceder los 50 caracteres.",
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

    if (contraseña.length < 8 || contraseña.length > 20) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La contraseña debe tener entre 8 y 12 caracteres.",
      });
      return;
    }

    const regexContraseña = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,20}$/;
    if (!regexContraseña.test(contraseña)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La contraseña no cumple con los requisitos.",
        footer: "La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial (@, $, !, %, *, ?, &).",
      });
      return;
    }

    if (biografia.length >= 255) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La biografía no debe exceder los 255 caracteres.",
      });
      return;
    }

    if (!nombreEmpresa) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El nombre de la empresa no debe quedar vacío.",
      });
      return;
    }

    if (!sede) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La sede no debe quedar vacía.",
      });
      return;
    }

    if (!giroSeleccionado) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El giro no debe quedar vacío.",
      });
      return;
    }

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
        "tipo_usuario": "Reclutadores",
        "imagen_usuario": ""
      },
      "reclutador": {
        "nombre_empresa": nombreEmpresa,
        "sector_comercial": giroSeleccionado,
        "sede": sede,
        "giro": giroSeleccionado
      }
    };

    axios.post('http://localhost:3000/usuarios/reclutadores', datosEnviar)
    .then((response) => {
      console.log("Respuesta del servidor:", response.data);
      setUsuarioLog(response.data.usuario.id);
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "El reclutador ha sido registrado con éxito.",
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

        if (error.response.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Bad request",
            text: "La solicitud es inválida o no puede ser procesada.",
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

  return (
    <div className="reclutador-contenedor">
      <img src={Logo} alt="Logo" className="logo" />
      <h1>Registro de reclutador</h1>

      <div className="reclutador-campo">
        <label htmlFor="nombre">Nombre(s):</label>
        <Textbox 
          id="Nombre" 
          placeholder="Nombre(s)" 
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="reclutador-campo">
        <label htmlFor="apellidoPaterno">Apellido paterno:</label>
        <Textbox 
          id="ApellidoPat" 
          placeholder="Apellido paterno" 
          value={apellidoPaterno}
          onChange={(e) => setApellidoPaterno(e.target.value)}
        />
      </div>

      <div className="reclutador-campo">
        <label htmlFor="apellidoMaterno">Apellido materno:</label>
        <Textbox 
          id="ApellidoMat" 
          placeholder="Apellido materno" 
          value={apellidoMaterno}
          onChange={(e) => setApellidoMaterno(e.target.value)}
        />
      </div>

      <div className="reclutador-campo">
        <Fecha label="Fecha de Nacimiento" 
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
        />
      </div>

      <div className="reclutador-campo">
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

      <div className="reclutador-campo">
        <label htmlFor="telefono">Teléfono:</label>
        <Textbox 
          id="Telefono" 
          placeholder="Teléfono" 
          type="tel" 
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>

      <div className="reclutador-campo">
        <label htmlFor="correo">Correo:</label>
        <Textbox 
          id="Correo" 
          placeholder="Correo electrónico" 
          type="email" 
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </div>

      <div className="reclutador-campo">
        <label htmlFor="contraseña">Contraseña:</label>
        <Textbox 
          id="Contraseña" 
          placeholder="Contraseña" 
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />
      </div>

      <div className="reclutador-campo">
        <label htmlFor="confirmarContraseña">Confirmar contraseña:</label>
        <Textbox 
          id="ConfirmarContraseña" 
          placeholder="Confirmar contraseña" 
          type="password" 
          value={confirmarContraseña}
          onChange={(e) => setConfirmarContraseña(e.target.value)}
        />
      </div>

      <div className="reclutador-campo">
        <label htmlFor="biografia">Biografía:</label>
        <Textarea 
          id="Biografia" 
          name="Biografia" 
          placeholder="Biografía" 
          value={biografia}
          onChange={(e) => setBiografia(e.target.value)}
        />
      </div>

      <div className="reclutador-campo">
        <label htmlFor="nombreEmpresa">Nombre de la empresa:</label>
        <Textbox 
          id="NombredelaEmpresa" 
          placeholder="Nombre de la Empresa"
          value={nombreEmpresa}
          onChange={(e) => setNombreEmpresa(e.target.value)} 
        />
      </div>

      <div className="reclutador-campo">
        <label htmlFor="sede">Sede:</label>
        <Textbox 
          id="Sede" 
          placeholder="Sede" 
          value={sede}
          onChange={(e) => setSede(e.target.value)}
        />
      </div>

      <div className="reclutador-campo">
        <label className="reclutador-radio-buttons-label">Giro</label>
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

      <div className="reclutador-botones">
        <Button texto="Atrás" onClick={handleBack} />  
        <Button texto="Siguiente" onClick={add} />  
      </div>
    </div>
  );
};

export default RegistroReclutador;
