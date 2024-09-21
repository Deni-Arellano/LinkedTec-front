import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicacionEmpleo from './paginas/PublicacionEmpleo';  
import FormularioPublicacionEmpleo from './paginas/FormularioPublicacionEmpleo';  
import Publicaciones from './paginas/Publicaciones';  
import Login from './paginas/Login';  // Importa el componente Login
import Rol from './paginas/Rol'; // Importa el componente Rol
import CodigoVerificacion from './paginas/CodigoVerificacion'; // Importa el componente CodigoVerificacion

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/publicacion-empleo" />} />
                <Route path="/publicacion-empleo" element={<PublicacionEmpleo />} />
                <Route path="/formulario-publicacion-empleo" element={<FormularioPublicacionEmpleo />} />
                <Route path="/publicaciones" element={<Publicaciones />} />
                <Route path="/login" element={<Login />} />  {/* Agrega la ruta para Login */}
                <Route path="/rol" element={<Rol />} /> {/* Agrega la ruta para Rol */}
                <Route path="/codigo-verificacion" element={<CodigoVerificacion />} /> {/* Agrega la ruta para CodigoVerificacion */}
            </Routes>
        </Router>
    );
}

export default App;
