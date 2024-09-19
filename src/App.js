import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VisualizacionPerfil from './paginas/VisualizacionPerfil';  // Ruta de la visualización del perfil

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VisualizacionPerfil />} />  {/* Página de perfil */}
      </Routes>
    </Router>
  );
}

export default App;
 origin