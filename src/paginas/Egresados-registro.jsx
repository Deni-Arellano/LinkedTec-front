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

const RegistroEgresado = () => {
  const {usuarioLog, setUsuarioLog} = useContext(usuarioContext);

  useEffect(() => {
    setUsuarioLog(null); // Restablece el contexto del usuario 
  }, [setUsuarioLog]);

  const navigate = useNavigate();

  const handleBack = () => {
    console.log('Navegando a /Rol');
    navigate('/Rol');
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


  const add = () => {
    console.log('Agregando egresado');
    console.log('Nombre: ' + nombre);
    console.log('Apellido Paterno: ' + apellidoPaterno);
    console.log('Apellido Materno: ' + apellidoMaterno);
    console.log('Fecha de Nacimiento: ' + fechaNacimiento);
    console.log('Teléfono: ' + telefono);
    console.log('Correo: ' + correo);
    console.log('Contraseña: ' + contraseña);
    console.log('Confirmar Contraseña: ' + confirmarContraseña);
    console.log('Biografía: ' + biografia);
    console.log('Puesto: ' + Puesto);
    console.log('Año de Graduación: ' + AñoGraduacion);

    if (contraseña !== confirmarContraseña) {
      console.log("Las contraseñas no coinciden");
      return; 
    }

    if ([nombre].some(field => !field)) {
      console.log("El nombre no debe quedar vacio");
      return;
    }

    if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
      console.log("El nombre no debe contener números ni caracteres especiales.");
      return;
    }
    
    if ([apellidoPaterno].some(field => !field)) {
      console.log("El apellido paterno no debe quedar vacío.");
      return;
    }
    
    if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(apellidoPaterno)) {
      console.log("El apellido paterno no debe contener números ni caracteres especiales.");
      return;
    }
    
    if (apellidoMaterno && !/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]*$/.test(apellidoMaterno)) {
      console.log("El apellido materno no debe contener números ni caracteres especiales.");
      return;
    }

    if (!fechaNacimiento) {
      console.log("La fecha de nacimiento no debe quedar vacía.");
      return;
    }

    const obtenerAño = new Date(fechaNacimiento).getFullYear();
    if (obtenerAño <= 1950) {
      console.log(obtenerAño)
      console.log("El año de nacimiento debe ser mayor a 1950.");
      return;
    }

    const añoActual = new Date().getFullYear();
    const edad = añoActual - obtenerAño;
    if (edad <= 17) {
      console.log(edad)
      console.log("Debes tener al menos 17 años.");
      return;
    }

    if (!sexoSeleccionado) {
      console.log("Se debe ingresar el sexo.");
      return;
    }

    if ([telefono].some(field => !field)) {
      console.log("El telefono no debe quedar vacio");
      return;
    }

    if (!/^\d+$/.test(telefono)) {
      console.log("El teléfono debe contener solo dígitos.");
      return;
    }

    if (!correo) {
      console.log("El correo no debe quedar vacio");
      return;
    }

    const obtenerEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!obtenerEmail.test(correo)) {
      console.log("El formato del correo no es válido");
      return;
    }

    if (!contraseña) {
      console.log("La contraseña no debe quedar vacia");
      return;
    }

    if (contraseña.length < 8 || contraseña.length > 12) {
      console.log("La contraseña debe tener entre 8 y 12 caracteres");
      return;
    }

    const regexContraseña = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@._\-#$%&*]).{7,12}$/;
    if (!regexContraseña.test(contraseña)) {
      console.log("La contraseña debe incluir letras, números y caracteres especiales.");
      return;
    }

    if (!carreraSeleccionada) {
      console.log("La carrera no debe quedar vacia");
      return;
    }

    if (!AñoGraduacion) {
      console.log("El año de graduacion no debe quedar vacio");
      return;
    }

    if (AñoGraduacion <= 0) {
      console.log("El año de graduación debe ser mayor a 0?");
      return;
    }

    // Verificar si es numero entero y de 4 dígitos
    if (!/^\d{4}$/.test(AñoGraduacion)) {
      console.log("El año de graduación debe ser numero entero de 4 dígitos");
      return;
    }

    if (!Puesto) {
      console.log("El puesto no debe quedar vacio");
      return;
    }

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
      "imagen_usuario": ""
      },
      "egresado": {
      "carrera": carreraSeleccionada,
      "año_graduacion": AñoGraduacion,
      "puesto": Puesto
      }
     }

    console.log(datosEnviar);

    axios
    .get("http://localhost:3000/usuarios/egresados", {
      params: { correo, telefono },
    })
    .then((response) => {
      if (response.data.existeCorreo) {
        console.log("El correo ya está registrado.");
        return;
      }
    
      if (response.data.existeTelefono) {
        console.log("El teléfono ya está registrado.");
        return;
      }

    })
    .catch((error) => {
      console.error("Error al validar el correo o teléfono:", error);
    });

    axios.post('http://localhost:3000/usuarios/egresados', datosEnviar)

    .then((response) => {
      //Muestra los datos devueltos por el servidor y agrega el id al contexto
      console.log("Respuesta del servidor:", response.data);
      setUsuarioLog(response.data.usuario.id);//Guarda el ID para usarlo como referencia en las demás páginas (gets, puts, deletes)
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
  }

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
          placeholder="Apellido Paterno"
          value={apellidoPaterno} 
          onChange={(e) => setApellidoPaterno(e.target.value)}
          
          />
        </div>

        <div className="egresado-campo">
          <Label htmlFor="ApellidoMaterno" texto='Apellido materno:'/>
          <Textbox 
          id="ApellidoMaterno" 
          placeholder="Apellido Materno" 
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
          <Label className="radio-buttons-label"texto='Sexo'/>
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
          <Label htmlFor="Contraseña" texto='Contraseña:'/>
          <Textbox 
          id="Contraseña" 
          placeholder="Contraseña" 
          type="password" 
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          
          />
        </div>

        <div className="egresado-campo">
          <Label htmlFor="confirmarContraseña" texto='Confirmar contraseña:'/>
          <Textbox 
          id="ConfirmarContraseña" 
          placeholder="Confirmar contraseña" 
          type="password" 
          value={confirmarContraseña}
          onChange={(e) => setConfirmarContraseña(e.target.value)}
          
          />
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
          placeholder="Año de Graduación" 
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
