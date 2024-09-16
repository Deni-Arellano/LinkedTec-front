import './hojas-de-estilo/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './paginas/Login';
import RegistroExitoso from './paginas/RegistroExitoso';  // Asegúrate de que la ruta y el nombre están correctos

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro-exitoso" element={<RegistroExitoso />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
