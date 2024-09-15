import React, { useState } from 'react';
import CajaDeTexto from '../componentes/Caja-de-texto.jsx';  // Especifica la extensión explícitamente si React no encuentra el archivo
import Button from '../componentes/Button.js';  // Especifica la extensión .js
import Etiquetas from '../componentes/Etiquetas.jsx';  // Especifica la extensión .jsx
import '../hojas-de-estilo/Login.css';
const Login = () => {
  const [username] = useState('');  // Removido setUsername ya que no se usa
  const [password] = useState('');  // Removido setPassword ya que no se usa
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
