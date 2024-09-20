import React from 'react';
import Textarea from '../componetes/Text-area.jsx'; 
import Textbox from '../componetes/Caja-de-texto.jsx'; 
import Button from '../componetes/Button.jsx'; 
import RadioButtons from '../componetes/Radio_buton.jsx'; 
import Fecha from '../componetes/Fecha.jsx'; 
import '../hojas-de-estilo/Reclutador.css'; 
import Logo from '../imagenes/Logo24.png'; 

const RegistroReclutador = () => {
  const handleBack = () => {
    alert('Ir atrás');
  };

  const handleNext = () => {
    alert('Ir a la siguiente página');
  };

  return (
    <div className="registro-contenedor">
      <img src={Logo} alt="Logo" className="logo" />
      <h1>Registro de Reclutador</h1>

      <div className="campo">
        <label htmlFor="nombre">Nombre(s):</label>
        <Textbox id="Nombre" placeholder="Nombre(s)" />
      </div>

      <div className="campo">
        <label htmlFor="apellidoPaterno">Apellido paterno:</label>
        <Textbox id="ApellidoPat" placeholder="Apellido paterno" />
      </div>

      <div className="campo">
        <label htmlFor="apellidoMaterno">Apellido materno:</label>
        <Textbox id="ApellidoMat" placeholder="Apellido materno" />
      </div>

      <div className="campo">
        <label htmlFor="correo">Correo:</label>
        <Textbox id="Correo" placeholder="Correo electrónico" type="email" />
      </div>

      <div className="campo">
        <label htmlFor="contraseña">Contraseña:</label>
        <Textbox id="Contraseña" placeholder="Contraseña" type="password" />
      </div>

      <div className="campo">
        <label htmlFor="confirmarContraseña">Confirmar contraseña:</label>
        <Textbox id="ConfirmarContraseña" placeholder="Confirmar contraseña" type="password" />
      </div>

      <div className="campo">
        <label htmlFor="telefono">Teléfono:</label>
        <Textbox id="Telefono" placeholder="Teléfono" type="tel" />
      </div>

      <div className="campo-radio">
        <label className="radio-buttons-label">Sexo</label>
        <RadioButtons
          name="Sexo"
          options={[
            { value: 'femenino', label: 'Femenino' },
            { value: 'masculino', label: 'Masculino' },
            { value: 'otro', label: 'Otro' },
          ]}
        />
        <div className="descripcion-sexo">
          <label htmlFor="descripcionSexo">Descripción (si es necesario):</label>
          <Textarea id="Descri" placeholder="Descripción..." />
        </div>
      </div>

  
      <div className="campo">
        <Fecha label="Fecha de Nacimiento" />
      </div>

      <div className="campo">
        <label htmlFor="nombreEmpresa">Nombre de la Empresa:</label>
        <Textbox id="NombredelaEmpresa" placeholder="Nombre de la Empresa" />
      </div>

      <div className="campo">
        <label htmlFor="sede">Sede:</label>
        <Textbox id="Sede" placeholder="Sede" />
      </div>

      <div className="campo-radio">
        <label className="radio-buttons-label">Giro</label>
        <RadioButtons
          name="Giro"
          options={[
            { value: 'comercial', label: 'Comercial' },
            { value: 'servicio', label: 'Servicio' },
            { value: 'manufactura', label: 'Manufactura' },
            { value: 'agricultura', label: 'Agricultura' },
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

export default RegistroReclutador;
