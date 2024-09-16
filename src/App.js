import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './paginas/Login';  // Comenta esta línea si no usas Login
// import VisualizacionPerfil from './paginas/VisualizacionPerfil';  // Comenta esta línea si no usas Visualización del Perfil
import RegistroExitoso from './paginas/RegistroExitoso';  // Habilita esta línea para la página de registro exitoso

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta para Login (Comenta esta línea si estás habilitando otra página): */}
          {/* <Route path="/" element={<Login />} /> */}

          {/* Ruta para Visualización del Perfil (Comenta esta línea si estás habilitando otra página): */}
          {/* <Route path="/" element={<VisualizacionPerfil />} /> */}

          {/* Ruta para Registro Exitoso */}
          <Route path="/" element={<RegistroExitoso />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
