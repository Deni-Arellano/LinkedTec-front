import React, { useContext, useEffect, useState } from 'react'; 
import axios from 'axios';
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

        try {
            const response = await axios.post('http://localhost:3000/acceso/login', {
                correo,
                contraseña
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

    const handleRecuperarContraseña = async () => {
        const { value: email } = await Swal.fire({
            title: 'Recuperar Contraseña',
            input: 'email',
            inputLabel: 'Ingresa tu correo electrónico',
            inputPlaceholder: 'correo@example.com',
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            cancelButtonText: 'Cancelar',
            customClass: {
                input: 'input-custom' // Clase personalizada para controlar el tamaño del input
            },
            inputValidator: (value) => {
                if (!value) {
                    return 'Por favor, ingresa tu correo.';
                }
                if (!/\S+@\S+\.\S+/.test(value)) {
                    return 'Por favor, ingresa un correo válido.';
                }
            }
        });
    
        if (email) {
            try {
                // Enviar solicitud para recuperar contraseña
                await axios.post('http://localhost:3000/acceso/login/recuperar', { correo: email });
    
                // Confirmación de envío
                await Swal.fire({
                    icon: 'success',
                    title: 'Correo enviado',
                    text: 'Se ha enviado un código de recuperación a tu correo. Por favor, revísalo.',
                    confirmButtonText: 'Continuar',
                });
    
                // Solicitar el código de verificación
                const { value: codigo } = await Swal.fire({
                    title: 'Código de Verificación',
                    input: 'text',
                    inputLabel: 'Ingresa el código enviado a tu correo',
                    inputPlaceholder: 'Código de verificación',
                    showCancelButton: true,
                    confirmButtonText: 'Verificar',
                    cancelButtonText: 'Cancelar',
                    customClass: {
                        input: 'input-custom' // Ajuste para el código de verificación
                    },
                    inputValidator: (value) => {
                        if (!value) {
                            return 'Por favor, ingresa el código.';
                        }
                    }
                });
    
                if (codigo) {
                    // Pedir la nueva contraseña dos veces
                    const nuevaContraseña = await Swal.fire({
                        title: 'Nueva Contraseña',
                        html: `
                            <input type="password" id="password1" class="swal2-input input-custom" placeholder="Nueva contraseña">
                            <input type="password" id="password2" class="swal2-input input-custom" placeholder="Confirma la contraseña">
                        `,
                        focusConfirm: false,
                        showCancelButton: true,
                        confirmButtonText: 'Siguiente',
                        cancelButtonText: 'Cancelar',
                        preConfirm: () => {
                            const password1 = Swal.getPopup().querySelector('#password1').value;
                            const password2 = Swal.getPopup().querySelector('#password2').value;
    
                            if (!password1 || password1.length < 6) {
                                Swal.showValidationMessage('La contraseña debe tener al menos 6 caracteres.');
                            } else if (password1 !== password2) {
                                Swal.showValidationMessage('Las contraseñas no coinciden.');
                            }
                            return password1;
                        }
                    });
    
                    if (nuevaContraseña.value) {
                        // Confirmar con el usuario que la contraseña es correcta
                        const confirmacion = await Swal.fire({
                            title: 'Confirma tu Contraseña',
                            text: '¿Estás seguro de que deseas usar esta contraseña?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonText: 'Sí, cambiar',
                            cancelButtonText: 'Cancelar',
                        });
    
                        if (confirmacion.isConfirmed) {
                            try {
                                // Enviar solicitud para cambiar contraseña
                                await axios.patch('http://localhost:3000/acceso/login/validar-cambiar', {
                                    correo: email,
                                    codigo: codigo,
                                    nuevaContraseña: nuevaContraseña.value
                                });
    
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Contraseña actualizada',
                                    text: 'Tu contraseña se ha cambiado exitosamente.',
                                });
                            } catch (error) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error al cambiar la contraseña',
                                    text: 'Verifica el código ingresado o intenta nuevamente.',
                                });
                            }
                        }
                    }
                }
            } catch (error) {
                if (error.response?.status === 400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error en la solicitud',
                        text: error.response.data?.mensaje || 'Algo salió mal. Por favor, intenta de nuevo.',
                    });
                } else if (error.response?.status === 404) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Correo no registrado',
                        text: 'El correo ingresado no está registrado en la base de datos.',
                    });
                } else if (error.response?.status === 429) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Solicitud en espera',
                        text: 'Debes esperar 15 minutos antes de solicitar otro código.',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error inesperado',
                        text: 'No se pudo conectar al servidor. Por favor, intenta de nuevo más tarde.',
                    });
                }
            }
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
                    <a
                        href="#"
                        className="login-link"
                        onClick={(e) => {
                            e.preventDefault();
                            handleRecuperarContraseña();
                        }}
                    >
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
