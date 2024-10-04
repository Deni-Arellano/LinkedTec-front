import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import Textbox from '../componetes/Caja-de-texto.jsx'; 
import Button from '../componetes/Button.jsx'; 
import RadioButtons from '../componetes/Radio_buton.jsx'; 
import Fecha from '../componetes/Fecha.jsx'; 
import '../hojas-de-estilo/DatosUsu_EsDoEg.css'; 
import Logo from '../imagenes/Logo24.png'; 
import Textarea from '../componetes/Text-area.jsx';
import Label from '../componetes/Etiquetas.jsx'; // Asegúrate de que la extensión sea .jsx si es necesario
import axios from 'axios';
import { usuarioContext } from '../App';
import VentanaEmergente from '../componetes/VentanaEmergente.jsx'; // Importa correctamente el componente

const RegistroReclutador = () => {
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

  // Estados para los campos del formulario
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

  // Estados para la ventana emergente
  const [mostrarVentana, setMostrarVentana] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  // Funciones para manejar la ventana emergente
  const abrirVentana = (mensaje) => {
    setMensajeError(mensaje);
    setMostrarVentana(true);
  };

  const cerrarVentana = () => {
    setMostrarVentana(false);
  };

  const add = () => {
    console.log("Agregando reclutador");

    // Validaciones

    // Validación de las contraseñas
    if (contraseña !== confirmarContraseña) {
      abrirVentana("Las contraseñas no coinciden.");
      return; 
    }

    // Validación del Nombre
    if (!nombre.trim()) {
      abrirVentana("El nombre no debe quedar vacío.");
      return;
    }

    if (nombre.length < 2 || nombre.length > 50) {
      abrirVentana("El nombre debe tener entre 2 y 50 caracteres.");
      return; 
    }

    const Caracteres_especialesn = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/; 
    if (!Caracteres_especialesn.test(nombre)) {
      abrirVentana("El nombre no debe contener números ni caracteres especiales.");
      return; 
    }

    // Validación del Apellido Paterno
    if (!apellidoPaterno.trim()) {
      abrirVentana("El apellido paterno no debe quedar vacío.");
      return;
    }

    if (apellidoPaterno.length < 2 || apellidoPaterno.length > 50) {
      abrirVentana("El apellido paterno debe tener entre 2 y 50 caracteres.");
      return; 
    }

    if (!Caracteres_especialesn.test(apellidoPaterno)) {
      abrirVentana("El apellido paterno no debe contener números ni caracteres especiales.");
      return; 
    }

    // Validación del Apellido Materno (opcional)
    if (apellidoMaterno && !/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]*$/.test(apellidoMaterno)) {
      abrirVentana("El apellido materno no debe contener números ni caracteres especiales.");
      return;
    }

    // Validación de la Fecha de Nacimiento
    if (!fechaNacimiento) {
      abrirVentana("La fecha de nacimiento no debe quedar vacía.");
      return;
    }

    const fechaIngresada = new Date(fechaNacimiento);
    const anioNacimiento = fechaIngresada.getFullYear(); 
    const fechaActual = new Date(); 
    const edad = fechaActual.getFullYear() - anioNacimiento; 
    const haCumplidoAnios = (fechaActual.getMonth() > fechaIngresada.getMonth()) ||
      (fechaActual.getMonth() === fechaIngresada.getMonth() && fechaActual.getDate() >= fechaIngresada.getDate());
    const edadReal = haCumplidoAnios ? edad : edad - 1;

    if (anioNacimiento <= 1950) {
      abrirVentana("El año de nacimiento debe ser mayor a 1950.");
      return; 
    }

    if (edadReal < 17) {
      abrirVentana("Debes tener al menos 17 años.");
      return; 
    }

    // Validación del Sexo
    if (!sexoSeleccionado) {
      abrirVentana("Se debe ingresar el sexo.");
      return;
    }

    // Validación del Teléfono
    if (!telefono.trim()) {
      abrirVentana("El teléfono no debe quedar vacío.");
      return;
    }

    if (telefono.length < 10 || telefono.length > 15) {
      abrirVentana("El teléfono debe tener entre 10 y 15 caracteres.");
      return; 
    }

    if (!/^\d+$/.test(telefono)) {
      abrirVentana("El teléfono debe contener solo dígitos.");
      return;
    }

    // Validación del Correo
    if (!correo.trim()) {
      abrirVentana("El correo no debe quedar vacío.");
      return;
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      abrirVentana("El formato del correo no es válido.");
      return;
    }

    // Validación de la Contraseña
    if (!contraseña) {
      abrirVentana("La contraseña no debe quedar vacía.");
      return;
    }

    if (contraseña.length < 8 || contraseña.length > 12) {
      abrirVentana("La contraseña debe tener entre 8 y 12 caracteres.");
      return;
    }

    const regexContraseña = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@._\-#$%&*]).{8,12}$/;
    if (!regexContraseña.test(contraseña)) {
      abrirVentana("La contraseña debe incluir letras, números y caracteres especiales.");
      return;
    }

    // Validación del Nombre de la Empresa
    if (!nombreEmpresa.trim()) {
      abrirVentana("El nombre de la empresa no debe quedar vacío.");
      return;
    }

    if (nombreEmpresa.length < 2 || nombreEmpresa.length > 100) {
      abrirVentana("El nombre de la empresa debe tener entre 2 y 100 caracteres.");
      return;
    }

    // Validación de la Sede
    if (!sede.trim()) {
      abrirVentana("La sede no debe quedar vacía.");
      return;
    }

    if (sede.length < 2 || sede.length > 100) {
      abrirVentana("La sede debe tener entre 2 y 100 caracteres.");
      return;
    }

    // Validación del Giro
    if (!giroSeleccionado) {
      abrirVentana("El giro no debe quedar vacío.");
      return;
    }

    // Preparar los datos para enviar
    const datosEnviar = {
      usuario: {
        nombre: nombre.trim(),
        apellido_paterno: apellidoPaterno.trim(),
        apellido_materno: apellidoMaterno.trim(),
        correo: correo.trim(),
        contrasena: contraseña, // Asegúrate de que el backend espera 'contrasena' o 'contraseña'
        fecha_nacimiento: fechaNacimiento,
        telefono: telefono.trim(),
        sexo: sexoSeleccionado,
        biografia: biografia.trim(),
        tipo_usuario: "Reclutadores", // Asegúrate de que el backend espera 'tipo_usuario' o 'role'
        imagen_usuario: ""
      },
      reclutador: {
        nombre_empresa: nombreEmpresa.trim(),
        sector_comercial: giroSeleccionado, // Verifica el campo correcto según tu backend
        sede: sede.trim(),
        giro: giroSeleccionado // Asegúrate de que este campo no está duplicado
      }
    };

    console.log(datosEnviar);

    // Verificar si el correo o teléfono ya existen
    axios.get("http://localhost:3000/usuarios/reclutadores", {
      params: { correo: correo.trim(), telefono: telefono.trim() },
    })
    .then((response) => {
      if (response.data.existeCorreo) {
        abrirVentana("El correo ya está registrado.");
        return;
      }
    
      if (response.data.existeTelefono) {
        abrirVentana("El teléfono ya está registrado.");
        return;
      }

      // Si no existen, proceder a registrar
      axios.post('http://localhost:3000/usuarios/reclutadores', datosEnviar)
        .then((response) => {
          // Muestra los datos devueltos por el servidor y agrega el id al contexto
          console.log("Respuesta del servidor:", response.data);
          setUsuarioLog(response.data.usuario.id); // Guarda el ID para usarlo como referencia en las demás páginas
          console.log("Usuario guardado sin actualizar:", usuarioLog);
          handleNext();
        })
        .catch((error) => {
          if (error.response) {
            abrirVentana("Error de respuesta del servidor: " + error.response.data);
            console.log("Código de estado:", error.response.status);
          } else {
            abrirVentana("Error en la solicitud: " + error.message);
            console.log("Error en la solicitud:", error.message);
          }
        });
    })
    .catch((error) => {
      abrirVentana("Error al validar el correo o teléfono: " + error.message);
      console.error("Error al validar el correo o teléfono:", error);
    });
  };

  return (
    <div className="reclutador-contenedor">
      <img src={Logo} alt="Logo" className="logo" />
      <h1>Registro de reclutador</h1>

      {/* Ventana Emergente para Mostrar Errores */}
      {mostrarVentana && (
        <VentanaEmergente 
          mostrar={mostrarVentana} 
          mensaje={mensajeError} 
          cerrarVentana={cerrarVentana} 
        />
      )}

      {/* Formulario de Registro */}
      <div className="reclutador-campo">
        <Label htmlFor="nombre" texto="Nombre(s):" />
        <Textbox 
          id="Nombre" 
          placeholder="Nombre(s)" 
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="reclutador-campo">
        <Label htmlFor="apellidoPaterno" texto="Apellido paterno:" />
        <Textbox 
          id="ApellidoPat" 
          placeholder="Apellido paterno" 
          value={apellidoPaterno}
          onChange={(e) => setApellidoPaterno(e.target.value)}
        />
      </div>

      <div className="reclutador-campo">
        <Label htmlFor="apellidoMaterno" texto="Apellido materno:" />
        <Textbox 
          id="ApellidoMat" 
          placeholder="Apellido materno" 
          value={apellidoMaterno}
          onChange={(e) => setApellidoMaterno(e.target.value)}
        />
      </div>

      <div className="reclutador-campo">
        <Fecha 
          label="Fecha de Nacimiento" 
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
        />
      </div>

      <div className="reclutador-campo">
        <Label className="radio-buttons-label" texto="Sexo:" />
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
        <Label htmlFor="telefono" texto="Teléfono:" />
        <Textbox 
          id="Telefono" 
          placeholder="Teléfono" 
          type="tel" 
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>

      <div className="reclutador-campo">
        <Label htmlFor="correo" texto="Correo:" />
        <Textbox 
          id="Correo" 
          placeholder="Correo electrónico" 
          type="email" 
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </div>

      <div className="reclutador-campo">
        <Label htmlFor="contraseña" texto="Contraseña:" />
        <Textbox 
          id="Contraseña" 
          placeholder="Contraseña" 
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)} 
        />
      </div>

      <div className="reclutador-campo">
        <Label htmlFor="confirmarContraseña" texto="Confirmar contraseña:" />
        <Textbox 
          id="ConfirmarContraseña" 
          placeholder="Confirmar contraseña" 
          type="password" 
          value={confirmarContraseña}
          onChange={(e) => setConfirmarContraseña(e.target.value)}
        />
      </div>

      <div className="reclutador-campo">
        <Label htmlFor="biografia" texto="Biografía:" />
        <Textarea 
          id="Biografia" 
          name="Biografia" 
          placeholder="Biografía" 
          value={biografia}
          onChange={(e) => setBiografia(e.target.value)}
        />
      </div>

      <div className="reclutador-campo">
        <Label htmlFor="nombreEmpresa" texto="Nombre de la empresa:" />
        <Textbox 
          id="NombredelaEmpresa" 
          placeholder="Nombre de la Empresa"
          value={nombreEmpresa}
          onChange={(e) => setNombreEmpresa(e.target.value)} 
        />
      </div>

      <div className="reclutador-campo">
        <Label htmlFor="sede" texto="Sede:" />
        <Textbox 
          id="Sede" 
          placeholder="Sede" 
          value={sede}
          onChange={(e) => setSede(e.target.value)}
        />
      </div>

      <div className="reclutador-campo">
        <Label className="radio-buttons-label" texto="Giro:" />
        <RadioButtons
          name="Giro"
          options={[
            { value: 'Comercial', label: 'Comercial' },
            { value: 'Servicio', label: 'Servicio' },
            { value: 'Manufacturera', label: 'Manufacturera' },
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
