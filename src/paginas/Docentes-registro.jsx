import React from 'react';
import Textbox from '../componetes/Caja-de-texto'; 
import Button from '../componetes/Button'; 
import RadioButtons from '../componetes/Radio-button'; 
import Fecha from '../componetes/Fecha';
import '../hojas-de-estilo/Docentes-registro.css'; 
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
        <Label htmlFor="Nombr" text="Nombre(s):" />
        <Textbox id="Nombre" placeholder="Nombre(s)" />
      </div>

      <div className="campo">
        <Label htmlFor="Appatern" text="Apellido paterno:" />
        <Textbox id="Appaterno" placeholder="Apellido paterno" />
      </div>

      <div className="campo">
        <Label htmlFor="Apmatern" text="Apellido materno:" />
        <Textbox id="Apmaterno" placeholder="Apellido materno" />
      </div>

      <div className="campo">
        <Label htmlFor="corre" text="Correo:" />
        <Textbox id="correo" placeholder="Correo electrónico" type="email" />
      </div>

      <div className="campo">
        <Label htmlFor="contraseñ" text="Contraseña:" />
        <Textbox id="contraseña" placeholder="Contraseña" type="password" />
      </div>

      <div className="campo">
        <Label htmlFor="Confirmarcontraseñ" text="Confirmar contraseña:" />
        <Textbox id="Confirmarcontraseña" placeholder="Confirmar contraseña" type="password" />
      </div>

      <div className="campo">
        <Label htmlFor="Telefon" text="Teléfono:" />
        <Textbox id="Telefono" placeholder="Teléfono" type="tel" />
      </div>
      
      <div className="campo">
        <label htmlFor="biografia">Biografía:</label>
        <Textbox id="Biografia" name="Biografia" placeholder="Biografía" />
      </div>

      <div className="campo">
        <Fecha />
      </div>

      <div className="campo-radio">
        <Label htmlFor="Sex" text="Sexo" />
        <RadioButtons
          name="Sexo"
          options={[
            { value: 'femenino', label: 'Femenino' },
            { value: 'masculino', label: 'Masculino' },
            { value: 'otro', label: 'Otro' },
          ]}
        />
        <div className="descripcion-sexo">
          <Label htmlFor="Describi" text="Descripción (si es necesario):" />
          <Textbox id="Describir" placeholder="Descripción..." />
        </div>
      </div>

      <div className="campo-radio">
        <Label htmlFor="Ultimonivel" text="Nivel de estudio" />
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
        <Label htmlFor="carrera" text="Carrera perteneciente" />
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
        <Button label="Atrás" onClick={handleBack} />
        <Button label="Siguiente" onClick={handleNext} />
      </div>
    </div>
  );
};

export default RegistroDocentes;
