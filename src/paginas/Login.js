import React, { useState } from 'react';
import CajaDeTexto from '../componentes/Caja-de-texto';
import Button from '../componentes/Button';
import './Login.css';

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
        <CajaDeTexto
          tipo="text"
          valor={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingresa tu usuario"
        />
        <CajaDeTexto
          tipo="password"
          valor={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu contraseña"
        />

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
