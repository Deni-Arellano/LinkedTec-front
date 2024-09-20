import React from 'react';
import Textbox from '../componetes/Caja-de-texto.jsx'; 
import Button from '../componetes/Button'; 
import RadioButtons from '../componetes/Radio-button'; 
import '../hojas-de-estilo/Docentes-registro.css'; 
import Fecha from '../componetes/Fecha.js';
import Logo from '../imagenes/Logo24.png'; 
import Label from '../componetes/Etiquetas';

const RegistroDocentes = () => {
  const handleBack = () => {
    alert('Ir atrás');
  };

  const handleNext = () => {
    alert('Ir a la siguiente página');
  };

  return (
    <div className="registro-contenedor">
      <img src={Logo} alt="Logo" className="logo" />
      <h1>Registro de Docente</h1>

      <div className="campo">
        <Label htmlFor="Nombr" texto="Nombre(s):" />
        <Textbox id="Nombre" placeholder="Nombre(s)" />
      </div>

      <div className="campo">
        <Label htmlFor="Appatern" texto="Apellido paterno:" />
        <Textbox id="Appaterno" placeholder="Apellido paterno" />
      </div>

      <div className="campo">
        <Label htmlFor="Apmatern" texto="Apellido materno:" />
        <Textbox id="Apmaterno" placeholder="Apellido materno" />
      </div>

      <div className="campo">
        <Label htmlFor="corre" texto="Correo:" />
        <Textbox id="correo" placeholder="Correo electrónico" type="email" />
      </div>

      <div className="campo">
        <Label htmlFor="contraseñ" texto="Contraseña:" />
        <Textbox id="contraseña" placeholder="Contraseña" type="password" />
      </div>

      <div className="campo">
        <Label htmlFor="Confirmarcontraseñ" texto="Confirmar contraseña:" />
        <Textbox id="Confirmarcontraseña" placeholder="Confirmar contraseña" type="password" />
      </div>

      <div className="campo">
        <Label htmlFor="Telefon" texto="Teléfono:" />
        <Textbox id="Telefono" placeholder="Teléfono" type="tel" />
      </div>
      
      <div className="campo">
        <label htmlFor="biografia">Biografía:</label>
        <textarea id="Biografia" name="Biografia" placeholder="Biografía" />
      </div>

        
      <div className="campo">
      <Fecha label="Fecha de Nacimiento" />
      </div>


      <div className="campo-radio">
        <Label htmlFor="Sex" texto="Sexo" />
        <RadioButtons
          name="Sexo"
          options={[
            { value: 'femenino', label: 'Femenino' },
            { value: 'masculino', label: 'Masculino' },
            { value: 'otro', label: 'Otro' },
          ]}
        />
        <div className="descripcion-sexo">
          <Label htmlFor="Describi" texto="Descripción (si es necesario):" />
          <textarea id="Describir" placeholder="Descripción..." />
        </div>
      </div>

      <div className="campo-radio">
        <Label htmlFor="Ultimonivel" texto="Nivel de estudio" />
        <RadioButtons
          name="Ultimoniveldeestudios"
          options={[
            { value: 'doctorado', label: 'Doctorado' },
            { value: 'maestria', label: 'Maestria' },
            { value: 'licenciatura', label: 'Licenciatura' },
          ]}
        />
      </div>

      <div className="campo-rh">
        <Label htmlFor="noDocente" text="No. Empleado:" />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>RH</span>
          <Textbox id="numerodeempleado" placeholder="Número RH" />
        </div>
      </div>

      <div className="campo-carrera">
        <Label htmlFor="carrera" text="Academia" />
        <RadioButtons
          name="Academia"
          options={[
            { value: 'isc', label: 'ISC' },
            { value: 'iem', label: 'IEM' },
            { value: 'ige', label: 'IGE' },
            { value: 'cp', label: 'CP' },
            { value: 'ii', label: 'II' },
            { value: 'ia', label: 'IA' },
          ]}
        />
      </div>

      <div className="botones">
        <Button texto="Atrás" onClick={handleBack} />
        <Button texto="Siguiente" onClick={handleNext} />
      </div>
    </div>
  );
};

export default RegistroDocentes;
