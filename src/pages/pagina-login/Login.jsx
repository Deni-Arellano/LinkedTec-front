import React, {useContext, useEffect} from 'react';
import { Link } from 'react-router-dom'; // Importamos Link de react-router-dom
import Cajadetexto from '../../components/componente-caja-de-texto/CajaDeTexto'; // Asegúrate de que sea el Cajadetexto correcto
import './Login.css';  // Importa tu hoja de estilo
import logo from '../../assets/Logo24.png';  // Importa tu logo
import { useNavigate } from 'react-router-dom';  
import {usuarioContext} from '../../App'; 


const Login = () => {
    const {setUsuarioLog} = useContext(usuarioContext);
    
    useEffect(() => {
        setUsuarioLog(null); // Restablece el contexto del usuario 
      }, [setUsuarioLog]);

    const navigate = useNavigate(); 
    const handlepub = () => {
      console.log("Navegando a /Publicaciones");
      navigate('/publicaciones'); 
    };
    return (
        <div className="login-container">
            <div className="login-box">
                <img src={logo} alt="Logo LinkedTec" className="logo-login" />
                <form>
                    <label>Usuario</label>
                    <Cajadetexto placeholder="Ingresa tu usuario" className="login-input" />
                    <label>Contraseña</label>
                    <Cajadetexto type="password" placeholder="Ingresa tu contraseña" className="login-input" />
                    {/* Aquí aplicamos la clase específica btn-login */}
                    <button className="btn-login" onClick={handlepub}>Entrar </button>
                </form>
                <div className="login-links">
                <a href="/recuperar" className="login-link" onClick={(e) => e.preventDefault()}>
                Recuperar contraseña
                </a>

                    <Link to="/rol" className="login-link">Registro</Link> 
                </div>
            </div>
        </div>
    );
}

export default Login;
