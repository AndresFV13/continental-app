import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Axios
import Axios from '../lib/Axios';
//sweetaleert2
import Swal from 'sweetalert2'

export const Register = () => {
    const [dataUser, setDataUser] = useState({
        email: "",
        user: "",
        password: "",
        confirmPassword: "",
    });
    const { email, user, password, confirmPassword } = dataUser;

    const [disabledButton, setDisabledButton] = useState(true);
    const [validEmail, setValidEmail] = useState(false);

    const postUsers = async () => {
        const userData = {
            email: dataUser.email,
            loginName: dataUser.user,
            password: dataUser.password,
            estado: "activo"
        };
        try {
            const request = await Axios.post('/auth/user', userData);
            if (request.status === 200) {
                Swal.fire({
                    title: "Usuario creado!",
                    text: "Ahora inicia sesion",
                    icon: 'success',
                });
                setDataUser({
                    email: "",
                    user: "",
                    password: "",
                    confirmPassword: "",
                })
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El usuario ya existe",
            });
        }
    };

    useEffect(() => {
        const isDisabled = !user || !email || !password || confirmPassword !== password;
        setDisabledButton(isDisabled);
    }, [dataUser]);

    const handledataUserChange = (e) => {
        const { value, name } = e.target;
        setDataUser({
            ...dataUser,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validarCorreo(email)) {
            setValidEmail(false);
            postUsers();
        } else {
            setValidEmail(true);
        }
    };

    const validarCorreo = (email) => {
        const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return expresionRegular.test(email);
    };

    return (
        <div className='d-flex align-items-center w-100 h-100 p-absolute'>
            <div className="login-form-container">
                <h2 className='title-login'>Registrarse</h2>
                <form onSubmit={handleSubmit}>
                    <label className='label-login'>
                        Correo:
                        <input
                            className='input-login'
                            type="email"
                            name='email'
                            value={email}
                            onChange={handledataUserChange} />
                    </label>
                    {validEmail && <p className='mb-2'>Correo electrónico inválido</p>}
                    <label className='label-login'>
                        Nombre de usuario:
                        <input
                            className='input-login'
                            type="text"
                            value={user}
                            name='user'
                            onChange={handledataUserChange} />
                    </label>
                    <label>
                        Contraseña:
                        <input
                            className='input-login'
                            type="password"
                            value={password}
                            name='password'
                            onChange={handledataUserChange} />
                    </label>
                    <label>
                        Confirmar contraseña:
                        <input
                            className='input-login'
                            type="password"
                            value={confirmPassword}
                            name='confirmPassword'
                            onChange={handledataUserChange} />
                    </label>
                    <div className='d-flex flex-column'>
                        <button className='button-register mt-3'
                            disabled={disabledButton}>
                            Registrarme
                        </button>
                    </div>
                    <div className='d-flex flex-column'>
                        <Link className='button-register mt-3' to="/login">
                            Iniciar Sesion
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
