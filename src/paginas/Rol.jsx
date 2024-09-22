import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import RadioButtons from '../componetes/Radio_buton.jsx'; 
import Button from '../componetes/Button.jsx';
import '../hojas-de-estilo/Rol.css';
import logo from '../imagenes/Logo24.png';

const Pagina = () => {
  const handleBack = () => {
    console.log("Navegando a /Rol");
    navigate('/'); 
  };
  const [rolSeleccionado, setRolSeleccionado] = useState(''); 
  const navigate = useNavigate(); 

  const opcionesRol = [
    { value: 'Estudiante', label: 'Estudiante' },
    { value: 'Docente', label: 'Docente' },
    { value: 'Reclutador', label: 'Reclutador' },
    { value: 'Egresado', label: 'Egresado' }
  ];

  const handleNext = () => {
    if (rolSeleccionado) {
      switch (rolSeleccionado) {
        case 'Docente': 
          navigate('/registro-docentes'); 
          break;
        case 'Estudiante':
          navigate('/registro-estudiantes'); 
          break;
        case 'Reclutador':
          navigate('/registro-reclutador'); 
          break;
        case 'Egresado':
          navigate('/registro-egresado'); 
          break;
        default:
          break;
      }
    } else {
      alert('Por favor selecciona un rol antes de continuar.');
    }
  };

  return (
    <div className="contenedor-pagina">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="main-content">
        <div className="radio-group">
          <RadioButtons 
            label="Selecciona tu rol"
            name="rol"
            options={opcionesRol} 
            selectedOption={rolSeleccionado}  
            onChange={(e) => setRolSeleccionado(e.target.value)} 
          />
        </div>

        <div className="botones">
          <Button texto="Atrás" onClick={handleBack}/>
          <Button texto="Siguiente" onClick={handleNext} /> 
        </div>
      </main>
    </div>
  );
};

export default Pagina;
