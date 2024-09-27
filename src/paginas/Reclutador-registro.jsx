import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import Textbox from '../componetes/Caja-de-texto.jsx'; 
import Button from '../componetes/Button.jsx'; 
import RadioButtons from '../componetes/Radio_buton.jsx'; 
import Fecha from '../componetes/Fecha.jsx'; 
import '../hojas-de-estilo/Reclutador-registro.css'; 
import Logo from '../imagenes/Logo24.png'; 
import Textarea from '../componetes/Text-area.jsx';
import axios from 'axios';
import {usuarioContext} from '../App';


const RegistroReclutador = () => {
  const {usuarioLog, setUsuarioLog} = useContext(usuarioContext);

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
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [sede, setSede] = useState('');
  const [sexoSeleccionado, setSexoSeleccionado] = useState('');
  const [giroSeleccionado, setGiroSeleccionado] = useState('');

  const add = () => {
    console.log("Agregando reclutador");
    console.log("Nombre: " + nombre);
    console.log("Apellido Paterno: " + apellidoPaterno);
    console.log("Apellido Materno: " + apellidoMaterno);
    console.log("Fecha de Nacimiento: " + fechaNacimiento);
    console.log("Teléfono: " + telefono);
    console.log("Correo: " + correo);
    console.log("Contraseña: " + contraseña);
    console.log("Confirmar Contraseña: " + confirmarContraseña);
    console.log("Biografía: " + biografia);
    console.log("Nombre de la Empresa: " + nombreEmpresa);
    console.log("Sede: " + sede);
    console.log("Sexo: " + sexoSeleccionado);
    console.log("Giro: " + giroSeleccionado);

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
      "contrasena":  contraseña,
      "fecha_nacimiento": fechaNacimiento,
      "telefono": telefono,
      "sexo": sexoSeleccionado,
      "biografia": biografia ,
      "tipo_usuario": "Empleador",
      "imagen_usuario":""
      },
      "reclutador": {
      "nombre_empresa": nombreEmpresa,
      "sector_comercial": giroSeleccionado,
      "sede": sede,
      "giro": giroSeleccionado
      }
      }
      
    axios.post('http://localhost:3000/usuarios/reclutadores', datosEnviar)
      .then((response) => {
        //Muestra los datos devueltos por el servidor y agrega el id al contexto
        console.log("Respuesta del servidor:", response.data);
        setUsuarioLog(response.data.id);//Guarda el ID para usarlo como referencia en las demás páginas (gets, puts, deletes)
        console.log("Usuario guardado sin actualizar:", usuarioLog);
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
  };

  return (
    <div className="reclutador-contenedor">
      <img src={Logo} alt="Logo" className="logo" />
      <h1>Registro de Reclutador</h1>

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
          onChange={(e)=> setBiografia(e.target.value)}
          />
      </div>

      <div className="reclutador-campo">
        <label htmlFor="nombreEmpresa">Nombre de la Empresa:</label>
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
            { value: 'Manufactura', label: 'Manufactura' },
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
