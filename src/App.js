import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pagina from '../src/paginas/Rol'; 
import RegistroDocentes from '../src/paginas/Docentes-registro'; 
import Registro from '../src/paginas/Estudiantes-registro';
import RegistroReclutador from './paginas/Reclutador-registro';
import RegistroEgresado from '../src/paginas/Egresados-registro';
import CodigoVerificacion from './paginas/CodigoVerificacion';
import Login from '../src/paginas/Login'
import RegistroExitoso from './paginas/RegistroExitoso';
import PubliUsuarios from './paginas/Publicaciones';
import VisualizacionPerfil from './paginas/VisualizacionPerfil';
import PublicacionEmpleo from '../src/paginas/PublicacionEmpleo'
import FormularioPublicacionEmpleo from '../src/paginas/FormularioPublicacionEmpleo'
import V2 from '../src/paginas/V2' 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/Rol" element={<Pagina />} /> 
        <Route path="/registro-estudiantes" element={<Registro />} /> 
        <Route path="/registro-docentes" element={<RegistroDocentes />} /> 
        <Route path="/registro-reclutador" element={<RegistroReclutador />} /> 
        <Route path="/registro-egresado" element={<RegistroEgresado />} /> 
        <Route path="/codigo-verificacion" element={<CodigoVerificacion />} /> 
        <Route path="/registro-exitoso" element={<RegistroExitoso />} /> 
        <Route path="/publi-usuarios" element={<PubliUsuarios />} /> 
        <Route path="/Perfil" element={<VisualizacionPerfil />} /> 
        <Route path="/publicacion-empleo" element={<PublicacionEmpleo />} /> 
        <Route path="/FormularioPublicacionEmpleo" element={<FormularioPublicacionEmpleo />} />
        <Route path="/Perfil-reclutador" element={<V2 />} /> 

      </Routes>
    </Router>
  );
}

export default App;
