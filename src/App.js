import React, {useState, createContext} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


//Compontentes de React
import CodigoVerificacion from './pages/pagina-codigo-verificacion/CodigoVerificacion';
import EditarPublicacion from './pages/pagina-editar-publicacion/EditarPublicacion'; 
import Empleos from './pages/pagina-empleos/Empleos'
import Login from './pages/pagina-login/Login';
import Publicaciones from './pages/pagina-publicaciones/Publicaciones';
import RegistroEmpleo from './pages/pagina-registro-empleo/RegistroEmpleo';
import RegistroDocentes from './pages/pagina-registro-docentes/RegistroDocentes'; 
import RegistroEgresados from './pages/pagina-registro-egresados/RegistroEgresados';
import RegistroEstudiantes from './pages/pagina-registro-estudiantes/RegistroEstudiantes';
import RegistroExitoso from './pages/pagina-registro-exitoso/RegistroExitoso';
import RegistroReclutadores from './pages/pagina-registro-reclutadores/RegistroReclutadores';
import Roles from './pages/pagina-seleccionar-rol/SeleccionarRol';
import Perfil from './pages/pagina-Perfil/Perfil';
import Noticias from './pages/pagina-noticias/Noticias.jsx';
import CrearNoticias from './pages/pagina-crear-noticia/CrearNoticia.jsx';

export const usuarioContext = createContext(); //Contexto para poder pasar el usuario a los componentes hijos

function App() {
  //const [usuarioLog, setUsuarioLog] = useState(null);  
  const [usuarioLog, setUsuarioLog] = useState('1'); 
  return (
    //Pasa a los componentes hijos el usuario
    <usuarioContext.Provider value={{usuarioLog,setUsuarioLog}}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/rol" element={<Roles />} /> 
          <Route path="/registro-estudiante" element={<RegistroEstudiantes />} /> 
          <Route path="/registro-docente" element={<RegistroDocentes />} /> 
          <Route path="/registro-reclutador" element={<RegistroReclutadores />} /> 
          <Route path="/registro-egresado" element={<RegistroEgresados />} /> 
          <Route path="/codigo-verificacion" element={<CodigoVerificacion />} /> 
          <Route path="/registro-exitoso" element={<RegistroExitoso />} /> 
          <Route path="/publicaciones" element={<Publicaciones />} /> 
          <Route path="/perfil" element={<Perfil />} /> 
          <Route path="/empleos" element={<Empleos />} /> 
          <Route path="/registro-empleo" element={<RegistroEmpleo />} />
          <Route path="/editar-publicacion" element={<EditarPublicacion />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/registro-noticia" element={<CrearNoticias/>} />

          
        </Routes>
      </Router>
    </usuarioContext.Provider>
  );
}

export default App;
