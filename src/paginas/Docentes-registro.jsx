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

  const [sexoSeleccionado, setSexoSeleccionado] = useState('');
  const [nivelSeleccionado, setNivelSeleccionado] = useState('');

  return (
    <div className="docentes-contenedor">  
      <img src={Logo} alt="Logo" className="logo" />
      <h1>Registro de Docente</h1>

      <div className="docentes-campo">  
        <Label htmlFor="Nombr" texto="Nombre(s):" />
        <Textbox id="Nombre" placeholder="Nombre(s)" />
      </div>

      <div className="docentes-campo">
        <Label htmlFor="Appatern" texto="Apellido paterno:" />
        <Textbox id="Appaterno" placeholder="Apellido paterno" />
      </div>

      <div className="docentes-campo">
        <Label htmlFor="Apmatern" texto="Apellido materno:" />
        <Textbox id="Apmaterno" placeholder="Apellido materno" />
      </div>

      <div className="docentes-campo">
        <Label htmlFor="corre" texto="Correo:" />
        <Textbox id="correo" placeholder="Correo electrónico" type="email" />
      </div>

      <div className="docentes-campo">
        <Label htmlFor="contraseñ" texto="Contraseña:" />
        <Textbox id="contraseña" placeholder="Contraseña" type="password" />
      </div>

      <div className="docentes-campo">
        <Label htmlFor="Confirmarcontraseñ" texto="Confirmar contraseña:" />
        <Textbox id="Confirmarcontraseña" placeholder="Confirmar contraseña" type="password" />
      </div>

      <div className="docentes-campo">
        <Label htmlFor="Telefon" texto="Teléfono:" />
        <Textbox id="Telefono" placeholder="Teléfono" type="tel" />
      </div>
      
      <div className="docentes-campo">
        <label htmlFor="biografia">Biografía:</label>
        <Textarea id="Biografia" name="Biografia" placeholder="Biografía" />
      </div>

      <div className="docentes-campo">
        <Fecha label="Fecha de Nacimiento" />
      </div>
      <div className="docentes-campo">
        <Label htmlFor="noDocente" texto="No. Empleado:" />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>RH</span>
          <Textbox id="numerodeempleado" placeholder="Número RH" />
        </div>
      </div>

      <div className="docentes-campo">
        <Label htmlFor="Sex" texto="Sexo" />
        <RadioButtons
          name="Sexo"
          options={[
            { value: 'femenino', label: 'Femenino' },
            { value: 'masculino', label: 'Masculino' },
            { value: 'otro', label: 'Otro' },
          ]}
          selectedOption={sexoSeleccionado}  
          onChange={(e) => setSexoSeleccionado(e.target.value)}
        />
      </div>
      <div className="docentes-campo">
          <Label htmlFor="Describi" texto="Descripción (si es necesario):" />
          <Textarea id="Descri" placeholder="Descripción..." />
        </div>
      <div className="docentes-campo">
        <Label htmlFor="Ultimonivel" texto="Nivel de estudio" />
        <RadioButtons
          name="Ultimoniveldeestudios"
          options={[
            { value: 'doctorado', label: 'Doctorado' },
            { value: 'maestria', label: 'Maestria' },
            { value: 'licenciatura', label: 'Licenciatura' },
          ]}
          selectedOption={nivelSeleccionado}  
          onChange={(e) => setNivelSeleccionado(e.target.value)}
        />
      </div>
      

      <div className="docentes-botones">  
        <Button texto="Atrás" onClick={handleBack} />
        <Button texto="Siguiente" onClick={handleNext} />
      </div>
    </div>
  );
};

export default RegistroDocentes;
