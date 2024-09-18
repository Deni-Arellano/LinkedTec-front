import React from 'react';
import Textbox from '../componetes/Caja-de-texto'; 
import Button from '../componetes/Button'; 
import RadioButtons from '../componetes/Radio-button'; 
import Fecha from '../componetes/Fecha';
import '../Diseño-de-paginas/Egresados.css'; 
import Logo from '../imagenes/Logo24.png'; 

const RegistroEgresado = () => {
  const handleBack = () => {
    alert('Ir atrás');
  };

  const handleNext = () => {
    alert('Ir a la siguiente página');
  };

  return (
    <div className="registro-contenedor">
      <img src={Logo} alt="Logo" className="logo" />
      <h1>Registro de Egresado</h1>

      <div className="campo">
        <label htmlFor="Nombre">Nombre(s):</label>
        <Textbox id="Nombre" name="Nombre" placeholder="Nombre(s)" />
      </div>

      <div className="campo">
        <label htmlFor="ApellidoPaterno">Apellido Paterno:</label>
        <Textbox id="ApellidoPaterno" name="ApellidoPaterno" placeholder="Apellido Paterno" />
      </div>

      <div className="campo">
        <label htmlFor="ApellidoMaterno">Apellido Materno:</label>
        <Textbox id="ApellidoMaterno" name="ApellidoMaterno" placeholder="Apellido Materno" />
      </div>

      <div className="campo">
        <label htmlFor="Correo">Correo:</label>
        <Textbox id="Correo" name="Correo" placeholder="Correo electrónico" type="email" />
      </div>

      <div className="campo">
        <label htmlFor="Contraseña">Contraseña:</label>
        <Textbox id="Contraseña" name="Contraseña" placeholder="Contraseña" type="password" />
      </div>

      <div className="campo">
        <label htmlFor="Telefono">Teléfono:</label>
        <Textbox id="Telefono" name="Telefono" placeholder="Teléfono" type="tel" />
      </div>

      <div className="campo">
        <Fecha id="FechadeNacimiento" name="Fechade2Nacimiento" />
      </div>

      <div className="campo">
        <label htmlFor="biografia">Biografía:</label>
        <Textbox id="Biografia" name="Biografia" placeholder="Biografía" />
      </div>

      <div className="campo-radio">
        <label className="radio-buttons-label">Sexo</label>
        <RadioButtons
          name="Sexo"
          options={[
            { value: 'Masculino', label: 'Masculino' },
            { value: 'Femenino', label: 'Femenino' },
          ]}
        />
      </div>

      <div className="campo-carrera">
        <label className="radio-buttons-label">Carrera</label>
        <RadioButtons
          name="Carrera"
          options={[
            { value: 'IGE', label: 'IGE' },
            { value: 'ISC', label: 'ISC' },
            { value: 'CP', label: 'CP' },
          ]}
        />
      </div>

      <div className="campo-añogd">
        <label htmlFor="AñoGraduacion">Año de Graduación:</label>
        <Textbox id="AñodeGraduacion" name="AñodeGraduacion" placeholder="Año de Graduación" />
      </div>

      <div className="campo-puesto">
        <label htmlFor="Puesto">Puesto:</label>
        <Textbox id="Puesto" name="Puesto" placeholder="Puesto en la empresa" />
      </div>

      <div className="botones">
        <Button label="Atrás" onClick={handleBack} />
        <Button label="Siguiente" onClick={handleNext} />
      </div>
    </div>
  );
};

export default RegistroEgresado;
