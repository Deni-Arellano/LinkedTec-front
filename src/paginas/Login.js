import React from "react";
import Button from "../componetes/Button";
import CajaDeTexto from "../componetes/Caja-de-texto";
import Etiquetas from "../componetes/Etiquetas";
import '../hojas-de-estilo/Login.css';

function Login() {
  return (
    <div className="login-container">
      <button className="linketec-btn">LinkeTec</button>
      <a href="#registro" className="registro-btn">Registro</a>
      <form className="login-form-container">
        <div className="campo-container">
          <Etiquetas text="Usuario" />
          <CajaDeTexto placeholder="Usuario" />
        </div>
        <div className="campo-container">
          <Etiquetas text="Contraseña" />
          <CajaDeTexto placeholder="Contraseña" />
        </div>
        <div className="boton-container">
          <Button texto="Entrar" />
        </div>
        <div className="extra-options">
          <a href="#recuperar">Recuperar contraseña</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
