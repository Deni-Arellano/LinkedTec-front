// App.js
import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Importaciones de los componentes
import CodigoVerificacion from './pages/pagina-codigo-verificacion/CodigoVerificacion';
import EditarPublicacion from './pages/pagina-editar-publicacion/EditarPublicacion'; 
import Empleos from './pages/pagina-empleos/Empleos';
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
import EditDocente from './pages/pagina-editar-docentes/EditarDocente';
import EditEstu from './pages/pagina-editar-estudiantes/EditarEstudiantes';
import EditarReclutador from './pages/pagina-editar-reclutador/EditarReclutador';
import EditarEgresado from './pages/pagina-editar-egresado/EditarEgresado';
import EditarPublicacionEmpleo from './components/editar-publicacion-empleo/EditarPublicacionEmpleo.jsx';
import PaginasPostulacionesUsuario from './pages/pagina-postulaciones-usuario/PaginaPostulacionesUsuario.jsx'
import EditarNoticia from './pages/pagina-editar-noticia/EditarNoticia';
import PaginaDashboard from "./pages/pagina-dashboard/PaginaDashboard";

import Postulacion from './pages/pagina-postulacion/Postulacion';
import TablaPostuVerReclutador from './pages/pagina-visualizacion-postulaciones-como-reclutador/VisualizarPostuComoReclutador.jsx';
import Noticias from './pages/pagina-noticias/Noticias.jsx';
import CrearNoticias from './pages/pagina-crear-noticia/CrearNoticia.jsx';
import ReportarContenido from './components/reportar-contenido/ReportarContenido.jsx';
import Mensajes from './pages/pagina-mensajes/Mensajes.jsx';
import NuevoMensaje from './pages/pagina-nuevo-mensaje/NuevoMensaje.jsx';
import Chat from './pages/pagina-chat/Chat.jsx';
import { SiNushell } from 'react-icons/si';
import NotificationSystem from './pages/pagina-notificaciones/Notificaciones.jsx';
import NotificacionesFlotante from './components/notificaciones-flotante/NotificacionesFlotante.jsx';
import MenuNavegacionAdmin from './components/menu-navegacion-administrador/MenuNavegacionAdmin.jsx';

export const usuarioContext = createContext(); 
export const notificacionContext = createContext();

function App() {
  const [usuarioLog, setUsuarioLog] = useState(4); 
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [idNoticia, setIdNoticia] = useState(null);
  const [isNotificacionesModalOpen, setIsNotificacionesModalOpen] = useState(false);
  const openReportModal = (id) => {
    setIdNoticia(id);
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
    setIdNoticia(null);
  };

  const openNotificacionesModal = () => setIsNotificacionesModalOpen(true);
  const closeNotificacionesModal = () => setIsNotificacionesModalOpen(false);

  return (
    <usuarioContext.Provider value={{ usuarioLog, setUsuarioLog }}>
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
          <Route path="/editar-reclutador" element={<EditarReclutador />} />
          <Route path="/editar-egresado" element={<EditarEgresado />} />
          <Route path="/editar-estudiante" element={<EditEstu />} />
          <Route path="/editar-docente" element={<EditDocente />} />
          <Route path="/editar-publicacion-empleo" element={<EditarPublicacionEmpleo />} />
          <Route path="/noticias" element={<Noticias openReportModal={openReportModal} />} />
          <Route path="/registro-noticia" element={<CrearNoticias />} />
          <Route path='/pagina-postulaciones-usuario' element={<PaginasPostulacionesUsuario/>} />
          <Route path='/postulacion' element={<Postulacion/>} />
          <Route path="/postulantes-empleo/:idEmpleo" element={<TablaPostuVerReclutador />} />
          <Route path='/editar-docente' element={<EditDocente/>} />
          <Route path='/editar-estudiante' element={<EditEstu/>} />
          <Route path="/editar-noticia/:id_noticia" element={<EditarNoticia />} />
          <Route path="/notificaciones" element={<NotificationSystem />} />
          <Route path="/notificacionesflotante" element={<NotificacionesFlotante />} />
          
          <Route path="/mensajes" element={<Mensajes />} />
          <Route path="/nuevo-mensaje" element={<NuevoMensaje />} />
          <Route path="/chat" element={<Chat />} />

            <Route path="/dashboard" element={<PaginaDashboard />} />

          <Route path="/menu-navegacion-administrador" element={<MenuNavegacionAdmin />} />
        </Routes>
      </Router>
      {isReportModalOpen && (
        <ReportarContenido 
          categoriaActual="noticias" 
          id_noticia={idNoticia} 
          onClose={closeReportModal} 
        />
      )}
      {isNotificacionesModalOpen && (
        <div className="modal-overlay" onClick={closeNotificacionesModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <NotificacionesFlotante />
            <button onClick={closeNotificacionesModal}>Cerrar</button>
          </div>
        </div>
      )}
    </usuarioContext.Provider>
  );
}

export default App;
