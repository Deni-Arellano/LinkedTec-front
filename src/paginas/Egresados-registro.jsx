import React, { useState } from 'react';
import Textbox from '../componetes/Caja-de-texto.jsx';
import Textarea from '../componetes/Text-area.jsx';
import Button from '../componetes/Button';
import RadioButtons from '../componetes/Radio_buton.jsx';
import Fecha from '../componetes/Fecha.jsx';
import '../hojas-de-estilo/Egresados-registro.css';
import Logo from '../imagenes/Logo24.png';
import { useNavigate } from 'react-router-dom';

const RegistroEgresado = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    console.log('Navegando a /Rol');
    navigate('/Rol');
  };

  const handleNext = () => {
    console.log('Navegando a /codigo-verificacion');
    navigate('/codigo-verificacion');
  };

  const [sexoSeleccionado, setSexoSeleccionado] = useState('');
  const [carreraSeleccionada, setCarreraSeleccionada] = useState('');

  return (
    <div className="registro-egresado">
      <div className="registro-contenedor">
        <img src={Logo} alt="Logo" className="logo" />
        <h1>Registro de Egresado</h1>

        <div className="egresado-campo">
          <label htmlFor="Nombre">Nombre(s):</label>
          <Textbox id="Nombre" name="Nombre" placeholder="Nombre(s)" />
        </div>

        <div className="egresado-campo">
          <label htmlFor="ApellidoPaterno">Apellido Paterno:</label>
          <Textbox id="ApellidoPaterno" name="ApellidoPaterno" placeholder="Apellido Paterno" />
        </div>

        <div className="egresado-campo">
          <label htmlFor="ApellidoMaterno">Apellido Materno:</label>
          <Textbox id="ApellidoMaterno" name="ApellidoMaterno" placeholder="Apellido Materno" />
        </div>

        <div className="egresado-campo">
          <label htmlFor="Correo">Correo:</label>
          <Textbox id="Correo" name="Correo" placeholder="Correo electrónico" type="email" />
        </div>

        <div className="egresado-campo">
          <label htmlFor="Contraseña">Contraseña:</label>
          <Textbox id="Contraseña" name="Contraseña" placeholder="Contraseña" type="password" />
        </div>

        <div className="egresado-campo">
          <label htmlFor="Telefono">Teléfono:</label>
          <Textbox id="Telefono" name="Telefono" placeholder="Teléfono" type="tel" />
        </div>

        <div className="egresado-campo">
          <Fecha label="Fecha de Nacimiento" />
        </div>

        <div className="egresado-campo">
          <label htmlFor="biografia">Biografía:</label>
          <Textarea id="Biografia" name="Biografia" placeholder="Biografía" />
        </div>

        <div className="egresado-campo">
          <label className="radio-buttons-label">Sexo</label>
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
          <label htmlFor="descripcion">Descripción (si es necesario):</label>
          <Textarea id="Describir" placeholder="Descripción..." />
        </div>

        <div className="egresado-campo">
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

        <div className="egresado-campo">
          <label htmlFor="AñoGraduacion">Año de Graduación:</label>
          <Textbox id="AñodeGraduacion" name="AñodeGraduacion" placeholder="Año de Graduación" />
        </div>

        <div className="egresado-campo">
          <label htmlFor="Puesto">Puesto:</label>
          <Textbox id="Puesto" name="Puesto" placeholder="Puesto en la empresa" />
        </div>

        <div className="botones">
          <Button texto="Atrás" onClick={handleBack} />
          <Button texto="Siguiente" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default RegistroEgresado;
