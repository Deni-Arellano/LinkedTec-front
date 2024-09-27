import React, { useState } from 'react';
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

const RegistroDocentes = () => {
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
  const [noEmpleado, setNoEmpleado] = useState('');
  const [academiaSeleccionada, setAcademiaSeleccionada] = useState('');
  const [sexoSeleccionado, setSexoSeleccionado] = useState('');
  const [nivelSeleccionado, setNivelSeleccionado] = useState('');


  const add = () => {
    console.log("Agregando docente");
    console.log("Nombre: " + nombre);
    console.log("Apellido Paterno: " + apellidoPaterno);
    console.log("Apellido Materno: " + apellidoMaterno);
    console.log("Fecha de Nacimiento: " + fechaNacimiento);
    console.log("Teléfono: " + telefono);
    console.log("Correo: " + correo);
    console.log("Contraseña: " + contraseña);
    console.log("Confirmar Contraseña: " + confirmarContraseña);
    console.log("Biografía: " + biografia);
    console.log("No. Empleado: " + noEmpleado);
    console.log("Academia: " + academiaSeleccionada);
    console.log("Sexo: " + sexoSeleccionado);
    console.log("Nivel de estudios: " + nivelSeleccionado);
    if (nombre.length <2 || nombre.length > 50) {
      console.log("El nombre debe tener entre 2 y 50 caracteres.");
      return; 
    }

    const Caracteres_especialesn= /^[A-Za-z\s]+$/; 
    if (!Caracteres_especialesn.test(nombre))
    {
      console.log("El nombre solo puede contener letras ")
      return; 
    }

    if (nombre.trim() === '') {
      console.log("El nombre no debe estar vacio ")
      return; 
    }

    if (nombre.trim().length === 0) {
      console.log("El nombre no puede tener solo espacios vacios")
      return; 
    }

    if (/[\s]{2,}/.test(nombre)) {
      console.log("El nombre no puede tener mas de dos espacios vacios")
      return; 
    }
    
    

    /*--------------------apellido paterno-------------------------*/

    if (apellidoPaterno.length < 2 || apellidoPaterno.length > 50) {
      console.log("El apellido paterno debe tener entre 2 y 50 caracteres.");
      return; 
    }
    const caracteres_especiales_ap = /^[A-Za-z\s]+$/;
    if (caracteres_especiales_ap.test(apellidoPaterno)) {
      console.log("Error: El apellido paterno solo puede contener letras y espacios.");
      return; 
    }

    if (apellidoPaterno.trim() === '') {
      console.log("El apellido paterno no puede estar vacío.");
      return; 
    }
    if (/[\s]{2,}/.test(apellidoPaterno)) {
      console.log("El apellido paterno no debe contener espacios consecutivos.");
      return; 
    }

    const Caracteres_especiales_ap = /^[A-Za-z\s]+$/; 
    if (!Caracteres_especiales_ap.test(apellidoPaterno))
    {
      console.log("El apellido paterno solo puede contener letras ")
      return; 
    }
    /*-------------------- appellido materno-------------------------*/
    if (apellidoMaterno.length < 2 || apellidoMaterno.length > 50) {
      console.log("El apellido materno debe tener entre 2 y 50 caracteres.");
      return; 
    }

    const caracteres_especiales_am = /^[A-Za-z\s]+$/;
    if (caracteres_especiales_am.test(apellidoMaterno)) {
      console.log("El apellido materno solo puede contener letras y espacios.");
      return; 
    }
    if (/[\s]{2,}/.test(apellidoMaterno)) {
      console.log("El apellido materno no debe contener espacios consecutivos.");
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
      console.log('El año de nacimiento debe ser mayor a 1950.');
      return; 
    }
    if (edadReal < 17) {
      console.log('Debes tener al menos 17 años.');
      return; 
    }
    /*------------------telefono---------------*/
    if (telefono.trim() === '') {
      console.log('Error: El teléfono no puede estar vacío.');
      return; 
    }
    if (telefono.length < 10 || telefono.length > 15) {
      console.log('Error: El teléfono debe tener entre 10 y 15 caracteres.');
      return; 
    }

  /*------------------correo---------------*/
    if (correo.trim() === '') {
      console.log('Error: El correo no puede estar vacío.');
      return;
    }

    const Correoval = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (Correoval.test(correo)) {
      console.log('Error: El formato del correo es inválido.');
      return;
    }

  /*--------------------contraseña y confirmar-------------------------- */

    
    if (contraseña.length >= 7 && contraseña.length <= 12) {
      console.log("La contraseña debe contener entre 8 y caracteres")


    } 
    if (contraseña !== confirmarContraseña) {
      console.log("Las contraseñas no coinciden");
      return; 
    }


    if (confirmarContraseña !== contraseña) {
      console.log("Las contraseñas no coinciden");
      return; 
    }

    /*------------------No.empleado------------------------*/
    const regexNoEmpleado = /^RH\d{3}$/;
    if (!regexNoEmpleado.test(noEmpleado)) {console.log(" El No. de Empleado debe comenzar con 'RH' y estar seguido de 3 dígitos.");
      return;
    }

    /*-------------carrera,sexo,semestre----------------- */
    if (academiaSeleccionada === '') {
      console.log("Error: Debes seleccionar una carrera.");
      return;
    }
    
    if (sexoSeleccionado === '') {
      console.log("Error: Debes seleccionar un sexo.");
      return;
    }
    
    if (nivelSeleccionado=== '') {
      console.log("Error: Debes seleccionar un semestre.");
      return;
    }

    const datosEnviar={
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
      "role": "Maestro",
      "imagen_usuario": ""
      },
      "docente": {
      "ultimo_nivel_estudios": nivelSeleccionado,
      "numero_empleado": "RH" + noEmpleado,
      "academia": academiaSeleccionada
      }
    }

    console.log(datosEnviar);

    Axios.post('http://localhost:3000/api/docentes', datosEnviar)
    .then((response) => {
      console.log("Respuedsta del servidor:", response.data);
      handleNext();
    })
    .catch((error) => {
      if (error.response) {
          console.log("Error de respuesta del servidor:", error.response.data);
          console.log("Código de estado:", error.response.status);
      } else {
          console.log("Error en la solicitud:", error.message);
      }
    })
    ;

  }


  return (
    <div className="docentes-contenedor">  
      <img src={Logo} alt="Logo" className="logo" />
      <h1>Registro de Docente</h1>

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
        <Fecha label="Fecha de Nacimiento" 
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
