import React, { useState } from 'react';
import Textbox from '../componetes/Caja-de-texto.jsx';
import Textarea from '../componetes/Text-area.jsx';
import Button from '../componetes/Button';
import RadioButtons from '../componetes/Radio_buton.jsx';
import Fecha from '../componetes/Fecha.jsx';
import '../hojas-de-estilo/Egresados-registro.css';
import Logo from '../imagenes/Logo24.png';
import { useNavigate } from 'react-router-dom';
import Label from '../componetes/Etiquetas';

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
      <div className="egresado-contenedor">
        <img src={Logo} alt="Logo" className="logo" />
        <h1>Registro de Egresado</h1>

        <div className="egresado-campo">
          <Label htmlFor="Nombre" texto='Nombre(s):'/>
          <Textbox id="Nombre" placeholder="Nombre(s)" />
        </div>
        <div className="egresado-campo">
          <Label htmlFor="ApellidoPaterno" texto='Apellido Paterno:'/>
          <Textbox id="ApellidoPaterno" placeholder="Apellido Paterno" />
        </div>

        <div className="egresado-campo">
          <Label htmlFor="ApellidoMaterno" texto='Apellido Materno:'/>
          <Textbox id="ApellidoMaterno" placeholder="Apellido Materno" />
        </div>


        <div className="egresado-campo">
          <Fecha label="Fecha de Nacimiento" />
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
          <Textbox id="Telefono" placeholder="Teléfono" type="tel" />
        </div>

        <div className="egresado-campo">
          <Label htmlFor="Correo" texto='Correo:'/>
          <Textbox id="Correo" placeholder="Correo electrónico" type="email" />
        </div>

        <div className="egresado-campo">
          <Label htmlFor="Contraseña" texto='Contraseña:'/>
          <Textbox id="Contraseña" placeholder="Contraseña" type="password" />
        </div>

        <div className="egresado-campo">
          <Label htmlFor="confirmarContraseña" texto='Confirmar contraseña:'/>
          <Textbox id="ConfirmarContraseña" placeholder="Confirmar contraseña" type="password" />
        </div>


        <div className="egresado-campo">
          <Label htmlFor="biografia" texto='Biografía:'/>
          <Textarea id="Biografia"  placeholder="Biografía" />
        </div>

        <div className="egresado-campo">
          <Label className="radio-buttons-label" texto='Carrera'/>
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
          <Label htmlFor="AñoGraduacion" texto='Año de Graduación:'/>
          <Textbox id="AñodeGraduacion"  placeholder="Año de Graduación" />
        </div>

        <div className="egresado-campo">
          <Label htmlFor="Puesto" texto='Puesto:'/>
          <Textbox id="Puesto"  placeholder="Puesto en la empresa" />
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
