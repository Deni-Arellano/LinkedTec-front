import React, { useState } from 'react';
import CajaDeTexto from '../componentes/CajaDeTexto.jsx';  // Ajustado a .jsx
import Button from '../componentes/Button.js';  // Ajustado a .js
import Etiquetas from '../componentes/Etiquetas.jsx';  // Ajustado a Etiquetas.jsx
import './Login.css';  // Asegúrate de que Login.css esté en la ruta correcta

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
      // Aquí pondrías la lógica para iniciar sesión
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
