import React from 'react';
import Textbox from '../componetes/Caja-de-texto'; 
import Button from '../componetes/Button';
import RadioButtons from '../componetes/Radio-button';
import '../Diseño-de-paginas/Estudiantes-registro.css'; 
import Logo from '../imagenes/Logo24.png'; 

const Registro = () => {
  const handleBack = () => {
    alert('Ir atrás');
  };

  const handleNext = () => {
    alert('Ir a la siguiente página');
  };

  return (
    <div className="registro-contenedor">
      <img src={Logo} alt="Logo" className="logo" /> 
      <h1>Registro de Usuario</h1>

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
        <label htmlFor="noControl">No. Control:</label>
        <Textbox id="noControl" placeholder="Número de control" />
      </div>

      <div className="campo">
        <label htmlFor="biografia">Biografía:</label>
        <Textbox id="biografia" placeholder="Biografía" />
      </div>

      <div className="campo">
        <label htmlFor="telefono">Teléfono:</label>
        <Textbox id="telefono" placeholder="Teléfono" type="tel" />
      </div>

      <div className="campo">
        <label className="radio-buttons-label">Carrera</label>
        <RadioButtons
          name="carrera"
          options={[
            { value: 'ISC', label: 'ISC' },
            { value: 'IEM', label: 'IEM' },
            { value: 'IGE', label: 'IGE' },
            { value: 'CP', label: 'CP' },
            { value: 'II', label: 'II' },
            { value: 'IA', label: 'IA' },
            { value: 'otro', label: 'Otro' },
          ]}
        />
      </div>

      <div className="campo">
        <label className="radio-buttons-label">Semestre</label>
        <RadioButtons
          name="semestre"
          options={[
            { value: 'I', label: 'I Semestre' },
            { value: 'II', label: 'II Semestre' },
            { value: 'III', label: 'III Semestre' },
            { value: 'IV', label: 'IV Semestre' },
            { value: 'V', label: 'V Semestre' },
            { value: 'VI', label: 'VI Semestre' },
            { value: 'VII', label: 'VII Semestre' },
            { value: 'VIII', label: 'VIII Semestre' },
            { value: 'IX', label: 'IX Semestre' },
          ]}
        />
      </div>

      <div className="campo">
        <label className="radio-buttons-label">Sexo</label>
        <RadioButtons
          name="sexo"
          options={[
            { value: 'femenino', label: 'Femenino' },
            { value: 'masculino', label: 'Masculino' },
            { value: 'otro', label: 'Otro' },
          ]}
        />
      </div>

      <div className="campo">
        <label htmlFor="descripcion">Descripción (si es necesario):</label>
        <Textbox id="descripcion" placeholder="Descripción..." />
      </div>

      <div className="botones">
        <Button label="Atrás" onClick={handleBack} />
        <Button label="Siguiente" onClick={handleNext} />
      </div>
    </div>
  );
};

export default Registro;
