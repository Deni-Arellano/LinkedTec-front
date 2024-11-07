import React, { useContext, useEffect, useState } from 'react';
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

    useEffect(() => {
        setUsuarioLog(null);
    }, [setUsuarioLog]);

    const handleLogin = async (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del formulario

        try {
            const response = await fetch('http://localhost:3000/acceso/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo, contraseña }),
            });

            if (response.ok) {
                const data = await response.json();
                setUsuarioLog(data);
                navigate('/publicaciones');
            } else {
                throw new Error('Correo o contraseña incorrectos');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error de autenticación',
                text: 'Correo o contraseña incorrectos. Por favor, intenta de nuevo.',
            });
        }
    };

    const Etiqueta = ({ texto }) => <label className="label-text">{texto}</label>;
    const CajaDeTexto = ({ type = 'text', value, onChange, placeholder }) => (
        <input
            type={type}
            placeholder={placeholder}
            className="login-input"
            value={value}
            onChange={onChange}
        />
    );

    return (
        <div className="login-container">
            <div className="login-box">
                <img src={logo} alt="Logo LinkedTec" className="logo-login" />
                <form onSubmit={handleLogin}>
                    <Etiqueta texto="Correo" />
                    <CajaDeTexto
                        placeholder="Ingresa tu correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                    <Etiqueta texto="Contraseña" />
                    <CajaDeTexto
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                    />
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
