import React, { useState, useEffect, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom'; 

import RadioButtons from '../../components/componente-boton-de-radio/radio-boton.jsx';
import Button from '../../components/boton/Boton.jsx';
import VentanaEmergente from '../componetes/VentanaEmergente.jsx'; // Importar el componente
import './SeleccionarRol.css';
import logo from '../../assets/Logo24.png';
import {usuarioContext} from '../App'; 


const Pagina = () => {

  const {setUsuarioLog} = useContext(usuarioContext);
    
    useEffect(() => {
        setUsuarioLog(null); // Restablece el contexto del usuario 
      }, [setUsuarioLog]);


  const handleBack = () => {
    console.log("Navegando a /login");
    navigate('/'); 
  };
  
  const [rolSeleccionado, setRolSeleccionado] = useState(''); 
  const [mostrarVentana, setMostrarVentana] = useState(false); // Estado para la ventana emergente
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
          navigate('/registro-docente'); 
          break;
        case 'Estudiante':
          navigate('/registro-estudiante'); 
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
      setMostrarVentana(true); // Mostrar la ventana emergente si no hay rol seleccionado
    }
  };

  const cerrarVentana = () => {
    setMostrarVentana(false); // Cerrar la ventana emergente
  };

  return (
    <div className="contenedor-pagina">
      <header className="header">
        <img src={logo} alt="Logo" className="logo-Rol" />
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

        {/* Componente de Ventana Emergente */}
        <VentanaEmergente 
          mostrar={mostrarVentana} 
          mensaje="Selecciona una opción" 
          cerrarVentana={cerrarVentana} 
        />
      </main>
    </div>
  );
};

export default Pagina;
