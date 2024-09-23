import React, { useState } from 'react';
import Textbox from '../componetes/Caja-de-texto'; 
import Button from '../componetes/Button';
import RadioButtons from '../componetes/Radio_buton.jsx';
import Fecha from '../componetes/Fecha'; 
import '../hojas-de-estilo/Estudiantes-registro.css'; 
import Logo from '../imagenes/Logo24.png'; 
import Textarea from '../componetes/Text-area.jsx';
import { useNavigate } from 'react-router-dom';  

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

  const [carreraSeleccionada, setCarreraSeleccionada] = useState('');
  const [sexoSeleccionado, setSexoSeleccionado] = useState('');
  const [semestreSeleccionado, setSemestreSeleccionado] = useState('');

  return (
    <div className="estudiantes-contenedor"> 
      <img src={Logo} alt="Logo" className="logo" /> 
      <h1>Registro de Estudiantes</h1>

      <div className="estudiantes-campo">  
        <label htmlFor="nombre">Nombre(s):</label>
        <Textbox id="Nombre" placeholder="Nombre(s)" />
      </div>

      <div className="estudiantes-campo">
        <label htmlFor="apellidoPaterno">Apellido paterno:</label>
        <Textbox id="ApellidoPaterno" placeholder="Apellido paterno" />
      </div>

      <div className="estudiantes-campo">
        <label htmlFor="apellidoMaterno">Apellido materno:</label>
        <Textbox id="ApellidoMaterno" placeholder="Apellido materno" />
      </div>

      <div className="estudiantes-campo">
        <Fecha label="Fecha de Nacimiento" />
      </div>

      <div className="estudiantes-campo">
        <label className="radio-buttons-label">Sexo</label>
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

      <div className="estudiantes-campo">
        <label htmlFor="telefono">Teléfono:</label>
        <Textbox id="Telefono" placeholder="Teléfono" type="tel" />
      </div>

      <div className="estudiantes-campo">
        <label htmlFor="correo">Correo:</label>
        <Textbox id="Correo" placeholder="Correo electrónico" type="email" />
      </div>

      <div className="estudiantes-campo">
        <label htmlFor="contraseña">Contraseña:</label>
        <Textbox id="Contraseña" placeholder="Contraseña" type="password" />
      </div>

      <div className="estudiantes-campo">
        <label htmlFor="confirmarContraseña">Confirmar contraseña:</label>
        <Textbox id="ConfirmarContraseña" placeholder="Confirmar contraseña" type="password" />
      </div>

      <div className="estudiantes-campo">
        <label htmlFor="biografia">Biografía:</label>
        <Textarea id="Biografia" name="Biografia" placeholder="Biografía" />
      </div>

      <div className="estudiantes-campo">
        <label htmlFor="noControl">No. Control:</label>
        <Textbox id="No.Control" placeholder="Número de control" />
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
        <Button texto="Siguiente" onClick={handleNext} />
      </div>
    </div>
  );
};

export default Registro;
