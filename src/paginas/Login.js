import React from "react";
import '../hojas-de-estilo/Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-form-container">
        <form>
          <div className="logo-container">
            <h1>LinkedTec</h1> {/* Título más grande */}
          </div>
          <div className="campo-container">
            <label>Usuario</label>
            <input type="text" />
          </div>
          <div className="campo-container">
            <label>Contraseña</label>
            <input type="password" />
          </div>
          <div className="boton-container">
            <button className="btn">Entrar</button>
          </div>
          <div className="extra-options">
            <a href="#recuperar">Recuperar contraseña</a>
            <a href="#registro" className="registro-link">Registro</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
