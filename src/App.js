import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VisualizacionPerfil from './paginas/VisualizacionPerfil';  // Ruta de la visualización del perfil

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VisualizacionPerfil />} />  {/* Página de perfil */}
      </Routes>
    </Router>
=======
//import RegistroDocentes from './paginas/Docentes-registro';
import RegistroReclutador from './paginas/Reclutador';
//import RegistroReclutador from './paginas/Reclutador';
//import RegistroEgresado from './paginas/Egresados';
//import Registro from './paginas/Estudiantes-registro';
//import Pagina from './paginas/Rol'
function App() {
  return (
    <div className="App">
      <RegistroReclutador/>
    </div>
>>>>>>> origin/componentes
  );
}
export default App;
<<<<<<< HEAD
 origin
=======
//docente agregar biografia
//general centar Radio Buttons
>>>>>>> origin/componentes
