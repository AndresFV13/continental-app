import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthProvider';
// Axios
import Axios from '../lib/Axios';
//sweetaleert2
import Swal from 'sweetalert2'

export const Login = () => {
    const [dataUser, setDataUser] = useState({
        user: "",
        password: ""
    });
    const [disabledButton, setDisabledButton] = useState(true);

    const navigate = useNavigate();

    const { setIsAuthenticated } = useAuth();

    const getusers = async () => {
        const userDataLogin = {
            loginName: dataUser.user,
            password: dataUser.password,
        };
        try {
            const request = await Axios.post('/auth/Auth', userDataLogin);
            setIsAuthenticated(true);
            navigate('/');
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Iniciado Sesion Correctamente"
              });
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            Swal.fire({
                icon: "error",
                title: "Lo siento...",
                text: "El usuario o la contraseña no son correctos",
              });
        }
    };

    const handleUserDataChange = (e) => {
        const { name, value } = e.target;
        setDataUser({
            ...dataUser,
            [name]: value
        });
    };

    useEffect(() => {
        const isDisabled = !dataUser.user || !dataUser.password;
        setDisabledButton(isDisabled);
    }, [dataUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        getusers();
    };
  
    return (
        <div className='d-flex align-items-center w-100 h-100 p-absolute'> 
            <div className="login-form-container"> 
                <h2 className='title-login'>Iniciar sesión</h2> 
                <form onSubmit={handleSubmit}>
                    <label className='label-login'>
                        Usuario:
                        <input className='input-login' type="text" name='user' value={dataUser.user} onChange={handleUserDataChange}/>
                    </label>
                    <label>
                        Contraseña:
                        <input className='input-login' type="password" name='password' value={dataUser.password} onChange={handleUserDataChange}/>
                    </label>
                    <div className='d-flex flex-column'>
                        <button className='button-login' disabled={disabledButton}>Iniciar sesión</button>
                        <Link className='button-register mt-3' to="/register">Registrarme</Link>
                    </div>
                </form> 
            </div>
        </div>
    );
};
