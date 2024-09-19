import React from 'react';
import VisualizacionPerfil from './paginas/VisualizacionPerfil';
import MenuNavegacion from './componetes/MenuNavegacion';

function App() {
  return (
    <div className="App">
      {/* Menú de navegación */}
      <MenuNavegacion />
      {/* Visualización del perfil */}
      <VisualizacionPerfil />
    </div>
  );
}

export default App;
