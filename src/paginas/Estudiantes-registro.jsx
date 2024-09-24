import React, { useState } from 'react';
import Textbox from '../componetes/Caja-de-texto'; 
import Button from '../componetes/Button';
import RadioButtons from '../componetes/Radio_buton.jsx';
import Fecha from '../componetes/Fecha';
import '../hojas-de-estilo/Estudiantes-registro.css'; 
import Logo from '../imagenes/Logo24.png'; 
import Textarea from '../componetes/Text-area.jsx';
import { useNavigate } from 'react-router-dom';  
import Axios from 'axios';

const Registro = () => {
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

    if (contraseña !== confirmarContraseña) {
      console.log("Las contraseñas no coinciden");
      return; 
    }

    const datosEnviar={
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
          'role': 'estudiante',
          "imagen_usuario": ''
        },
        'estudiante': {
          'no_control': noControl,
          'carrera': carreraSeleccionada,
          'semestre': semestreSeleccionado
        }

    }

    console.log(datosEnviar);



    Axios.post('http://localhost:3000/api/estudiantes', datosEnviar)

    .then((response) => {
      console.log("Respuesta del servidor:", response.data);
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
    <div className="estudiantes-contenedor"> 
      <img src={Logo} alt="Logo" className="logo" /> 
      <h1>Registro de Estudiantes</h1>

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
        <label htmlFor="noControl">No. Control:</label>
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
            { value: 'IEM', label: 'IEM' },
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
