import React from 'react';
import Button from '../componetes/Button'; // Asegúrate de que sea el Button correcto
import Cajadetexto from '../componetes/Cajadetexto'; // Asegúrate de que sea el Cajadetexto correcto
import '../hojas-de-estilo/Login.css';  // Importa tu hoja de estilo
import logo from '../imagenes/Logo24.png';  // Importa tu logo

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <img src={logo} alt="Logo LinkedTec" className="logo-login" />
                <form>
                    <label>Usuario</label>
                    <Cajadetexto placeholder="Ingresa tu usuario" />
                    <label>Contraseña</label>
                    <Cajadetexto type="password" placeholder="Ingresa tu contraseña" />
                    <Button texto="Entrar" />
                </form>
                <div className="login-links">
                    <a href="/recuperar" className="login-link">Recuperar contraseña</a>
                    <a href="/registro" className="login-link">Registro</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
