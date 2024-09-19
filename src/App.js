import React from 'react';
import MenuNavegacion from './componetes/MenuNavegacion'; // Corregido a 'componetes'
import VisualizacionPerfil from './paginas/VisualizacionPerfil'; // Corregido a 'componetes'

function App() {
  return (
    <div>
      <MenuNavegacion />
      <div className="contenido-perfil">
        <VisualizacionPerfil />
      </div>
    </div>
  );
}

export default App;
