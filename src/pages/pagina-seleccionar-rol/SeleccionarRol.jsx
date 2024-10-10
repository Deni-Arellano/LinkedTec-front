import React, { useState, useEffect, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import RadioButtons from '../../components/componente-boton-de-radio/radio-boton.jsx';
import Button from '../../components/boton/Boton.jsx';
import './SeleccionarRol.css';
import logo from '../../assets/Logo24.png';
import { usuarioContext } from '../../App';
import Swal from 'sweetalert2'; // Importar SweetAlert2

const Pagina = () => {

  const { setUsuarioLog } = useContext(usuarioContext);

  useEffect(() => {
    setUsuarioLog(null); // Restablece el contexto del usuario 
  }, [setUsuarioLog]);

  const handleBack = () => {
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
      // Mostrar alerta con SweetAlert2 si no se seleccionó un rol
      Swal.fire({
        icon: 'warning',
        title: 'Rol no seleccionado',
        text: 'Por favor, selecciona un rol antes de continuar.'
      });
    }
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
          <Button texto="Atrás" onClick={handleBack} />
          <Button texto="Siguiente" onClick={handleNext} />
        </div>
      </main>
    </div>
  );
};

export default Pagina;
