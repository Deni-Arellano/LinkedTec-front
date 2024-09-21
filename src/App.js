import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicacionEmpleo from './paginas/PublicacionEmpleo';  
import FormularioPublicacionEmpleo from './paginas/FormularioPublicacionEmpleo';  
import Publicaciones from './paginas/Publicaciones';  // Asegúrate de importar la página Publicaciones

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/publicacion-empleo" />} />
                <Route path="/publicacion-empleo" element={<PublicacionEmpleo />} />
                <Route path="/formulario-publicacion-empleo" element={<FormularioPublicacionEmpleo />} />
                <Route path="/publicaciones" element={<Publicaciones />} /> {/* Agrega la ruta aquí */}
            </Routes>
        </Router>
    );
}

export default App;
