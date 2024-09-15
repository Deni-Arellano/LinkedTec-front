import React, { useState } from 'react';
import CajaDeTexto from '../componentes/Caja-de-texto.jsx';  // Verifica el nombre exacto
import Button from '../componentes/Button';  // Importa el botón
import Etiquetas from '../componentes/Etiquetas.jsx';  // Verifica el nombre exacto
import '../hojas-de-estilo/Login.css';  // Ruta para el archivo CSS

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setError('Por favor, completa todos los campos.');
    } else {
      setError('');
      console.log('Usuario:', username);
      console.log('Contraseña:', password);
      // Aquí puedes poner la lógica de autenticación
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <Etiquetas text="Usuario o Correo Electrónico" />
        <CajaDeTexto />
        <Etiquetas text="Contraseña" />
        <CajaDeTexto />

        {error && <p className="error">{error}</p>}

        <Button texto="Iniciar Sesión" />

        <p className="recuperar-contraseña">
          <a href="/recuperar-contraseña">¿Olvidaste tu contraseña?</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
