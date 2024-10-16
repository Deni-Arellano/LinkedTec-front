import React, { useState, useEffect, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom'; 

import RadioButtons from '../../components/componente-boton-de-radio/radio-boton.jsx';
import Button from '../../components/boton/Boton.jsx';
import './SeleccionarRol.css';
import logo from '../../assets/Logo24.png';
import Swal from 'sweetalert2';
import {usuarioContext} from '../../App'; 


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
      Swal.fire({
        icon: "warning",
        title: "Selecciona una opción",
        text: "Ningún elemento ha sido seleccionado",
      });
    }
  };


  return (
    <div className="contenedor-pagina">
      <header className="header">
        <img src={logo} alt="Logo" className="logo-Rol" />
      </header>

      <main className="main-content">
        <h2 className="titulo-selecciona-rol">Selecciona tu rol</h2>
        <div className="radio-group">
          <RadioButtons 
           
            name="rol"
            options={opcionesRol} 
            selectedOption={rolSeleccionado}  
            onChange={(e) => setRolSeleccionado(e.target.value)} 
          />
        </div>

        <div className="botones-seleccionar-rol">
          <Button texto="Atrás" onClick={handleBack}/>
          <Button texto="Siguiente" onClick={handleNext} /> 
        </div>

      </main>
    </div>
  );
};

export default Pagina;
