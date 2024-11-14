import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'; // Importación de axios
import { Link } from 'react-router-dom';
import './login.css';
import logo from '../../assets/Logo24.png';
import { useNavigate } from 'react-router-dom';
import { usuarioContext } from '../../App';
import Swal from 'sweetalert2';

const Login = () => {
    const { setUsuarioLog } = useContext(usuarioContext);
    const navigate = useNavigate();
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [mostrarContraseña, setMostrarContraseña] = useState(false);
    useEffect(() => {
        setUsuarioLog(null);
    }, [setUsuarioLog]);

    const handleLogin = async (e) => {
        e.preventDefault();

        console.log(correo)
        console.log(contraseña)



        try {
            const response = await axios.post('http://localhost:3000/acceso/login', {
                "correo": correo,
                "contraseña": contraseña
            });

            setUsuarioLog(response.data.usuario.id);
            navigate('/publicaciones');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error de autenticación',
                text: 'Correo o contraseña incorrectos. Por favor, intenta de nuevo.',
            });
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <img src={logo} alt="Logo LinkedTec" className="logo-login" />
                <form onSubmit={handleLogin} autoComplete="off">
                    <label className="label-text">Correo</label>
                    <input
                        type="text"
                        placeholder="Ingresa tu correo"
                        className="login-input"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        autoComplete="off"
                    />
                    <label className="label-text">Contraseña</label>
                    <div className="password-container">
                        <input
                            type={mostrarContraseña ? 'text' : 'password'}
                            placeholder="Ingresa tu contraseña"
                            className="login-input"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                            autoComplete="off"
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setMostrarContraseña((prev) => !prev)}
                        >
                            {mostrarContraseña ? '🙈' : '👁️'}
                        </button>
                    </div>
                    <button className="btn-login" type="submit">
                        Ingresar
                    </button>
                </form>
                <div className="login-links">
                    <a href="/recuperar" className="login-link" onClick={(e) => e.preventDefault()}>
                        Recuperar contraseña
                    </a>
                    <Link to="/rol" className="login-link">
                        Registro
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
