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

    if (contraseña !== confirmarContraseña) {
      console.log("Las contraseñas no coinciden");
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
