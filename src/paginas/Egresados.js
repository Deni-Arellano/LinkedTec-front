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
        <label htmlFor="nombre">Nombre(s):</label>
        <Textbox id="nombre" placeholder="Nombre(s)" />
      </div>

      <div className="campo">
        <label htmlFor="apellidoPaterno">Apellido paterno:</label>
        <Textbox id="apellidoPaterno" placeholder="Apellido paterno" />
      </div>

      <div className="campo">
        <label htmlFor="apellidoMaterno">Apellido materno:</label>
        <Textbox id="apellidoMaterno" placeholder="Apellido materno" />
      </div>

      <div className="campo">
        <label htmlFor="correo">Correo:</label>
        <Textbox id="correo" placeholder="Correo electrónico" type="email" />
      </div>

      <div className="campo">
        <label htmlFor="contraseña">Contraseña:</label>
        <Textbox id="contraseña" placeholder="Contraseña" type="password" />
      </div>

      <div className="campo">
        <label htmlFor="confirmarContraseña">Confirmar contraseña:</label>
        <Textbox id="confirmarContraseña" placeholder="Confirmar contraseña" type="password" />
      </div>

      <div className="campo">
        <label htmlFor="telefono">Teléfono:</label>
        <Textbox id="telefono" placeholder="Teléfono" type="tel" />
      </div>

      <div className="campo">
        <Fecha />
      </div>
      
      <div className="campo">
        <label htmlFor="biografia">Biografía:</label>
        <Textbox id="biografia" placeholder="Biografía" />
      </div>

      <div className="campo-radio">
        <label className="radio-buttons-label">Sexo</label>
        <RadioButtons
          name="sexo"
          options={[
            { value: 'femenino', label: 'Femenino' },
            { value: 'masculino', label: 'Masculino' },
            { value: 'otro', label: 'Otro' },
          ]}
        />
        <div className="descripcion-sexo">
          <label htmlFor="descripcionSexo">Descripción (si es necesario):</label>
          <Textbox id="descripcionSexo" placeholder="Descripción..." />
        </div>
      </div>


      <div className="campo-carrera">
        <label className="radio-buttons-label">Carrera</label>
        <RadioButtons
          name="carrera"
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
      
      <div className="campo-añogd">
        <label htmlFor="añograd">Año de Graduacion:</label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Textbox id="añograd" placeholder="Año de graduacion" />
        </div>
      </div>

      <div className="campo-puesto">
        <label htmlFor="puesto">Año de Graduacion:</label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Textbox id="puest" placeholder="Puesto en la empresa" />
        </div>
      </div>

      <div className="botones">
        <Button label="Atrás" onClick={handleBack} />
        <Button label="Siguiente" onClick={handleNext} />
      </div>
    </div>
  );
};

export default RegistroEgresado;
