import React from 'react';
import '../hojas-de-estilo/Login.css';  // Importa tu hoja de estilo
import logo from '../imagenes/Logo24.png';  // Importa tu logo

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <img src={logo} alt="Logo LinkedTec" className="logo-login" />
                <form>
                    <label>Usuario</label>
                    <input type="text" placeholder="Usuario" />
                    <label>Contraseña</label>
                    <input type="password" placeholder="Contraseña" />
                    <button type="submit" className="btn-entrar">Entrar</button>
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
