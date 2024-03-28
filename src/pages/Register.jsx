import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export const Register = () => {


    const [dateUser, setDateUser] = useState({
        email: "",
        user: "",
        password: "", 
        confirmPassword: ""
    });
    const {email, user, password, confirmPassword} = dateUser
    const [errors, setErros] = useState({})
    const [validEmail, setValidEmail] = useState(false)

    const onValidate = () =>{

      if (email.trim() === ''){
        errors.email = true
      }
      if (user.trim() === ''){
        errors.user = true
      } 
      if (password.trim() === ''){
        errors.password = true
      } 
      if (confirmPassword.trim() === '' ){
        errors.confirmPassword = true
      } else {
        errors.confirmPassword = false
      }
    }  

    const validarCorreo = (email) => {
        const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return expresionRegular.test(email);
      }
  
    const handleDateUserChange = (e) => {
        const {value, name} = e.target
        setDateUser({
            ...dateUser,
            [name]: value,
        })
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();

      onValidate()
      console.log(errors)

      if (validarCorreo(email)) {
        setValidEmail(false)
      } else {
        setValidEmail(true)
      }
    };
  
    return (
        <div className='d-flex align-items-center w-100 h-100'> 
            <div className="login-form-container"> 
                <h2 className='title-login'>Registrase</h2> 
                <form onSubmit={handleSubmit}>
                <label className='label-login'>
                    Correo:
                    <input className={errors.email || validEmail ? 'input-error input-login' : 'input-login'}
                           type="user"
                           name='email' 
                           value={email}
                           onChange={handleDateUserChange}/>
                </label>
                {validEmail ? <p className='mb-2'> Correo electronico invalido</p> : null }
                <label className='label-login'>
                    Nombre de usuario:
                    <input className={errors.user ? 'input-error input-login' : 'input-login'} 
                           type="user" 
                           value={user}
                           name='user' 
                           onChange={handleDateUserChange}/>
                </label>
                <label>
                    Contraseña:
                    <input className={errors.password ? 'input-error input-login' : 'input-login'} 
                           type="password" 
                           value={password}
                           name='password' 
                           onChange={handleDateUserChange} />
                </label>
                <label>
                    Confirmar contraseña:
                    <input className={errors.confirmPassword ? 'input-error input-login' : 'input-login'} 
                           type="password" 
                           value={confirmPassword}
                           name='confirmPassword' 
                           onChange={handleDateUserChange} />
                </label>
                {errors.email || errors.user || errors.password || errors.confirmPassword ? <p className='mb-2'> Todos los campos son obligatorios </p> : null } 
                <div className='d-flex flex-column'>
                    <Link className='button-register mt-3' 
                    to="/login"
                    // onClick={handleSubmit}
                    > Registrarme 
                </Link>
                </div>
                </form> 
            </div>
        </div>
    );
}
