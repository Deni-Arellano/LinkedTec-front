import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CodigoVerificacion from './paginas/CodigoVerificacion';  
//import Login from './paginas/Login';  
//import VisualizacionPerfil from './paginas/VisualizacionPerfil';  
//import RegistroExitoso from './paginas/RegistroExitoso';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta para Código de Verificación */}
          <Route path="/" element={<CodigoVerificacion />} />
          
          {/* Otras rutas comentadas */}
          {/* <Route path="/" element={<Login />} /> */}
          {/* <Route path="/" element={<VisualizacionPerfil />} /> */}
          {/* <Route path="/" element={<RegistroExitoso />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
